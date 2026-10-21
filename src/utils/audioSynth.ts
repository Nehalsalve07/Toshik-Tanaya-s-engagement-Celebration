// Dedicated Full-Song Audio Player for "Sahiba" (Original Uncut Audio)
// Fully optimized for standalone Vite development and live Netlify production deployment.

import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

class SahibaAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMutedState: boolean = false;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();
  private initialized: boolean = false;

  private getAudioSrc(): string {
    if (sahibaAudioTrack) {
      return sahibaAudioTrack;
    }

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
      this.audioElement.volume = 0.9;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.isMutedState = false;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', () => {
        console.warn('Primary audio stream encountered an issue, trying fallback path');
        if (this.audioElement && !this.audioElement.src.includes('public/audio')) {
          this.audioElement.src = './audio/sahiba.mp3';
          this.audioElement.load();
        }
      });
    } catch (e) {
      console.warn('Audio initialization warning:', e);
    }
  }

  public subscribe(callback: (playing: boolean, muted: boolean) => void) {
    this.listeners.add(callback);
    callback(this.isPlaying, this.isMutedState);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.isMutedState));
  }

  public async play(): Promise<boolean> {
    this.init();
    if (!this.audioElement) return false;

    try {
      this.audioElement.muted = false;
      this.isMutedState = false;
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      // Modern browsers require a user gesture before playing audio with sound
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

  public mute() {
    if (this.audioElement) {
      this.audioElement.muted = true;
      this.audioElement.pause();
      this.isMutedState = true;
      this.isPlaying = false;
      this.notify();
    }
  }

  public unmute() {
    if (this.audioElement) {
      this.audioElement.muted = false;
      this.isMutedState = false;
      this.play();
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.audioElement) return false;

    if (this.isPlaying && !this.audioElement.muted) {
      this.mute();
      return true; // now muted
    } else {
      this.unmute();
      return false; // now unmuted
    }
  }

  public unlock() {
    this.init();
    if (this.audioElement && this.audioElement.paused && !this.isMutedState) {
      this.audioElement.muted = false;
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {});
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMutedState || !this.isPlaying;
  }

  public stop() {
    this.pause();
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
