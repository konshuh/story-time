/**
 * Kenney RPG Urban Pack tile index constants.
 * Tilemap: assets/rpg-urban-tilemap.png (27 cols × 18 rows, 16×16 tiles)
 * Tile index = row * 27 + col
 *
 * The pack uses 9-patch systems: TL/T/TR/L/C/R/BL/B/BR for borders.
 * Use "center" or "solid" variants for fill areas, border pieces only at edges.
 */

export const COLS = 27;
const t = (row, col) => row * COLS + col;

// ── Grass 9-patch (rows 0-2, cols 0-2) ──
// These have gray borders; use for edge transitions
export const GRASS_TL    = t(0, 0);  // 0
export const GRASS_T     = t(0, 1);  // 1
export const GRASS_TR    = t(0, 2);  // 2
export const GRASS_L     = t(1, 0);  // 27
export const GRASS_C     = t(1, 1);  // 28  — center fill with border detail
export const GRASS_R     = t(1, 2);  // 29
export const GRASS_BL    = t(2, 0);  // 54
export const GRASS_B     = t(2, 1);  // 55
export const GRASS_BR    = t(2, 2);  // 56

// ── Grass solid fill (rows 0-1, cols 5-6) — NO borders ──
export const GRASS_FILL1 = t(0, 5);  // 5   — solid teal-green
export const GRASS_FILL2 = t(0, 6);  // 6   — solid teal-green variant
export const GRASS_FILL3 = t(1, 5);  // 32
export const GRASS_FILL4 = t(1, 6);  // 33

// ── Grass with details (rows 0-2, cols 3-4) ──
export const GRASS_DET_TL = t(0, 3); // 3   — grass with rock/detail
export const GRASS_DET_TR = t(0, 4); // 4
export const GRASS_DET_BL = t(1, 3); // 30
export const GRASS_DET_BR = t(1, 4); // 31

// ── Path/grass transitions (row 2, cols 3-7) ──
export const GRASS_PATH_TL = t(2, 3); // 57
export const GRASS_PATH_TR = t(2, 4); // 58
export const GRASS_PATH_B2 = t(2, 5); // 59
export const GRASS_PATH_C  = t(2, 6); // 60
export const GRASS_PATH_7  = t(2, 7); // 61

// ── Road/path 9-patch (rows 3-5, cols 0-2) — beige/tan with purple borders ──
export const PATH_TL     = t(3, 0);  // 81
export const PATH_T      = t(3, 1);  // 82
export const PATH_TR     = t(3, 2);  // 83
export const PATH_L      = t(4, 0);  // 108
export const PATH_C      = t(4, 1);  // 109  — beige center
export const PATH_R      = t(4, 2);  // 110
export const PATH_BL     = t(5, 0);  // 135
export const PATH_B      = t(5, 1);  // 136
export const PATH_BR     = t(5, 2);  // 137

// ── Path solid fill (rows 3-4, cols 5-6) ──
export const PATH_FILL1  = t(3, 5);  // 86  — solid beige
export const PATH_FILL2  = t(3, 6);  // 87
export const PATH_FILL3  = t(4, 5);  // 113
export const PATH_FILL4  = t(4, 6);  // 114

// ── Path details (rows 3-5, cols 3-4) ──
export const PATH_DET_TL = t(3, 3);  // 84
export const PATH_DET_TR = t(3, 4);  // 85
export const PATH_DET_BL = t(4, 3);  // 111
export const PATH_DET_BR = t(4, 4);  // 112

// ── Interior wall 9-patch (rows 0-2, cols 8-10) — gray-purple ──
export const WALL_TL     = t(0, 8);  // 8
export const WALL_T      = t(0, 9);  // 9
export const WALL_TR     = t(0, 10); // 10
export const WALL_L      = t(1, 8);  // 35
export const WALL_C      = t(1, 9);  // 36  — solid gray center
export const WALL_R      = t(1, 10); // 37
export const WALL_BL     = t(2, 8);  // 62
export const WALL_B      = t(2, 9);  // 63
export const WALL_BR     = t(2, 10); // 64

// ── Interior wall extended (rows 0-2, cols 11-14) ──
export const WALL_EXT1   = t(0, 11); // 11  — wall w/ detail
export const WALL_EXT2   = t(0, 12); // 12
export const WALL_EXT3   = t(0, 13); // 13
export const WALL_EXT4   = t(0, 14); // 14
export const WALL_EXT5   = t(1, 11); // 38
export const WALL_EXT6   = t(1, 12); // 39
export const WALL_EXT7   = t(1, 13); // 40
export const WALL_EXT8   = t(1, 14); // 41

// ── Interior floor 9-patch (rows 3-5, cols 8-10) — warm beige/wood ──
export const FLOOR_TL    = t(3, 8);  // 89
export const FLOOR_T     = t(3, 9);  // 90
export const FLOOR_TR    = t(3, 10); // 91
export const FLOOR_L     = t(4, 8);  // 116
export const FLOOR_C     = t(4, 9);  // 117  — floor center (warm beige)
export const FLOOR_R     = t(4, 10); // 118
export const FLOOR_BL    = t(5, 8);  // 143
export const FLOOR_B     = t(5, 9);  // 144
export const FLOOR_BR    = t(5, 10); // 145

// ── Interior floor extended (rows 3-5, cols 11-14) — furniture/details ──
export const FLOOR_EXT1  = t(3, 11); // 92
export const FLOOR_EXT2  = t(3, 12); // 93
export const FLOOR_EXT3  = t(3, 13); // 94  — blue-gray tiles
export const FLOOR_EXT4  = t(3, 14); // 95
export const FLOOR_EXT5  = t(4, 11); // 119
export const FLOOR_EXT6  = t(4, 12); // 120
export const FLOOR_EXT7  = t(4, 13); // 121
export const FLOOR_EXT8  = t(4, 14); // 122
export const FLOOR_EXT9  = t(5, 11); // 146
export const FLOOR_EXT10 = t(5, 12); // 147
export const FLOOR_EXT11 = t(5, 13); // 148
export const FLOOR_EXT12 = t(5, 14); // 149

// ── Interior wall 2nd set (rows 0-2, col 15) ──
export const WALL2_T     = t(0, 15); // 15
export const WALL2_M     = t(1, 15); // 42
export const WALL2_B     = t(2, 15); // 69

// ── Red roof tiles (rows 0-2, cols 16-22) ──
export const ROOF_BEAM_T = t(0, 16); // 16  — beam/pillar top
export const ROOF_RED_TL = t(0, 17); // 17  — red brick top-left
export const ROOF_RED_T  = t(0, 18); // 18  — red brick top
export const ROOF_RED_TR = t(0, 19); // 19
export const ROOF_RED_T2 = t(0, 20); // 20
export const ROOF_RED_T3 = t(0, 21); // 21
export const ROOF_RED_T4 = t(0, 22); // 22
export const ROOF_BEAM_M = t(1, 16); // 43  — beam/pillar mid
export const ROOF_RED_ML = t(1, 17); // 44  — red brick mid-left
export const ROOF_RED_M  = t(1, 18); // 45  — red brick middle
export const ROOF_RED_MR = t(1, 19); // 46
export const ROOF_RED_M2 = t(1, 20); // 47
export const ROOF_RED_M3 = t(1, 21); // 48
export const ROOF_RED_M4 = t(1, 22); // 49
export const ROOF_BEAM_B = t(2, 16); // 70  — beam/pillar bottom
export const ROOF_RED_BL = t(2, 17); // 71  — red brick bottom-left
export const ROOF_RED_B  = t(2, 18); // 72  — red brick bottom
export const ROOF_RED_BR = t(2, 19); // 73

// ── Brown/orange building tiles (rows 4-5, cols 16-22) ──
export const BLDG_ORG_TL = t(4, 16); // 124
export const BLDG_ORG_T  = t(4, 17); // 125
export const BLDG_ORG_TR = t(4, 18); // 126
export const BLDG_ORG_ML = t(5, 16); // 151
export const BLDG_ORG_M  = t(5, 17); // 152  — orange/brown brick fill
export const BLDG_ORG_MR = t(5, 18); // 153

// ── Water 9-patch (rows 6-7, cols 8-10) ──
export const WATER_TL    = t(6, 8);  // 170
export const WATER_T     = t(6, 9);  // 171
export const WATER_TR    = t(6, 10); // 172
export const WATER_BL    = t(7, 8);  // 197
export const WATER_B     = t(7, 9);  // 198
export const WATER_BR    = t(7, 10); // 199

// ── Water solid fill (rows 6-7, cols 13-14) ──
export const WATER_FILL1 = t(6, 13); // 175
export const WATER_FILL2 = t(6, 14); // 176
export const WATER_FILL3 = t(7, 13); // 202
export const WATER_FILL4 = t(7, 14); // 203

// ── Water extended (with borders) ──
export const WATER_EXT1  = t(6, 11); // 173
export const WATER_EXT2  = t(6, 12); // 174
export const WATER_EXT3  = t(7, 11); // 200
export const WATER_EXT4  = t(7, 12); // 201

// ── Trees — green (rows 8-9, cols 16-19) on green bg ──
export const TREE_LG_TL  = t(8, 16); // 232  — large tree top-left
export const TREE_LG_TR  = t(8, 17); // 233  — large tree top-right
export const TREE_SM_T   = t(8, 18); // 234  — small tree top
export const TREE_BUSH   = t(8, 19); // 235  — bush/shrub
export const TREE_LG_BL  = t(9, 16); // 259  — large tree bottom-left
export const TREE_LG_BR  = t(9, 17); // 260  — large tree bottom-right
export const TREE_SM_B   = t(9, 18); // 261  — small tree bottom
export const TREE_BUSH2  = t(9, 19); // 262  — full green

// ── Trees — autumn (rows 10-11, cols 16-19) ──
export const TREE_AUT_TL = t(10, 16); // 286
export const TREE_AUT_TR = t(10, 17); // 287
export const TREE_AUT_SM = t(10, 18); // 288  — (mostly transparent)
export const TREE_AUT_BL = t(11, 16); // 313
export const TREE_AUT_BR = t(11, 17); // 314

// ── Characters (cols 23-26, rows 0-17) ──
// 6 character types, each 3 rows (right/down/up), 4 frames per row
// Char 1: rows 0-2
export const CHAR1_R1 = t(0, 23);
export const CHAR1_R2 = t(0, 24);
export const CHAR1_R3 = t(0, 25);
export const CHAR1_R4 = t(0, 26);
export const CHAR1_D1 = t(1, 23);
export const CHAR1_D2 = t(1, 24);
// Char 2: rows 3-5
export const CHAR2_R1 = t(3, 23);
export const CHAR2_R2 = t(3, 24);
export const CHAR2_D1 = t(4, 23);
// Char 3: rows 6-8
export const CHAR3_R1 = t(6, 23);
export const CHAR3_R2 = t(6, 24);
export const CHAR3_D1 = t(7, 23);
// Char 4: rows 9-11
export const CHAR4_R1 = t(9, 23);
export const CHAR4_R2 = t(9, 24);
// Char 5: rows 12-14
export const CHAR5_R1 = t(12, 23);
export const CHAR5_R2 = t(12, 24);
// Char 6: rows 15-17
export const CHAR6_R1 = t(15, 23);
export const CHAR6_R2 = t(15, 24);
