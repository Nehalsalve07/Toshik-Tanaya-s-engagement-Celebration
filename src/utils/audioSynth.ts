// Dedicated Audio Player for "Sahiba" (Jasleen Royal & Stebin Ben)
// Bundles audio through Vite asset pipeline for seamless GitHub Pages / production live deployments.

import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

class SahibaAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMutedState: boolean = false;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();
  private initialized: boolean = false;

  private getAudioSrc(): string {
    // 1. Primary: Use the bundled Vite asset URL (guaranteed to resolve on GitHub Pages subpaths)
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

      this.audioElement.addEventListener('volumechange', () => {
        if (this.audioElement) {
          this.isMutedState = this.audioElement.muted || this.audioElement.volume === 0;
          this.notify();
        }
      });

      // Handle potential loading errors by trying fallback relative path
      this.audioElement.addEventListener('error', () => {
        console.warn('Primary audio source failed, attempting fallback relative path');
        if (this.audioElement && this.audioElement.src !== './audio/sahiba.mp3') {
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
      if (this.isMutedState) {
        this.audioElement.muted = false;
        this.isMutedState = false;
      }
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (err) {
      console.warn('Autoplay prevented by browser, waiting for user interaction:', err);
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

  public toggleMute(): boolean {
    this.init();
    if (!this.audioElement) return false;

    if (!this.isPlaying) {
      this.play();
      return false;
    }

    this.isMutedState = !this.isMutedState;
    this.audioElement.muted = this.isMutedState;
    this.notify();
    return this.isMutedState;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying && !this.isMutedState) {
      this.toggleMute();
      return false;
    } else {
      if (this.isMutedState && this.isPlaying) {
        this.toggleMute();
        return true;
      }
      return await this.play();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMutedState;
  }

  public stop() {
    this.pause();
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
