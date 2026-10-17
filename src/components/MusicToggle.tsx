import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { musicPlayer } from '../utils/audioSynth';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  isPetalsActive = true,
  onTogglePetals,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Subscribe to player state changes
    const unsubscribe = musicPlayer.subscribe((playing, muted) => {
      setIsPlaying(playing && !muted);
      setIsMuted(muted || !playing);
    });

    // 1. Attempt immediate autoplay when website opens
    const attemptAutoplay = async () => {
      const started = await musicPlayer.play();
      if (started) {
        setIsPlaying(true);
        setIsMuted(false);
      }
    };
    attemptAutoplay();

    // 2. User interaction listener: If the browser policy prevents unmuted autoplay before first touch/scroll,
    // trigger playback seamlessly on the very first touch, click, or scroll anywhere on the screen!
    const handleFirstInteraction = async () => {
      if (!musicPlayer.getIsPlaying() || musicPlayer.getIsMuted()) {
        const started = await musicPlayer.play();
        if (started) {
          setIsPlaying(true);
          setIsMuted(false);
        }
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });

    return () => {
      unsubscribe();
      cleanupListeners();
      musicPlayer.stop();
    };
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying && !isMuted) {
      musicPlayer.pause();
      setIsPlaying(false);
      setIsMuted(true);
    } else {
      musicPlayer.play();
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center gap-2">
      {/* Target button: button:nth-of-type(1) inside div:nth-of-type(3) - Mute / Unmute Toggle */}
      <button
        onClick={handleToggleMute}
        className={`group flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full shadow-xl border transition-all duration-300 cursor-pointer touch-manipulation select-none active:scale-95 ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/10'
            : 'bg-[#10152F]/95 hover:bg-[#1C1635] text-[#D8C19A] border-[#D8C19A]/50 hover:border-[#D8C19A] shadow-md'
        }`}
        title={isPlaying && !isMuted ? 'Mute Music ("Sahiba")' : 'Unmute Music ("Sahiba")'}
        aria-label={isPlaying && !isMuted ? 'Mute background song' : 'Unmute background song'}
      >
        {isPlaying && !isMuted ? (
          <>
            {/* Pulsing Audio Waves Indicator */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-[#D8C19A] h-2 animate-pulse rounded-full" />
              <span className="w-0.5 bg-[#FFEAA7] h-3 animate-bounce rounded-full" />
              <span className="w-0.5 bg-[#D8C19A] h-2.5 animate-pulse rounded-full" />
              <span className="w-0.5 bg-[#FFEAA7] h-1.5 animate-bounce rounded-full" />
            </div>

            <Volume2 className="w-4 h-4 text-[#FFEAA7] shrink-0 animate-pulse" />

            <div className="flex flex-col text-left leading-none">
              <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#FFF5E9] font-montserrat">
                Sahiba
              </span>
              <span className="text-[9px] text-[#D8C19A] font-medium tracking-wider uppercase font-serif">
                Tap to Mute
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <VolumeX className="w-4 h-4 text-[#D8C19A] shrink-0" />
            </div>

            <div className="flex flex-col text-left leading-none">
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-[#FFF5E9] font-montserrat">
                Sahiba
              </span>
              <span className="text-[9px] text-[#D8C19A] font-medium tracking-wider uppercase font-serif">
                Tap to Play
              </span>
            </div>
          </>
        )}
      </button>

      {/* Optional Petals Shower Toggle Button */}
      {onTogglePetals && (
        <button
          onClick={onTogglePetals}
          className={`h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border transition-all duration-300 shadow-md cursor-pointer touch-manipulation active:scale-95 ${
            isPetalsActive
              ? 'bg-[#21183F]/90 text-[#F4C8D7] border-[#D8C19A]/50 hover:bg-[#342044]'
              : 'bg-[#10152F]/90 text-[#FFF5E9]/50 border-[#D8C19A]/30 hover:text-[#FFF5E9]'
          }`}
          title={isPetalsActive ? 'Pause falling petals shower' : 'Resume falling petals shower'}
          aria-label="Toggle floral petals shower"
        >
          <span className="text-sm select-none">🌸</span>
        </button>
      )}
    </div>
  );
};
