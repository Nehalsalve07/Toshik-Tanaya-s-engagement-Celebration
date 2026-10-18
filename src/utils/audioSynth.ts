// Dedicated Audio Player for "Sahiba" (Jasleen Royal & Stebin Ben)
// Robust audio handling for GitHub Live, mobile autoplay policies, and reliable playback.

import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

class SahibaAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private initialized: boolean = false;

  private getAudioSrc(): string {
    // 1. Primary: Use the bundled Vite asset URL
    if (sahibaAudioTrack) {
      return sahibaAudioTrack;
    }

    // 2. Fallback relative to current document location for GitHub Pages live hosting
    if (typeof window !== 'undefined') {
      const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
      return `${window.location.origin}${basePath}audio/sahiba.mp3`;
    }

    return './audio/sahiba.mp3';
  }

  public init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      const src = this.getAudioSrc();
      this.audioElement = new Audio(src);
      this.audioElement.loop = true;
      this.audioElement.muted = false;
      this.audioElement.volume = 0.85;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', () => {
        console.warn('Primary audio stream encountered an error, attempting fallback source');
        if (this.audioElement && !this.audioElement.src.includes('public/audio')) {
          this.audioElement.src = './audio/sahiba.mp3';
          this.audioElement.load();
        }
      });
    } catch (e) {
      console.warn('Audio initialization warning:', e);
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.audioElement) return false;

    try {
      this.audioElement.muted = false;
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      // Browser autoplay policy prevented unmuted playback prior to user gesture
      console.warn('Autoplay waiting for user gesture:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return await this.play();
    }
  }

  public unlock() {
    this.init();
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {});
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public stop() {
    this.pause();
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
