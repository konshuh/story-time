/**
 * Kenney RPG Urban Pack tile index constants.
 * Tilemap: assets/rpg-urban-tilemap.png (27 cols × 18 rows, 16×16 tiles)
 * Tile index = row * 27 + col
 */

// ── Tilemap dimensions ──
export const COLS = 27;

// ── Helper: row,col → index ──
const t = (row, col) => row * COLS + col;

// ── Green terrain (rows 0-2, cols 0-7) ──
export const GRASS_PLAIN    = t(0, 0);   // solid green
export const GRASS_DETAIL   = t(0, 1);   // green with detail
export const GRASS_EDGE_T   = t(0, 2);   // grass edge top
export const GRASS_EDGE_L   = t(1, 0);   // grass edge left
export const GRASS_CENTER   = t(1, 1);   // grass center
export const GRASS_EDGE_R   = t(1, 2);   // grass edge right
export const GRASS_EDGE_B   = t(2, 0);   // grass edge bottom
export const GRASS_PATH     = t(2, 1);   // grass with path
export const GRASS_CORNER   = t(2, 2);   // grass corner

// ── Roads / concrete (rows 3-5, cols 0-7) ──
export const ROAD_H         = t(3, 0);   // horizontal road
export const ROAD_V         = t(3, 1);   // vertical road
export const ROAD_CROSS     = t(3, 2);   // road crossing
export const ROAD_PLAIN     = t(3, 3);   // plain road
export const SIDEWALK       = t(4, 0);   // sidewalk
export const SIDEWALK_EDGE  = t(4, 1);   // sidewalk edge
export const CONCRETE       = t(4, 2);   // concrete
export const ROAD_DASH      = t(5, 0);   // road with markings
export const ROAD_TURN      = t(5, 1);   // road turn

// ── Buildings interior (rows 0-5, cols 8-14) ──
export const WALL_PLAIN     = t(0, 8);   // interior wall
export const WALL_WINDOW    = t(0, 9);   // wall with window
export const FLOOR_TILE     = t(0, 10);  // tiled floor
export const FLOOR_WOOD     = t(1, 8);   // wood floor
export const FLOOR_CHECK    = t(1, 9);   // checkered floor
export const DOOR           = t(1, 10);  // door
export const WALL_2         = t(2, 8);   // wall variant 2
export const SHELF          = t(2, 9);   // shelf/furniture
export const TABLE          = t(2, 10);  // table
export const INT_WALL_A     = t(3, 8);   // interior wall A
export const INT_FLOOR_A    = t(3, 9);   // interior floor A
export const INT_FLOOR_B    = t(3, 10);  // interior floor B
export const WINDOW_LG      = t(4, 8);   // large window
export const CARPET         = t(4, 9);   // carpet/rug
export const CHAIR          = t(4, 10);  // chair

// ── Red/brown rooftops (rows 0-2, cols 15-22) ──
export const ROOF_TL        = t(0, 15);  // roof top-left
export const ROOF_T         = t(0, 16);  // roof top
export const ROOF_TR        = t(0, 17);  // roof top-right
export const ROOF_ML        = t(1, 15);  // roof mid-left
export const ROOF_M         = t(1, 16);  // roof middle
export const ROOF_MR        = t(1, 17);  // roof mid-right
export const ROOF_BL        = t(2, 15);  // roof bottom-left
export const ROOF_B         = t(2, 16);  // roof bottom
export const ROOF_BR        = t(2, 17);  // roof bottom-right
export const ROOF2_TL       = t(0, 18);  // brown roof top-left
export const ROOF2_T        = t(0, 19);  // brown roof top
export const ROOF2_TR       = t(0, 20);  // brown roof top-right
export const ROOF2_BL       = t(1, 18);  // brown roof bottom-left
export const ROOF2_B        = t(1, 19);  // brown roof bottom
export const ROOF2_BR       = t(1, 20);  // brown roof bottom-right

// ── Building facades (rows 8-11, cols 0-7) ──
export const FACADE_WIN     = t(8, 0);   // facade with window
export const FACADE_PLAIN   = t(8, 1);   // facade plain
export const FACADE_DOOR    = t(8, 2);   // facade with door
export const FACADE_WIN2    = t(9, 0);   // facade window variant
export const FACADE_BALC    = t(9, 1);   // facade balcony
export const FACADE_BOT     = t(9, 2);   // facade bottom
export const SHOP_TOP       = t(10, 0);  // shop front top
export const SHOP_BOT       = t(10, 1);  // shop front bottom
export const SHOP_DOOR      = t(10, 2);  // shop door
export const BLDG_TOP       = t(8, 3);   // building top
export const BLDG_MID       = t(9, 3);   // building middle
export const BLDG_BOT       = t(10, 3);  // building bottom

// ── Objects (rows 6-7, cols 0-7) ──
export const LAMP           = t(6, 0);   // lamp/light
export const SIGN           = t(6, 1);   // sign
export const BENCH          = t(6, 2);   // bench
export const TRASH          = t(6, 3);   // trash can
export const FENCE_L        = t(7, 0);   // fence left
export const FENCE_M        = t(7, 1);   // fence middle
export const FENCE_R        = t(7, 2);   // fence right
export const HYDRANT        = t(7, 3);   // hydrant

// ── Water (rows 6-7, cols 8-15) ──
export const WATER          = t(6, 8);   // water
export const WATER_EDGE_T   = t(6, 9);   // water edge top
export const WATER_EDGE_L   = t(6, 10);  // water edge left
export const WATER_CENTER   = t(7, 8);   // water center
export const WATER_EDGE_R   = t(7, 9);   // water edge right
export const WATER_EDGE_B   = t(7, 10);  // water edge bottom

// ── Trees (rows 8-11, cols 16-22) ──
export const TREE_GREEN_TL  = t(8, 16);  // green tree top-left
export const TREE_GREEN_TR  = t(8, 17);  // green tree top-right
export const TREE_GREEN_BL  = t(9, 16);  // green tree bottom-left
export const TREE_GREEN_BR  = t(9, 17);  // green tree bottom-right
export const TREE_SM_T      = t(8, 18);  // small tree top
export const TREE_SM_B      = t(9, 18);  // small tree bottom
export const BUSH           = t(8, 19);  // bush
export const BUSH2          = t(9, 19);  // bush variant 2
export const TREE_AUT_TL    = t(10, 16); // autumn tree top-left
export const TREE_AUT_TR    = t(10, 17); // autumn tree top-right
export const TREE_AUT_BL    = t(11, 16); // autumn tree bottom-left
export const TREE_AUT_BR    = t(11, 17); // autumn tree bottom-right

// ── Furniture / interior objects (rows 3-5, cols 11-14) ──
export const COUCH_L        = t(3, 11);  // couch left
export const COUCH_R        = t(3, 12);  // couch right
export const BED_HEAD       = t(4, 11);  // bed head
export const BED_FOOT       = t(4, 12);  // bed foot
export const DESK           = t(5, 11);  // desk
export const TV_SET         = t(5, 12);  // TV/monitor
export const BOOKSHELF_T    = t(3, 13);  // bookshelf top
export const BOOKSHELF_B    = t(4, 13);  // bookshelf bottom
export const PLANT          = t(5, 13);  // potted plant
export const PAINTING       = t(3, 14);  // painting on wall
export const CURTAIN        = t(4, 14);  // curtain
export const RUG            = t(5, 14);  // rug

// ── Characters (cols 23-26) ──
// 6 character types, each with 3 rows (right, down, up) × 4 frames
// Character 1 starts at row 0, col 23
export const CHAR1_R1 = t(0, 23);  // char 1, right, frame 1
export const CHAR1_R2 = t(0, 24);  // char 1, right, frame 2
export const CHAR1_R3 = t(0, 25);  // char 1, right, frame 3
export const CHAR1_R4 = t(0, 26);  // char 1, right, frame 4
export const CHAR1_D1 = t(1, 23);  // char 1, down, frame 1
export const CHAR1_D2 = t(1, 24);  // char 1, down, frame 2
export const CHAR1_D3 = t(1, 25);  // char 1, down, frame 3
export const CHAR1_D4 = t(1, 26);  // char 1, down, frame 4
export const CHAR1_U1 = t(2, 23);  // char 1, up, frame 1

export const CHAR2_R1 = t(3, 23);  // char 2, right, frame 1
export const CHAR2_R2 = t(3, 24);  // char 2, right, frame 2
export const CHAR2_D1 = t(4, 23);  // char 2, down, frame 1
export const CHAR2_D2 = t(4, 24);  // char 2, down, frame 2

export const CHAR3_R1 = t(6, 23);  // char 3, right, frame 1
export const CHAR3_R2 = t(6, 24);  // char 3, right, frame 2
export const CHAR3_D1 = t(7, 23);  // char 3, down, frame 1
export const CHAR3_D2 = t(7, 24);  // char 3, down, frame 2

export const CHAR4_R1 = t(9, 23);  // char 4, right, frame 1
export const CHAR4_R2 = t(9, 24);  // char 4, right, frame 2
export const CHAR4_D1 = t(10, 23); // char 4, down, frame 1
export const CHAR4_D2 = t(10, 24); // char 4, down, frame 2

export const CHAR5_R1 = t(12, 23); // char 5, right, frame 1
export const CHAR5_R2 = t(12, 24); // char 5, right, frame 2
export const CHAR5_D1 = t(13, 23); // char 5, down, frame 1
export const CHAR5_D2 = t(13, 24); // char 5, down, frame 2

export const CHAR6_R1 = t(15, 23); // char 6, right, frame 1
export const CHAR6_R2 = t(15, 24); // char 6, right, frame 2
export const CHAR6_D1 = t(16, 23); // char 6, down, frame 1
export const CHAR6_D2 = t(16, 24); // char 6, down, frame 2
