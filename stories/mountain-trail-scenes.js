/**
 * Scene maps for "The Mountain Trail".
 *
 * Reuses the same dual-tileset system as Calgary scenes:
 *   'env'   — Kenney RPG Urban Pack (27 cols × 18 rows)
 *   'extra' — Custom procedural tiles (16 cols × 2 rows)
 *
 * Positive values → Kenney 'env' tile index
 * Negative values → custom 'extra' tile index (decoded as -(val)-1)
 */

import * as K from './calgary-tiles.js';
import { drawMixedMap } from './calgary-scenes.js';

// Encode extra tileset index
function e(idx) { return -(idx) - 1; }

// ── Extra tileset shorthand ──
const SK  = e(0);   // sky
const CL  = e(1);   // cloud
const MN  = e(2);   // mountain
const M2  = e(3);   // mountain variant
const MF  = e(4);   // mountain far
const MT  = e(5);   // mountain w/ trees
const SUN = e(6);   // sun
const CL2 = e(7);   // cloud variant
const VS  = e(8);   // Vancouver skyline
const LS  = e(9);   // light sky (horizon)
const DS  = e(10);  // dark sky (rain)
const DC  = e(11);  // dark cloud
const LP  = e(27);  // lamp post (rain)
const DB  = e(28);  // dark building (rain)
const DT  = e(29);  // dark bldg top (rain)
const DH  = e(30);  // dark tall bldg (rain)
const PD  = e(31);  // puddle

// ── Kenney tile shorthand ──
const GF  = K.GRASS_FILL1;
const GF2 = K.GRASS_FILL2;
const GC  = K.GRASS_C;
const GT  = K.GRASS_T;
const GB  = K.GRASS_B;
const GL  = K.GRASS_L;
const GR  = K.GRASS_R;
const GTL = K.GRASS_TL;
const GTR = K.GRASS_TR;
const GBL = K.GRASS_BL;
const GBR = K.GRASS_BR;
const PHF = K.PATH_FILL1;
const PH  = K.PATH_C;
const PT2 = K.PATH_T;
const PB2 = K.PATH_B;
const WC  = K.WALL_C;
const WL  = K.WALL_L;
const WR2 = K.WALL_R;
const WT  = K.WALL_T;
const WB  = K.WALL_B;
const WTL = K.WALL_TL;
const WTR = K.WALL_TR;
const WBL = K.WALL_BL;
const WBR = K.WALL_BR;
const FC  = K.FLOOR_C;
const FL  = K.FLOOR_L;
const FR  = K.FLOOR_R;
const FT  = K.FLOOR_T;
const FB  = K.FLOOR_B;
const FTL = K.FLOOR_TL;
const FTR = K.FLOOR_TR;
const FBL = K.FLOOR_BL;
const FBR = K.FLOOR_BR;
const WA  = K.WATER_FILL1;
const WA2 = K.WATER_FILL2;
const WAT = K.WATER_T;
const WAB = K.WATER_B;
const TT  = K.TREE_SM_T;
const TB  = K.TREE_SM_B;
const BU  = K.TREE_BUSH;
const RTL = K.ROOF_RED_TL;
const RT  = K.ROOF_RED_T;
const RTR = K.ROOF_RED_TR;
const RBL = K.ROOF_RED_BL;
const RB  = K.ROOF_RED_B;
const RBR = K.ROOF_RED_BR;
const OBT = K.BLDG_ORG_T;
const OBM = K.BLDG_ORG_M;
const GD  = K.GRASS_DET_TL;
const DE  = K.FLOOR_EXT5;
const FE1 = K.FLOOR_EXT1;
const FE2 = K.FLOOR_EXT2;

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 1: Setting out from a small town
 *  Sky + buildings + grass + path
 * ═══════════════════════════════════════════════════════════════════════ */
export const townStartMap = [
  [SUN, SK,  SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  CL2, SK,  SK,  SK,  SK,  CL,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK, RTL, RT, RTR, SK,  SK,  SK,  SK,  SK,  SK, RTL, RT, RTR, SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK, RBL, RB, RBR, SK,  SK,  SK,  SK,  SK,  SK, RBL, RB, RBR, SK,  SK,  SK,  SK],
  [SK,  TT,  SK,  SK, OBT,OBM,OBT, SK,  SK,  SK,  TT,  SK,  SK, OBT,OBM,OBT, SK,  SK,  TT,  SK],
  [GF,  TB,  GF,  GF, OBM,OBM,OBM, GF,  GF,  GF,  TB,  GF,  GF, OBM,OBM,OBM, GF,  GF,  TB,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 2: Hiking through the forest
 *  Dense trees, bushes, narrow path
 * ═══════════════════════════════════════════════════════════════════════ */
export const forestHikeMap = [
  [SK,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  SK],
  [SK,  TT,  SK,  TB,  TT,  TB,  SK,  TT,  TB,  SK,  TT,  TB,  SK,  TT,  TB,  TT,  TB,  SK,  TT,  SK],
  [SK,  TB,  SK,  GF,  TB,  GF,  SK,  TB,  GF,  TT,  TB,  GF,  TT,  TB,  GF,  TB,  GF,  SK,  TB,  SK],
  [GF,  GF,  TT,  GF,  GF,  GF,  TT,  GF,  GF,  TB,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  TT,  GF,  GF],
  [GF,  GF,  TB,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  TB,  GF,  GF],
  [GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  BU,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  BU,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  BU,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF],
  [GF,  GF,  GF,  TT,  GF,  GF,  TT,  GF,  GF,  GF,  TT,  GF,  GF,  TT,  GF,  GF,  TT,  GF,  GF,  GF],
  [GF,  GF,  GF,  TB,  GF,  GF,  TB,  GF,  GF,  GF,  TB,  GF,  GF,  TB,  GF,  GF,  TB,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 3: Crossing a river
 *  Water in the middle, grass banks, path crossing
 * ═══════════════════════════════════════════════════════════════════════ */
export const riverCrossingMap = [
  [SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK, CL2, SK,  SK,  SK,  SK,  SK,  SK,  SK,  CL,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [MF,  MF,  MN,  M2,  MT,  MN,  MF,  M2,  MF,  MN,  MT,  MF,  M2,  MN,  MF,  MT,  MN,  M2,  MF,  MF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  TT,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  TT,  GF,  GF],
  [GF,  GF,  TB,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  TB,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, PHF, PHF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA, PHF, PHF, PHF, PHF, WA,  WA,  WA,  WA,  WA,  WA,  WA,  WA],
  [WA,  WA2, WA,  WA2, WA,  WA,  WA2, WA, PHF, PHF, PHF, PHF, WA,  WA2, WA,  WA,  WA2, WA,  WA,  WA2],
  [WA,  WA,  WA2, WA,  WA,  WA2, WA,  WA, PHF, PHF, PHF, PHF, WA,  WA,  WA2, WA,  WA,  WA,  WA2, WA],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, PHF, PHF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 4: Mountain ascent
 *  Mountains filling the background, narrow path, dramatic sky
 * ═══════════════════════════════════════════════════════════════════════ */
export const mountainAscentMap = [
  [SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  CL2, SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF,  MF],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [MT,  MN,  MT,  MN,  MN,  MT,  MN,  MN,  MT,  MN,  MT,  MN,  MN,  MT,  MN,  MN,  MT,  MN,  MN,  MT],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 5: Summit view
 *  Mountain peaks all around, sky and clouds, panoramic view
 * ═══════════════════════════════════════════════════════════════════════ */
export const summitViewMap = [
  [SK,  SK,  CL,  SK,  SK,  SUN, SK,  SK,  CL2, SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK,  CL2, SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS],
  [MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [MT,  MN,  MT,  MT,  MN,  MT,  MT,  MN,  MT,  MT,  MN,  MT,  MT,  MN,  MT,  MT,  MN,  MT,  MT,  MN],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, PHF, PHF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GD,  GF,  GF,  GF,  GF,  GD,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GD,  GF,  GF,  GF,  GD,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 6: Sudden rain on the descent
 *  Dark sky, rain, umbrellas, mountain path
 * ═══════════════════════════════════════════════════════════════════════ */
export const rainyDescentMap = [
  [DC,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS],
  [DS,  DS,  DC,  DS,  DS,  DS,  DC,  DS,  DS,  DC,  DS,  DS,  DS,  DS,  DS,  DC,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS,  DS],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PD,  PHF, PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PD],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 7: Shelter in a cabin
 *  Interior walls + floor, cozy
 * ═══════════════════════════════════════════════════════════════════════ */
export const cabinShelterMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR],
  [FTL, FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT, FTR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  DE,  DE,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  DE,  DE,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC, FE1, FE2, FC,  FC,  FC,  FC,  FC, FE1, FE2, FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB, FBR],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 8: Sunset return — walking home through meadow
 *  Warm sky, light horizon, mountains in distance, grass and flowers
 * ═══════════════════════════════════════════════════════════════════════ */
export const sunsetReturnMap = [
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  CL2, SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS,  LS],
  [MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN,  M2,  MF,  MF,  MN,  M2,  MF,  MN],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  TT,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  TT,  GF,  GF],
  [GF,  GF,  TB,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  TB,  GF,  GF],
];

export { drawMixedMap };
