import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.95;
    audio.loop = true;

    // 1. Attempt immediate autoplay when page loads or reloads
    const attemptAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // Browser autoplay policy restricted unmuted playback on fresh load without prior gesture.
            // Start muted so audio stream initializes and loops immediately, then unmute on first gesture.
            setIsPlaying(false);
            setIsMuted(true);

            // Try starting muted in background
            audio.muted = true;
            audio.play().catch(() => {});
          });
      }
    };

    attemptAutoplay();

    // 2. Universal synchronous interaction listener for Netlify and mobile browsers (iOS/Chrome):
    // The very first time the visitor taps, clicks, scrolls, or presses any key, immediately unmute and play with full sound!
    const unlockAudioOnGesture = () => {
      const a = audioRef.current;
      if (a) {
        a.muted = false;
        a.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {});
      }
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('click', unlockAudioOnGesture, true);
      window.removeEventListener('touchstart', unlockAudioOnGesture, true);
      window.removeEventListener('touchend', unlockAudioOnGesture, true);
      window.removeEventListener('pointerdown', unlockAudioOnGesture, true);
      window.removeEventListener('scroll', unlockAudioOnGesture, true);
      window.removeEventListener('keydown', unlockAudioOnGesture, true);
    };

    window.addEventListener('click', unlockAudioOnGesture, { capture: true, passive: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { capture: true, passive: true });
    window.addEventListener('touchend', unlockAudioOnGesture, { capture: true, passive: true });
    window.addEventListener('pointerdown', unlockAudioOnGesture, { capture: true, passive: true });
    window.addEventListener('scroll', unlockAudioOnGesture, { capture: true, passive: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { capture: true, passive: true });

    return () => {
      removeGestureListeners();
    };
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted) {
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center">
      {/* Real DOM HTML5 Audio Element with multi-source fallback for Netlify & Live Hosting */}
      <audio
        ref={audioRef}
        id="wedding-celebration-song"
        preload="auto"
        loop
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setIsMuted(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setIsMuted(true);
        }}
        onError={() => {
          console.warn('Audio element error event, ensuring fallback source is attempted');
          const a = audioRef.current;
          if (a && !a.src.includes('/audio/sahiba.mp3')) {
            a.src = './audio/sahiba.mp3';
            a.load();
            a.play().catch(() => {});
          }
        }}
      >
        <source src={sahibaAudioTrack} type="audio/mpeg" />
        <source src="/audio/sahiba.mp3" type="audio/mpeg" />
        <source src="./audio/sahiba.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute / Unmute celebration song button */}
      <button
        onClick={handleToggleMute}
        className={`group flex items-center gap-2.5 h-10 px-4 rounded-full shadow-2xl border transition-all duration-300 select-none active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/20'
            : 'bg-[#10152F]/95 hover:bg-[#1C1635] text-[#D8C19A] border-[#D8C19A]/70 hover:border-[#D8C19A] shadow-lg ring-2 ring-[#D8C19A]/30 animate-pulse'
        }`}
        title={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Unmute & Play Sahiba'}
        aria-label={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Unmute & Play Sahiba'}
      >
        {/* Animated equalizer waves when unmuted; flat bars when muted */}
        <div className="flex items-center gap-0.5 h-3.5">
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#D8C19A] h-2.5 animate-pulse'
                : 'bg-[#D8C19A]/40 h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#FFEAA7] h-3.5 animate-bounce'
                : 'bg-[#D8C19A]/40 h-1.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#D8C19A] h-3 animate-pulse'
                : 'bg-[#D8C19A]/40 h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#FFEAA7] h-2 animate-bounce'
                : 'bg-[#D8C19A]/40 h-1'
            }`}
          />
        </div>

        {isPlaying && !isMuted ? (
          <Volume2 className="w-4 h-4 text-[#FFEAA7] shrink-0 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#FFEAA7] shrink-0" />
        )}

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#FFF5E9] font-montserrat flex items-center gap-1">
            Sahiba
          </span>
          <span className="text-[9px] font-semibold tracking-wider uppercase font-serif">
            {isPlaying && !isMuted ? (
              <span className="text-[#D8C19A]">Tap to Mute</span>
            ) : (
              <span className="text-[#FFEAA7]">Tap to Play</span>
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
