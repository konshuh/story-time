/**
 * "Calgary to Vancouver" — a wordless animated story.
 *
 * A blonde girl and her dark-haired mother drive to the Calgary airport,
 * eat, board a plane, fly to Vancouver, take a train, and arrive at
 * a blonde friend's little house. No dialog — visuals and music only.
 */

import { Animation } from '../engine/animator.js';

export const meta = {
  title: 'Calgary to Vancouver',
  description: 'A mother and daughter fly across the mountains to visit a friend.',
};

/* ── helpers ─────────────────────────────────────────────────────────── */

function px(ctx, x, y, c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); }

function at(ctx, ox, oy, fn) {
  ctx.save(); ctx.translate(ox, oy); fn(ctx); ctx.restore();
}

function makeTileset(cols, rows, drawFn) {
  const c = document.createElement('canvas');
  c.width = cols * 16; c.height = rows * 16;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  drawFn(ctx);
  return c;
}

/* ── draw a person (16×16) ──────────────────────────────────────────── */

function drawPerson(g, opts) {
  const {
    hairColor, skinColor = '#f5c5a3', shirtColor, skirtColor,
    legColor = '#444', shoeColor = '#333',
    hairLength = 12, tall = false, walkFrame = 0,
  } = opts;

  const headY = tall ? 0 : 2;
  const bodyY = headY + 5;

  // hair behind body (long flowing hair)
  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, Math.min(hairLength, 16 - headY));

  // head
  g.fillStyle = skinColor;
  g.fillRect(6, headY + 1, 4, 4);

  // hair on top and sides
  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, 2);
  g.fillRect(5, headY, 1, 5);
  g.fillRect(10, headY, 1, 5);

  // eyes
  px(g, 7, headY + 2, '#333');
  px(g, 9, headY + 2, '#333');

  // shirt
  g.fillStyle = shirtColor;
  g.fillRect(5, bodyY, 6, tall ? 4 : 3);

  // skirt/pants
  g.fillStyle = skirtColor;
  const skirtY = bodyY + (tall ? 4 : 3);
  g.fillRect(5, skirtY, 6, 3);

  // legs
  g.fillStyle = legColor;
  const legY = skirtY + 3;
  if (walkFrame === 1) {
    g.fillRect(5, legY, 2, 2);
    g.fillRect(9, legY, 2, 2);
  } else if (walkFrame === 2) {
    g.fillRect(6, legY, 2, 2);
    g.fillRect(8, legY, 2, 2);
  } else {
    g.fillRect(6, legY, 2, 2);
    g.fillRect(8, legY, 2, 2);
  }

  // shoes
  g.fillStyle = shoeColor;
  if (walkFrame === 1) {
    g.fillRect(5, legY + 2, 2, 1);
    g.fillRect(9, legY + 2, 2, 1);
  } else {
    g.fillRect(6, legY + 2, 2, 1);
    g.fillRect(8, legY + 2, 2, 1);
  }
}

function drawSitting(g, opts) {
  const {
    hairColor, skinColor = '#f5c5a3', shirtColor, skirtColor,
    hairLength = 10, tall = false,
  } = opts;

  const headY = tall ? 1 : 3;
  const bodyY = headY + 5;

  // hair behind
  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, Math.min(hairLength, 14 - headY));

  // head
  g.fillStyle = skinColor;
  g.fillRect(6, headY + 1, 4, 4);

  // hair
  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, 2);
  g.fillRect(5, headY, 1, 5);
  g.fillRect(10, headY, 1, 5);

  // eyes
  px(g, 7, headY + 2, '#333');
  px(g, 9, headY + 2, '#333');

  // shirt
  g.fillStyle = shirtColor;
  g.fillRect(5, bodyY, 6, tall ? 4 : 3);

  // lap (sitting)
  g.fillStyle = skirtColor;
  const lapY = bodyY + (tall ? 4 : 3);
  g.fillRect(4, lapY, 8, 2);
}

/* ── tilesets ────────────────────────────────────────────────────────── */

export const tilesets = {

  /** Environment tiles (16 columns wide). */
  env() {
    return makeTileset(16, 6, (ctx) => {

      // 0 — blue sky
      at(ctx, 0, 0, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      });

      // 1 — cloud
      at(ctx, 16, 0, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#fff';
        g.fillRect(3, 7, 10, 4); g.fillRect(5, 5, 6, 7);
      });

      // 2 — road with dashes
      at(ctx, 32, 0, (g) => {
        g.fillStyle = '#555'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ff0'; g.fillRect(0, 7, 5, 2); g.fillRect(10, 7, 6, 2);
      });

      // 3 — grass
      at(ctx, 48, 0, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#5a9c4f';
        for (let i = 1; i < 16; i += 3) px(g, i, 1, '#5aac4f');
      });

      // 4 — building (windows)
      at(ctx, 64, 0, (g) => {
        g.fillStyle = '#8899aa'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaddff';
        g.fillRect(2, 2, 4, 4); g.fillRect(10, 2, 4, 4);
        g.fillRect(2, 9, 4, 4); g.fillRect(10, 9, 4, 4);
      });

      // 5 — building top
      at(ctx, 80, 0, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 5);
        g.fillStyle = '#8899aa'; g.fillRect(0, 5, 16, 11);
        g.fillStyle = '#99aabb'; g.fillRect(3, 0, 10, 16);
        g.fillStyle = '#aaddff';
        g.fillRect(5, 2, 3, 3); g.fillRect(9, 2, 3, 3);
        g.fillRect(5, 8, 3, 3); g.fillRect(9, 8, 3, 3);
      });

      // 6 — tall building
      at(ctx, 96, 0, (g) => {
        g.fillStyle = '#7788aa'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaddff';
        for (let r = 1; r < 15; r += 4) {
          g.fillRect(2, r, 3, 2); g.fillRect(7, r, 3, 2); g.fillRect(12, r, 3, 2);
        }
      });

      // 7 — Calgary Tower-ish
      at(ctx, 112, 0, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#bbb'; g.fillRect(6, 0, 4, 16);
        g.fillStyle = '#eee'; g.fillRect(4, 4, 8, 3);
      });

      // 8 — road plain
      at(ctx, 128, 0, (g) => {
        g.fillStyle = '#555'; g.fillRect(0, 0, 16, 16);
      });

      // 9 — sidewalk
      at(ctx, 144, 0, (g) => {
        g.fillStyle = '#bbb'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaa'; g.fillRect(8, 0, 1, 16);
      });

      // 10 — airport floor
      at(ctx, 160, 0, (g) => {
        g.fillStyle = '#ddd0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ccc8b8'; g.fillRect(0, 0, 8, 8); g.fillRect(8, 8, 8, 8);
      });

      // 11 — airport wall with window
      at(ctx, 176, 0, (g) => {
        g.fillStyle = '#e0e0e0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaddff'; g.fillRect(2, 2, 12, 9);
        g.fillStyle = '#ccc'; g.fillRect(8, 2, 1, 9);
      });

      // 12 — airport wall solid
      at(ctx, 192, 0, (g) => {
        g.fillStyle = '#e0e0e0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ccc'; g.fillRect(0, 14, 16, 2);
      });

      // 13 — table with food
      at(ctx, 208, 0, (g) => {
        g.fillStyle = '#ddd0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#8B7014'; g.fillRect(1, 6, 14, 2);
        g.fillRect(3, 8, 2, 8); g.fillRect(11, 8, 2, 8);
        g.fillStyle = '#fff'; g.fillRect(3, 4, 4, 2); g.fillRect(9, 4, 4, 2);
        g.fillStyle = '#e74'; g.fillRect(4, 3, 2, 1);
        g.fillStyle = '#fa3'; g.fillRect(10, 3, 2, 1);
      });

      // 14 — mountain
      at(ctx, 224, 0, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#557755';
        g.beginPath(); g.moveTo(0, 16); g.lineTo(8, 2); g.lineTo(16, 16); g.fill();
        g.fillStyle = '#eef';
        g.beginPath(); g.moveTo(5, 8); g.lineTo(8, 2); g.lineTo(11, 8); g.fill();
      });

      // 15 — water
      at(ctx, 240, 0, (g) => {
        g.fillStyle = '#3399bb'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#55bbdd'; g.fillRect(2, 5, 5, 1); g.fillRect(10, 11, 4, 1);
      });

      /* ─── row 1 (tiles 16-31) ─── */

      // 16 — house wall
      at(ctx, 0, 16, (g) => {
        g.fillStyle = '#e8d8b8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaddff'; g.fillRect(4, 3, 8, 5);
        g.fillStyle = '#ccc'; g.fillRect(8, 3, 1, 5); g.fillRect(4, 5, 8, 1);
      });

      // 17 — house roof
      at(ctx, 16, 16, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#994422';
        g.beginPath(); g.moveTo(-1, 16); g.lineTo(8, 3); g.lineTo(17, 16); g.fill();
      });

      // 18 — house door
      at(ctx, 32, 16, (g) => {
        g.fillStyle = '#e8d8b8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#774422'; g.fillRect(4, 1, 8, 15);
        g.fillStyle = '#ffcc00'; px(g, 10, 8, g.fillStyle); px(g, 10, 9, g.fillStyle);
      });

      // 19 — tree
      at(ctx, 48, 16, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#774422'; g.fillRect(6, 9, 4, 7);
        g.fillStyle = '#2a6a2f'; g.fillRect(2, 2, 12, 9); g.fillRect(4, 0, 8, 11);
        g.fillStyle = '#3a8a3f'; g.fillRect(5, 3, 4, 3);
      });

      // 20 — cloud variant
      at(ctx, 64, 16, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#fff';
        g.fillRect(1, 8, 14, 4); g.fillRect(4, 6, 8, 6);
      });

      // 21 — runway
      at(ctx, 80, 16, (g) => {
        g.fillStyle = '#666'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#fff'; g.fillRect(6, 0, 4, 4); g.fillRect(6, 8, 4, 4);
      });

      // 22 — plane body tile (for background)
      at(ctx, 96, 16, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#eee'; g.fillRect(0, 5, 16, 8);
        g.fillStyle = '#2266cc'; g.fillRect(0, 12, 16, 1);
        g.fillStyle = '#aaddff';
        g.fillRect(2, 7, 3, 2); g.fillRect(7, 7, 3, 2); g.fillRect(12, 7, 3, 2);
      });

      // 23 — plane nose tile
      at(ctx, 112, 16, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#eee'; g.fillRect(0, 5, 10, 8);
        g.fillStyle = '#ddd';
        g.fillRect(10, 7, 5, 4); px(g, 15, 8, '#ddd'); px(g, 15, 9, '#ddd');
        g.fillStyle = '#aaddff'; g.fillRect(10, 7, 3, 3);
        g.fillStyle = '#2266cc'; g.fillRect(0, 12, 10, 1);
      });

      // 24 — plane tail tile
      at(ctx, 128, 16, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#eee'; g.fillRect(4, 5, 12, 8);
        g.fillStyle = '#2266cc';
        g.fillRect(0, 0, 6, 6); g.fillRect(2, 5, 4, 2);
        g.fillStyle = '#eee'; g.fillRect(6, 5, 10, 1);
        g.fillStyle = '#2266cc'; g.fillRect(4, 12, 12, 1);
      });

      // 25 — plane interior ceiling
      at(ctx, 144, 16, (g) => {
        g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ddd'; g.fillRect(0, 12, 16, 4);
        g.fillStyle = '#ccc'; g.fillRect(0, 14, 16, 1);
      });

      // 26 — plane interior window (with sky)
      at(ctx, 160, 16, (g) => {
        g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#88ccff'; g.fillRect(4, 2, 8, 8);
        g.fillStyle = '#aaddff'; g.fillRect(5, 3, 6, 6);
        // clouds through window
        g.fillStyle = '#fff'; g.fillRect(6, 5, 3, 2);
        g.fillStyle = '#ccc';
        g.fillRect(4, 2, 8, 1); g.fillRect(4, 9, 8, 1);
        g.fillRect(4, 2, 1, 8); g.fillRect(11, 2, 1, 8);
      });

      // 27 — plane interior wall
      at(ctx, 176, 16, (g) => {
        g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
      });

      // 28 — plane seat
      at(ctx, 192, 16, (g) => {
        g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#3355aa'; g.fillRect(3, 4, 10, 8);
        g.fillStyle = '#2244aa'; g.fillRect(3, 4, 10, 2);
        g.fillStyle = '#3355aa'; g.fillRect(3, 12, 10, 4);
      });

      // 29 — plane floor
      at(ctx, 208, 16, (g) => {
        g.fillStyle = '#777799'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#666688'; g.fillRect(0, 0, 16, 2);
      });

      // 30 — rail track
      at(ctx, 224, 16, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#888'; g.fillRect(0, 6, 16, 1); g.fillRect(0, 9, 16, 1);
        g.fillStyle = '#664';
        for (let x = 2; x < 16; x += 5) g.fillRect(x, 5, 2, 6);
      });

      // 31 — path
      at(ctx, 240, 16, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#bbaa88'; g.fillRect(3, 0, 10, 16);
      });

      /* ─── row 2 (tiles 32-47) ─── */

      // 32 — Vancouver skyline
      at(ctx, 0, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#778899';
        g.fillRect(0, 8, 5, 8); g.fillRect(4, 5, 4, 11);
        g.fillRect(10, 7, 6, 9);
        g.fillStyle = '#aaddff';
        px(g, 2, 10, g.fillStyle); px(g, 5, 7, g.fillStyle); px(g, 12, 9, g.fillStyle);
      });

      // 33 — mountain variant 2
      at(ctx, 16, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#446644';
        g.beginPath(); g.moveTo(-2, 16); g.lineTo(6, 4); g.lineTo(14, 16); g.fill();
        g.fillStyle = '#eef';
        g.beginPath(); g.moveTo(3, 9); g.lineTo(6, 4); g.lineTo(9, 9); g.fill();
      });

      // 34 — mountain far (blueish)
      at(ctx, 32, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#8899aa';
        g.beginPath(); g.moveTo(0, 16); g.lineTo(8, 5); g.lineTo(16, 16); g.fill();
        g.fillStyle = '#dde';
        g.beginPath(); g.moveTo(5, 10); g.lineTo(8, 5); g.lineTo(11, 10); g.fill();
      });

      // 35 — fence
      at(ctx, 48, 32, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ddd';
        g.fillRect(0, 4, 16, 1); g.fillRect(0, 8, 16, 1);
        g.fillRect(2, 2, 1, 8); g.fillRect(8, 2, 1, 8); g.fillRect(14, 2, 1, 8);
      });

      // 36 — light sky (horizon)
      at(ctx, 64, 32, (g) => {
        g.fillStyle = '#a0d8f0'; g.fillRect(0, 0, 16, 16);
      });

      // 37 — gate/corridor floor
      at(ctx, 80, 32, (g) => {
        g.fillStyle = '#ddd0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#bbb'; g.fillRect(0, 7, 16, 2);
      });

      // 38 — jetway wall top
      at(ctx, 96, 32, (g) => {
        g.fillStyle = '#c0c0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaa'; g.fillRect(0, 14, 16, 2);
      });

      // 39 — jetway wall bottom
      at(ctx, 112, 32, (g) => {
        g.fillStyle = '#c0c0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaa'; g.fillRect(0, 0, 16, 2);
      });

      // 40 — grass with flowers
      at(ctx, 128, 32, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        px(g, 3, 4, '#f66'); px(g, 4, 4, '#f66');
        px(g, 11, 8, '#ff6'); px(g, 12, 8, '#ff6');
        px(g, 7, 12, '#f6f');
      });

      // 41 — house wall left edge
      at(ctx, 144, 32, (g) => {
        g.fillStyle = '#e8d8b8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 2, 16);
      });

      // 42 — chimney/roof top
      at(ctx, 160, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#884422'; g.fillRect(10, 6, 4, 10);
      });

      // 43 — sky with sun
      at(ctx, 176, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ffe066';
        g.beginPath(); g.arc(8, 8, 5, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fff8cc';
        g.beginPath(); g.arc(8, 8, 3, 0, Math.PI * 2); g.fill();
      });

      // 44 — airport sign / departures board
      at(ctx, 192, 32, (g) => {
        g.fillStyle = '#e0e0e0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#222'; g.fillRect(2, 4, 12, 8);
        g.fillStyle = '#0f0'; g.fillRect(3, 5, 3, 2); g.fillRect(7, 5, 4, 2);
        g.fillStyle = '#ff0'; g.fillRect(3, 8, 4, 2); g.fillRect(8, 8, 3, 2);
      });

      // 45 — mountain with trees at base
      at(ctx, 208, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#557755';
        g.beginPath(); g.moveTo(0, 16); g.lineTo(10, 3); g.lineTo(16, 12); g.fill();
        g.fillStyle = '#eef';
        g.beginPath(); g.moveTo(7, 7); g.lineTo(10, 3); g.lineTo(13, 8); g.fill();
        g.fillStyle = '#3a6a3f'; g.fillRect(0, 13, 16, 3);
      });

      // 46 — grass dark (shadow)
      at(ctx, 224, 32, (g) => {
        g.fillStyle = '#3a7a35'; g.fillRect(0, 0, 16, 16);
      });

      // 47 — empty/sky placeholder
      at(ctx, 240, 32, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      });

      /* ─── row 3 (tiles 48-63) ─── */

      // 48 — SkyTrain body
      at(ctx, 0, 48, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ddd'; g.fillRect(0, 4, 16, 8);
        g.fillStyle = '#aaddff'; g.fillRect(2, 5, 4, 4); g.fillRect(10, 5, 4, 4);
        g.fillStyle = '#0077bb'; g.fillRect(0, 10, 16, 2);
        g.fillStyle = '#555'; g.fillRect(2, 12, 3, 3); g.fillRect(11, 12, 3, 3);
      });

      // 49 — SkyTrain front
      at(ctx, 16, 48, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ddd'; g.fillRect(0, 4, 12, 8);
        g.fillStyle = '#aaddff'; g.fillRect(7, 5, 4, 4);
        g.fillStyle = '#ccc'; g.fillRect(12, 5, 4, 7);
        g.fillStyle = '#0077bb'; g.fillRect(0, 10, 16, 2);
        g.fillStyle = '#555'; g.fillRect(2, 12, 3, 3); g.fillRect(10, 12, 3, 3);
      });

      // 50 — SkyTrain back
      at(ctx, 32, 48, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#ddd'; g.fillRect(4, 4, 12, 8);
        g.fillStyle = '#aaddff'; g.fillRect(6, 5, 4, 4);
        g.fillStyle = '#ccc'; g.fillRect(0, 5, 4, 7);
        g.fillStyle = '#0077bb'; g.fillRect(0, 10, 16, 2);
        g.fillStyle = '#555'; g.fillRect(4, 12, 3, 3); g.fillRect(11, 12, 3, 3);
      });

      // 51 — elevated track pillar
      at(ctx, 48, 48, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#999'; g.fillRect(6, 0, 4, 16);
        g.fillStyle = '#aaa'; g.fillRect(3, 0, 10, 2);
      });

      // 52 — elevated track beam
      at(ctx, 64, 48, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aaa'; g.fillRect(0, 0, 16, 2);
        g.fillStyle = '#999'; g.fillRect(0, 2, 16, 1);
      });

      // 53 — grass with path end
      at(ctx, 80, 48, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#bbaa88'; g.fillRect(0, 4, 16, 8);
      });

    });
  },

  /** Character sprites: girl, mom, friend. */
  chars() {
    // 8 tiles: girl walk1, girl walk2, girl sit, mom walk1, mom walk2, mom sit, friend stand, friend wave
    return makeTileset(8, 1, (ctx) => {
      const girlOpts = {
        hairColor: '#f0c040', shirtColor: '#ff7799', skirtColor: '#cc5588',
        hairLength: 10, tall: false,
      };
      const momOpts = {
        hairColor: '#3a2a1a', shirtColor: '#5577bb', skirtColor: '#334477',
        hairLength: 12, tall: true,
      };
      const friendOpts = {
        hairColor: '#f0c040', shirtColor: '#77cc77', skirtColor: '#449944',
        hairLength: 10, tall: false,
      };

      // 0 — girl walk frame 1
      at(ctx, 0, 0, (g) => drawPerson(g, { ...girlOpts, walkFrame: 0 }));
      // 1 — girl walk frame 2
      at(ctx, 16, 0, (g) => drawPerson(g, { ...girlOpts, walkFrame: 1 }));
      // 2 — girl sitting
      at(ctx, 32, 0, (g) => drawSitting(g, girlOpts));
      // 3 — mom walk frame 1
      at(ctx, 48, 0, (g) => drawPerson(g, { ...momOpts, walkFrame: 0 }));
      // 4 — mom walk frame 2
      at(ctx, 64, 0, (g) => drawPerson(g, { ...momOpts, walkFrame: 1 }));
      // 5 — mom sitting
      at(ctx, 80, 0, (g) => drawSitting(g, momOpts));
      // 6 — friend standing
      at(ctx, 96, 0, (g) => drawPerson(g, { ...friendOpts, walkFrame: 0 }));
      // 7 — friend waving
      at(ctx, 112, 0, (g) => {
        drawPerson(g, { ...friendOpts, walkFrame: 0 });
        // raised arm
        g.fillStyle = '#f5c5a3';
        g.fillRect(11, 3, 2, 1); g.fillRect(12, 2, 2, 1);
      });
    });
  },

  /** Car (2 tiles wide). */
  car() {
    return makeTileset(2, 1, (ctx) => {
      // left half
      at(ctx, 0, 0, (g) => {
        g.fillStyle = '#cc4444'; g.fillRect(0, 6, 16, 6);
        g.fillStyle = '#bb3333'; g.fillRect(4, 2, 12, 5);
        g.fillStyle = '#aaddff'; g.fillRect(6, 3, 4, 3); g.fillRect(11, 3, 4, 3);
        g.fillStyle = '#333'; g.fillRect(2, 12, 4, 4);
        g.fillStyle = '#666'; g.fillRect(3, 13, 2, 2);
      });
      // right half
      at(ctx, 16, 0, (g) => {
        g.fillStyle = '#cc4444'; g.fillRect(0, 6, 14, 6);
        g.fillStyle = '#bb3333'; g.fillRect(0, 2, 6, 5);
        g.fillStyle = '#aaddff'; g.fillRect(1, 3, 4, 3);
        g.fillStyle = '#dd5555'; g.fillRect(10, 5, 4, 7);
        g.fillStyle = '#ffee88'; g.fillRect(13, 7, 1, 2);
        g.fillStyle = '#333'; g.fillRect(8, 12, 4, 4);
        g.fillStyle = '#666'; g.fillRect(9, 13, 2, 2);
      });
    });
  },

  /** Plane actor (3 tiles wide: tail, body, nose). */
  plane() {
    return makeTileset(3, 1, (ctx) => {
      // tail
      at(ctx, 0, 0, (g) => {
        g.fillStyle = '#2266cc'; g.fillRect(0, 0, 5, 5); g.fillRect(2, 5, 3, 2);
        g.fillStyle = '#eee'; g.fillRect(4, 5, 12, 7);
        g.fillStyle = '#ddd'; g.fillRect(4, 5, 12, 1);
        g.fillStyle = '#2266cc'; g.fillRect(4, 11, 12, 1);
      });
      // body
      at(ctx, 16, 0, (g) => {
        g.fillStyle = '#eee'; g.fillRect(0, 5, 16, 7);
        g.fillStyle = '#ddd'; g.fillRect(0, 5, 16, 1);
        g.fillStyle = '#2266cc'; g.fillRect(0, 11, 16, 1);
        g.fillStyle = '#aaddff';
        g.fillRect(2, 7, 2, 2); g.fillRect(6, 7, 2, 2);
        g.fillRect(10, 7, 2, 2); g.fillRect(14, 7, 2, 2);
      });
      // nose
      at(ctx, 32, 0, (g) => {
        g.fillStyle = '#eee'; g.fillRect(0, 5, 10, 7);
        g.fillStyle = '#ddd';
        g.fillRect(10, 7, 4, 4); g.fillRect(14, 8, 2, 2);
        g.fillStyle = '#aaddff'; g.fillRect(10, 7, 3, 3);
        g.fillStyle = '#2266cc'; g.fillRect(0, 11, 10, 1);
      });
    });
  },

  /** SkyTrain actor (3 tiles wide). */
  skytrain() {
    return makeTileset(3, 1, (ctx) => {
      // back
      at(ctx, 0, 0, (g) => {
        g.fillStyle = '#ddd'; g.fillRect(4, 2, 12, 8);
        g.fillStyle = '#aaddff'; g.fillRect(6, 3, 4, 4);
        g.fillStyle = '#ccc'; g.fillRect(0, 3, 4, 7);
        g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
        g.fillStyle = '#555'; g.fillRect(5, 10, 3, 3); g.fillRect(12, 10, 3, 3);
      });
      // body
      at(ctx, 16, 0, (g) => {
        g.fillStyle = '#ddd'; g.fillRect(0, 2, 16, 8);
        g.fillStyle = '#aaddff'; g.fillRect(2, 3, 4, 4); g.fillRect(10, 3, 4, 4);
        g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
        g.fillStyle = '#555'; g.fillRect(2, 10, 3, 3); g.fillRect(11, 10, 3, 3);
      });
      // front
      at(ctx, 32, 0, (g) => {
        g.fillStyle = '#ddd'; g.fillRect(0, 2, 12, 8);
        g.fillStyle = '#aaddff'; g.fillRect(7, 3, 4, 4);
        g.fillStyle = '#ccc'; g.fillRect(12, 3, 4, 7);
        g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
        g.fillStyle = '#555'; g.fillRect(2, 10, 3, 3); g.fillRect(10, 10, 3, 3);
      });
    });
  },
};

/* ── scene maps (20×15 grids) ────────────────────────────────────────── */

//  0=sky 1=cloud 2=road(dash) 3=grass 4=bldg 5=bldgTop 6=tallBldg 7=tower
//  8=roadPlain 9=sidewalk 14=mtn 20=cloud2 43=sun

const calgaryDriveMap = [
  [43, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,20, 0, 0, 0, 0, 1, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 5, 0, 0, 6, 0, 7, 0, 6, 0, 5, 0, 0, 6, 0, 0, 5, 0, 0],
  [ 0, 0, 4, 0, 0, 6, 0, 7, 0, 6, 0, 4, 0, 0, 6, 0, 0, 4, 0, 0],
  [ 0, 0, 4, 0, 0, 6, 0, 7, 0, 6, 0, 4, 0, 0, 6, 0, 0, 4, 0, 0],
  [ 0, 0, 4, 0, 0, 6, 0, 7, 0, 6, 0, 4, 0, 0, 6, 0, 0, 4, 0, 0],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [ 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

// 10=airportFloor 11=airportWinWall 12=airportWallSolid 13=tableFood 44=sign
const airportFoodMap = [
  [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
  [11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12],
  [11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12],
  [12,12,12,44,12,12,12,12,12,12,12,12,12,12,12,44,12,12,12,12],
  [12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,13,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
];

// 37=gateFloor 38=jetwayTop 39=jetwayBottom 22=planeBody 23=planeNose 24=planeTail
const boardingMap = [
  [12,12,12,12,12,12,12,12,12,12,12,12,12,12, 0, 0, 0, 0, 0, 0],
  [11,12,11,12,11,12,11,12,11,12,11,12,11, 0, 0, 0, 0, 0, 0, 0],
  [11,12,11,12,11,12,11,12,11,12,11,12, 0, 0, 0, 0, 0, 0, 0, 0],
  [12,12,12,12,12,12,12,12,12,12,12,12, 0, 0, 0, 0, 0, 0, 0, 0],
  [12,12,12,38,38,38,38,38,38,38,38,38,38, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,37,37,37,37,37,37,37,37,37,37,24,22,22,22,22,23, 0],
  [10,10,10,37,37,37,37,37,37,37,37,37,37,24,22,22,22,22,23, 0],
  [10,10,10,37,37,37,37,37,37,37,37,37,37, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,39,39,39,39,39,39,39,39,39,39, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,10,10,10,10,10,10,10,10,10, 0, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,10,10,10,10,10,10,10,10,10, 0, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,10,10,10,10,10,10,10,10,10,10, 0, 0, 0, 0, 0, 0, 0],
  [10,10,10,10,10,10,10,10,10,10,10,10,10,10, 0, 0, 0, 0, 0, 0],
  [10,10,10,10,10,10,10,10,10,10,10,10,10, 3, 3, 3, 3, 3, 3, 3],
  [10,10,10,10,10,10,10,10,10,10,10,10, 3, 3, 3, 3, 3, 3, 3, 3],
];

// 25=ceiling 26=window 27=intWall 28=seat 29=floor
const planeInteriorMap = [
  [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25],
  [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25],
  [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25],
  [27,26,27,27,26,27,27,26,27,27,26,27,27,26,27,27,26,27,27,26],
  [27,26,27,27,26,27,27,26,27,27,26,27,27,26,27,27,26,27,27,26],
  [27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27],
  [27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27],
  [27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27],
  [27,28,27,27,28,27,27,28,27,27,28,27,27,28,27,27,28,27,27,28],
  [27,28,27,27,28,27,27,28,27,27,28,27,27,28,27,27,28,27,27,28],
  [29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
  [29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
  [29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
  [29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
  [29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29],
];

// 14=mtn 33=mtn2 34=mtnFar 15=water 32=vanSkyline 36=lightSky
const landingMap = [
  [ 0, 0, 0, 1, 0, 0, 0, 0,20, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36],
  [34,34,14,33,34,14,33,34,34,14,33,34,14,33,34,34,14,33,34,14],
  [14,33,14,14,33,14,14,33,14,14,14,33,14,14,33,14,14,14,33,14],
  [32,32,15,15,15,15,32,15,15,15,15,15,15,15,32,32,15,15,15,15],
  [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
  [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
  [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
  [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [21,21, 8, 8, 8,21,21, 8, 8, 8, 8,21,21, 8, 8, 8, 8,21,21, 8],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

// 48=trainBody 49=trainFront 50=trainBack 51=pillar 52=beam
// 14=mtn 33=mtn2 32=vanSkyline 45=mtnTrees
const trainMap = [
  [ 0, 0, 0, 0, 1, 0, 0, 0,20, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [34,34,14,33,34,45,33,34,34,14,33,34,14,33,45,34,14,33,34,14],
  [14,33,14,14,33,14,14,33,14,14,14,33,14,14,33,14,14,14,33,14],
  [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,32],
  [52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [51, 0, 0, 0, 0,51, 0, 0, 0, 0,51, 0, 0, 0, 0,51, 0, 0, 0,51],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

// 16=houseWall 17=houseRoof 18=houseDoor 19=tree 31=path 40=flowerGrass 35=fence
const arrivalMap = [
  [ 0, 0, 0, 0, 1, 0, 0, 0, 0,43, 0, 0, 0,20, 0, 0, 0, 0, 1, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 3, 3, 3,19, 3, 3, 3, 3,17,17,17, 3, 3, 3, 3, 3, 3,19, 3, 3],
  [ 3, 3, 3,19, 3, 3, 3,16,16,18,16,16, 3, 3, 3, 3, 3,19, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3,16,16,18,16,16, 3, 3, 3, 3, 3, 3, 3, 3],
  [35,35,35,35,35, 3, 3, 3, 3,31, 3, 3, 3, 3,35,35,35,35,35,35],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3,31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [40, 3, 3, 3, 3, 3, 3, 3, 3,31, 3, 3, 3, 3, 3, 3,40, 3, 3, 3],
  [ 3, 3, 3, 3,40, 3, 3, 3, 3,31, 3, 3, 3,40, 3, 3, 3, 3, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3,31,31,31,31,31, 3, 3, 3, 3, 3, 3, 3, 3],
  [31,31,31,31,31,31,31,31, 3, 3, 3,31,31,31,31,31,31,31,31,31],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

/* ── Story script ─────────────────────────────────────────────────────── */

export async function run(ctx) {
  const { renderer, sound } = ctx;

  /* ── helpers ── */
  const girlWalk = new Animation('walk', [
    { tiles: [0], duration: 250 },
    { tiles: [1], duration: 250 },
  ]);
  const momWalk = new Animation('walk', [
    { tiles: [3], duration: 250 },
    { tiles: [4], duration: 250 },
  ]);
  const girlSit = new Animation('sit', [{ tiles: [2], duration: 1000 }], false);
  const momSit = new Animation('sit', [{ tiles: [5], duration: 1000 }], false);
  const friendStand = new Animation('stand', [{ tiles: [6], duration: 500 }]);
  const friendWave = new Animation('wave', [
    { tiles: [6], duration: 400 },
    { tiles: [7], duration: 400 },
  ]);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 1 — Driving through Calgary to the airport
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', calgaryDriveMap));

  const car = ctx.addActor({
    name: 'car', tileset: 'car', x: -40, y: 148, cols: 2,
    animations: { drive: new Animation('drive', [{ tiles: [0, 1], duration: 500 }]) },
  });
  car.play('drive');

  await ctx.fadeIn(800);

  // gentle driving melody
  sound.playMelody([
    [392, 300], [440, 300], [494, 300], [523, 600],
    [494, 300], [440, 300], [392, 600],
  ]);

  await ctx.wait(600);
  await car.moveTo(340, 148, 4000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('car');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 2 — Eating at the airport
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', airportFoodMap));

  const girlEat = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 96, y: 96, cols: 1,
    animations: { sit: girlSit, walk: girlWalk },
  });
  girlEat.play('sit');

  const momEat = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 128, y: 94, cols: 1,
    animations: { sit: momSit, walk: momWalk },
  });
  momEat.play('sit');

  await ctx.fadeIn(800);

  // calm airport music
  sound.playMelody([
    [330, 400], [392, 400], [494, 400], [440, 800],
    [0, 200],
    [330, 400], [392, 400], [523, 800],
  ]);

  await ctx.wait(4000);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 3 — Boarding the plane
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', boardingMap));

  const girlBoard = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 20, y: 72, cols: 1,
    animations: { walk: girlWalk },
  });
  girlBoard.play('walk');

  const momBoard = ctx.addActor({
    name: 'mom', tileset: 'chars', x: -10, y: 70, cols: 1,
    animations: { walk: momWalk },
  });
  momBoard.play('walk');

  await ctx.fadeIn(800);
  await ctx.wait(400);

  // walk toward jetway
  girlBoard.moveTo(180, 72, 3500);
  await momBoard.moveTo(150, 70, 3500);

  await ctx.wait(300);
  // walk further into jetway (disappearing into plane)
  girlBoard.moveTo(300, 72, 2000);
  await momBoard.moveTo(270, 70, 2000);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 4 — In-flight: girl by window, clouds outside
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', planeInteriorMap));

  // girl sits by window (left side = window seat)
  const girlFly = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 16, y: 112, cols: 1,
    animations: { sit: girlSit },
  });
  girlFly.play('sit');

  // mom in the next seat
  const momFly = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 48, y: 110, cols: 1,
    animations: { sit: momSit },
  });
  momFly.play('sit');

  await ctx.fadeIn(800);

  // in-flight music — gentle and dreamy
  sound.playMelody([
    [523, 500], [587, 500], [659, 500], [784, 1000],
    [0, 300],
    [659, 500], [587, 500], [523, 1000],
    [0, 300],
    [392, 500], [440, 500], [523, 1000],
  ]);

  await ctx.wait(6000);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 5 — Landing in Vancouver
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', landingMap));

  const planeActor = ctx.addActor({
    name: 'plane', tileset: 'plane', x: -50, y: 20, cols: 3,
    animations: {
      fly: new Animation('fly', [{ tiles: [0, 1, 2], duration: 500 }]),
    },
  });
  planeActor.play('fly');

  await ctx.fadeIn(800);

  // descending melody
  sound.playMelody([
    [784, 400], [659, 400], [587, 400], [523, 400],
    [440, 400], [392, 600],
  ]);

  // plane descends across screen
  await planeActor.moveTo(280, 150, 5000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('plane');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 6 — Taking the SkyTrain
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', trainMap));

  const train = ctx.addActor({
    name: 'train', tileset: 'skytrain', x: -60, y: 72, cols: 3,
    animations: {
      ride: new Animation('ride', [{ tiles: [0, 1, 2], duration: 500 }]),
    },
  });
  train.play('ride');

  await ctx.fadeIn(800);

  // rhythmic train melody
  sound.playMelody([
    [330, 200], [330, 200], [392, 200], [392, 200],
    [440, 200], [440, 200], [494, 200], [494, 200],
    [523, 400], [494, 200], [440, 200], [392, 400],
  ]);

  await train.moveTo(340, 72, 4500);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('train');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 7 — Arriving at the friend's house
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', arrivalMap));

  // friend waiting at door
  const friend = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 140, y: 96, cols: 1,
    animations: { stand: friendStand, wave: friendWave },
  });
  friend.play('stand');

  // girl and mom walking up the path
  const girlArrive = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 100, y: 200, cols: 1,
    animations: { walk: girlWalk },
  });
  girlArrive.play('walk');

  const momArrive = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 120, y: 200, cols: 1,
    animations: { walk: momWalk },
  });
  momArrive.play('walk');

  await ctx.fadeIn(800);

  // arrival melody — warm and happy
  sound.playMelody([
    [392, 300], [440, 300], [494, 300], [523, 300],
    [587, 300], [659, 600],
    [0, 200],
    [523, 300], [587, 300], [659, 300], [784, 900],
  ]);

  // walk up path toward house
  girlArrive.moveTo(130, 108, 3500);
  await momArrive.moveTo(150, 106, 3500);

  // friend waves
  friend.play('wave');

  // girl walks up to friend
  await girlArrive.moveTo(130, 100, 800);

  await ctx.wait(2000);

  // final happy jingle
  await sound.playMelody([
    [523, 200], [587, 200], [659, 200], [784, 400],
    [659, 200], [784, 400], [1047, 800],
  ]);

  await ctx.wait(1500);
  await ctx.fadeOut(1500);
}
