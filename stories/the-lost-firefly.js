/**
 * "The Lost Firefly" — a short demo story.
 *
 * A little firefly gets separated from its friends on a dark night
 * and must find its way back through a forest.
 */

import { Animation } from '../engine/animator.js';

export const meta = {
  title: 'The Lost Firefly',
  description: 'A tiny firefly searches for its friends in a dark forest.',
};

// ── Procedural tileset generators ──────────────────────────────────────────

function px(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

/** Draw a simple 16x16 tile on an off-screen canvas context at offset. */
function drawTileAt(ctx, ox, oy, drawFn) {
  ctx.save();
  ctx.translate(ox, oy);
  drawFn(ctx);
  ctx.restore();
}

export const tilesets = {

  /** Environment tiles: grass, dirt, tree trunk, leaves, sky, etc. */
  env() {
    // 16 tiles across, 4 rows = 64 tiles
    const cols = 16, rows = 4;
    const c = document.createElement('canvas');
    c.width = cols * 16;
    c.height = rows * 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Tile 0: dark sky
    drawTileAt(ctx, 0, 0, (g) => {
      g.fillStyle = '#0b0b2a';
      g.fillRect(0, 0, 16, 16);
      // A few dim stars
      px(g, 3, 4, '#445');
      px(g, 11, 2, '#556');
      px(g, 7, 10, '#445');
      px(g, 14, 7, '#334');
    });

    // Tile 1: dark sky variant (starless)
    drawTileAt(ctx, 16, 0, (g) => {
      g.fillStyle = '#0b0b2a';
      g.fillRect(0, 0, 16, 16);
      px(g, 5, 12, '#334');
    });

    // Tile 2: grass top
    drawTileAt(ctx, 32, 0, (g) => {
      g.fillStyle = '#1a3a1a';
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#2a5a2a';
      g.fillRect(0, 0, 16, 4);
      // Grass blades
      for (let i = 0; i < 16; i += 2) {
        px(g, i, 0, '#3a7a3a');
        if (i % 4 === 0) px(g, i, -1 < 0 ? 0 : 0, '#4a8a4a');
      }
    });

    // Tile 3: dirt
    drawTileAt(ctx, 48, 0, (g) => {
      g.fillStyle = '#3a2a1a';
      g.fillRect(0, 0, 16, 16);
      px(g, 4, 3, '#4a3a2a');
      px(g, 10, 8, '#4a3a2a');
      px(g, 7, 12, '#2a1a0a');
    });

    // Tile 4: tree trunk
    drawTileAt(ctx, 64, 0, (g) => {
      g.fillStyle = '#3a2a1a';
      g.fillRect(5, 0, 6, 16);
      g.fillStyle = '#4a3a2a';
      g.fillRect(6, 0, 2, 16);
      // Bark texture
      px(g, 5, 4, '#2a1a0a');
      px(g, 8, 9, '#2a1a0a');
    });

    // Tile 5: tree leaves (dark)
    drawTileAt(ctx, 80, 0, (g) => {
      g.fillStyle = '#1a4a2a';
      g.fillRect(0, 2, 16, 14);
      g.fillRect(2, 0, 12, 16);
      g.fillStyle = '#2a5a3a';
      g.fillRect(3, 3, 4, 4);
      g.fillRect(9, 6, 3, 3);
      // Highlight
      px(g, 4, 2, '#3a6a4a');
      px(g, 10, 5, '#3a6a4a');
    });

    // Tile 6: tree leaves top (rounded)
    drawTileAt(ctx, 96, 0, (g) => {
      g.fillStyle = 'transparent';
      g.clearRect(0, 0, 16, 16);
      g.fillStyle = '#1a4a2a';
      g.fillRect(2, 6, 12, 10);
      g.fillRect(4, 3, 8, 13);
      g.fillRect(6, 1, 4, 15);
      g.fillStyle = '#2a5a3a';
      g.fillRect(5, 4, 3, 3);
      px(g, 7, 2, '#3a6a4a');
    });

    // Tile 7: bush
    drawTileAt(ctx, 112, 0, (g) => {
      g.fillStyle = '#1a3a1a';
      g.fillRect(0, 8, 16, 8);
      g.fillRect(2, 5, 12, 11);
      g.fillRect(4, 3, 8, 13);
      g.fillStyle = '#2a5a2a';
      g.fillRect(5, 5, 3, 3);
      g.fillRect(10, 7, 2, 2);
    });

    // Tile 8: path / clearing (lighter dirt)
    drawTileAt(ctx, 128, 0, (g) => {
      g.fillStyle = '#4a3a2a';
      g.fillRect(0, 0, 16, 16);
      px(g, 3, 5, '#5a4a3a');
      px(g, 11, 11, '#3a2a1a');
      px(g, 7, 2, '#5a4a3a');
    });

    // Tile 9: water
    drawTileAt(ctx, 144, 0, (g) => {
      g.fillStyle = '#1a2a4a';
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#2a3a5a';
      g.fillRect(2, 4, 5, 1);
      g.fillRect(9, 10, 4, 1);
    });

    // Tile 10: flower (on grass)
    drawTileAt(ctx, 160, 0, (g) => {
      g.fillStyle = '#1a3a1a';
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#2a5a2a';
      g.fillRect(0, 0, 16, 4);
      // Flower
      g.fillStyle = '#3a6a3a';
      g.fillRect(7, 6, 2, 6);
      px(g, 7, 4, '#e55');
      px(g, 8, 4, '#e55');
      px(g, 6, 5, '#e55');
      px(g, 9, 5, '#e55');
      px(g, 7, 5, '#ff7');
      px(g, 8, 5, '#ff7');
    });

    // Tile 11: moon
    drawTileAt(ctx, 176, 0, (g) => {
      g.fillStyle = '#0b0b2a';
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#f7e8a0';
      g.beginPath();
      g.arc(8, 8, 5, 0, Math.PI * 2);
      g.fill();
      // Crescent shadow
      g.fillStyle = '#0b0b2a';
      g.beginPath();
      g.arc(10, 7, 4, 0, Math.PI * 2);
      g.fill();
    });

    return c;
  },

  /** Firefly sprite tiles. */
  firefly() {
    // 4 frames, each 16x16
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 16;
    const ctx = c.getContext('2d');

    for (let frame = 0; frame < 4; frame++) {
      const ox = frame * 16;
      // Body
      ctx.fillStyle = '#2a2a1a';
      ctx.fillRect(ox + 6, 7, 4, 4);
      // Wings (alternate frames)
      ctx.fillStyle = '#5a5a4a';
      if (frame % 2 === 0) {
        ctx.fillRect(ox + 5, 5, 2, 3);
        ctx.fillRect(ox + 9, 5, 2, 3);
      } else {
        ctx.fillRect(ox + 5, 6, 2, 2);
        ctx.fillRect(ox + 9, 6, 2, 2);
      }
      // Glow — intensity varies by frame
      const glowAlpha = [0.8, 0.5, 0.9, 0.4][frame];
      ctx.fillStyle = `rgba(255, 255, 100, ${glowAlpha})`;
      ctx.beginPath();
      ctx.arc(ox + 8, 11, 2.5 + frame * 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Core glow
      ctx.fillStyle = `rgba(255, 255, 200, ${glowAlpha})`;
      px(ctx, ox + 7, 10, ctx.fillStyle);
      px(ctx, ox + 8, 10, ctx.fillStyle);
    }
    return c;
  },

  /** Other fireflies (friends) — just colored dots with glow. */
  friends() {
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 16;
    const ctx = c.getContext('2d');

    // Frame 0: glow on
    ctx.fillStyle = 'rgba(200, 255, 100, 0.7)';
    ctx.beginPath();
    ctx.arc(8, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff8';
    ctx.fillRect(7, 7, 2, 2);

    // Frame 1: glow dim
    ctx.fillStyle = 'rgba(200, 255, 100, 0.3)';
    ctx.beginPath();
    ctx.arc(24, 8, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#aa6';
    ctx.fillRect(23, 7, 2, 2);

    return c;
  },
};

// ── Scene maps ─────────────────────────────────────────────────────────────

// Legend: 0=dark sky, 1=sky variant, 2=grass, 3=dirt, 4=trunk, 5=leaves, 6=leaves top, 7=bush, 8=path, 10=flower, 11=moon
const forestMap = [
  [0, 0, 1, 0, 0, 0,11, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 6, 0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 1],
  [0, 0, 0, 6, 5, 0, 0, 0, 0, 0, 6, 5, 0, 0, 0, 6, 5, 0, 0, 0],
  [1, 0, 0, 5, 5, 0, 0, 1, 0, 0, 5, 5, 0, 1, 0, 5, 5, 0, 0, 0],
  [0, 0, 0, 5, 4, 0, 0, 0, 0, 0, 5, 4, 0, 0, 0, 5, 4, 0, 0, 1],
  [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 0, 4, 0, 0, 1, 0, 4, 0, 1, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 7, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 7],
  [0, 0, 0, 0, 4, 0, 0, 7, 0, 0, 0, 4, 0, 0, 0, 0, 4, 7, 0, 0],
  [2,10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,10, 2, 2, 2, 2, 2],
  [3, 3, 8, 8, 3, 3, 8, 8, 3, 3, 3, 3, 8, 8, 3, 3, 3, 3, 8, 3],
  [3, 3, 3, 8, 8, 8, 8, 3, 3, 3, 3, 3, 3, 8, 8, 3, 3, 3, 8, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 8, 3, 3, 3, 3],
];

const clearingMap = [
  [0, 1, 0, 0, 0,11, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
  [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
  [0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
  [0, 4, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [2, 2,10, 2, 2,10, 2, 2, 2,10, 2,10, 2, 2, 2,10, 2, 2, 2, 2],
  [3, 3, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 3],
  [3, 3, 3, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

// ── Story script ───────────────────────────────────────────────────────────

export async function run(ctx) {
  const { renderer, sound } = ctx;

  // ── Scene 1: The Dark Forest ──
  ctx.drawScene((r) => r.drawMap('env', forestMap));

  const firefly = ctx.addActor({
    name: 'firefly',
    tileset: 'firefly',
    x: 40,
    y: 140,
    cols: 1,
    animations: {
      fly: new Animation('fly', [
        { tiles: [0], duration: 150 },
        { tiles: [1], duration: 150 },
        { tiles: [2], duration: 150 },
        { tiles: [3], duration: 150 },
      ]),
    },
  });
  firefly.play('fly');

  await ctx.fadeIn(800);
  sound.ambientWhoosh();

  await ctx.wait(600);
  await ctx.dialog('', 'Deep in the forest, on a moonlit night...');
  await ctx.dialog('Lumi', 'Hello? Is anyone there?');
  await ctx.dialog('Lumi', "I can't see the others anymore... Where did everyone go?");

  // Fly across screen
  await firefly.moveTo(200, 100, 2000);
  await ctx.dialog('Lumi', "The forest is so dark. I need to find the clearing where we always gather.");

  await firefly.moveTo(280, 120, 1500);
  await ctx.wait(300);
  await ctx.dialog('Lumi', "Wait... I think I see the old oak tree. The clearing must be close!");

  // ── Scene 2: Transition ──
  sound.sceneTransition();
  await ctx.fadeOut(600);
  await ctx.wait(400);

  // ── Scene 3: The Clearing ──
  ctx.drawScene((r) => r.drawMap('env', clearingMap));
  firefly.x = -16;
  firefly.y = 120;

  // Add friend fireflies
  const friendPositions = [
    { x: 120, y: 80 }, { x: 160, y: 60 }, { x: 200, y: 90 },
    { x: 140, y: 50 }, { x: 180, y: 75 }, { x: 155, y: 95 },
  ];

  const friends = friendPositions.map((pos, i) => {
    const f = ctx.addActor({
      name: `friend${i}`,
      tileset: 'friends',
      x: pos.x,
      y: pos.y,
      cols: 1,
      animations: {
        glow: new Animation('glow', [
          { tiles: [0], duration: 300 + i * 80 },
          { tiles: [1], duration: 300 + i * 80 },
        ]),
      },
    });
    f.play('glow');
    return f;
  });

  await ctx.fadeIn(800);
  await ctx.wait(400);

  // Lumi enters
  await firefly.moveTo(100, 110, 1800);
  await ctx.dialog('Lumi', "The clearing! And look — everyone is here!");

  // Friends bob gently (tiny movements)
  for (const f of friends) {
    f.moveTo(f.x + (Math.random() - 0.5) * 10, f.y - 5, 1000);
  }

  await ctx.dialog('Friend', "Lumi! We were worried about you!");
  await ctx.dialog('Lumi', "I got turned around in the dark... but I followed the moonlight.");

  // Lumi joins the group
  await firefly.moveTo(155, 80, 1500);

  await ctx.dialog('Friend', "You found your way. You always do.");
  await ctx.dialog('Lumi', "Together, we light up the whole clearing.");

  // Celebratory melody
  await sound.playMelody([
    [523, 200], [587, 200], [659, 200], [784, 400],
    [659, 200], [784, 400], [1047, 600],
  ]);

  await ctx.wait(500);
  await ctx.dialog('', 'And so, Lumi was never truly lost — just finding a new way home.');
  await ctx.dialog('', '~ The End ~');

  await ctx.fadeOut(1200);
}
