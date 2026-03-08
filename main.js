/**
 * Story Time — main entry point.
 *
 * Wires up the renderer, sound engine, and story sequencer,
 * populates the story list, and runs the game loop.
 */

import { Renderer } from './engine/renderer.js';
import { SoundEngine } from './engine/sound.js';
import { StorySequencer } from './engine/story.js';

// ── Available stories (add new imports here) ──
import * as theLostFirefly from './stories/the-lost-firefly.js';

const STORIES = [theLostFirefly];

// ── DOM refs ──
const titleScreen = document.getElementById('title-screen');
const storyListEl = document.getElementById('story-list');
const stageEl = document.getElementById('stage');
const canvas = document.getElementById('game-canvas');
const btnSound = document.getElementById('btn-sound');
const btnBack = document.getElementById('btn-back');

// ── Engine setup ──
const renderer = new Renderer(canvas);
const sound = new SoundEngine();
const sequencer = new StorySequencer(renderer, sound);

// ── Populate story list ──
for (const story of STORIES) {
  const card = document.createElement('button');
  card.className = 'story-card';
  card.innerHTML = `
    <div class="story-title">${story.meta.title}</div>
    <div class="story-desc">${story.meta.description}</div>
  `;
  card.addEventListener('click', () => startStory(story));
  storyListEl.appendChild(card);
}

// ── Start a story ──
async function startStory(storyModule) {
  sound.init(); // must happen from user gesture
  titleScreen.classList.add('hidden');
  stageEl.classList.remove('hidden');
  startGameLoop();

  try {
    await sequencer.run(storyModule);
  } finally {
    // Story ended — return to title after a short pause
    await new Promise(r => setTimeout(r, 800));
    goBack();
  }
}

function goBack() {
  sequencer.stop();
  stopGameLoop();
  stageEl.classList.add('hidden');
  titleScreen.classList.remove('hidden');
}

// ── Game loop ──
let loopId = null;
let lastTime = 0;

function gameLoop(timestamp) {
  const dt = lastTime ? timestamp - lastTime : 16.67;
  lastTime = timestamp;

  sequencer.update(dt);
  sequencer.draw();

  loopId = requestAnimationFrame(gameLoop);
}

function startGameLoop() {
  lastTime = 0;
  if (!loopId) loopId = requestAnimationFrame(gameLoop);
}

function stopGameLoop() {
  if (loopId) {
    cancelAnimationFrame(loopId);
    loopId = null;
  }
}

// ── Input ──
canvas.addEventListener('click', () => sequencer.advanceDialog());
canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  sequencer.advanceDialog();
});

btnSound.addEventListener('click', () => {
  const on = sound.toggle();
  btnSound.textContent = on ? '\u266A Sound' : '\u266A Muted';
});

btnBack.addEventListener('click', goBack);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    sequencer.advanceDialog();
  }
  if (e.key === 'Escape') {
    goBack();
  }
});
