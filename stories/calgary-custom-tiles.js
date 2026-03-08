/**
 * Custom procedural tilesets for elements not available in the Kenney pack.
 * Side-view vehicles, sitting characters, umbrella variants, camera girl, party guests.
 */

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

  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, Math.min(hairLength, 16 - headY));

  g.fillStyle = skinColor;
  g.fillRect(6, headY + 1, 4, 4);

  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, 2);
  g.fillRect(5, headY, 1, 5);
  g.fillRect(10, headY, 1, 5);

  px(g, 7, headY + 2, '#333');
  px(g, 9, headY + 2, '#333');

  g.fillStyle = shirtColor;
  g.fillRect(5, bodyY, 6, tall ? 4 : 3);

  g.fillStyle = skirtColor;
  const skirtY = bodyY + (tall ? 4 : 3);
  g.fillRect(5, skirtY, 6, 3);

  g.fillStyle = legColor;
  const legY = skirtY + 3;
  if (walkFrame === 1) {
    g.fillRect(5, legY, 2, 2);
    g.fillRect(9, legY, 2, 2);
  } else {
    g.fillRect(6, legY, 2, 2);
    g.fillRect(8, legY, 2, 2);
  }

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

  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, Math.min(hairLength, 14 - headY));

  g.fillStyle = skinColor;
  g.fillRect(6, headY + 1, 4, 4);

  g.fillStyle = hairColor;
  g.fillRect(5, headY, 6, 2);
  g.fillRect(5, headY, 1, 5);
  g.fillRect(10, headY, 1, 5);

  px(g, 7, headY + 2, '#333');
  px(g, 9, headY + 2, '#333');

  g.fillStyle = shirtColor;
  g.fillRect(5, bodyY, 6, tall ? 4 : 3);

  g.fillStyle = skirtColor;
  const lapY = bodyY + (tall ? 4 : 3);
  g.fillRect(4, lapY, 8, 2);
}

function drawUmbrellaPerson(g, opts) {
  const {
    umbrellaColor = '#cc3333', hairColor, skinColor = '#f5c5a3',
    shirtColor, skirtColor, hairLength = 6, walkFrame = 0,
  } = opts;

  g.fillStyle = umbrellaColor;
  g.fillRect(2, 0, 12, 1);
  g.fillRect(1, 1, 14, 1);
  g.fillRect(3, 2, 10, 1);

  g.fillStyle = '#664';
  g.fillRect(8, 3, 1, 3);

  const headY = 5;
  const bodyY = headY + 3;

  g.fillStyle = hairColor;
  g.fillRect(6, headY, 5, Math.min(hairLength, 9));

  g.fillStyle = skinColor;
  g.fillRect(7, headY, 3, 3);

  g.fillStyle = hairColor;
  g.fillRect(6, headY, 5, 1);
  g.fillRect(6, headY, 1, 3);
  g.fillRect(10, headY, 1, 3);

  px(g, 8, headY + 1, '#333');

  g.fillStyle = shirtColor;
  g.fillRect(6, bodyY, 5, 2);

  g.fillStyle = skirtColor;
  g.fillRect(6, bodyY + 2, 5, 2);

  g.fillStyle = '#444';
  const legY = bodyY + 4;
  if (walkFrame === 1) {
    g.fillRect(6, legY, 2, 2); g.fillRect(9, legY, 2, 1);
  } else {
    g.fillRect(7, legY, 2, 1); g.fillRect(9, legY, 2, 1);
  }

  g.fillStyle = '#333';
  if (walkFrame === 1) {
    px(g, 6, legY + 1, g.fillStyle); px(g, 9, legY + 1, g.fillStyle);
  } else {
    px(g, 7, legY + 1, g.fillStyle); px(g, 9, legY + 1, g.fillStyle);
  }
}

/* ── Character presets ──────────────────────────────────────────────── */

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

/* ── Exported tilesets ──────────────────────────────────────────────── */

/** Character sprites: girl, mom, friend, umbrella variants, camera, party guests. */
export function chars() {
  return makeTileset(16, 3, (ctx) => {
    // row 0 (tiles 0-15)
    at(ctx, 0, 0, (g) => drawPerson(g, { ...girlOpts, walkFrame: 0 }));
    at(ctx, 16, 0, (g) => drawPerson(g, { ...girlOpts, walkFrame: 1 }));
    at(ctx, 32, 0, (g) => drawSitting(g, girlOpts));
    at(ctx, 48, 0, (g) => drawPerson(g, { ...momOpts, walkFrame: 0 }));
    at(ctx, 64, 0, (g) => drawPerson(g, { ...momOpts, walkFrame: 1 }));
    at(ctx, 80, 0, (g) => drawSitting(g, momOpts));
    at(ctx, 96, 0, (g) => drawPerson(g, { ...friendOpts, walkFrame: 0 }));
    at(ctx, 112, 0, (g) => {
      drawPerson(g, { ...friendOpts, walkFrame: 0 });
      g.fillStyle = '#f5c5a3';
      g.fillRect(11, 3, 2, 1); g.fillRect(12, 2, 2, 1);
    });
    at(ctx, 128, 0, (g) => drawUmbrellaPerson(g, { ...girlOpts, umbrellaColor: '#ee5599', walkFrame: 0 }));
    at(ctx, 144, 0, (g) => drawUmbrellaPerson(g, { ...girlOpts, umbrellaColor: '#ee5599', walkFrame: 1 }));
    at(ctx, 160, 0, (g) => drawUmbrellaPerson(g, { ...momOpts, umbrellaColor: '#3366aa', walkFrame: 0 }));
    at(ctx, 176, 0, (g) => drawUmbrellaPerson(g, { ...momOpts, umbrellaColor: '#3366aa', walkFrame: 1 }));
    at(ctx, 192, 0, (g) => drawUmbrellaPerson(g, { ...friendOpts, umbrellaColor: '#44bb44', walkFrame: 0 }));
    at(ctx, 208, 0, (g) => drawUmbrellaPerson(g, { ...friendOpts, umbrellaColor: '#44bb44', walkFrame: 1 }));
    at(ctx, 224, 0, (g) => {
      drawPerson(g, { ...girlOpts, walkFrame: 0 });
      g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
      g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
    });
    at(ctx, 240, 0, (g) => {
      drawPerson(g, { ...girlOpts, walkFrame: 0 });
      g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
      g.fillStyle = '#fff'; g.fillRect(13, 3, 2, 1); g.fillRect(14, 2, 1, 3);
      g.fillStyle = '#ffa'; px(g, 13, 2, g.fillStyle); px(g, 15, 4, g.fillStyle);
    });

    // row 1 (tiles 16-31): elderly + guests
    at(ctx, 0, 16, (g) => drawPerson(g, {
      hairColor: '#999', shirtColor: '#886644', skirtColor: '#555',
      hairLength: 4, tall: true, walkFrame: 0,
    }));
    at(ctx, 16, 16, (g) => drawPerson(g, {
      hairColor: '#aaa', shirtColor: '#cc7788', skirtColor: '#aa5566',
      hairLength: 8, tall: true, walkFrame: 0,
    }));
    at(ctx, 32, 16, (g) => {
      drawPerson(g, {
        hairColor: '#ddd', shirtColor: '#667', skirtColor: '#445',
        hairLength: 3, tall: true, walkFrame: 0,
      });
      g.fillStyle = '#664'; g.fillRect(12, 6, 1, 10); g.fillRect(12, 5, 2, 1);
      g.fillStyle = '#888'; px(g, 6, 2, g.fillStyle); px(g, 10, 2, g.fillStyle);
    });
    at(ctx, 48, 16, (g) => {
      drawPerson(g, {
        hairColor: '#ddd', shirtColor: '#8877aa', skirtColor: '#665588',
        hairLength: 8, tall: true, walkFrame: 0,
      });
      g.fillStyle = '#9988bb'; g.fillRect(4, 5, 8, 2);
      g.fillStyle = '#888'; px(g, 7, 2, g.fillStyle); px(g, 9, 2, g.fillStyle);
    });
    at(ctx, 64, 16, (g) => drawPerson(g, {
      hairColor: '#443322', shirtColor: '#4488aa', skirtColor: '#336688',
      hairLength: 3, tall: true, walkFrame: 0,
    }));
    at(ctx, 80, 16, (g) => drawPerson(g, {
      hairColor: '#8a5a2a', shirtColor: '#dd6688', skirtColor: '#bb4466',
      hairLength: 9, tall: true, walkFrame: 0,
    }));
    at(ctx, 96, 16, (g) => drawPerson(g, {
      hairColor: '#776655', shirtColor: '#558844', skirtColor: '#446633',
      hairLength: 4, tall: true, walkFrame: 0,
    }));
    at(ctx, 112, 16, (g) => drawPerson(g, {
      hairColor: '#aa5533', shirtColor: '#cc8844', skirtColor: '#aa6622',
      hairLength: 8, tall: true, walkFrame: 0,
    }));
    at(ctx, 128, 16, (g) => drawPerson(g, {
      hairColor: '#664422', shirtColor: '#4499dd', skirtColor: '#337',
      hairLength: 3, tall: false, walkFrame: 0,
    }));
    at(ctx, 144, 16, (g) => drawPerson(g, {
      hairColor: '#222', shirtColor: '#ee77aa', skirtColor: '#cc5588',
      hairLength: 8, tall: false, walkFrame: 0,
    }));
    at(ctx, 160, 16, (g) => {
      drawSitting(g, girlOpts);
      g.fillStyle = '#f5c5a3'; g.fillRect(11, 10, 2, 1);
      g.fillStyle = '#ff0'; g.fillRect(13, 10, 2, 1);
    });
    at(ctx, 176, 16, (g) => {
      drawSitting(g, momOpts);
      g.fillStyle = '#f5c5a3'; g.fillRect(11, 8, 2, 1);
      g.fillStyle = '#33e'; g.fillRect(13, 8, 2, 1);
    });
    at(ctx, 192, 16, (g) => {
      drawSitting(g, friendOpts);
      g.fillStyle = '#f5c5a3'; g.fillRect(11, 10, 2, 1);
      g.fillStyle = '#3c3'; g.fillRect(13, 10, 2, 1);
    });
    at(ctx, 208, 16, (g) => drawPerson(g, {
      hairColor: '#d0a030', shirtColor: '#cc5555', skirtColor: '#444',
      hairLength: 3, tall: true, walkFrame: 0,
    }));
    at(ctx, 224, 16, (g) => drawPerson(g, {
      hairColor: '#222', shirtColor: '#44bbaa', skirtColor: '#338877',
      hairLength: 10, tall: true, walkFrame: 0,
    }));
    at(ctx, 240, 16, (g) => {
      drawPerson(g, {
        hairColor: '#888', shirtColor: '#554433', skirtColor: '#443322',
        hairLength: 4, tall: true, walkFrame: 0,
      });
      g.fillStyle = '#443'; g.fillRect(4, 0, 8, 2); g.fillRect(5, 0, 6, 1);
    });

    // row 2 (tiles 32-37): camera walk + extra guests
    at(ctx, 0, 32, (g) => {
      drawPerson(g, { ...girlOpts, walkFrame: 0 });
      g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
      g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
    });
    at(ctx, 16, 32, (g) => {
      drawPerson(g, { ...girlOpts, walkFrame: 1 });
      g.fillStyle = '#333'; g.fillRect(11, 4, 3, 2);
      g.fillStyle = '#555'; px(g, 12, 4, g.fillStyle);
    });
    at(ctx, 32, 32, (g) => drawPerson(g, {
      hairColor: '#dda040', shirtColor: '#ffaacc', skirtColor: '#ffaacc',
      hairLength: 3, tall: false, walkFrame: 0, skinColor: '#f5c5a3',
    }));
    at(ctx, 48, 32, (g) => {
      drawPerson(g, {
        hairColor: '#ccc', shirtColor: '#667799', skirtColor: '#556688',
        hairLength: 7, tall: true, walkFrame: 0,
      });
      g.fillStyle = '#fff'; px(g, 7, 5, g.fillStyle); px(g, 8, 5, g.fillStyle); px(g, 9, 5, g.fillStyle);
    });
    at(ctx, 64, 32, (g) => drawPerson(g, {
      hairColor: '#332211', shirtColor: '#dd4444', skirtColor: '#333',
      hairLength: 4, tall: true, walkFrame: 0,
    }));
    at(ctx, 80, 32, (g) => drawPerson(g, {
      hairColor: '#884422', shirtColor: '#cc77cc', skirtColor: '#aa55aa',
      hairLength: 10, tall: true, walkFrame: 0,
    }));
  });
}

/** Car (2 tiles wide, side view). */
export function car() {
  return makeTileset(2, 1, (ctx) => {
    at(ctx, 0, 0, (g) => {
      g.fillStyle = '#cc4444'; g.fillRect(0, 6, 16, 6);
      g.fillStyle = '#bb3333'; g.fillRect(4, 2, 12, 5);
      g.fillStyle = '#aaddff'; g.fillRect(6, 3, 4, 3); g.fillRect(11, 3, 4, 3);
      g.fillStyle = '#333'; g.fillRect(2, 12, 4, 4);
      g.fillStyle = '#666'; g.fillRect(3, 13, 2, 2);
    });
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
}

/** Plane actor (3 tiles wide, side view). */
export function plane() {
  return makeTileset(3, 1, (ctx) => {
    at(ctx, 0, 0, (g) => {
      g.fillStyle = '#2266cc'; g.fillRect(0, 0, 5, 5); g.fillRect(2, 5, 3, 2);
      g.fillStyle = '#eee'; g.fillRect(4, 5, 12, 7);
      g.fillStyle = '#ddd'; g.fillRect(4, 5, 12, 1);
      g.fillStyle = '#2266cc'; g.fillRect(4, 11, 12, 1);
    });
    at(ctx, 16, 0, (g) => {
      g.fillStyle = '#eee'; g.fillRect(0, 5, 16, 7);
      g.fillStyle = '#ddd'; g.fillRect(0, 5, 16, 1);
      g.fillStyle = '#2266cc'; g.fillRect(0, 11, 16, 1);
      g.fillStyle = '#aaddff';
      g.fillRect(2, 7, 2, 2); g.fillRect(6, 7, 2, 2);
      g.fillRect(10, 7, 2, 2); g.fillRect(14, 7, 2, 2);
    });
    at(ctx, 32, 0, (g) => {
      g.fillStyle = '#eee'; g.fillRect(0, 5, 10, 7);
      g.fillStyle = '#ddd';
      g.fillRect(10, 7, 4, 4); g.fillRect(14, 8, 2, 2);
      g.fillStyle = '#aaddff'; g.fillRect(10, 7, 3, 3);
      g.fillStyle = '#2266cc'; g.fillRect(0, 11, 10, 1);
    });
  });
}

/** SkyTrain actor (3 tiles wide, side view). */
export function skytrain() {
  return makeTileset(3, 1, (ctx) => {
    at(ctx, 0, 0, (g) => {
      g.fillStyle = '#ddd'; g.fillRect(4, 2, 12, 8);
      g.fillStyle = '#aaddff'; g.fillRect(6, 3, 4, 4);
      g.fillStyle = '#ccc'; g.fillRect(0, 3, 4, 7);
      g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
      g.fillStyle = '#555'; g.fillRect(5, 10, 3, 3); g.fillRect(12, 10, 3, 3);
    });
    at(ctx, 16, 0, (g) => {
      g.fillStyle = '#ddd'; g.fillRect(0, 2, 16, 8);
      g.fillStyle = '#aaddff'; g.fillRect(2, 3, 4, 4); g.fillRect(10, 3, 4, 4);
      g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
      g.fillStyle = '#555'; g.fillRect(2, 10, 3, 3); g.fillRect(11, 10, 3, 3);
    });
    at(ctx, 32, 0, (g) => {
      g.fillStyle = '#ddd'; g.fillRect(0, 2, 12, 8);
      g.fillStyle = '#aaddff'; g.fillRect(7, 3, 4, 4);
      g.fillStyle = '#ccc'; g.fillRect(12, 3, 4, 7);
      g.fillStyle = '#0077bb'; g.fillRect(0, 8, 16, 2);
      g.fillStyle = '#555'; g.fillRect(2, 10, 3, 3); g.fillRect(10, 10, 3, 3);
    });
  });
}

/** Extra environment tiles not in Kenney pack (procedurally generated). */
export function extraEnv() {
  return makeTileset(16, 2, (ctx) => {
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
    // 2 — mountain
    at(ctx, 32, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#557755';
      g.beginPath(); g.moveTo(0, 16); g.lineTo(8, 2); g.lineTo(16, 16); g.fill();
      g.fillStyle = '#eef';
      g.beginPath(); g.moveTo(5, 8); g.lineTo(8, 2); g.lineTo(11, 8); g.fill();
    });
    // 3 — mountain variant 2
    at(ctx, 48, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#446644';
      g.beginPath(); g.moveTo(-2, 16); g.lineTo(6, 4); g.lineTo(14, 16); g.fill();
      g.fillStyle = '#eef';
      g.beginPath(); g.moveTo(3, 9); g.lineTo(6, 4); g.lineTo(9, 9); g.fill();
    });
    // 4 — mountain far (blueish)
    at(ctx, 64, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#8899aa';
      g.beginPath(); g.moveTo(0, 16); g.lineTo(8, 5); g.lineTo(16, 16); g.fill();
      g.fillStyle = '#dde';
      g.beginPath(); g.moveTo(5, 10); g.lineTo(8, 5); g.lineTo(11, 10); g.fill();
    });
    // 5 — mountain with trees
    at(ctx, 80, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#557755';
      g.beginPath(); g.moveTo(0, 16); g.lineTo(10, 3); g.lineTo(16, 12); g.fill();
      g.fillStyle = '#eef';
      g.beginPath(); g.moveTo(7, 7); g.lineTo(10, 3); g.lineTo(13, 8); g.fill();
      g.fillStyle = '#3a6a3f'; g.fillRect(0, 13, 16, 3);
    });
    // 6 — sun in sky
    at(ctx, 96, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#ffe066';
      g.beginPath(); g.arc(8, 8, 5, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff8cc';
      g.beginPath(); g.arc(8, 8, 3, 0, Math.PI * 2); g.fill();
    });
    // 7 — cloud variant
    at(ctx, 112, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#fff';
      g.fillRect(1, 8, 14, 4); g.fillRect(4, 6, 8, 6);
    });
    // 8 — Vancouver skyline
    at(ctx, 128, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#778899';
      g.fillRect(0, 8, 5, 8); g.fillRect(4, 5, 4, 11);
      g.fillRect(10, 7, 6, 9);
      g.fillStyle = '#aaddff';
      px(g, 2, 10, g.fillStyle); px(g, 5, 7, g.fillStyle); px(g, 12, 9, g.fillStyle);
    });
    // 9 — light sky (horizon)
    at(ctx, 144, 0, (g) => {
      g.fillStyle = '#a0d8f0'; g.fillRect(0, 0, 16, 16);
    });
    // 10 — dark rain sky
    at(ctx, 160, 0, (g) => {
      g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
    });
    // 11 — dark rain cloud
    at(ctx, 176, 0, (g) => {
      g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#445566';
      g.fillRect(2, 7, 12, 5); g.fillRect(4, 5, 8, 8);
    });
    // 12 — Calgary Tower
    at(ctx, 192, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#bbb'; g.fillRect(6, 0, 4, 16);
      g.fillStyle = '#eee'; g.fillRect(4, 4, 8, 3);
    });
    // 13 — elevated track beam
    at(ctx, 208, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#aaa'; g.fillRect(0, 0, 16, 2);
      g.fillStyle = '#999'; g.fillRect(0, 2, 16, 1);
    });
    // 14 — elevated track pillar
    at(ctx, 224, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#999'; g.fillRect(6, 0, 4, 16);
      g.fillStyle = '#aaa'; g.fillRect(3, 0, 10, 2);
    });
    // 15 — plane body (background tile)
    at(ctx, 240, 0, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#eee'; g.fillRect(0, 5, 16, 8);
      g.fillStyle = '#2266cc'; g.fillRect(0, 12, 16, 1);
      g.fillStyle = '#aaddff';
      g.fillRect(2, 7, 3, 2); g.fillRect(7, 7, 3, 2); g.fillRect(12, 7, 3, 2);
    });

    // Row 1 (tiles 16-31)
    // 16 — plane nose tile
    at(ctx, 0, 16, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#eee'; g.fillRect(0, 5, 10, 8);
      g.fillStyle = '#ddd';
      g.fillRect(10, 7, 5, 4); px(g, 15, 8, '#ddd'); px(g, 15, 9, '#ddd');
      g.fillStyle = '#aaddff'; g.fillRect(10, 7, 3, 3);
      g.fillStyle = '#2266cc'; g.fillRect(0, 12, 10, 1);
    });
    // 17 — plane tail tile
    at(ctx, 16, 16, (g) => {
      g.fillStyle = '#87CEEB'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#eee'; g.fillRect(4, 5, 12, 8);
      g.fillStyle = '#2266cc';
      g.fillRect(0, 0, 6, 6); g.fillRect(2, 5, 4, 2);
      g.fillStyle = '#eee'; g.fillRect(6, 5, 10, 1);
      g.fillStyle = '#2266cc'; g.fillRect(4, 12, 12, 1);
    });
    // 18 — plane interior ceiling
    at(ctx, 32, 16, (g) => {
      g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#ddd'; g.fillRect(0, 12, 16, 4);
      g.fillStyle = '#ccc'; g.fillRect(0, 14, 16, 1);
    });
    // 19 — plane interior window (with sky)
    at(ctx, 48, 16, (g) => {
      g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#88ccff'; g.fillRect(4, 2, 8, 8);
      g.fillStyle = '#aaddff'; g.fillRect(5, 3, 6, 6);
      g.fillStyle = '#fff'; g.fillRect(6, 5, 3, 2);
      g.fillStyle = '#ccc';
      g.fillRect(4, 2, 8, 1); g.fillRect(4, 9, 8, 1);
      g.fillRect(4, 2, 1, 8); g.fillRect(11, 2, 1, 8);
    });
    // 20 — plane interior wall
    at(ctx, 64, 16, (g) => {
      g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
    });
    // 21 — plane seat
    at(ctx, 80, 16, (g) => {
      g.fillStyle = '#e8e0d0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#3355aa'; g.fillRect(3, 4, 10, 8);
      g.fillStyle = '#2244aa'; g.fillRect(3, 4, 10, 2);
      g.fillStyle = '#3355aa'; g.fillRect(3, 12, 10, 4);
    });
    // 22 — plane floor
    at(ctx, 96, 16, (g) => {
      g.fillStyle = '#777799'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#666688'; g.fillRect(0, 0, 16, 2);
    });
    // 23 — runway
    at(ctx, 112, 16, (g) => {
      g.fillStyle = '#666'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#fff'; g.fillRect(6, 0, 4, 4); g.fillRect(6, 8, 4, 4);
    });
    // 24 — jetway wall top
    at(ctx, 128, 16, (g) => {
      g.fillStyle = '#c0c0c0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#aaa'; g.fillRect(0, 14, 16, 2);
    });
    // 25 — jetway floor
    at(ctx, 144, 16, (g) => {
      g.fillStyle = '#ddd0c0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#bbb'; g.fillRect(0, 7, 16, 2);
    });
    // 26 — jetway wall bottom
    at(ctx, 160, 16, (g) => {
      g.fillStyle = '#c0c0c0'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#aaa'; g.fillRect(0, 0, 16, 2);
    });
    // 27 — lamp post (rainy scene)
    at(ctx, 176, 16, (g) => {
      g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#444'; g.fillRect(7, 4, 2, 12);
      g.fillStyle = '#ffe'; g.fillRect(5, 2, 6, 3);
      g.fillStyle = '#ffa'; g.fillRect(6, 3, 4, 1);
    });
    // 28 — dark building body (rainy)
    at(ctx, 192, 16, (g) => {
      g.fillStyle = '#667788'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#aacc88';
      g.fillRect(2, 2, 4, 4); g.fillRect(10, 2, 4, 4);
      g.fillRect(2, 9, 4, 4); g.fillRect(10, 9, 4, 4);
    });
    // 29 — dark building top (rainy)
    at(ctx, 208, 16, (g) => {
      g.fillStyle = '#556677'; g.fillRect(0, 0, 16, 5);
      g.fillStyle = '#667788'; g.fillRect(0, 5, 16, 11);
      g.fillStyle = '#778899'; g.fillRect(3, 0, 10, 16);
      g.fillStyle = '#aacc88';
      g.fillRect(5, 2, 3, 3); g.fillRect(9, 2, 3, 3);
      g.fillRect(5, 8, 3, 3); g.fillRect(9, 8, 3, 3);
    });
    // 30 — dark tall building (rainy)
    at(ctx, 224, 16, (g) => {
      g.fillStyle = '#5a6a7a'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#aacc88';
      for (let r = 1; r < 15; r += 4) {
        g.fillRect(2, r, 3, 2); g.fillRect(7, r, 3, 2); g.fillRect(12, r, 3, 2);
      }
    });
    // 31 — puddle on sidewalk
    at(ctx, 240, 16, (g) => {
      g.fillStyle = '#888890'; g.fillRect(0, 0, 16, 16);
      g.fillStyle = '#6688aa';
      g.beginPath(); g.ellipse(8, 10, 6, 3, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#7799bb';
      g.beginPath(); g.ellipse(7, 9, 3, 1.5, 0, 0, Math.PI * 2); g.fill();
    });
  });
}
