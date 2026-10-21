import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

const STORAGE_KEYS = {
  MUSIC_STATE: 'wedding_music_state', // 'playing' | 'muted'
  HAS_INTERACTED: 'wedding_music_has_interacted', // 'true' | 'false'
} as const;

/**
 * UserInteractionObserver: Listens for any user engagement (touch, swipe, scroll, click, keydown)
 * across window/document to unlock and resume audio playback under strict browser autoplay policies.
 */
class UserInteractionObserver {
  private callbacks: Set<() => void> = new Set();
  private isListening = false;
  private readonly events = [
    'touchstart',
    'touchmove',
    'touchend',
    'pointerdown',
    'mousedown',
    'wheel',
    'scroll',
    'keydown',
  ] as const;

  private handleInteraction = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');
    } catch {
      // localStorage quota safeguard
    }
    // Synchronously execute callbacks while transient activation token is valid
    this.callbacks.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.warn('Interaction observer callback error:', err);
      }
    });
  };

  public subscribe(callback: () => void): () => void {
    this.callbacks.add(callback);
    this.startListening();
    return () => {
      this.callbacks.delete(callback);
      if (this.callbacks.size === 0) {
        this.stopListening();
      }
    };
  }

  private startListening() {
    if (this.isListening || typeof window === 'undefined') return;
    this.isListening = true;
    this.events.forEach((evt) => {
      window.addEventListener(evt, this.handleInteraction, { capture: true, passive: true });
    });
    document.addEventListener('scroll', this.handleInteraction, { passive: true });
  }

  public stopListening() {
    if (!this.isListening || typeof window === 'undefined') return;
    this.isListening = false;
    this.events.forEach((evt) => {
      window.removeEventListener(evt, this.handleInteraction, true);
    });
    document.removeEventListener('scroll', this.handleInteraction);
  }
}

const interactionObserver = new UserInteractionObserver();

export const MusicToggle: React.FC<MusicToggleProps> = () => {
  // Read persistent state from localStorage (default to 'playing' so sound is on by default)
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MUSIC_STATE);
      return stored !== 'muted';
    } catch {
      return true;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MUSIC_STATE);
      return stored === 'muted';
    } catch {
      return false;
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Resume / Start Audio Playback
  const resumePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if user explicitly set to 'muted' in persistent state
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MUSIC_STATE);
      if (stored === 'muted') return;
    } catch {
      // fallback
    }

    // 1. Wake up Web Audio API Context if suspended
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    } catch {
      // AudioContext fallback
    }

    // 2. Play HTML5 Audio element unmuted
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          try {
            localStorage.setItem(STORAGE_KEYS.MUSIC_STATE, 'playing');
            localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');
          } catch {}
        })
        .catch(() => {
          // Awaiting next gesture from interactionObserver
        });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.95;
    audio.loop = true;

    // Retrieve initial persistent preference
    let wantsMusic = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MUSIC_STATE);
      if (stored === 'muted') {
        wantsMusic = false;
        audio.muted = true;
        setIsPlaying(false);
        setIsMuted(true);
      }
    } catch {
      wantsMusic = true;
    }

    if (wantsMusic) {
      // 1. Attempt immediate playback on mount/reload
      resumePlayback();

      // 2. Register with UserInteractionObserver to automatically resume upon first user interaction
      const unsubscribe = interactionObserver.subscribe(() => {
        resumePlayback();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [resumePlayback]);

  // Handle Manual Mute / Unmute Toggle Click
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted || isMuted) {
      // User tapped to unmute/play -> Persist 'playing'
      try {
        localStorage.setItem(STORAGE_KEYS.MUSIC_STATE, 'playing');
        localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, 'true');
      } catch {}

      resumePlayback();
    } else {
      // User tapped to mute -> Persist 'muted'
      try {
        localStorage.setItem(STORAGE_KEYS.MUSIC_STATE, 'muted');
      } catch {}

      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center">
      {/* Real DOM HTML5 Audio Element with direct src and resilient fallback sources */}
      <audio
        ref={audioRef}
        id="wedding-celebration-song"
        src={sahibaAudioTrack}
        preload="auto"
        loop
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setIsMuted(false);
        }}
        onPause={() => {
          // Only update state if audio is genuinely paused
          if (audioRef.current?.paused) {
            setIsPlaying(false);
            setIsMuted(true);
          }
        }}
        onError={() => {
          console.warn('Primary audio stream error, trying fallback to /audio/sahiba.mp3');
          const a = audioRef.current;
          if (a && !a.src.includes('/audio/sahiba.mp3')) {
            a.src = './audio/sahiba.mp3';
            a.load();
            resumePlayback();
          }
        }}
      >
        <source src={sahibaAudioTrack} type="audio/mpeg" />
        <source src="/audio/sahiba.mp3" type="audio/mpeg" />
        <source src="./audio/sahiba.mp3" type="audio/mpeg" />
      </audio>

      {/* Target button: button:nth-of-type(1) inside div:nth-of-type(3) - Persistent Mute / Play */}
      <button
        onClick={handleToggleMute}
        className={`group relative flex items-center gap-2.5 h-10 px-4 rounded-full shadow-2xl border transition-all duration-300 select-none active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/20'
            : 'bg-gradient-to-r from-[#1A122E] via-[#261B40] to-[#1A122E] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#FFEAA7]/40 shadow-xl shadow-[#D8C19A]/20 hover:scale-105 animate-pulse'
        }`}
        title={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Tap to Play Sahiba'}
        aria-label={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Tap to Play Sahiba'}
      >
        {/* Pulsing indicator ring when waiting for play on scroll/interaction */}
        {(!isPlaying || isMuted) && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFEAA7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D8C19A]"></span>
          </span>
        )}

        {/* Animated equalizer waves when playing; music icon when muted */}
        {isPlaying && !isMuted ? (
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-0.5 rounded-full bg-[#D8C19A] h-2.5 animate-pulse" />
            <span className="w-0.5 rounded-full bg-[#FFEAA7] h-3.5 animate-bounce" />
            <span className="w-0.5 rounded-full bg-[#D8C19A] h-3 animate-pulse" />
            <span className="w-0.5 rounded-full bg-[#FFEAA7] h-2 animate-bounce" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-[#FFEAA7] shrink-0 animate-bounce" />
        )}

        {isPlaying && !isMuted ? (
          <Volume2 className="w-4 h-4 text-[#FFEAA7] shrink-0" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#D8C19A] shrink-0" />
        )}

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#FFF5E9] font-montserrat flex items-center gap-1">
            Sahiba
          </span>
          <span className="text-[9px] font-semibold tracking-wider uppercase font-serif">
            {isPlaying && !isMuted ? (
              <span className="text-[#D8C19A]">Tap to Mute</span>
            ) : (
              <span className="text-[#FFEAA7]">Scroll or Tap to Play</span>
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
