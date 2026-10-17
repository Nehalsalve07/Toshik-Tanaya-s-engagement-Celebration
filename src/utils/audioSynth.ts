// Dedicated Audio Player for "Sahiba" (Jasleen Royal & Stebin Ben)
// Always plays the song in the background on continuous loop with no mute option.

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

    // 2. Fallback: Base URL relative path
    const baseUrl = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
      ? (import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`)
      : './';
    return `${baseUrl}audio/sahiba.mp3`;
  }

  public init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      const src = this.getAudioSrc();
      this.audioElement = new Audio(src);
      this.audioElement.loop = true;
      this.audioElement.muted = false; // Always unmuted
      this.audioElement.volume = 0.85;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        // If something paused it, automatically resume
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', () => {
        console.warn('Primary audio source failed, attempting fallback relative path');
        if (this.audioElement && this.audioElement.src !== './audio/sahiba.mp3') {
          this.audioElement.src = './audio/sahiba.mp3';
          this.audioElement.load();
          this.audioElement.play().catch(() => {});
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
      this.audioElement.muted = false; // Guarantee sound is unmuted
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Autoplay waiting for user gesture:', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
