// Dedicated Audio Player for "Sahiba" (Jasleen Royal & Stebin Ben)
// Supports bundled master audio, persistent IndexedDB full song storage, and custom audio upload.

import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

const DB_NAME = 'wedding_audio_db';
const STORE_NAME = 'audio_tracks';

function openAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStoredAudio(): Promise<Blob | null> {
  try {
    const db = await openAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('full_song');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function saveStoredAudio(file: Blob): Promise<void> {
  try {
    const db = await openAudioDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, 'full_song');
  } catch (e) {
    console.warn('Failed to save audio to IndexedDB', e);
  }
}

class SahibaAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private initialized: boolean = false;
  private customAudioUrl: string | null = null;
  private songTitle: string = 'Sahiba';

  private getAudioSrc(): string {
    if (this.customAudioUrl) {
      return this.customAudioUrl;
    }

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

      // Check if user previously uploaded the full song file into persistent IndexedDB
      getStoredAudio().then((blob) => {
        if (blob && this.audioElement) {
          if (this.customAudioUrl) URL.revokeObjectURL(this.customAudioUrl);
          this.customAudioUrl = URL.createObjectURL(blob);
          const wasPlaying = this.isPlaying;
          this.audioElement.src = this.customAudioUrl;
          this.audioElement.load();
          if (wasPlaying) {
            this.play();
          }
        }
      });
    } catch (e) {
      console.warn('Audio initialization warning:', e);
    }
  }

  public async setFullSongFile(file: File): Promise<boolean> {
    this.init();
    try {
      if (this.customAudioUrl) {
        URL.revokeObjectURL(this.customAudioUrl);
      }
      this.customAudioUrl = URL.createObjectURL(file);
      this.songTitle = file.name.replace(/\.[^/.]+$/, '');

      await saveStoredAudio(file);

      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.src = this.customAudioUrl;
        this.audioElement.load();
        return await this.play();
      }
      return true;
    } catch (err) {
      console.error('Failed to set full song file:', err);
      return false;
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

  public getSongTitle(): string {
    return this.songTitle;
  }

  public stop() {
    this.pause();
  }
}

export const musicPlayer = new SahibaAudioPlayer();

export type IndianRagaType = 'sahiba';
