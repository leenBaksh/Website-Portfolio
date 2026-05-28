class CyberSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cyber_sound_muted");
      // Default to unmuted is standard, let the user toggle.
      this.isMuted = saved === "true";
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("cyber_sound_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      this.playTick(); // soft click before muting
    } else {
      setTimeout(() => this.playBoot(), 100);
    }
    return this.isMuted;
  }

  getMutedState(): boolean {
    return this.isMuted;
  }

  // Soft futuristic high-frequency click (for buttons & tactical items)
  playClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);

      gain.gain.setValueAtTime(0.015, now); // soft tactile click volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Ultra-rapid light high-frequency click (for subtle interactive ticks and selection)
  playTick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(2000, now);
      osc.frequency.setValueAtTime(2500, now + 0.01);

      gain.gain.setValueAtTime(0.008, now); // ultra-low mechanical tick volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sleek section transition low sweep + sparkle (for transition indicators)
  playTransition() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Low frequency frequency sweep (smooth section hum)
      const oscHum = ctx.createOscillator();
      const gainHum = ctx.createGain();

      oscHum.type = "sine";
      oscHum.frequency.setValueAtTime(80, now);
      oscHum.frequency.exponentialRampToValueAtTime(130, now + 0.22);

      gainHum.gain.setValueAtTime(0.025, now); // low pitch soft hum
      gainHum.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      // Sparkle chime
      const oscSpark = ctx.createOscillator();
      const gainSpark = ctx.createGain();

      oscSpark.type = "sine";
      oscSpark.frequency.setValueAtTime(1100, now);
      oscSpark.frequency.exponentialRampToValueAtTime(750, now + 0.12);

      gainSpark.gain.setValueAtTime(0.006, now);
      gainSpark.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      oscHum.connect(gainHum);
      gainHum.connect(ctx.destination);

      oscSpark.connect(gainSpark);
      gainSpark.connect(ctx.destination);

      oscHum.start(now);
      oscHum.stop(now + 0.23);

      oscSpark.start(now);
      oscSpark.stop(now + 0.13);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Dynamic chime (for success actions, like courier transmissions or secure logins)
  playConfirm() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(783.99, now); // G5
      osc.frequency.setValueAtTime(1046.5, now + 0.07); // C6
      osc.frequency.setValueAtTime(1567.98, now + 0.14); // G6

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.setValueAtTime(0.012, now + 0.07);
      gain.gain.setValueAtTime(0.012, now + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.33);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Cybernetic interface boot sequence
  playBoot() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.2); // E6

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
}

export const cyberAudio = new CyberSoundManager();
