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

/* ── draw a person with umbrella (16×16) ─────────────────────────────── */

function drawUmbrellaPerson(g, opts) {
  const {
    umbrellaColor = '#cc3333', hairColor, skinColor = '#f5c5a3',
    shirtColor, skirtColor, hairLength = 6, tall = false, walkFrame = 0,
  } = opts;

  // Umbrella canopy
  g.fillStyle = umbrellaColor;
  g.fillRect(2, 0, 12, 1);
  g.fillRect(1, 1, 14, 1);
  g.fillRect(3, 2, 10, 1);

  // Handle
  g.fillStyle = '#664';
  g.fillRect(8, 3, 1, 3);

  // Compact person below umbrella
  const headY = 5;
  const bodyY = headY + 3;

  // Hair behind
  g.fillStyle = hairColor;
  g.fillRect(6, headY, 5, Math.min(hairLength, 9));

  // Head
  g.fillStyle = skinColor;
  g.fillRect(7, headY, 3, 3);

  // Hair on top and sides
  g.fillStyle = hairColor;
  g.fillRect(6, headY, 5, 1);
  g.fillRect(6, headY, 1, 3);
  g.fillRect(10, headY, 1, 3);

  // Eyes
  px(g, 8, headY + 1, '#333');

  // Shirt
  g.fillStyle = shirtColor;
  g.fillRect(6, bodyY, 5, 2);

  // Skirt
  g.fillStyle = skirtColor;
  g.fillRect(6, bodyY + 2, 5, 2);

  // Legs
  g.fillStyle = '#444';
  const legY = bodyY + 4;
  if (walkFrame === 1) {
    g.fillRect(6, legY, 2, 2); g.fillRect(9, legY, 2, 1);
  } else {
    g.fillRect(7, legY, 2, 1); g.fillRect(9, legY, 2, 1);
  }

  // Shoes
  g.fillStyle = '#333';
  if (walkFrame === 1) {
    px(g, 6, legY + 1, g.fillStyle); px(g, 9, legY + 1, g.fillStyle);
  } else {
    px(g, 7, legY + 1, g.fillStyle); px(g, 9, legY + 1, g.fillStyle);
  }
}

/* ── tilesets ────────────────────────────────────────────────────────── */

export const tilesets = {

  /** Environment tiles (16 columns wide). */
  env() {
    return makeTileset(16, 8, (ctx) => {

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

      // 54 — dark rain sky
      at(ctx, 96, 48, (g) => {
        g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
      });

      // 55 — dark rain cloud
      at(ctx, 112, 48, (g) => {
        g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#445566';
        g.fillRect(2, 7, 12, 5); g.fillRect(4, 5, 8, 8);
      });

      // 56 — dark building body (rainy)
      at(ctx, 128, 48, (g) => {
        g.fillStyle = '#667788'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aacc88';
        g.fillRect(2, 2, 4, 4); g.fillRect(10, 2, 4, 4);
        g.fillRect(2, 9, 4, 4); g.fillRect(10, 9, 4, 4);
      });

      // 57 — dark building top (rainy)
      at(ctx, 144, 48, (g) => {
        g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 5);
        g.fillStyle = '#667788'; g.fillRect(0, 5, 16, 11);
        g.fillStyle = '#778899'; g.fillRect(3, 0, 10, 16);
        g.fillStyle = '#aacc88';
        g.fillRect(5, 2, 3, 3); g.fillRect(9, 2, 3, 3);
        g.fillRect(5, 8, 3, 3); g.fillRect(9, 8, 3, 3);
      });

      // 58 — wet road
      at(ctx, 160, 48, (g) => {
        g.fillStyle = '#3a3a44'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#556'; g.fillRect(2, 6, 4, 1); g.fillRect(10, 10, 5, 1);
      });

      // 59 — wet sidewalk
      at(ctx, 176, 48, (g) => {
        g.fillStyle = '#888890'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#7777aa'; g.fillRect(3, 5, 5, 3); g.fillRect(10, 10, 4, 2);
      });

      // 60 — lamp post
      at(ctx, 192, 48, (g) => {
        g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#444'; g.fillRect(7, 4, 2, 12);
        g.fillStyle = '#ffe'; g.fillRect(5, 2, 6, 3);
        g.fillStyle = '#ffa'; g.fillRect(6, 3, 4, 1);
      });

      // 61 — dark tall building (rainy)
      at(ctx, 208, 48, (g) => {
        g.fillStyle = '#5a6a7a'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#aacc88';
        for (let r = 1; r < 15; r += 4) {
          g.fillRect(2, r, 3, 2); g.fillRect(7, r, 3, 2); g.fillRect(12, r, 3, 2);
        }
      });

      // 62 — puddle on sidewalk
      at(ctx, 224, 48, (g) => {
        g.fillStyle = '#888890'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#6688aa';
        g.beginPath(); g.ellipse(8, 10, 6, 3, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#7799bb';
        g.beginPath(); g.ellipse(7, 9, 3, 1.5, 0, 0, Math.PI * 2); g.fill();
      });

      // 63 — dark grass (rainy)
      at(ctx, 240, 48, (g) => {
        g.fillStyle = '#3a6a35'; g.fillRect(0, 0, 16, 16);
      });

      /* ─── row 4 (tiles 64-79) ─── */

      // 64 — fairy tree with tiny door
      at(ctx, 0, 64, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#5a3a1a'; g.fillRect(5, 4, 6, 12);
        g.fillStyle = '#2a6a2f'; g.fillRect(0, 0, 16, 7); g.fillRect(2, 7, 12, 3);
        g.fillStyle = '#3a8a3f'; g.fillRect(3, 1, 6, 4);
        // tiny fairy door
        g.fillStyle = '#cc66cc'; g.fillRect(7, 10, 3, 4);
        g.fillStyle = '#ff88ff'; px(g, 9, 12, g.fillStyle);
        // tiny windows
        g.fillStyle = '#ffee55'; px(g, 6, 8, g.fillStyle); px(g, 10, 8, g.fillStyle);
      });

      // 65 — fairy tree with lights
      at(ctx, 16, 64, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#5a3a1a'; g.fillRect(6, 5, 5, 11);
        g.fillStyle = '#2a6a2f'; g.fillRect(1, 0, 14, 8); g.fillRect(3, 8, 10, 3);
        g.fillStyle = '#3a8a3f'; g.fillRect(4, 1, 8, 5);
        // fairy lights
        px(g, 3, 2, '#ff0'); px(g, 7, 1, '#f0f'); px(g, 11, 3, '#0ff');
        px(g, 5, 5, '#ff0'); px(g, 9, 4, '#f0f'); px(g, 2, 6, '#0ff');
        px(g, 13, 6, '#ff0'); px(g, 6, 7, '#f0f');
      });

      // 66 — fairy mushroom patch
      at(ctx, 32, 64, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        // mushroom 1
        g.fillStyle = '#eee'; g.fillRect(3, 10, 2, 3);
        g.fillStyle = '#e33'; g.fillRect(2, 8, 4, 3);
        px(g, 3, 8, '#fff'); px(g, 4, 9, '#fff');
        // mushroom 2
        g.fillStyle = '#eee'; g.fillRect(10, 11, 2, 2);
        g.fillStyle = '#e33'; g.fillRect(9, 9, 4, 3);
        px(g, 10, 9, '#fff');
        // tiny flowers
        px(g, 7, 13, '#ff0'); px(g, 14, 12, '#f6f');
      });

      // 67 — park path
      at(ctx, 48, 64, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#c8b088'; g.fillRect(0, 5, 16, 6);
        g.fillStyle = '#b8a078'; g.fillRect(0, 6, 16, 4);
      });

      // 68 — living room wall
      at(ctx, 64, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#c8b898'; g.fillRect(0, 14, 16, 2);
      });

      // 69 — wood floor
      at(ctx, 80, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#a07838'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 8, 16, 1);
        g.fillStyle = '#c09858'; g.fillRect(4, 4, 8, 1);
      });

      // 70 — couch left
      at(ctx, 96, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#885533'; g.fillRect(0, 4, 16, 10);
        g.fillStyle = '#774422'; g.fillRect(0, 4, 4, 12);
        g.fillStyle = '#996644'; g.fillRect(4, 6, 12, 6);
        g.fillStyle = '#aa7755'; g.fillRect(5, 7, 10, 4);
      });

      // 71 — couch right
      at(ctx, 112, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#885533'; g.fillRect(0, 4, 16, 10);
        g.fillStyle = '#774422'; g.fillRect(12, 4, 4, 12);
        g.fillStyle = '#996644'; g.fillRect(0, 6, 12, 6);
        g.fillStyle = '#aa7755'; g.fillRect(1, 7, 10, 4);
      });

      // 72 — TV on stand
      at(ctx, 128, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#222'; g.fillRect(1, 2, 14, 9);
        g.fillStyle = '#4488cc'; g.fillRect(2, 3, 12, 7);
        // TV content
        g.fillStyle = '#66aaee'; g.fillRect(4, 4, 4, 3);
        g.fillStyle = '#ee8844'; g.fillRect(9, 5, 3, 2);
        // stand
        g.fillStyle = '#555'; g.fillRect(5, 11, 6, 1);
        g.fillStyle = '#666'; g.fillRect(3, 12, 10, 2);
      });

      // 73 — window showing rain
      at(ctx, 144, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#556677'; g.fillRect(2, 2, 12, 10);
        g.fillStyle = '#667788'; g.fillRect(3, 3, 10, 8);
        // rain streaks through window
        g.fillStyle = '#8899aa';
        g.fillRect(5, 3, 1, 3); g.fillRect(8, 5, 1, 3); g.fillRect(11, 4, 1, 3);
        // curtains
        g.fillStyle = '#cc8866'; g.fillRect(2, 2, 2, 10); g.fillRect(12, 2, 2, 10);
      });

      // 74 — coffee table
      at(ctx, 160, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#8B7014'; g.fillRect(2, 6, 12, 2);
        g.fillRect(4, 8, 2, 5); g.fillRect(10, 8, 2, 5);
      });

      // 75 — art/drawing table
      at(ctx, 176, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#c8a868'; g.fillRect(0, 5, 16, 2);
        g.fillRect(2, 7, 2, 9); g.fillRect(12, 7, 2, 9);
        // paper
        g.fillStyle = '#fff'; g.fillRect(3, 3, 5, 3);
        g.fillStyle = '#eee'; g.fillRect(9, 3, 5, 3);
        // crayons
        g.fillStyle = '#e33'; g.fillRect(3, 2, 1, 2);
        g.fillStyle = '#33e'; g.fillRect(5, 2, 1, 2);
        g.fillStyle = '#3c3'; g.fillRect(10, 2, 1, 2);
        g.fillStyle = '#fc0'; g.fillRect(12, 2, 1, 2);
      });

      // 76 — rug/carpet
      at(ctx, 192, 64, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#cc6644'; g.fillRect(0, 2, 16, 12);
        g.fillStyle = '#dd7755'; g.fillRect(1, 3, 14, 10);
        g.fillStyle = '#cc6644'; g.fillRect(3, 5, 10, 6);
      });

      // 77 — picture frame on wall
      at(ctx, 208, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#664'; g.fillRect(3, 3, 10, 8);
        g.fillStyle = '#aaddff'; g.fillRect(4, 4, 8, 6);
        g.fillStyle = '#4a8c3f'; g.fillRect(4, 7, 8, 3);
      });

      // 78 — bookshelf
      at(ctx, 224, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#8B6914'; g.fillRect(1, 2, 14, 12);
        g.fillStyle = '#7a5a0a'; g.fillRect(1, 6, 14, 1); g.fillRect(1, 10, 14, 1);
        // books
        g.fillStyle = '#c33'; g.fillRect(2, 3, 2, 3);
        g.fillStyle = '#33c'; g.fillRect(4, 3, 2, 3);
        g.fillStyle = '#3a3'; g.fillRect(7, 3, 3, 3);
        g.fillStyle = '#cc3'; g.fillRect(2, 7, 3, 3);
        g.fillStyle = '#c3c'; g.fillRect(6, 7, 2, 3);
        g.fillStyle = '#3cc'; g.fillRect(9, 7, 3, 3);
      });

      // 79 — lamp
      at(ctx, 240, 64, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#666'; g.fillRect(7, 6, 2, 10);
        g.fillStyle = '#cc8844'; g.fillRect(4, 2, 8, 5);
        g.fillStyle = '#ffdd88'; g.fillRect(5, 3, 6, 3);
      });

      /* ─── row 5 (tiles 80-95) ─── */

      // 80 — party wall
      at(ctx, 0, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#d0c0b0'; g.fillRect(0, 14, 16, 2);
      });

      // 81 — party floor
      at(ctx, 16, 80, (g) => {
        g.fillStyle = '#c09858'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 8, 8); g.fillRect(8, 8, 8, 8);
      });

      // 82 — balloon red on wall
      at(ctx, 32, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#e33';
        g.beginPath(); g.ellipse(8, 6, 4, 5, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#f55';
        g.beginPath(); g.ellipse(7, 5, 2, 2, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#999'; g.fillRect(8, 11, 1, 5);
      });

      // 83 — balloon blue on wall
      at(ctx, 48, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#33c';
        g.beginPath(); g.ellipse(8, 6, 4, 5, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#55e';
        g.beginPath(); g.ellipse(7, 5, 2, 2, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#999'; g.fillRect(8, 11, 1, 5);
      });

      // 84 — bunting/banner
      at(ctx, 64, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#999'; g.fillRect(0, 3, 16, 1);
        // triangle flags
        g.fillStyle = '#e33';
        g.beginPath(); g.moveTo(1, 4); g.lineTo(4, 4); g.lineTo(2.5, 8); g.fill();
        g.fillStyle = '#33e';
        g.beginPath(); g.moveTo(5, 4); g.lineTo(8, 4); g.lineTo(6.5, 8); g.fill();
        g.fillStyle = '#fc0';
        g.beginPath(); g.moveTo(9, 4); g.lineTo(12, 4); g.lineTo(10.5, 8); g.fill();
        g.fillStyle = '#3c3';
        g.beginPath(); g.moveTo(13, 4); g.lineTo(16, 4); g.lineTo(14.5, 8); g.fill();
      });

      // 85 — cake table
      at(ctx, 80, 80, (g) => {
        g.fillStyle = '#c09858'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#8B7014'; g.fillRect(1, 6, 14, 2);
        g.fillRect(3, 8, 2, 8); g.fillRect(11, 8, 2, 8);
        // cake
        g.fillStyle = '#f8e0c8'; g.fillRect(4, 2, 8, 4);
        g.fillStyle = '#ff88aa'; g.fillRect(4, 2, 8, 1);
        g.fillStyle = '#e8d0b8'; g.fillRect(4, 3, 8, 1);
        // candles
        g.fillStyle = '#ff0'; px(g, 6, 1, g.fillStyle); px(g, 8, 1, g.fillStyle); px(g, 10, 1, g.fillStyle);
        g.fillStyle = '#f80'; px(g, 6, 0, g.fillStyle); px(g, 8, 0, g.fillStyle); px(g, 10, 0, g.fillStyle);
      });

      // 86 — gift/present
      at(ctx, 96, 80, (g) => {
        g.fillStyle = '#c09858'; g.fillRect(0, 0, 16, 16);
        // gift box
        g.fillStyle = '#cc44cc'; g.fillRect(4, 7, 8, 6);
        g.fillStyle = '#ffcc00'; g.fillRect(7, 7, 2, 6); g.fillRect(4, 9, 8, 2);
        // bow
        g.fillStyle = '#ffcc00'; g.fillRect(6, 5, 4, 2);
      });

      // 87 — party wall with confetti
      at(ctx, 112, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        px(g, 2, 3, '#e33'); px(g, 5, 7, '#33e'); px(g, 9, 2, '#fc0');
        px(g, 12, 8, '#3c3'); px(g, 3, 11, '#f6f'); px(g, 14, 5, '#e33');
        px(g, 7, 13, '#33e'); px(g, 1, 6, '#fc0'); px(g, 11, 1, '#3c3');
      });

      // 88 — ceiling light
      at(ctx, 128, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#888'; g.fillRect(7, 0, 2, 4);
        g.fillStyle = '#ffee88'; g.fillRect(5, 4, 6, 3);
        g.fillStyle = '#fff8cc'; g.fillRect(6, 5, 4, 1);
      });

      // 89 — photo on wall (generic)
      at(ctx, 144, 80, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#554'; g.fillRect(4, 4, 8, 6);
        g.fillStyle = '#ddd'; g.fillRect(5, 5, 6, 4);
        g.fillStyle = '#f5c5a3'; g.fillRect(7, 5, 2, 2);
        g.fillStyle = '#f0c040'; g.fillRect(7, 5, 2, 1);
      });

      // 90 — dark grass with fairy light
      at(ctx, 160, 80, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        px(g, 3, 3, '#ff0'); px(g, 8, 7, '#f0f'); px(g, 13, 4, '#0ff');
      });

      // 91 — park tree big (upper canopy)
      at(ctx, 176, 80, (g) => {
        g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#2a6a2f'; g.fillRect(0, 4, 16, 12);
        g.fillStyle = '#3a8a3f'; g.fillRect(2, 6, 12, 8);
        g.fillStyle = '#2a6a2f'; g.fillRect(4, 2, 8, 14);
      });

      // 92 — park tree trunk
      at(ctx, 192, 80, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#5a3a1a'; g.fillRect(5, 0, 6, 16);
        g.fillStyle = '#6a4a2a'; g.fillRect(6, 0, 4, 16);
      });

      // 93 — small fence for fairy garden
      at(ctx, 208, 80, (g) => {
        g.fillStyle = '#4a8c3f'; g.fillRect(0, 0, 16, 16);
        g.fillStyle = '#eeddcc';
        g.fillRect(0, 8, 16, 1); g.fillRect(0, 12, 16, 1);
        g.fillRect(2, 6, 1, 8); g.fillRect(7, 6, 1, 8);
        g.fillRect(12, 6, 1, 8);
        // tiny flowers
        px(g, 4, 14, '#f6f'); px(g, 9, 13, '#ff6'); px(g, 14, 14, '#f66');
      });

      // 94 — drawing wall with child art
      at(ctx, 224, 80, (g) => {
        g.fillStyle = '#d8c8a8'; g.fillRect(0, 0, 16, 16);
        // child's drawing pinned to wall
        g.fillStyle = '#fff'; g.fillRect(3, 3, 10, 8);
        // crude sun
        g.fillStyle = '#fc0'; g.fillRect(4, 4, 2, 2);
        // crude house
        g.fillStyle = '#e33'; g.fillRect(8, 7, 4, 3);
        g.fillStyle = '#33e';
        g.beginPath(); g.moveTo(7, 7); g.lineTo(10, 4); g.lineTo(13, 7); g.fill();
      });

      // 95 — drawing floor with papers
      at(ctx, 240, 80, (g) => {
        g.fillStyle = '#b08848'; g.fillRect(0, 0, 16, 16);
        // scattered papers
        g.fillStyle = '#fff'; g.fillRect(1, 2, 5, 4); g.fillRect(9, 8, 5, 4);
        // crayon marks
        g.fillStyle = '#e33'; g.fillRect(2, 3, 3, 1);
        g.fillStyle = '#33e'; g.fillRect(10, 9, 3, 1);
      });

      /* ─── row 6 (tiles 96-111) ─── */

      // 96 — party wall with streamer
      at(ctx, 0, 96, (g) => {
        g.fillStyle = '#e0d0c0'; g.fillRect(0, 0, 16, 16);
        // curved streamer
        g.fillStyle = '#ff6699';
        g.fillRect(0, 4, 4, 1); g.fillRect(3, 5, 4, 1);
        g.fillRect(6, 6, 4, 1); g.fillRect(9, 5, 4, 1); g.fillRect(12, 4, 4, 1);
      });

      // 97 — living room ceiling
      at(ctx, 16, 96, (g) => {
        g.fillStyle = '#e8dcc8'; g.fillRect(0, 0, 16, 16);
      });

    });
  },

  /** Character sprites: girl, mom, friend, umbrella variants, camera, elderly, guests. */
  chars() {
    return makeTileset(16, 3, (ctx) => {
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

      /* ─── row 0 (tiles 0-15) ─── */
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
        g.fillStyle = '#f5c5a3';
        g.fillRect(11, 3, 2, 1); g.fillRect(12, 2, 2, 1);
      });
      // 8 — girl with umbrella walk1
      at(ctx, 128, 0, (g) => drawUmbrellaPerson(g, { ...girlOpts, umbrellaColor: '#ee5599', walkFrame: 0 }));
      // 9 — girl with umbrella walk2
      at(ctx, 144, 0, (g) => drawUmbrellaPerson(g, { ...girlOpts, umbrellaColor: '#ee5599', walkFrame: 1 }));
      // 10 — mom with umbrella walk1
      at(ctx, 160, 0, (g) => drawUmbrellaPerson(g, { ...momOpts, umbrellaColor: '#3366aa', walkFrame: 0 }));
      // 11 — mom with umbrella walk2
      at(ctx, 176, 0, (g) => drawUmbrellaPerson(g, { ...momOpts, umbrellaColor: '#3366aa', walkFrame: 1 }));
      // 12 — friend with umbrella walk1
      at(ctx, 192, 0, (g) => drawUmbrellaPerson(g, { ...friendOpts, umbrellaColor: '#44bb44', walkFrame: 0 }));
      // 13 — friend with umbrella walk2
      at(ctx, 208, 0, (g) => drawUmbrellaPerson(g, { ...friendOpts, umbrellaColor: '#44bb44', walkFrame: 1 }));
      // 14 — girl with camera
      at(ctx, 224, 0, (g) => {
        drawPerson(g, { ...girlOpts, walkFrame: 0 });
        g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
        g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
      });
      // 15 — girl camera flash
      at(ctx, 240, 0, (g) => {
        drawPerson(g, { ...girlOpts, walkFrame: 0 });
        g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
        g.fillStyle = '#fff'; g.fillRect(13, 3, 2, 1); g.fillRect(14, 2, 1, 3);
        g.fillStyle = '#ffa'; px(g, 13, 2, g.fillStyle); px(g, 15, 4, g.fillStyle);
      });

      /* ─── row 1 (tiles 16-31): elderly + guests ─── */
      // 16 — grandpa (gray hair, short, button shirt)
      at(ctx, 0, 16, (g) => drawPerson(g, {
        hairColor: '#999', shirtColor: '#886644', skirtColor: '#555',
        hairLength: 4, tall: true, walkFrame: 0,
      }));
      // 17 — grandma (gray hair, dress)
      at(ctx, 16, 16, (g) => drawPerson(g, {
        hairColor: '#aaa', shirtColor: '#cc7788', skirtColor: '#aa5566',
        hairLength: 8, tall: true, walkFrame: 0,
      }));
      // 18 — great-grandpa (white hair, cane)
      at(ctx, 32, 16, (g) => {
        drawPerson(g, {
          hairColor: '#ddd', shirtColor: '#667', skirtColor: '#445',
          hairLength: 3, tall: true, walkFrame: 0,
        });
        // cane
        g.fillStyle = '#664'; g.fillRect(12, 6, 1, 10); g.fillRect(12, 5, 2, 1);
        // glasses
        g.fillStyle = '#888'; px(g, 6, 2, g.fillStyle); px(g, 10, 2, g.fillStyle);
      });
      // 19 — great-grandma (white hair, shawl)
      at(ctx, 48, 16, (g) => {
        drawPerson(g, {
          hairColor: '#ddd', shirtColor: '#8877aa', skirtColor: '#665588',
          hairLength: 8, tall: true, walkFrame: 0,
        });
        // shawl/wrap
        g.fillStyle = '#9988bb'; g.fillRect(4, 5, 8, 2);
        // glasses
        g.fillStyle = '#888'; px(g, 7, 2, g.fillStyle); px(g, 9, 2, g.fillStyle);
      });
      // 20 — young male guest (dark hair)
      at(ctx, 64, 16, (g) => drawPerson(g, {
        hairColor: '#443322', shirtColor: '#4488aa', skirtColor: '#336688',
        hairLength: 3, tall: true, walkFrame: 0,
      }));
      // 21 — young female guest (brown hair)
      at(ctx, 80, 16, (g) => drawPerson(g, {
        hairColor: '#8a5a2a', shirtColor: '#dd6688', skirtColor: '#bb4466',
        hairLength: 9, tall: true, walkFrame: 0,
      }));
      // 22 — older male guest (gray-brown hair)
      at(ctx, 96, 16, (g) => drawPerson(g, {
        hairColor: '#776655', shirtColor: '#558844', skirtColor: '#446633',
        hairLength: 4, tall: true, walkFrame: 0,
      }));
      // 23 — older female guest (reddish hair)
      at(ctx, 112, 16, (g) => drawPerson(g, {
        hairColor: '#aa5533', shirtColor: '#cc8844', skirtColor: '#aa6622',
        hairLength: 8, tall: true, walkFrame: 0,
      }));
      // 24 — child guest 1 (boy, brown hair)
      at(ctx, 128, 16, (g) => drawPerson(g, {
        hairColor: '#664422', shirtColor: '#4499dd', skirtColor: '#337',
        hairLength: 3, tall: false, walkFrame: 0,
      }));
      // 25 — child guest 2 (girl, black hair)
      at(ctx, 144, 16, (g) => drawPerson(g, {
        hairColor: '#222', shirtColor: '#ee77aa', skirtColor: '#cc5588',
        hairLength: 8, tall: false, walkFrame: 0,
      }));
      // 26 — girl drawing (sitting + arm with pencil)
      at(ctx, 160, 16, (g) => {
        drawSitting(g, girlOpts);
        g.fillStyle = '#f5c5a3'; g.fillRect(11, 10, 2, 1);
        g.fillStyle = '#ff0'; g.fillRect(13, 10, 2, 1);
      });
      // 27 — mom drawing (sitting + arm with pencil)
      at(ctx, 176, 16, (g) => {
        drawSitting(g, momOpts);
        g.fillStyle = '#f5c5a3'; g.fillRect(11, 8, 2, 1);
        g.fillStyle = '#33e'; g.fillRect(13, 8, 2, 1);
      });
      // 28 — friend drawing (sitting + arm with pencil)
      at(ctx, 192, 16, (g) => {
        drawSitting(g, friendOpts);
        g.fillStyle = '#f5c5a3'; g.fillRect(11, 10, 2, 1);
        g.fillStyle = '#3c3'; g.fillRect(13, 10, 2, 1);
      });
      // 29 — young male guest 2 (blond)
      at(ctx, 208, 16, (g) => drawPerson(g, {
        hairColor: '#d0a030', shirtColor: '#cc5555', skirtColor: '#444',
        hairLength: 3, tall: true, walkFrame: 0,
      }));
      // 30 — young female guest 2 (black hair)
      at(ctx, 224, 16, (g) => drawPerson(g, {
        hairColor: '#222', shirtColor: '#44bbaa', skirtColor: '#338877',
        hairLength: 10, tall: true, walkFrame: 0,
      }));
      // 31 — older guest with hat
      at(ctx, 240, 16, (g) => {
        drawPerson(g, {
          hairColor: '#888', shirtColor: '#554433', skirtColor: '#443322',
          hairLength: 4, tall: true, walkFrame: 0,
        });
        // hat
        g.fillStyle = '#443'; g.fillRect(4, 0, 8, 2); g.fillRect(5, 0, 6, 1);
      });

      /* ─── row 2 (tiles 32-47): more guest variants + camera walk ─── */
      // 32 — girl camera walk1
      at(ctx, 0, 32, (g) => {
        drawPerson(g, { ...girlOpts, walkFrame: 0 });
        g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
        g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
      });
      // 33 — girl camera walk2
      at(ctx, 16, 32, (g) => {
        drawPerson(g, { ...girlOpts, walkFrame: 1 });
        g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
        g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
      });
      // 34 — baby/toddler guest
      at(ctx, 32, 32, (g) => drawPerson(g, {
        hairColor: '#dda040', shirtColor: '#ffaacc', skirtColor: '#ffaacc',
        hairLength: 3, tall: false, walkFrame: 0,
        skinColor: '#f5c5a3',
      }));
      // 35 — elderly lady with pearls
      at(ctx, 48, 32, (g) => {
        drawPerson(g, {
          hairColor: '#ccc', shirtColor: '#667799', skirtColor: '#556688',
          hairLength: 7, tall: true, walkFrame: 0,
        });
        g.fillStyle = '#fff'; px(g, 7, 5, g.fillStyle); px(g, 8, 5, g.fillStyle); px(g, 9, 5, g.fillStyle);
      });
      // 36 — teen boy guest
      at(ctx, 64, 32, (g) => drawPerson(g, {
        hairColor: '#332211', shirtColor: '#dd4444', skirtColor: '#333',
        hairLength: 4, tall: true, walkFrame: 0,
      }));
      // 37 — teen girl guest
      at(ctx, 80, 32, (g) => drawPerson(g, {
        hairColor: '#884422', shirtColor: '#cc77cc', skirtColor: '#aa55aa',
        hairLength: 10, tall: true, walkFrame: 0,
      }));
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

/* ── New scene maps ──────────────────────────────────────────────────── */

// 54=darkSky 55=darkCloud 56=darkBldg 57=darkBldgTop 58=wetRoad 59=wetSidewalk
// 60=lampPost 61=darkTallBldg 62=puddle 63=darkGrass
const rainWalkMap = [
  [55,54,54,55,54,54,54,55,54,54,54,55,54,54,55,54,54,54,55,54],
  [54,54,55,54,54,54,55,54,54,55,54,54,54,54,54,55,54,54,54,54],
  [54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54],
  [54,54,57,54,54,61,54,54,54,57,54,54,54,61,54,54,54,57,54,54],
  [54,54,56,54,54,61,54,60,54,56,54,54,54,61,54,60,54,56,54,54],
  [54,54,56,54,54,61,54,60,54,56,54,54,54,61,54,60,54,56,54,54],
  [54,54,56,54,54,61,54,60,54,56,54,54,54,61,54,60,54,56,54,54],
  [54,54,56,54,54,61,54,60,54,56,54,54,54,61,54,60,54,56,54,54],
  [54,54,56,54,54,61,54,60,54,56,54,54,54,61,54,60,54,56,54,54],
  [63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63],
  [59,59,59,62,59,59,59,59,59,59,62,59,59,59,59,59,59,62,59,59],
  [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58],
  [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58],
  [59,59,62,59,59,59,59,62,59,59,59,59,59,62,59,59,59,59,59,62],
  [63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63],
];

// 64=fairyTreeDoor 65=fairyTreeLights 66=mushroom 67=parkPath 90=fairyLightGrass
// 91=bigTree 92=treeTrunk 93=fairyFence 3=grass 19=tree 40=flowerGrass
const fairyGardenMap = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [ 0, 0, 0, 0, 0, 0,91, 0,91, 0, 0, 0, 0, 0,91, 0, 0, 0, 0, 0],
  [ 0, 0,91, 0, 0, 0,91, 0,91, 0, 0,91, 0, 0,91, 0, 0,91, 0, 0],
  [ 0, 0,91, 0, 0,65,92,64,92,65, 0,91, 0, 0,92, 0, 0,91, 0, 0],
  [ 0, 0,92, 0, 0,65,92,64,92,65, 0,92, 0,65,92,65, 0,92, 0, 0],
  [ 3, 3,92, 3,90,66,92,64,92,66,90, 3, 3,66,92,66, 3,92, 3, 3],
  [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [93,93,93,93,93, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,93,93,93,93,93],
  [ 3, 3,40, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,40, 3, 3, 3,40, 3, 3],
  [67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67],
  [67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67],
  [ 3, 3, 3, 3,40, 3, 3, 3, 3,90, 3, 3, 3, 3, 3,40, 3, 3, 3, 3],
  [66, 3, 3, 3, 3, 3,66, 3, 3, 3, 3,66, 3, 3, 3, 3, 3,66, 3, 3],
  [ 3, 3,19, 3, 3, 3, 3, 3,19, 3, 3, 3, 3,19, 3, 3, 3, 3,19, 3],
  [ 3, 3,19, 3, 3, 3, 3, 3,19, 3, 3, 3, 3,19, 3, 3, 3, 3,19, 3],
];

// 68=livingWall 69=woodFloor 70=couchL 71=couchR 72=TV 73=windowRain
// 74=coffeeTable 76=rug 77=pictureFrame 78=bookshelf 79=lamp 97=ceiling
const couchTVMap = [
  [97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97],
  [97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97],
  [68,78,68,73,68,68,77,68,72,72,68,77,68,68,73,68,78,68,79,68],
  [68,78,68,73,68,68,68,68,68,68,68,68,68,68,73,68,78,68,79,68],
  [68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,74,74,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,70,71,69,69,69,70,71,69,69,69,69,69,69,69,69],
  [69,69,76,76,76,76,76,76,76,76,76,76,76,76,76,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
];

// 68=livingWall 69=woodFloor 75=artTable 94=drawingWall 95=drawingFloor 77=pictureFrame
const drawingMap = [
  [97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97],
  [97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97],
  [94,68,77,68,94,68,94,68,77,68,68,77,68,94,68,77,68,94,68,68],
  [68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68],
  [68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,75,75,75,75,75,75,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,75,75,75,75,75,75,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [95,69,69,69,95,69,69,69,69,69,69,95,69,69,95,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,95,69,69,69,69,69,95,69,69,69,69,69,69,69,95,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
  [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
];

// 80=partyWall 81=partyFloor 82=balloonRed 83=balloonBlue 84=bunting
// 85=cakeTable 86=gift 87=confettiWall 88=ceilingLight 89=photo 96=streamer
const partyMap = [
  [88,84,84,84,84,84,84,84,88,84,84,84,84,84,84,84,88,84,84,84],
  [84,96,96,84,96,96,84,96,96,84,96,96,84,96,96,84,96,96,84,96],
  [82,87,83,80,82,87,83,80,82,87,83,80,82,87,83,80,82,87,83,80],
  [80,89,80,80,80,80,89,80,80,80,80,89,80,80,80,80,89,80,80,80],
  [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,85,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,86,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
  [81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81],
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

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 8 — Walking in the rain with umbrellas
   * ═══════════════════════════════════════════════════════════════════ */

  let rainTime = 0;
  ctx.drawScene((r) => {
    r.drawMap('env', rainWalkMap);
    // Animated rain drops
    r.ctx.fillStyle = 'rgba(180, 200, 220, 0.5)';
    rainTime++;
    for (let i = 0; i < 60; i++) {
      const x = ((i * 19 + rainTime * 3) % 330) - 5;
      const y = ((i * 31 + rainTime * 4) % 260) - 10;
      r.fillRect(x, y, 1, 3, 'rgba(180, 200, 220, 0.4)');
    }
  });

  const girlUmbrella = new Animation('walk', [
    { tiles: [8], duration: 300 },
    { tiles: [9], duration: 300 },
  ]);
  const momUmbrella = new Animation('walk', [
    { tiles: [10], duration: 300 },
    { tiles: [11], duration: 300 },
  ]);
  const friendUmbrella = new Animation('walk', [
    { tiles: [12], duration: 300 },
    { tiles: [13], duration: 300 },
  ]);

  const girlRain = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -20, y: 140, cols: 1,
    animations: { walk: girlUmbrella },
  });
  girlRain.play('walk');

  const momRain = ctx.addActor({
    name: 'mom', tileset: 'chars', x: -50, y: 138, cols: 1,
    animations: { walk: momUmbrella },
  });
  momRain.play('walk');

  const friendRain = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -80, y: 140, cols: 1,
    animations: { walk: friendUmbrella },
  });
  friendRain.play('walk');

  await ctx.fadeIn(800);

  // Rain ambience
  sound.ambientWhoosh();

  // Gentle rainy melody — minor key, soft
  sound.playMelody([
    [330, 500], [311, 500], [294, 500], [262, 800],
    [0, 300],
    [294, 500], [311, 500], [330, 800],
  ]);

  // Walk across the rainy street
  girlRain.moveTo(340, 140, 6000);
  momRain.moveTo(310, 138, 6000);
  await friendRain.moveTo(280, 140, 6000);

  await ctx.wait(500);
  sound.ambientWhoosh();
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 9 — Fairy gardens in trees in the city
   * ═══════════════════════════════════════════════════════════════════ */

  let fairyTime = 0;
  ctx.drawScene((r) => {
    r.drawMap('env', fairyGardenMap);
    // Twinkling fairy lights overlay
    fairyTime++;
    const spots = [
      [96, 40], [112, 32], [128, 48], [144, 56], [160, 40],
      [88, 56], [136, 36], [224, 48], [232, 56], [200, 40],
    ];
    for (let i = 0; i < spots.length; i++) {
      const brightness = Math.sin(fairyTime * 0.08 + i * 1.5) * 0.5 + 0.5;
      const colors = ['#ff0', '#f0f', '#0ff', '#ff0', '#f0f', '#0ff', '#ff0', '#f0f', '#0ff', '#ff0'];
      r.ctx.globalAlpha = brightness * 0.7;
      r.fillRect(spots[i][0], spots[i][1], 2, 2, colors[i % colors.length]);
    }
    r.ctx.globalAlpha = 1;
  });

  const girlFairy = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -10, y: 140, cols: 1,
    animations: { walk: girlWalk },
  });
  girlFairy.play('walk');

  const momFairy = ctx.addActor({
    name: 'mom', tileset: 'chars', x: -40, y: 138, cols: 1,
    animations: { walk: momWalk },
  });
  momFairy.play('walk');

  const friendFairy = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -70, y: 140, cols: 1,
    animations: { walk: new Animation('walk', [
      { tiles: [6], duration: 250 },
      { tiles: [7], duration: 250 },
    ]) },
  });
  friendFairy.play('walk');

  await ctx.fadeIn(800);

  // Magical fairy melody — twinkling and enchanting
  sound.playMelody([
    [784, 200], [880, 200], [1047, 300], [880, 200], [784, 300],
    [0, 200],
    [659, 200], [784, 200], [880, 300], [784, 200], [659, 300],
    [0, 200],
    [523, 200], [659, 200], [784, 300], [880, 300], [1047, 500],
  ]);

  // Walk slowly through the fairy garden, pausing to look
  girlFairy.moveTo(120, 140, 3000);
  momFairy.moveTo(90, 138, 3000);
  await friendFairy.moveTo(60, 140, 3000);

  await ctx.wait(1500); // pause to admire

  girlFairy.moveTo(340, 140, 4000);
  momFairy.moveTo(310, 138, 4000);
  await friendFairy.moveTo(280, 140, 4000);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 10 — Sitting on the couch watching a show
   * ═══════════════════════════════════════════════════════════════════ */

  let tvTime = 0;
  ctx.drawScene((r) => {
    r.drawMap('env', couchTVMap);
    // Animated TV screen flicker
    tvTime++;
    const hue = (tvTime * 2) % 360;
    const r1 = Math.sin(tvTime * 0.05) * 30 + 100;
    const g1 = Math.sin(tvTime * 0.07 + 1) * 30 + 130;
    const b1 = Math.sin(tvTime * 0.03 + 2) * 30 + 180;
    r.ctx.globalAlpha = 0.4;
    r.fillRect(130, 35, 12, 7, `rgb(${Math.floor(r1)},${Math.floor(g1)},${Math.floor(b1)})`);
    r.ctx.globalAlpha = 1;
  });

  // Girl, mom, friend sitting on couch
  const girlCouch = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 80, y: 130, cols: 1,
    animations: { sit: girlSit },
  });
  girlCouch.play('sit');

  const momCouch = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 100, y: 128, cols: 1,
    animations: { sit: momSit },
  });
  momCouch.play('sit');

  const friendCouch = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 160, y: 130, cols: 1,
    animations: { sit: new Animation('sit', [{ tiles: [2], duration: 1000 }], false) },
  });
  friendCouch.play('sit');

  await ctx.fadeIn(800);

  // Cozy TV melody — warm and relaxed
  sound.playMelody([
    [262, 600], [294, 400], [330, 600], [294, 400],
    [262, 800],
    [0, 400],
    [220, 600], [262, 400], [294, 600], [330, 800],
  ]);

  await ctx.wait(5500);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 11 — Drawing together
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', drawingMap));

  const girlDrawAnim = new Animation('draw', [{ tiles: [26], duration: 1000 }], false);
  const momDrawAnim = new Animation('draw', [{ tiles: [27], duration: 1000 }], false);
  const friendDrawAnim = new Animation('draw', [{ tiles: [28], duration: 1000 }], false);

  // Girl sitting at table drawing
  const girlDraw = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 80, y: 86, cols: 1,
    animations: { draw: girlDrawAnim },
  });
  girlDraw.play('draw');

  // Mom sitting at table drawing
  const momDraw = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 112, y: 84, cols: 1,
    animations: { draw: momDrawAnim },
  });
  momDraw.play('draw');

  // Friend sitting at table drawing
  const friendDraw = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 160, y: 86, cols: 1,
    animations: { draw: friendDrawAnim },
  });
  friendDraw.play('draw');

  await ctx.fadeIn(800);

  // Creative playful melody
  sound.playMelody([
    [392, 200], [440, 200], [494, 200], [523, 200],
    [494, 200], [440, 200], [392, 400],
    [0, 200],
    [330, 200], [392, 200], [440, 200], [494, 400],
    [523, 200], [587, 200], [659, 400],
    [0, 200],
    [523, 200], [494, 200], [440, 200], [392, 600],
  ]);

  await ctx.wait(5500);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('mom');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 12 — Party with lots of people, girl takes pictures
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => r.drawMap('env', partyMap));

  // Place many party guests around the room
  const grandpa = ctx.addActor({
    name: 'grandpa', tileset: 'chars', x: 32, y: 100, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [16], duration: 1000 }]) },
  });
  grandpa.play('stand');

  const grandma = ctx.addActor({
    name: 'grandma', tileset: 'chars', x: 52, y: 100, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [17], duration: 1000 }]) },
  });
  grandma.play('stand');

  const greatGrandpa = ctx.addActor({
    name: 'greatgrandpa', tileset: 'chars', x: 88, y: 128, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [18], duration: 1000 }]) },
  });
  greatGrandpa.play('stand');

  const greatGrandma = ctx.addActor({
    name: 'greatgrandma', tileset: 'chars', x: 108, y: 128, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [19], duration: 1000 }]) },
  });
  greatGrandma.play('stand');

  const youngGuest1 = ctx.addActor({
    name: 'yguest1', tileset: 'chars', x: 180, y: 100, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [20], duration: 1000 }]) },
  });
  youngGuest1.play('stand');

  const youngGuest2 = ctx.addActor({
    name: 'yguest2', tileset: 'chars', x: 200, y: 100, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [21], duration: 1000 }]) },
  });
  youngGuest2.play('stand');

  const olderGuest1 = ctx.addActor({
    name: 'oguest1', tileset: 'chars', x: 250, y: 128, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [22], duration: 1000 }]) },
  });
  olderGuest1.play('stand');

  const olderGuest2 = ctx.addActor({
    name: 'oguest2', tileset: 'chars', x: 270, y: 128, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [23], duration: 1000 }]) },
  });
  olderGuest2.play('stand');

  const childGuest1 = ctx.addActor({
    name: 'cguest1', tileset: 'chars', x: 140, y: 180, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [24], duration: 1000 }]) },
  });
  childGuest1.play('stand');

  const childGuest2 = ctx.addActor({
    name: 'cguest2', tileset: 'chars', x: 160, y: 180, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [25], duration: 1000 }]) },
  });
  childGuest2.play('stand');

  const youngGuest3 = ctx.addActor({
    name: 'yguest3', tileset: 'chars', x: 220, y: 170, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [29], duration: 1000 }]) },
  });
  youngGuest3.play('stand');

  const youngGuest4 = ctx.addActor({
    name: 'yguest4', tileset: 'chars', x: 240, y: 170, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [30], duration: 1000 }]) },
  });
  youngGuest4.play('stand');

  const elderLady = ctx.addActor({
    name: 'elady', tileset: 'chars', x: 60, y: 160, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [35], duration: 1000 }]) },
  });
  elderLady.play('stand');

  const teenBoy = ctx.addActor({
    name: 'teen1', tileset: 'chars', x: 290, y: 100, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [36], duration: 1000 }]) },
  });
  teenBoy.play('stand');

  const teenGirl = ctx.addActor({
    name: 'teen2', tileset: 'chars', x: 30, y: 170, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [37], duration: 1000 }]) },
  });
  teenGirl.play('stand');

  const hatGuest = ctx.addActor({
    name: 'hatguest', tileset: 'chars', x: 180, y: 155, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [31], duration: 1000 }]) },
  });
  hatGuest.play('stand');

  // Mom standing near the cake
  const momParty = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 190, y: 120, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [3], duration: 1000 }]) },
  });
  momParty.play('stand');

  // Friend near entrance
  const friendParty = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 150, y: 105, cols: 1,
    animations: { stand: friendStand },
  });
  friendParty.play('stand');

  // Girl with camera — walks around taking pictures
  const cameraWalk = new Animation('walk', [
    { tiles: [32], duration: 250 },
    { tiles: [33], duration: 250 },
  ]);
  const cameraHold = new Animation('hold', [{ tiles: [14], duration: 500 }], false);
  const cameraFlash = new Animation('flash', [
    { tiles: [15], duration: 300 },
    { tiles: [14], duration: 200 },
  ], false);

  const girlCamera = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 10, y: 130, cols: 1,
    animations: { walk: cameraWalk, hold: cameraHold, flash: cameraFlash },
  });
  girlCamera.play('walk');

  await ctx.fadeIn(800);

  // Upbeat party melody
  sound.playMelody([
    [523, 200], [523, 200], [587, 200], [659, 200],
    [587, 200], [523, 200], [494, 400],
    [440, 200], [494, 200], [523, 200], [587, 400],
    [523, 200], [440, 200], [392, 400],
  ]);

  // Girl walks to grandparents, takes a picture
  await girlCamera.moveTo(60, 105, 2000);
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2); // camera click
  await ctx.wait(600);

  // Walk to great-grandparents, take a picture
  girlCamera.play('walk');
  await girlCamera.moveTo(100, 132, 1500);
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2);
  await ctx.wait(600);

  // More party music
  sound.playMelody([
    [392, 200], [440, 200], [494, 200], [523, 200],
    [587, 200], [659, 400], [587, 200],
    [523, 200], [494, 200], [440, 200], [392, 400],
  ]);

  // Walk to young guests, take a picture
  girlCamera.play('walk');
  await girlCamera.moveTo(195, 105, 2000);
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2);
  await ctx.wait(600);

  // Walk to the kids, take a picture
  girlCamera.play('walk');
  await girlCamera.moveTo(145, 185, 1500);
  girlCamera.flipX = true;
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2);
  await ctx.wait(600);

  // Walk to elder lady and teens, take a picture
  girlCamera.flipX = false;
  girlCamera.play('walk');
  await girlCamera.moveTo(45, 165, 2000);
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2);
  await ctx.wait(600);

  // Final group — walk to center
  girlCamera.play('walk');
  await girlCamera.moveTo(150, 140, 1500);
  girlCamera.flipX = true;
  girlCamera.play('hold');
  await ctx.wait(400);
  girlCamera.play('flash');
  sound.playTone(1200, 0.05, 'square', 0.2);

  await ctx.wait(1500);

  // Final happy ending jingle
  await sound.playMelody([
    [523, 200], [587, 200], [659, 200], [784, 400],
    [659, 200], [784, 400], [1047, 800],
  ]);

  await ctx.wait(1500);
  await ctx.fadeOut(1500);
}
