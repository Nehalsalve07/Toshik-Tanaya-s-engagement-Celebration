// Dedicated Full-Song Audio Player for "Sahiba" (Original Uncut Audio)
// Configured to ALWAYS turn on when reloading the website, with immediate autoplay & gesture unmuting.

import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

class SahibaAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMutedState: boolean = false;
  private listeners: Set<(playing: boolean, muted: boolean) => void> = new Set();
  private initialized: boolean = false;
  private userExplicitlyMuted: boolean = false;

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

    // On every fresh reload, reset explicit mute so the song ALWAYS starts ON
    this.userExplicitlyMuted = false;
    this.isMutedState = false;

    try {
      const src = this.getAudioSrc();
      this.audioElement = new Audio(src);
      this.audioElement.loop = true;
      this.audioElement.muted = false;
      this.audioElement.volume = 0.95;
      this.audioElement.preload = 'auto';
      this.audioElement.setAttribute('playsinline', 'true');
      this.audioElement.setAttribute('webkit-playsinline', 'true');
      this.audioElement.setAttribute('controlsList', 'nodownload');

      // Attach to body for reliable browser media priority
      if (typeof document !== 'undefined' && document.body) {
        this.audioElement.style.position = 'fixed';
        this.audioElement.style.opacity = '0';
        this.audioElement.style.pointerEvents = 'none';
        this.audioElement.style.zIndex = '-9999';
        document.body.appendChild(this.audioElement);
      }

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.isMutedState = false;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        // Only mark stopped if user explicitly muted
        if (this.userExplicitlyMuted) {
          this.isPlaying = false;
          this.isMutedState = true;
          this.notify();
        }
      });

      this.audioElement.addEventListener('ended', () => {
        // Automatic loop guarantee
        if (this.audioElement && !this.userExplicitlyMuted) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });

      this.audioElement.addEventListener('error', () => {
        console.warn('Primary audio stream error, fallback to /audio/sahiba.mp3');
        if (this.audioElement && !this.audioElement.src.includes('/audio/sahiba.mp3')) {
          this.audioElement.src = './audio/sahiba.mp3';
          this.audioElement.load();
          this.attemptStart();
        }
      });

      // Attempt immediate unmuted play on mount
      this.attemptStart();

      // Setup universal gesture unlockers for strict browser autoplay environments
      this.setupAutoUnlockOnFirstInteraction();
    } catch (e) {
      console.warn('Audio initialization warning:', e);
    }
  }

  public async attemptStart(): Promise<boolean> {
    if (!this.audioElement || this.userExplicitlyMuted) return false;

    try {
      this.audioElement.muted = false;
      await this.audioElement.play();
      this.isPlaying = true;
      this.isMutedState = false;
      this.notify();
      return true;
    } catch {
      // Browser autoplay policy blocked unmuted sound
      // Start muted first so audio buffers and plays, then unmute on first gesture
      try {
        if (!this.userExplicitlyMuted && this.audioElement) {
          this.audioElement.muted = true;
          await this.audioElement.play();
          this.isPlaying = true;
          this.notify();
        }
      } catch {
        // will unlock on gesture
      }
      return false;
    }
  }

  private setupAutoUnlockOnFirstInteraction() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.audioElement && !this.userExplicitlyMuted) {
        this.audioElement.muted = false;
        if (this.audioElement.paused) {
          this.audioElement.play().then(() => {
            this.isPlaying = true;
            this.isMutedState = false;
            this.notify();
          }).catch(() => {});
        } else {
          this.isPlaying = true;
          this.isMutedState = false;
          this.notify();
        }
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', unlock, true);
      window.removeEventListener('touchstart', unlock, true);
      window.removeEventListener('touchend', unlock, true);
      window.removeEventListener('scroll', unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
      window.removeEventListener('wheel', unlock, true);
    };

    window.addEventListener('click', unlock, { capture: true, passive: true });
    window.addEventListener('touchstart', unlock, { capture: true, passive: true });
    window.addEventListener('touchend', unlock, { capture: true, passive: true });
    window.addEventListener('scroll', unlock, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
    window.addEventListener('keydown', unlock, { capture: true, passive: true });
    window.addEventListener('wheel', unlock, { capture: true, passive: true });
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
    this.userExplicitlyMuted = false;
    return await this.attemptStart();
  }

  public mute() {
    this.userExplicitlyMuted = true;
    if (this.audioElement) {
      this.audioElement.muted = true;
      this.audioElement.pause();
    }
    this.isMutedState = true;
    this.isPlaying = false;
    this.notify();
  }

  public unmute() {
    this.userExplicitlyMuted = false;
    this.isMutedState = false;
    if (this.audioElement) {
      this.audioElement.muted = false;
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.audioElement) return false;

    if (this.isPlaying && !this.audioElement.muted && !this.userExplicitlyMuted) {
      this.mute();
      return true; // now muted
    } else {
      this.unmute();
      return false; // now unmuted / playing
    }
  }

  public unlock() {
    this.init();
    if (this.audioElement && !this.userExplicitlyMuted) {
      this.audioElement.muted = false;
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.isMutedState = false;
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
    this.mute();
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
