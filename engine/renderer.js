/**
 * Tile-based Canvas renderer for 8-bit story scenes.
 *
 * The renderer works on a virtual grid (default 20x15 tiles at 16px each = 320x240).
 * The canvas is scaled up to display size with nearest-neighbor interpolation.
 */

const TILE_SIZE = 16;
const GRID_W = 20;
const GRID_H = 15;
const INTERNAL_W = GRID_W * TILE_SIZE; // 320
const INTERNAL_H = GRID_H * TILE_SIZE; // 240

export class Renderer {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Internal resolution
    this.canvas.width = INTERNAL_W;
    this.canvas.height = INTERNAL_H;
    this.ctx.imageSmoothingEnabled = false;

    /** @type {Map<string, HTMLCanvasElement>} cached tileset images */
    this.tilesets = new Map();
  }

  /** Register a tileset (an off-screen canvas of pre-drawn tiles). */
  addTileset(name, tileCanvas) {
    this.tilesets.set(name, tileCanvas);
  }

  /** Clear the entire canvas to a solid color. */
  clear(color = '#0a0a1a') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
  }

  /**
   * Draw a single tile from a tileset.
   * @param {string} tilesetName
   * @param {number} tileIndex  index into the tileset (left-to-right, top-to-bottom)
   * @param {number} x  pixel x on internal canvas
   * @param {number} y  pixel y on internal canvas
   * @param {boolean} [flipX=false]
   */
  drawTile(tilesetName, tileIndex, x, y, flipX = false) {
    const ts = this.tilesets.get(tilesetName);
    if (!ts) return;

    const cols = Math.floor(ts.width / TILE_SIZE);
    const sx = (tileIndex % cols) * TILE_SIZE;
    const sy = Math.floor(tileIndex / cols) * TILE_SIZE;

    if (flipX) {
      this.ctx.save();
      this.ctx.translate(x + TILE_SIZE, y);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(ts, sx, sy, TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(ts, sx, sy, TILE_SIZE, TILE_SIZE, x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  /**
   * Draw a tile at grid coordinates.
   */
  drawTileAt(tilesetName, tileIndex, gridX, gridY, flipX = false) {
    this.drawTile(tilesetName, tileIndex, gridX * TILE_SIZE, gridY * TILE_SIZE, flipX);
  }

  /**
   * Fill the background layer from a 2D tile-index array.
   * @param {string} tilesetName
   * @param {number[][]} map  [row][col] of tile indices (-1 = skip)
   */
  drawMap(tilesetName, map) {
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const idx = map[row][col];
        if (idx >= 0) {
          this.drawTileAt(tilesetName, idx, col, row);
        }
      }
    }
  }

  /**
   * Draw a sprite (multi-tile entity) at a pixel position.
   * @param {string} tilesetName
   * @param {number[]} tileIndices  array of tile indices (arranged left-to-right, top-to-bottom)
   * @param {number} cols  how many columns the sprite spans
   * @param {number} x  pixel x
   * @param {number} y  pixel y
   * @param {boolean} flipX
   */
  drawSprite(tilesetName, tileIndices, cols, x, y, flipX = false) {
    for (let i = 0; i < tileIndices.length; i++) {
      const c = flipX ? (cols - 1 - (i % cols)) : (i % cols);
      const r = Math.floor(i / cols);
      this.drawTile(tilesetName, tileIndices[i], x + c * TILE_SIZE, y + r * TILE_SIZE, flipX);
    }
  }

  /**
   * Draw text at pixel coordinates using the built-in canvas text (styled retro).
   */
  drawText(text, x, y, { color = '#e0e0e0', size = 8, align = 'left' } = {}) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px monospace`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  }

  /** Fill a rectangle (useful for color overlays, sky, etc.). */
  fillRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  get width() { return INTERNAL_W; }
  get height() { return INTERNAL_H; }
  get tileSize() { return TILE_SIZE; }
  get gridWidth() { return GRID_W; }
  get gridHeight() { return GRID_H; }
}
