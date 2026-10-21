import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import sahibaAudioTrack from '../assets/audio/sahiba.mp3';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = () => {
  // Website starts muted/paused on reload until the user scrolls down
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef<boolean>(false);
  const userExplicitlyMutedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initial state on reload: Muted & ready
    audio.volume = 0.95;
    audio.loop = true;
    audio.muted = true;
    hasStartedRef.current = false;
    userExplicitlyMutedRef.current = false;
    setIsPlaying(false);
    setIsMuted(true);

    // Function to trigger playback with full sound on scroll down
    const startAudioOnScroll = () => {
      if (hasStartedRef.current || userExplicitlyMutedRef.current) return;

      const a = audioRef.current;
      if (!a) return;

      hasStartedRef.current = true;
      a.muted = false;
      a.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // In case mobile requires a direct touch gesture
          hasStartedRef.current = false;
        });
    };

    // Scroll listeners: fires on scroll, mouse wheel, or mobile touchmove
    const handleScroll = () => {
      if (window.scrollY > 15) {
        startAudioOnScroll();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // User is scrolling down
      if (e.deltaY > 0 || window.scrollY > 10) {
        startAudioOnScroll();
      }
    };

    const handleTouchMove = () => {
      if (window.scrollY > 10) {
        startAudioOnScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || audio.muted) {
      // User taps to play / unmute
      userExplicitlyMutedRef.current = false;
      hasStartedRef.current = true;
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    } else {
      // User taps to mute
      userExplicitlyMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center">
      {/* Real DOM HTML5 Audio Element */}
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
          }
        }}
      >
        <source src={sahibaAudioTrack} type="audio/mpeg" />
        <source src="/audio/sahiba.mp3" type="audio/mpeg" />
        <source src="./audio/sahiba.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute / Unmute Button */}
      <button
        onClick={handleToggleMute}
        className={`group flex items-center gap-2.5 h-10 px-4 rounded-full shadow-2xl border transition-all duration-300 select-none active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/20'
            : 'bg-[#10152F]/95 hover:bg-[#1C1635] text-[#D8C19A] border-[#D8C19A]/60 hover:border-[#D8C19A] shadow-lg ring-2 ring-[#D8C19A]/30'
        }`}
        title={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Unmute / Play Sahiba'}
        aria-label={isPlaying && !isMuted ? 'Mute Celebration Song' : 'Unmute / Play Sahiba'}
      >
        {/* Animated equalizer waves when playing; subtle quiet waves when muted */}
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
              <span className="text-[#FFEAA7]/90">Muted · Scroll to Play</span>
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
