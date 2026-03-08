/**
 * Scene maps for "Calgary to Vancouver" using Kenney RPG Urban Pack tiles
 * mixed with custom extra environment tiles.
 *
 * Tileset references:
 *   'env'   — Kenney RPG Urban Pack (27 cols × 18 rows)
 *   'extra' — Custom procedural tiles (16 cols × 2 rows)
 *
 * Kenney tile index = row * 27 + col
 * Extra tile index  = row * 16 + col
 */

import * as K from './calgary-tiles.js';

// ── Extra tileset indices (from calgary-custom-tiles.js extraEnv) ──
// Row 0: 0=sky, 1=cloud, 2=mtn, 3=mtn2, 4=mtnFar, 5=mtnTrees, 6=sun, 7=cloud2
//        8=vanSkyline, 9=lightSky, 10=darkSky, 11=darkCloud, 12=tower
//        13=beam, 14=pillar, 15=planeBody
// Row 1: 16=planeNose, 17=planeTail, 18=planeCeiling, 19=planeWindow
//        20=planeWall, 21=planeSeat, 22=planeFloor, 23=runway
//        24=jetwayTop, 25=jetwayFloor, 26=jetwayBot
//        27=lampPost, 28=darkBldg, 29=darkBldgTop, 30=darkTallBldg, 31=puddle

const X = {
  SKY: 0, CLOUD: 1, MTN: 2, MTN2: 3, MTN_FAR: 4, MTN_TREES: 5,
  SUN: 6, CLOUD2: 7, VAN_SKY: 8, LIGHT_SKY: 9,
  DARK_SKY: 10, DARK_CLOUD: 11, TOWER: 12,
  BEAM: 13, PILLAR: 14, PLANE_BODY: 15,
  PLANE_NOSE: 16, PLANE_TAIL: 17,
  PLANE_CEIL: 18, PLANE_WIN: 19, PLANE_WALL: 20,
  PLANE_SEAT: 21, PLANE_FLOOR: 22, RUNWAY: 23,
  JETWAY_TOP: 24, JETWAY_FLOOR: 25, JETWAY_BOT: 26,
  LAMP: 27, DARK_BLDG: 28, DARK_BLDG_TOP: 29, DARK_TALL: 30, PUDDLE: 31,
};

// ── Kenney tile shortcuts ──
const G  = K.GRASS_PLAIN;    // grass
const GD = K.GRASS_DETAIL;   // grass with detail
const RH = K.ROAD_H;         // road horizontal
const RP = K.ROAD_PLAIN;     // road plain
const SW = K.SIDEWALK;        // sidewalk
const FW = K.FACADE_WIN;      // facade with window
const FP = K.FACADE_PLAIN;    // facade plain
const FD = K.FACADE_DOOR;     // facade door
const BT = K.BLDG_TOP;        // building top
const BM = K.BLDG_MID;        // building middle
const BB = K.BLDG_BOT;        // building bottom
const TT = K.TREE_SM_T;       // small tree top
const TB = K.TREE_SM_B;       // small tree bottom
const BU = K.BUSH;            // bush
const WA = K.WATER;           // water
const FL = K.FLOOR_TILE;      // tiled floor (airport)
const WP = K.WALL_PLAIN;      // interior wall plain
const WW = K.WALL_WINDOW;     // wall with window
const FLW = K.FLOOR_WOOD;     // wood floor
const CL = K.COUCH_L;         // couch left
const CR = K.COUCH_R;         // couch right
const TV = K.TV_SET;           // TV
const PA = K.PAINTING;         // painting
const BKT = K.BOOKSHELF_T;    // bookshelf top
const BKB = K.BOOKSHELF_B;    // bookshelf bottom
const CU = K.CURTAIN;         // curtain
const RU = K.RUG;             // rug
const PL = K.PLANT;           // plant
const DE = K.DESK;            // desk
const CH = K.CHAIR;           // chair
const CA = K.CARPET;          // carpet
const SH = K.SHELF;           // shelf
const DR = K.DOOR;            // door
const R_TL = K.ROOF_TL;
const R_T  = K.ROOF_T;
const R_TR = K.ROOF_TR;
const R_ML = K.ROOF_ML;
const R_M  = K.ROOF_M;
const R_MR = K.ROOF_MR;
const R_BL = K.ROOF_BL;
const R_B  = K.ROOF_B;
const R_BR = K.ROOF_BR;
const FN_L = K.FENCE_L;
const FN_M = K.FENCE_M;
const FN_R = K.FENCE_R;
const SI   = K.SIGN;
const LA   = K.LAMP;
const BE   = K.BENCH;
const SG   = K.SHOP_TOP;
const SB   = K.SHOP_BOT;
const SD   = K.SHOP_DOOR;

// ── Scene Maps ──

// Each scene uses a combination of Kenney 'env' tiles and 'extra' custom tiles.
// We encode which tileset a tile belongs to via a wrapper.
// The draw function will handle dispatching to the correct tileset.

// For simplicity in map arrays, we'll use negative numbers for 'extra' tileset
// (actual index = -(value) - 1) and positive for Kenney 'env' tileset.
function e(idx) { return -(idx) - 1; } // encode extra tile

// ── Scene 1: Driving through Calgary ──
export const calgaryDriveMap = [
  [e(X.SUN),  e(X.SKY),  e(X.SKY),  e(X.SKY), e(X.CLOUD),e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),e(X.CLOUD2),e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),e(X.CLOUD),e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  BT,  e(X.SKY),  e(X.SKY),  BT,  e(X.SKY),e(X.TOWER),e(X.SKY),  BT,  e(X.SKY),  BT,  e(X.SKY),  e(X.SKY),  BT,  e(X.SKY),  e(X.SKY),  BT,  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY),  BM,  e(X.SKY),e(X.TOWER),e(X.SKY),  BM,  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY),  BM,  e(X.SKY),  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY),  BM,  e(X.SKY),e(X.TOWER),e(X.SKY),  BM,  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY),  BM,  e(X.SKY),  e(X.SKY),  FW,  e(X.SKY),  e(X.SKY)],
  [e(X.SKY),  e(X.SKY),  FD,  e(X.SKY),  e(X.SKY),  BB,  e(X.SKY),e(X.TOWER),e(X.SKY),  BB,  e(X.SKY),  FD,  e(X.SKY),  e(X.SKY),  BB,  e(X.SKY),  e(X.SKY),  FD,  e(X.SKY),  e(X.SKY)],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW,  SW],
  [RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH],
  [RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
];

// ── Scene 2: Airport food court ──
export const airportFoodMap = [
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP],
  [WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP],
  [WP,  WP,  WP,  SI,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  SI,  WP,  WP,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  DE,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL],
];

// ── Scene 3: Boarding the plane ──
const JT = e(X.JETWAY_TOP);
const JF = e(X.JETWAY_FLOOR);
const JB = e(X.JETWAY_BOT);
const PB = e(X.PLANE_BODY);
const PN = e(X.PLANE_NOSE);
const PT = e(X.PLANE_TAIL);
const SK = e(X.SKY);

export const boardingMap = [
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  SK,  SK,  SK,  SK,  SK,  SK],
  [WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  WW,  WP,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WP,  WP,  WP,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  PT,  PB,  PB,  PB,  PB,  PN,  SK],
  [FL,  FL,  FL,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  PT,  PB,  PB,  PB,  PB,  PN,  SK],
  [FL,  FL,  FL,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  G,   G,   G,   G,   G,   G,   G],
  [FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  FL,  G,   G,   G,   G,   G,   G,   G,   G],
];

// ── Scene 4: Plane interior ──
const PC = e(X.PLANE_CEIL);
const PW = e(X.PLANE_WIN);
const PI = e(X.PLANE_WALL);
const PS = e(X.PLANE_SEAT);
const PF = e(X.PLANE_FLOOR);

export const planeInteriorMap = [
  [PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC],
  [PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC],
  [PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC,  PC],
  [PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW],
  [PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW,  PI,  PI,  PW],
  [PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI],
  [PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI],
  [PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI,  PI],
  [PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS],
  [PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS,  PI,  PI,  PS],
  [PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF],
  [PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF],
  [PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF],
  [PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF],
  [PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF,  PF],
];

// ── Scene 5: Landing in Vancouver ──
const LS = e(X.LIGHT_SKY);
const MN = e(X.MTN);
const M2 = e(X.MTN2);
const MF = e(X.MTN_FAR);
const VS = e(X.VAN_SKY);
const RW = e(X.RUNWAY);

export const landingMap = [
  [SK,  SK,  SK,e(X.CLOUD),SK,  SK,  SK,  SK,e(X.CLOUD2),SK,  SK,  SK,  SK,e(X.CLOUD),SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS],
  [MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [VS,  VS,  WA,  WA,  WA,  WA,  VS,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  VS,  VS,  WA,  WA,  WA,  WA],
  [WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA],
  [WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA],
  [WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA],
  [WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [RW,  RW,  RP,  RP,  RP,  RW,  RW,  RP,  RP,  RP,  RP,  RW,  RW,  RP,  RP,  RP,  RP,  RW,  RW,  RP],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
];

// ── Scene 6: SkyTrain ──
const BEA = e(X.BEAM);
const PIL = e(X.PILLAR);
const MT  = e(X.MTN_TREES);

export const trainMap = [
  [SK,  SK,  SK,  SK,e(X.CLOUD),SK,  SK,  SK,e(X.CLOUD2),SK,  SK,  SK,  SK,e(X.CLOUD),SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [MF,  MF,  MN,  M2,  MF,  MT,  M2,  MF,  MF,  MN,  M2,  MF,  MN,  M2,  MT,  MF,  MN,  M2,  MF,  MN],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [VS,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  VS],
  [BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA, BEA],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [PIL, SK,  SK,  SK,  SK,  PIL, SK,  SK,  SK,  SK,  PIL, SK,  SK,  SK,  SK,  PIL, SK,  SK,  SK,  PIL],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
];

// ── Scene 7: Arriving at friend's house ──
export const arrivalMap = [
  [SK,  SK,  SK,  SK,e(X.CLOUD),SK,  SK,  SK,  SK,e(X.SUN),SK,  SK,  SK,e(X.CLOUD2),SK,  SK,  SK,  SK,e(X.CLOUD),SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK, R_TL,R_T, R_T, R_TR, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [G,   G,   G,   TT,  G,   G,   G, R_BL,R_B, R_B, R_BR, G,   G,   G,   G,   G,   G,   TT,  G,   G],
  [G,   G,   G,   TB,  G,   G,   G,   FW,  FW,  FD,  FW,  FW,  G,   G,   G,   G,   G,   TB,  G,   G],
  [G,   G,   G,   G,   G,   G,   G,   FP,  FP,  DR,  FP,  FP,  G,   G,   G,   G,   G,   G,   G,   G],
  [FN_L,FN_M,FN_M,FN_M,FN_R,G,   G,   G,   G,   GD,  G,   G,   G,   G,  FN_L,FN_M,FN_M,FN_M,FN_M,FN_R],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   GD,  G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [BU,  G,   G,   G,   G,   G,   G,   G,   G,   GD,  G,   G,   G,   G,   G,   G,   BU,  G,   G,   G],
  [G,   G,   G,   G,   BU,  G,   G,   G,   G,   GD,  G,   G,   G,   BU,  G,   G,   G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   GD,  GD,  GD,  GD,  GD,  G,   G,   G,   G,   G,   G,   G,   G],
  [GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  G,   G,   G,   GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
];

// ── Scene 8: Walking in the rain ──
const DS = e(X.DARK_SKY);
const DC = e(X.DARK_CLOUD);
const DB = e(X.DARK_BLDG);
const DT = e(X.DARK_BLDG_TOP);
const DH = e(X.DARK_TALL);
const LP = e(X.LAMP);
const PD = e(X.PUDDLE);
const WS = K.SIDEWALK_EDGE;  // wet sidewalk (reuse)
const WR = K.ROAD_DASH;      // wet road (reuse)
const DG = K.GRASS_EDGE_B;   // dark grass (reuse)

export const rainWalkMap = [
  [DC,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS],
  [DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DC,  DS,  DS,  DS,  DS,  DS,  DC,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [DS,  DS,  DT,  DS,  DS,  DH,  DS,  DS,  DS,  DT,  DS,  DS,  DS,  DH,  DS,  DS,  DS,  DT,  DS,  DS],
  [DS,  DS,  DB,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS],
  [DS,  DS,  DB,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS],
  [DS,  DS,  DB,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS],
  [DS,  DS,  DB,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS],
  [DS,  DS,  DB,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS,  DS,  DH,  DS,  LP,  DS,  DB,  DS,  DS],
  [DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG],
  [SW,  SW,  SW,  PD,  SW,  SW,  SW,  SW,  SW,  SW,  PD,  SW,  SW,  SW,  SW,  SW,  SW,  PD,  SW,  SW],
  [RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH,  RH],
  [RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP,  RP],
  [SW,  SW,  PD,  SW,  SW,  SW,  SW,  PD,  SW,  SW,  SW,  SW,  SW,  PD,  SW,  SW,  SW,  SW,  SW,  PD],
  [DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG,  DG],
];

// ── Scene 9: Fairy garden (uses Kenney trees + procedural overlays) ──
export const fairyGardenMap = [
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  SK,  SK,  SK,  TT,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  TT,  SK,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  SK],
  [SK,  SK,  TB,  SK,  SK,  TT,  TB,  TT,  TB,  TT,  SK,  TB,  SK,  SK,  TB,  SK,  SK,  TB,  SK,  SK],
  [SK,  SK,  G,   SK,  SK,  TB,  G,   TB,  G,   TB,  SK,  G,   SK,  TT,  G,   TT,  SK,  G,   SK,  SK],
  [G,   G,   G,   G,   BU,  G,   G,   G,   G,   G,   BU,  G,   G,   TB,  G,   TB,  G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [FN_L,FN_M,FN_M,FN_M,FN_R,G,   G,   G,   G,   G,   G,   G,   G,   G,   G,  FN_L,FN_M,FN_M,FN_M,FN_R],
  [G,   G,   BU,  G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   BU,  G,   G,   G,   BU,  G,   G],
  [GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD],
  [GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD,  GD],
  [G,   G,   G,   G,   BU,  G,   G,   G,   G,   BU,  G,   G,   G,   G,   G,   BU,  G,   G,   G,   G],
  [G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G,   G],
  [G,   G,   TT,  G,   G,   G,   G,   G,   TT,  G,   G,   G,   G,   TT,  G,   G,   G,   G,   TT,  G],
  [G,   G,   TB,  G,   G,   G,   G,   G,   TB,  G,   G,   G,   G,   TB,  G,   G,   G,   G,   TB,  G],
];

// ── Scene 10: Couch & TV ──
const WPL = K.WALL_2;  // wall variant

export const couchTVMap = [
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WP,  BKT, WP,  CU,  WP,  WP,  PA,  WP,  TV,  TV,  WP,  PA,  WP,  WP,  CU,  WP,  BKT, WP,  PL,  WP],
  [WP,  BKB, WP,  CU,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  CU,  WP,  BKB, WP,  PL,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, DE,  DE,  FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, CL,  CR,  FLW, FLW, FLW, CL,  CR,  FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  RU,  FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
];

// ── Scene 11: Drawing together ──
export const drawingMap = [
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [PA,  WP,  PA,  WP,  PA,  WP,  PA,  WP,  PA,  WP,  WP,  PA,  WP,  PA,  WP,  PA,  WP,  PA,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, DE,  DE,  DE,  DE,  DE,  DE,  FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, DE,  DE,  DE,  DE,  DE,  DE,  FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
];

// ── Scene 12: Party ──
export const partyMap = [
  [WP,  PA,  PA,  PA,  PA,  PA,  PA,  PA,  WP,  PA,  PA,  PA,  PA,  PA,  PA,  PA,  WP,  PA,  PA,  PA],
  [PA,  WP,  WP,  PA,  WP,  WP,  PA,  WP,  WP,  PA,  WP,  WP,  PA,  WP,  WP,  PA,  WP,  WP,  PA,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [WP,  PA,  WP,  WP,  WP,  WP,  PA,  WP,  WP,  WP,  WP,  PA,  WP,  WP,  WP,  WP,  PA,  WP,  WP,  WP],
  [WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP,  WP],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, DE,  FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
  [FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW, FLW],
];

/**
 * Draw a scene map that supports mixed tilesets.
 * Positive values = Kenney 'env' tileset indices.
 * Negative values = custom 'extra' tileset indices (decoded as -(val)-1).
 */
export function drawMixedMap(renderer, map) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const val = map[row][col];
      if (val >= 0) {
        renderer.drawTileAt('env', val, col, row);
      } else {
        renderer.drawTileAt('extra', -(val) - 1, col, row);
      }
    }
  }
}
