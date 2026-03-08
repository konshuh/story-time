/**
 * "Calgary to Vancouver" — a wordless animated story.
 *
 * A blonde girl and her dark-haired mother drive to the Calgary airport,
 * eat, board a plane, fly to Vancouver, take a train, and arrive at
 * a blonde friend's little house. No dialog — visuals and music only.
 *
 * Uses Kenney RPG Urban Pack tiles (assets/rpg-urban-tilemap.png) for
 * environments, with custom procedural sprites for characters and vehicles.
 */

import { Animation } from '../engine/animator.js';
import { chars, car, plane, skytrain, extraEnv } from './calgary-custom-tiles.js';
import {
  calgaryDriveMap, airportFoodMap, boardingMap, planeInteriorMap,
  landingMap, trainMap, arrivalMap, rainWalkMap, fairyGardenMap,
  couchTVMap, drawingMap, partyMap, drawMixedMap,
} from './calgary-scenes.js';

export const meta = {
  title: 'Calgary to Vancouver',
  description: 'A mother and daughter fly across the mountains to visit a friend.',
};

/* ── Tilesets: custom procedural ones registered the old way ── */
export const tilesets = {
  chars,
  car,
  plane,
  skytrain,
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

  ctx.drawScene((r) => drawMixedMap(r, calgaryDriveMap));

  const carActor = ctx.addActor({
    name: 'car', tileset: 'car', x: -40, y: 148, cols: 2,
    animations: { drive: new Animation('drive', [{ tiles: [0, 1], duration: 500 }]) },
  });
  carActor.play('drive');

  await ctx.fadeIn(800);

  sound.playMelody([
    [392, 300], [440, 300], [494, 300], [523, 600],
    [494, 300], [440, 300], [392, 600],
  ]);

  await ctx.wait(600);
  await carActor.moveTo(340, 148, 4000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('car');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 2 — Eating at the airport
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, airportFoodMap));

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

  ctx.drawScene((r) => drawMixedMap(r, boardingMap));

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

  girlBoard.moveTo(180, 72, 3500);
  await momBoard.moveTo(150, 70, 3500);

  await ctx.wait(300);
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

  ctx.drawScene((r) => drawMixedMap(r, planeInteriorMap));

  const girlFly = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 16, y: 112, cols: 1,
    animations: { sit: girlSit },
  });
  girlFly.play('sit');

  const momFly = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 48, y: 110, cols: 1,
    animations: { sit: momSit },
  });
  momFly.play('sit');

  await ctx.fadeIn(800);

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

  ctx.drawScene((r) => drawMixedMap(r, landingMap));

  const planeActor = ctx.addActor({
    name: 'plane', tileset: 'plane', x: -50, y: 20, cols: 3,
    animations: {
      fly: new Animation('fly', [{ tiles: [0, 1, 2], duration: 500 }]),
    },
  });
  planeActor.play('fly');

  await ctx.fadeIn(800);

  sound.playMelody([
    [784, 400], [659, 400], [587, 400], [523, 400],
    [440, 400], [392, 600],
  ]);

  await planeActor.moveTo(280, 150, 5000);

  await ctx.wait(300);
  sound.sceneTransition();
  await ctx.fadeOut(600);

  ctx.removeActor('plane');
  await ctx.wait(400);

  /* ═══════════════════════════════════════════════════════════════════
   *  Scene 6 — Taking the SkyTrain
   * ═══════════════════════════════════════════════════════════════════ */

  ctx.drawScene((r) => drawMixedMap(r, trainMap));

  const train = ctx.addActor({
    name: 'train', tileset: 'skytrain', x: -60, y: 72, cols: 3,
    animations: {
      ride: new Animation('ride', [{ tiles: [0, 1, 2], duration: 500 }]),
    },
  });
  train.play('ride');

  await ctx.fadeIn(800);

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

  ctx.drawScene((r) => drawMixedMap(r, arrivalMap));

  const friend = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 140, y: 96, cols: 1,
    animations: { stand: friendStand, wave: friendWave },
  });
  friend.play('stand');

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

  sound.playMelody([
    [392, 300], [440, 300], [494, 300], [523, 300],
    [587, 300], [659, 600],
    [0, 200],
    [523, 300], [587, 300], [659, 300], [784, 900],
  ]);

  girlArrive.moveTo(130, 108, 3500);
  await momArrive.moveTo(150, 106, 3500);

  friend.play('wave');

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
    drawMixedMap(r, rainWalkMap);
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

  sound.ambientWhoosh();

  sound.playMelody([
    [330, 500], [311, 500], [294, 500], [262, 800],
    [0, 300],
    [294, 500], [311, 500], [330, 800],
  ]);

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
    drawMixedMap(r, fairyGardenMap);
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

  sound.playMelody([
    [784, 200], [880, 200], [1047, 300], [880, 200], [784, 300],
    [0, 200],
    [659, 200], [784, 200], [880, 300], [784, 200], [659, 300],
    [0, 200],
    [523, 200], [659, 200], [784, 300], [880, 300], [1047, 500],
  ]);

  girlFairy.moveTo(120, 140, 3000);
  momFairy.moveTo(90, 138, 3000);
  await friendFairy.moveTo(60, 140, 3000);

  await ctx.wait(1500);

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
    drawMixedMap(r, couchTVMap);
    // Animated TV screen flicker
    tvTime++;
    const r1 = Math.sin(tvTime * 0.05) * 30 + 100;
    const g1 = Math.sin(tvTime * 0.07 + 1) * 30 + 130;
    const b1 = Math.sin(tvTime * 0.03 + 2) * 30 + 180;
    r.ctx.globalAlpha = 0.4;
    r.fillRect(130, 35, 12, 7, `rgb(${Math.floor(r1)},${Math.floor(g1)},${Math.floor(b1)})`);
    r.ctx.globalAlpha = 1;
  });

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

  ctx.drawScene((r) => drawMixedMap(r, drawingMap));

  const girlDrawAnim = new Animation('draw', [{ tiles: [26], duration: 1000 }], false);
  const momDrawAnim = new Animation('draw', [{ tiles: [27], duration: 1000 }], false);
  const friendDrawAnim = new Animation('draw', [{ tiles: [28], duration: 1000 }], false);

  const girlDraw = ctx.addActor({
    name: 'girl', tileset: 'chars', x: 80, y: 86, cols: 1,
    animations: { draw: girlDrawAnim },
  });
  girlDraw.play('draw');

  const momDraw = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 112, y: 84, cols: 1,
    animations: { draw: momDrawAnim },
  });
  momDraw.play('draw');

  const friendDraw = ctx.addActor({
    name: 'friend', tileset: 'chars', x: 160, y: 86, cols: 1,
    animations: { draw: friendDrawAnim },
  });
  friendDraw.play('draw');

  await ctx.fadeIn(800);

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

  ctx.drawScene((r) => drawMixedMap(r, partyMap));

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

  const momParty = ctx.addActor({
    name: 'mom', tileset: 'chars', x: 190, y: 120, cols: 1,
    animations: { stand: new Animation('stand', [{ tiles: [3], duration: 1000 }]) },
  });
  momParty.play('stand');

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
  sound.playTone(1200, 0.05, 'square', 0.2);
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
