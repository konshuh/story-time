/**
 * Story sequencer — runs a story script as an async sequence of commands.
 *
 * A story module exports:
 *   - meta: { title, description }
 *   - tilesets: { name: generatorFn } — functions that return an off-screen canvas
 *   - run(ctx): async generator or async function that yields commands
 *
 * The sequencer provides a `ctx` object to the story's run() with helpers:
 *   ctx.renderer, ctx.sound, ctx.actors
 *   ctx.addActor(opts)       — create and register an actor
 *   ctx.dialog(speaker, text) — show dialog, wait for click
 *   ctx.wait(ms)             — pause
 *   ctx.fadeIn() / ctx.fadeOut()
 *   ctx.drawScene(fn)        — set the per-frame background draw callback
 */

import { Actor } from './animator.js';

export class StorySequencer {
  /**
   * @param {import('./renderer.js').Renderer} renderer
   * @param {import('./sound.js').SoundEngine} sound
   */
  constructor(renderer, sound) {
    this.renderer = renderer;
    this.sound = sound;

    /** @type {Actor[]} */
    this.actors = [];
    /** @type {Function|null} background draw callback */
    this.sceneDraw = null;
    /** @type {number} 0-1, used for fade overlay */
    this.fadeLevel = 0;
    this._fadeTarget = 0;
    this._fadeSpeed = 0;
    this._running = false;

    // Dialog state
    this._dialogResolve = null;
    this._dialogText = '';
    this._dialogRevealed = 0;
    this._dialogSpeaker = '';
    this._dialogRevealTimer = 0;
    this._dialogDone = false;
  }

  /**
   * Load an image from a URL and register it as a tileset.
   * @param {string} name
   * @param {string} url
   * @returns {Promise<HTMLImageElement>}
   */
  loadTileset(name, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.renderer.addTileset(name, img);
        resolve(img);
      };
      img.onerror = () => reject(new Error(`Failed to load tileset: ${url}`));
      img.src = url;
    });
  }

  /** Build the context object passed to story scripts. */
  _buildContext() {
    const seq = this;
    return {
      renderer: this.renderer,
      sound: this.sound,
      actors: this.actors,

      addActor(opts) {
        const actor = new Actor(opts);
        seq.actors.push(actor);
        return actor;
      },

      removeActor(name) {
        seq.actors = seq.actors.filter(a => a.name !== name);
      },

      dialog(speaker, text) {
        return seq._showDialog(speaker, text);
      },

      wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },

      fadeIn(duration = 600) {
        return seq._fade(0, duration);
      },

      fadeOut(duration = 600) {
        return seq._fade(1, duration);
      },

      drawScene(fn) {
        seq.sceneDraw = fn;
      },

      loadTileset(name, url) {
        return seq.loadTileset(name, url);
      },
    };
  }

  /** Show dialog text with typewriter reveal, resolve on click. */
  _showDialog(speaker, text) {
    return new Promise(resolve => {
      this._dialogSpeaker = speaker;
      this._dialogText = text;
      this._dialogRevealed = 0;
      this._dialogRevealTimer = 0;
      this._dialogDone = false;
      this._dialogResolve = resolve;

      // Show DOM elements
      const box = document.getElementById('dialog-box');
      const speakerEl = document.getElementById('dialog-speaker');
      const textEl = document.getElementById('dialog-text');
      const prompt = document.getElementById('dialog-prompt');

      box.classList.remove('hidden');
      speakerEl.textContent = speaker;
      textEl.textContent = '';
      prompt.classList.remove('blink');
    });
  }

  /** Call on user click/tap to advance dialog. */
  advanceDialog() {
    if (!this._dialogResolve) return;

    if (!this._dialogDone) {
      // Reveal all remaining text instantly
      this._dialogRevealed = this._dialogText.length;
      document.getElementById('dialog-text').textContent = this._dialogText;
      this._dialogDone = true;
      document.getElementById('dialog-prompt').classList.add('blink');
    } else {
      // Close dialog and continue story
      document.getElementById('dialog-box').classList.add('hidden');
      this.sound.confirm();
      const resolve = this._dialogResolve;
      this._dialogResolve = null;
      resolve();
    }
  }

  /** Smooth fade. Returns promise. */
  _fade(target, duration) {
    return new Promise(resolve => {
      this._fadeTarget = target;
      this._fadeSpeed = 1 / (duration / 16.67); // per frame approx
      const check = () => {
        if (Math.abs(this.fadeLevel - target) < 0.01) {
          this.fadeLevel = target;
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    });
  }

  /** Main update tick (called every frame). */
  update(dt) {
    // Fade
    if (this.fadeLevel < this._fadeTarget) {
      this.fadeLevel = Math.min(this.fadeLevel + this._fadeSpeed, this._fadeTarget);
    } else if (this.fadeLevel > this._fadeTarget) {
      this.fadeLevel = Math.max(this.fadeLevel - this._fadeSpeed, this._fadeTarget);
    }

    // Dialog typewriter
    if (this._dialogResolve && !this._dialogDone) {
      this._dialogRevealTimer += dt;
      const charsToShow = Math.floor(this._dialogRevealTimer / 35); // ~29 chars/sec
      if (charsToShow > this._dialogRevealed) {
        this._dialogRevealed = Math.min(charsToShow, this._dialogText.length);
        document.getElementById('dialog-text').textContent =
          this._dialogText.slice(0, this._dialogRevealed);

        if (this._dialogRevealed % 2 === 0) {
          this.sound.blip();
        }

        if (this._dialogRevealed >= this._dialogText.length) {
          this._dialogDone = true;
          document.getElementById('dialog-prompt').classList.add('blink');
        }
      }
    }

    // Actors
    for (const actor of this.actors) {
      actor.tick(dt);
    }
  }

  /** Main draw (called every frame after update). */
  draw() {
    this.renderer.clear();

    // Background scene
    if (this.sceneDraw) {
      this.sceneDraw(this.renderer);
    }

    // Actors
    for (const actor of this.actors) {
      if (!actor.visible) continue;
      this.renderer.drawSprite(
        actor.tileset,
        actor.currentTiles,
        actor.cols,
        Math.round(actor.x),
        Math.round(actor.y),
        actor.flipX,
      );
    }

    // Fade overlay
    if (this.fadeLevel > 0) {
      this.renderer.ctx.globalAlpha = this.fadeLevel;
      this.renderer.fillRect(0, 0, this.renderer.width, this.renderer.height, '#000');
      this.renderer.ctx.globalAlpha = 1;
    }
  }

  /** Run a story module. */
  async run(storyModule) {
    this._running = true;
    this.actors = [];
    this.sceneDraw = null;
    this.fadeLevel = 1; // start faded out

    // Register tilesets
    if (storyModule.tilesets) {
      for (const [name, generatorFn] of Object.entries(storyModule.tilesets)) {
        const tileCanvas = generatorFn();
        this.renderer.addTileset(name, tileCanvas);
      }
    }

    const ctx = this._buildContext();
    await storyModule.run(ctx);
    this._running = false;
  }

  stop() {
    this._running = false;
    this.actors = [];
    this.sceneDraw = null;
    this._dialogResolve = null;
    document.getElementById('dialog-box').classList.add('hidden');
  }

  get isRunning() {
    return this._running;
  }
}
