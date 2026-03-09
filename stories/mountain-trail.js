/**
 * "The Mountain Trail" — a wordless animated story.
 *
 * A blonde girl and her blonde friend set out from a small town,
 * hike through forests, cross a river, climb to a mountain summit,
 * get caught in rain, shelter in a cabin, and walk home at sunset.
 * No dialog — visuals and music only.
 *
 * Reuses Kenney RPG Urban Pack tiles (assets/rpg-urban-tilemap.png)
 * and custom procedural sprites from calgary-custom-tiles.js.
 */

import { Animation } from '../engine/animator.js';
import { chars, extraEnv } from './calgary-custom-tiles.js';
import {
  townStartMap, forestHikeMap, riverCrossingMap, mountainAscentMap,
  summitViewMap, rainyDescentMap, cabinShelterMap, sunsetReturnMap,
  drawMixedMap,
} from './mountain-trail-scenes.js';

export const meta = {
  title: 'The Mountain Trail',
  description: 'Two friends hike through forests and mountains on a day-long adventure.',
};

export const tilesets = {
  chars,
  extra: extraEnv,
};

/* ── Story script ─────────────────────────────────────────────────────── */

export async function run(ctx) {
  const { renderer, sound } = ctx;

  // Load Kenney RPG Urban Pack tilemap as 'env'
  await ctx.loadTileset('env', 'assets/rpg-urban-tilemap.png');

  /* ── Animation helpers ── */
  const girlWalk = new Animation('walk', [
    { tiles: [0], duration: 250 },
    { tiles: [1], duration: 250 },
  ]);
  const friendWalk = new Animation('walk', [
    { tiles: [6], duration: 250 },
    { tiles: [7], duration: 250 },
  ]);
  const girlStand = new Animation('stand', [{ tiles: [0], duration: 1000 }], false);
  const friendStand = new Animation('stand', [{ tiles: [6], duration: 500 }]);
  const friendWave = new Animation('wave', [
    { tiles: [6], duration: 400 },
    { tiles: [7], duration: 400 },
  ]);
  const girlSit = new Animation('sit', [{ tiles: [2], duration: 1000 }], false);
  const friendSit = new Animation('sit', [{ tiles: [2], duration: 1000 }], false);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 1 — Setting out from a small town
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, townStartMap));

  const girl1 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -20, y: 136, cols: 1,
    animations: { walk: girlWalk, stand: girlStand },
  });
  girl1.play('walk');

  const friend1 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -50, y: 136, cols: 1,
    animations: { walk: friendWalk, stand: friendStand, wave: friendWave },
  });
  friend1.play('walk');

  await ctx.fadeIn(800);

  // Cheerful departure melody
  sound.playMelody([
    [523, 300], [587, 300], [659, 300], [784, 600],
    [659, 300], [587, 300], [523, 600],
  ]);

  await ctx.wait(400);

  girl1.moveTo(340, 136, 5000);
  await friend1.moveTo(310, 136, 5000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 2 — Hiking through the forest
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, forestHikeMap));

  const girl2 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -20, y: 120, cols: 1,
    animations: { walk: girlWalk },
  });
  girl2.play('walk');

  const friend2 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -50, y: 120, cols: 1,
    animations: { walk: friendWalk },
  });
  friend2.play('walk');

  await ctx.fadeIn(800);

  // Forest melody — gentle, nature-like
  sound.playMelody([
    [392, 400], [440, 400], [494, 400], [523, 600],
    [0, 200],
    [494, 400], [440, 400], [392, 600],
    [0, 200],
    [330, 400], [392, 400], [440, 600],
  ]);

  girl2.moveTo(340, 120, 6000);
  await friend2.moveTo(310, 120, 6000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 3 — Crossing the river
   * ═══════════════════════════════════════════════════════════════════ */

  let waterTime = 0;
  ctx.drawScene((r) => {
    drawMixedMap(r, riverCrossingMap);
    // Animated water shimmer
    waterTime++;
    for (let i = 0; i < 20; i++) {
      const x = ((i * 23 + waterTime * 2) % 330) - 5;
      const y = 112 + Math.sin(waterTime * 0.05 + i) * 4;
      r.fillRect(x, y, 3, 1, 'rgba(170, 220, 255, 0.3)');
    }
  });

  const girl3 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 130, y: 40, cols: 1,
    animations: { walk: girlWalk, stand: girlStand },
  });
  girl3.play('walk');

  const friend3 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 150, y: 40, cols: 1,
    animations: { walk: friendWalk },
  });
  friend3.play('walk');

  await ctx.fadeIn(800);

  // River crossing melody — flowing
  sound.playMelody([
    [330, 300], [392, 300], [440, 300], [494, 300],
    [523, 600],
    [0, 200],
    [494, 300], [440, 300], [392, 300], [330, 600],
  ]);

  // Walk down to the bridge
  girl3.moveTo(130, 130, 3000);
  await friend3.moveTo(150, 130, 3000);

  // Cross the bridge
  girl3.moveTo(130, 180, 2500);
  await friend3.moveTo(150, 180, 2500);

  await ctx.wait(500);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 4 — Mountain ascent
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, mountainAscentMap));

  const girl4 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -20, y: 128, cols: 1,
    animations: { walk: girlWalk },
  });
  girl4.play('walk');

  const friend4 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -50, y: 128, cols: 1,
    animations: { walk: friendWalk },
  });
  friend4.play('walk');

  await ctx.fadeIn(800);

  // Ascending melody — building upward
  sound.playMelody([
    [262, 200], [294, 200], [330, 200], [349, 200],
    [392, 200], [440, 200], [494, 200], [523, 400],
    [0, 300],
    [523, 200], [587, 200], [659, 200], [784, 600],
  ]);

  girl4.moveTo(340, 128, 5500);
  await friend4.moveTo(310, 128, 5500);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 5 — Summit view (panoramic)
   * ═══════════════════════════════════════════════════════════════════ */

  let windTime = 0;
  ctx.drawScene((r) => {
    drawMixedMap(r, summitViewMap);
    // Wind particles at the summit
    windTime++;
    r.ctx.globalAlpha = 0.3;
    for (let i = 0; i < 8; i++) {
      const x = ((i * 47 + windTime * 2) % 340) - 10;
      const y = 130 + Math.sin(windTime * 0.03 + i * 2) * 8;
      r.fillRect(x, y, 4, 1, '#dde');
    }
    r.ctx.globalAlpha = 1;
  });

  const girl5 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 120, y: 200, cols: 1,
    animations: { walk: girlWalk, stand: girlStand },
  });
  girl5.play('walk');

  const friend5 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 140, y: 200, cols: 1,
    animations: { walk: friendWalk, stand: friendStand },
  });
  friend5.play('walk');

  await ctx.fadeIn(800);

  // Walk to the summit viewing spot
  girl5.moveTo(130, 140, 2000);
  await friend5.moveTo(160, 140, 2000);

  girl5.play('stand');
  friend5.play('stand');

  // Majestic summit melody
  sound.playMelody([
    [523, 500], [587, 500], [659, 500], [784, 1000],
    [0, 300],
    [659, 500], [587, 500], [523, 1000],
    [0, 300],
    [784, 500], [880, 500], [1047, 1500],
  ]);

  await ctx.wait(6000);

  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 6 — Sudden rain on the descent
   * ═══════════════════════════════════════════════════════════════════ */

  let rainTime = 0;
  ctx.drawScene((r) => {
    drawMixedMap(r, rainyDescentMap);
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
  const friendUmbrella = new Animation('walk', [
    { tiles: [12], duration: 300 },
    { tiles: [13], duration: 300 },
  ]);

  const girl6 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: -20, y: 140, cols: 1,
    animations: { walk: girlUmbrella },
  });
  girl6.play('walk');

  const friend6 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: -50, y: 140, cols: 1,
    animations: { walk: friendUmbrella },
  });
  friend6.play('walk');

  await ctx.fadeIn(800);

  sound.ambientWhoosh();

  // Rainy, melancholy melody
  sound.playMelody([
    [330, 500], [311, 500], [294, 500], [262, 800],
    [0, 300],
    [294, 500], [311, 500], [330, 800],
  ]);

  girl6.moveTo(340, 140, 6000);
  await friend6.moveTo(310, 140, 6000);

  await ctx.wait(500);
  sound.ambientWhoosh();
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('girl');
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 7 — Shelter in the cabin
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, cabinShelterMap));

  const girl7 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 80, y: 130, cols: 1,
    animations: { sit: girlSit },
  });
  girl7.play('sit');

  const friend7 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 160, y: 130, cols: 1,
    animations: { sit: friendSit },
  });
  friend7.play('sit');

  await ctx.fadeIn(800);

  // Cozy cabin melody — warm and gentle
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
  ctx.removeActor('friend');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 8 — Sunset walk home
   * ═══════════════════════════════════════════════════════════════════ */

  let sunsetTime = 0;
  ctx.drawScene((r) => {
    drawMixedMap(r, sunsetReturnMap);
    // Warm sunset glow overlay
    sunsetTime++;
    const alpha = 0.08 + Math.sin(sunsetTime * 0.02) * 0.03;
    r.ctx.globalAlpha = alpha;
    r.fillRect(0, 0, 320, 240, '#ff8844');
    r.ctx.globalAlpha = 1;
  });

  const girl8 = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 340, y: 140, cols: 1,
    animations: { walk: girlWalk, stand: girlStand },
  });
  girl8.play('walk');
  girl8.flipX = true;

  const friend8 = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 370, y: 140, cols: 1,
    animations: { walk: friendWalk, stand: friendStand },
  });
  friend8.play('walk');
  friend8.flipX = true;

  await ctx.fadeIn(800);

  // Sunset homecoming melody — warm and satisfying
  sound.playMelody([
    [392, 300], [440, 300], [494, 300], [523, 300],
    [587, 300], [659, 600],
    [0, 200],
    [523, 300], [587, 300], [659, 300], [784, 900],
  ]);

  girl8.moveTo(100, 140, 4000);
  await friend8.moveTo(130, 140, 4000);

  // Pause and look at the sunset
  girl8.play('stand');
  girl8.flipX = true;
  friend8.play('stand');
  friend8.flipX = true;

  await ctx.wait(2000);

  // Continue walking home
  girl8.play('walk');
  friend8.play('walk');

  girl8.moveTo(-40, 140, 3000);
  await friend8.moveTo(-10, 140, 3000);

  // Final jingle
  await sound.playMelody([
    [523, 200], [587, 200], [659, 200], [784, 400],
    [659, 200], [784, 400], [1047, 800],
  ]);

  await ctx.wait(1500);
  await ctx.fadeOut(1500);
}
