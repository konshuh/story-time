/**
 * Sprite animation system.
 *
 * An Animation is a named sequence of frames. Each frame is an array of tile
 * indices plus a duration in milliseconds.
 *
 * An Actor holds a position, current animation, and timing state. The Story
 * sequencer creates actors and the main loop ticks them.
 */

export class Animation {
  /**
   * @param {string} name
   * @param {{ tiles: number[], duration: number }[]} frames
   * @param {boolean} [loop=true]
   */
  constructor(name, frames, loop = true) {
    this.name = name;
    this.frames = frames;
    this.loop = loop;
  }
}

export class Actor {
  /**
   * @param {object} opts
   * @param {string} opts.name
   * @param {string} opts.tileset   tileset key in the renderer
   * @param {number} opts.x         pixel x
   * @param {number} opts.y         pixel y
   * @param {number} [opts.cols=1]  tile columns in a single frame
   * @param {boolean} [opts.flipX=false]
   * @param {Object<string, Animation>} [opts.animations]
   */
  constructor({ name, tileset, x = 0, y = 0, cols = 1, flipX = false, animations = {} }) {
    this.name = name;
    this.tileset = tileset;
    this.x = x;
    this.y = y;
    this.cols = cols;
    this.flipX = flipX;
    /** @type {Object<string, Animation>} */
    this.animations = animations;

    this.currentAnim = null;
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.visible = true;

    // Tweening state
    this._tween = null;
  }

  /** Start playing a named animation. */
  play(animName) {
    const anim = this.animations[animName];
    if (!anim) return;
    if (this.currentAnim === anim && this.frameIndex < anim.frames.length) return; // already playing
    this.currentAnim = anim;
    this.frameIndex = 0;
    this.frameTimer = 0;
  }

  /** Get current frame tile indices. */
  get currentTiles() {
    if (!this.currentAnim) return [];
    return this.currentAnim.frames[this.frameIndex]?.tiles ?? [];
  }

  /** Advance animation clock. */
  tick(dt) {
    // Advance tween
    if (this._tween) {
      this._tweenTick(dt);
    }

    if (!this.currentAnim) return;
    const frame = this.currentAnim.frames[this.frameIndex];
    if (!frame) return;

    this.frameTimer += dt;
    if (this.frameTimer >= frame.duration) {
      this.frameTimer -= frame.duration;
      this.frameIndex++;
      if (this.frameIndex >= this.currentAnim.frames.length) {
        if (this.currentAnim.loop) {
          this.frameIndex = 0;
        } else {
          this.frameIndex = this.currentAnim.frames.length - 1;
        }
      }
    }
  }

  /**
   * Smoothly move to a target position over `duration` ms.
   * Returns a promise that resolves when the move is done.
   */
  moveTo(targetX, targetY, duration) {
    return new Promise(resolve => {
      this._tween = {
        startX: this.x,
        startY: this.y,
        targetX,
        targetY,
        duration,
        elapsed: 0,
        resolve,
      };
    });
  }

  /** @private */
  _tweenTick(dt) {
    const t = this._tween;
    t.elapsed += dt;
    const progress = Math.min(t.elapsed / t.duration, 1);
    // Ease in-out quad
    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    this.x = t.startX + (t.targetX - t.startX) * ease;
    this.y = t.startY + (t.targetY - t.startY) * ease;

    if (progress >= 1) {
      this.x = t.targetX;
      this.y = t.targetY;
      const resolve = t.resolve;
      this._tween = null;
      resolve();
    }
  }
}
