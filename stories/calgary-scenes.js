/**
 * Scene maps for "Calgary to Vancouver".
 *
 * Two tilesets:
 *   'env'   — Kenney RPG Urban Pack (27 cols × 18 rows)
 *   'extra' — Custom procedural tiles (16 cols × 2 rows)
 *
 * Positive values → Kenney 'env' tile index
 * Negative values → custom 'extra' tile index (decoded as -(val)-1)
 */

import * as K from './calgary-tiles.js';

// Encode extra tileset index (negative to distinguish from Kenney)
function e(idx) { return -(idx) - 1; }

// ── Extra tileset indices (from calgary-custom-tiles.js extraEnv()) ──
// Row 0: 0=sky, 1=cloud, 2=mtn, 3=mtn2, 4=mtnFar, 5=mtnTrees, 6=sun, 7=cloud2
//        8=vanSkyline, 9=lightSky, 10=darkSky, 11=darkCloud, 12=tower
//        13=beam, 14=pillar, 15=planeBody
// Row 1: 16=planeNose, 17=planeTail, 18=planeCeiling, 19=planeWindow
//        20=planeWall, 21=planeSeat, 22=planeFloor, 23=runway
//        24=jetwayTop, 25=jetwayFloor, 26=jetwayBot
//        27=lampPost, 28=darkBldg, 29=darkBldgTop, 30=darkTallBldg, 31=puddle

// ── Shorthand: procedural extra tiles ──
const SK  = e(0);   // sky
const CL  = e(1);   // cloud
const MN  = e(2);   // mountain
const M2  = e(3);   // mountain variant
const MF  = e(4);   // mountain far
const MT  = e(5);   // mountain w/ trees
const SUN = e(6);   // sun
const CL2 = e(7);   // cloud variant
const VS  = e(8);   // Vancouver skyline
const LS  = e(9);   // light sky
const DS  = e(10);  // dark sky (rain)
const DC  = e(11);  // dark cloud
const TW  = e(12);  // Calgary Tower
const BEA = e(13);  // elevated track beam
const PIL = e(14);  // elevated track pillar
const PB  = e(15);  // plane body bg
const PN  = e(16);  // plane nose
const PT  = e(17);  // plane tail
const PC  = e(18);  // plane ceiling
const PW  = e(19);  // plane window
const PI  = e(20);  // plane interior wall
const PS  = e(21);  // plane seat
const PF  = e(22);  // plane floor
const RW  = e(23);  // runway
const JT  = e(24);  // jetway top
const JF  = e(25);  // jetway floor
const JB  = e(26);  // jetway bottom
const LP  = e(27);  // lamp post (rain)
const DB  = e(28);  // dark building (rain)
const DT  = e(29);  // dark bldg top (rain)
const DH  = e(30);  // dark tall bldg (rain)
const PD  = e(31);  // puddle

// ── Shorthand: Kenney tiles ──
const GF  = K.GRASS_FILL1;   // 5  — solid green fill
const GF2 = K.GRASS_FILL2;   // 6
const GC  = K.GRASS_C;       // 28 — grass center w/ border detail
const GT  = K.GRASS_T;       // 1  — grass top edge
const GB  = K.GRASS_B;       // 55 — grass bottom edge
const GL  = K.GRASS_L;       // 27 — grass left edge
const GR  = K.GRASS_R;       // 29 — grass right edge
const GTL = K.GRASS_TL;      // 0  — grass top-left corner
const GTR = K.GRASS_TR;      // 2
const GBL = K.GRASS_BL;      // 54
const GBR = K.GRASS_BR;      // 56
const PH  = K.PATH_C;        // 109 — path center (beige)
const PHF = K.PATH_FILL1;    // 86  — path solid fill
const PT2 = K.PATH_T;        // 82  — path top edge
const PB2 = K.PATH_B;        // 136 — path bottom edge
const WC  = K.WALL_C;        // 36  — wall center (gray fill)
const WL  = K.WALL_L;        // 35
const WR2 = K.WALL_R;        // 37
const WT  = K.WALL_T;        // 9
const WB  = K.WALL_B;        // 63
const WTL = K.WALL_TL;       // 8
const WTR = K.WALL_TR;       // 10
const WBL = K.WALL_BL;       // 62
const WBR = K.WALL_BR;       // 64
const FC  = K.FLOOR_C;       // 117 — floor center (warm beige)
const FL  = K.FLOOR_L;       // 116
const FR  = K.FLOOR_R;       // 118
const FT  = K.FLOOR_T;       // 90
const FB  = K.FLOOR_B;       // 144
const FTL = K.FLOOR_TL;      // 89
const FTR = K.FLOOR_TR;      // 91
const FBL = K.FLOOR_BL;      // 143
const FBR = K.FLOOR_BR;      // 145
const WA  = K.WATER_FILL1;   // 175 — water solid fill
const WA2 = K.WATER_FILL2;   // 176
const WAT = K.WATER_T;       // 171 — water top edge
const WAB = K.WATER_B;       // 198 — water bottom
const TT  = K.TREE_SM_T;     // 234 — small tree top
const TB  = K.TREE_SM_B;     // 261 — small tree bottom
const BU  = K.TREE_BUSH;     // 235 — bush
const RTL = K.ROOF_RED_TL;   // 17  — red roof top-left
const RT  = K.ROOF_RED_T;    // 18  — red roof top
const RTR = K.ROOF_RED_TR;   // 19  — red roof top-right
const RBL = K.ROOF_RED_BL;   // 71  — red roof bottom-left
const RB  = K.ROOF_RED_B;    // 72  — red roof bottom
const RBR = K.ROOF_RED_BR;   // 73  — red roof bottom-right
const RML = K.ROOF_RED_ML;   // 44  — red roof mid-left
const RM  = K.ROOF_RED_M;    // 45  — red roof middle (fill)
const RMR = K.ROOF_RED_MR;   // 46
const OBT = K.BLDG_ORG_T;   // 125 — orange building top
const OBM = K.BLDG_ORG_M;   // 152 — orange building middle
const GD  = K.GRASS_DET_TL;  // 3   — grass with detail
const PA  = K.FLOOR_EXT3;    // 94  — blue-gray accent tile
const FE1 = K.FLOOR_EXT1;    // 92
const FE2 = K.FLOOR_EXT2;    // 93
const DE  = K.FLOOR_EXT5;    // 119 — desk/furniture area

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 1: Driving through Calgary
 *  Sky + procedural buildings/tower, Kenney grass ground, procedural road
 * ═══════════════════════════════════════════════════════════════════════ */
export const calgaryDriveMap = [
  [SUN, SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK, CL2, SK,  SK,  SK,  SK,  CL,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK, OBT, SK,  SK, OBT, SK,  TW,  SK, OBT, SK, OBT, SK,  SK, OBT, SK,  SK, OBT, SK,  SK],
  [SK,  SK, OBM, SK,  SK, OBM, SK,  TW,  SK, OBM, SK, OBM, SK,  SK, OBM, SK,  SK, OBM, SK,  SK],
  [SK,  SK, OBM, SK,  SK, OBM, SK,  TW,  SK, OBM, SK, OBM, SK,  SK, OBM, SK,  SK, OBM, SK,  SK],
  [SK,  SK, OBM, SK,  SK, OBM, SK,  TW,  SK, OBM, SK, OBM, SK,  SK, OBM, SK,  SK, OBM, SK,  SK],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 2: Airport food court
 *  Kenney interior walls (top) + Kenney floor tiles (bottom)
 * ═══════════════════════════════════════════════════════════════════════ */
export const airportFoodMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR],
  [FTL, FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT, FTR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  DE,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB, FBR],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 3: Boarding the plane
 *  Kenney walls/floor (left), procedural jetway + plane (right), sky
 * ═══════════════════════════════════════════════════════════════════════ */
export const boardingMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FTL, FT,  FT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  JT,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  PT,  PB,  PB,  PB,  PB,  PN,  SK],
  [FL,  FC,  FC,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  PT,  PB,  PB,  PB,  PB,  PN,  SK],
  [FL,  FC,  FC,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  JF,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  JB,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  SK,  SK,  SK,  SK,  SK,  SK],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 4: Plane interior (all procedural)
 * ═══════════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 5: Landing in Vancouver
 *  Procedural sky/mountains, Kenney water + grass, procedural runway
 * ═══════════════════════════════════════════════════════════════════════ */
export const landingMap = [
  [SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK, CL2, SK,  SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK],
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
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [RW,  RW, PHF, PHF, PHF, RW,  RW, PHF, PHF, PHF, PHF, RW,  RW, PHF, PHF, PHF, PHF, RW,  RW, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 6: SkyTrain
 *  Procedural sky/mountains/beam/pillar, Kenney grass ground
 * ═══════════════════════════════════════════════════════════════════════ */
export const trainMap = [
  [SK,  SK,  SK,  SK,  CL,  SK,  SK,  SK, CL2, SK,  SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [MF,  MF,  MN,  M2,  MF,  MT,  M2,  MF,  MF,  MN,  M2,  MF,  MN,  M2,  MT,  MF,  MN,  M2,  MF,  MN],
  [MN,  M2,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN,  MN,  M2,  MN,  MN,  MN,  M2,  MN],
  [VS,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  VS],
  [BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA,BEA],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [PIL, SK,  SK,  SK,  SK, PIL, SK,  SK,  SK,  SK, PIL, SK,  SK,  SK,  SK, PIL, SK,  SK,  SK, PIL],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 7: Arriving at friend's house
 *  Sky, Kenney grass/trees/roof, procedural path
 * ═══════════════════════════════════════════════════════════════════════ */
export const arrivalMap = [
  [SK,  SK,  SK,  SK,  CL,  SK,  SK,  SK,  SK, SUN, SK,  SK,  SK, CL2, SK,  SK,  SK,  SK,  CL,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  SK, RTL, RT,  RT, RTR, SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [GF,  GF,  GF,  TT,  GF,  GF,  GF, RBL, RB,  RB, RBR, GF,  GF,  GF,  GF,  GF,  GF,  TT,  GF,  GF],
  [GF,  GF,  GF,  TB,  GF,  GF,  GF, OBT, OBM, OBM, OBT, GF,  GF,  GF,  GF,  GF,  GF,  TB,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF, OBM, OBM, OBM, OBM, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [BU,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF, PHF, GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF, PHF, PHF, PHF, PHF, PHF, GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, GF,  GF,  GF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 8: Walking in the rain
 *  Procedural dark sky/buildings/rain, Kenney grass + path for ground
 * ═══════════════════════════════════════════════════════════════════════ */
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
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PHF, PD,  PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PD,  PHF, PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PD,  PHF, PHF, PHF, PHF, PHF, PD],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 9: Fairy garden
 *  Sky, Kenney trees/bushes/grass
 * ═══════════════════════════════════════════════════════════════════════ */
export const fairyGardenMap = [
  [SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  SK,  SK,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  SK,  SK,  SK,  TT,  SK,  SK,  SK,  SK,  SK],
  [SK,  SK,  TT,  SK,  SK,  SK,  TT,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  SK,  TT,  SK,  SK],
  [SK,  SK,  TB,  SK,  SK,  TT,  TB,  TT,  TB,  TT,  SK,  TB,  SK,  SK,  TB,  SK,  SK,  TB,  SK,  SK],
  [SK,  SK,  GF,  SK,  SK,  TB,  GF,  TB,  GF,  TB,  SK,  GF,  SK,  TT,  GF,  TT,  SK,  GF,  SK,  SK],
  [GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  TB,  GF,  TB,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  BU,  GF,  GF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF, PHF],
  [GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF,  GF,  BU,  GF,  GF,  GF,  GF],
  [GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF,  GF],
  [GF,  GF,  TT,  GF,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  TT,  GF,  GF,  GF,  GF,  TT,  GF],
  [GF,  GF,  TB,  GF,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  TB,  GF,  GF,  GF,  GF,  TB,  GF],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 10: Couch & TV
 *  Kenney interior walls (top) + Kenney wood floor (bottom)
 * ═══════════════════════════════════════════════════════════════════════ */
export const couchTVMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR],
  [FTL, FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT, FTR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  DE,  DE,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FE1, FE2, FC,  FC,  FC,  FE1, FE2, FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB, FBR],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 11: Drawing together
 *  Kenney walls (top) + Kenney floor (bottom) + desk area
 * ═══════════════════════════════════════════════════════════════════════ */
export const drawingMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR],
  [FTL, FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT, FTR],
  [FL,  FC,  FC,  FC,  FC,  FC,  DE,  DE,  DE,  DE,  DE,  DE,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  DE,  DE,  DE,  DE,  DE,  DE,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB, FBR],
];

/* ═══════════════════════════════════════════════════════════════════════
 *  Scene 12: Party
 *  Kenney walls (decorated) + Kenney floor
 * ═══════════════════════════════════════════════════════════════════════ */
export const partyMap = [
  [WTL, WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT,  WT, WTR],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WL,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC,  WC, WR2],
  [WBL, WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB,  WB, WBR],
  [FTL, FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT,  FT, FTR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  DE,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FL,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FC,  FR],
  [FBL, FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB,  FB, FBR],
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
