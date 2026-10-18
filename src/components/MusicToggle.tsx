import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
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

  useEffect(() => {
    // 1. Subscribe to playback status updates
    const unsubscribe = musicPlayer.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // 2. Attempt immediate autoplay when website opens
    const attemptAutoplay = async () => {
      const started = await musicPlayer.play();
      if (started) {
        setIsPlaying(true);
      }
    };
    attemptAutoplay();

    // 3. User interaction listener: If modern browser autoplay policy delayed sound,
    // trigger playback automatically on the visitor's very first interaction anywhere
    const handleFirstInteraction = () => {
      musicPlayer.unlock();
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
    };
  }, []);

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    musicPlayer.toggle();
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center gap-2">
      {/* Target button: button:nth-of-type(1) inside div:nth-of-type(3) - Toggle Play / Pause with Live Reliability */}
      <button
        onClick={handleToggleMusic}
        className={`group flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full shadow-xl border transition-all duration-300 select-none active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/10'
            : 'bg-[#10152F]/95 hover:bg-[#1C1635] text-[#D8C19A] border-[#D8C19A]/60 hover:border-[#D8C19A] shadow-lg ring-2 ring-[#D8C19A]/30 animate-pulse'
        }`}
        title={isPlaying ? 'Pause Sahiba Song' : 'Play Sahiba Song'}
        aria-label={isPlaying ? 'Pause celebration song Sahiba' : 'Play celebration song Sahiba'}
      >
        {/* Pulsing Audio Waves Indicator */}
        <div className="flex items-center gap-0.5 h-3">
          <span
            className={`w-0.5 rounded-full transition-all ${
              isPlaying
                ? 'bg-[#D8C19A] h-2 animate-pulse'
                : 'bg-[#D8C19A]/40 h-1.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all ${
              isPlaying
                ? 'bg-[#FFEAA7] h-3 animate-bounce'
                : 'bg-[#D8C19A]/40 h-2'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all ${
              isPlaying
                ? 'bg-[#D8C19A] h-2.5 animate-pulse'
                : 'bg-[#D8C19A]/40 h-1.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all ${
              isPlaying
                ? 'bg-[#FFEAA7] h-1.5 animate-bounce'
                : 'bg-[#D8C19A]/40 h-1'
            }`}
          />
        </div>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#FFEAA7] shrink-0 animate-pulse" />
        ) : (
          <Play className="w-3.5 h-3.5 text-[#FFEAA7] fill-[#FFEAA7] shrink-0 ml-0.5" />
        )}

        <div className="flex flex-col text-left leading-none">
          <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#FFF5E9] font-montserrat">
            Sahiba
          </span>
          <span className="text-[9px] text-[#D8C19A] font-medium tracking-wider uppercase font-serif">
            {isPlaying ? 'Playing' : 'Tap to Play'}
          </span>
        </div>
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
