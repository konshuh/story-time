/**
 * Chiptune sound engine using the Web Audio API.
 *
 * Generates 8-bit style sounds with basic oscillators and noise.
 * No external audio files needed — everything is synthesized.
 */

export class SoundEngine {
  constructor() {
    /** @type {AudioContext|null} */
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;
    this._initialized = false;
  }

  /** Must be called from a user gesture (click/tap). */
  init() {
    if (this._initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.3;
    this.masterGain.connect(this.ctx.destination);
    this._initialized = true;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.masterGain) {
      this.masterGain.gain.value = this.enabled ? 0.3 : 0;
    }
    return this.enabled;
  }

  /**
   * Play a simple tone.
   * @param {number} freq     frequency in Hz
   * @param {number} duration seconds
   * @param {OscillatorType} type  'square' | 'triangle' | 'sawtooth' | 'sine'
   * @param {number} [volume=0.5]
   */
  playTone(freq, duration, type = 'square', volume = 0.5) {
    if (!this._initialized || !this.enabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  /** Short blip for dialog text reveal. */
  blip() {
    this.playTone(600, 0.05, 'square', 0.15);
  }

  /** Dialog advance / confirm sound. */
  confirm() {
    this.playTone(440, 0.08, 'square', 0.3);
    setTimeout(() => this.playTone(660, 0.1, 'square', 0.3), 80);
  }

  /** A short ascending jingle for scene transitions. */
  sceneTransition() {
    const notes = [262, 330, 392, 523]; // C E G C
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'triangle', 0.3), i * 120);
    });
  }

  /** Gentle ambient wind-like noise burst. */
  ambientWhoosh() {
    if (!this._initialized || !this.enabled) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gain.gain.linearRampToValueAtTime(0, now + 1);
    source.connect(gain);
    gain.connect(this.masterGain);
    source.start(now);
  }

  /**
   * Play a melody from an array of [freq, duration] pairs.
   * Returns a promise that resolves when the melody finishes.
   */
  playMelody(notes) {
    if (!this._initialized || !this.enabled) return Promise.resolve();
    let delay = 0;
    for (const [freq, dur] of notes) {
      if (freq > 0) {
        setTimeout(() => this.playTone(freq, dur / 1000, 'triangle', 0.3), delay);
      }
      delay += dur;
    }
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
