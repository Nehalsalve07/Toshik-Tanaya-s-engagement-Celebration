import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { musicPlayer } from '../utils/audioSynth';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 1. Subscribe to playback and mute status updates
    const unsubscribe = musicPlayer.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted || !playing);
    });

    // 2. Attempt immediate autoplay when website opens
    const attemptAutoplay = async () => {
      const started = await musicPlayer.play();
      if (started) {
        setIsPlaying(true);
        setIsMuted(false);
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

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nowMuted = musicPlayer.toggleMute();
    setIsMuted(nowMuted);
    setIsPlaying(!nowMuted);
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center">
      {/* Mute / Unmute celebration song button */}
      <button
        onClick={handleToggleMute}
        className={`group flex items-center gap-2.5 h-10 px-4 rounded-full shadow-2xl border transition-all duration-300 select-none active:scale-95 cursor-pointer touch-manipulation ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-r from-[#21183F] via-[#342044] to-[#21183F] text-[#FFF5E9] border-[#D8C19A] ring-2 ring-[#D8C19A]/40 shadow-[#D8C19A]/20'
            : 'bg-[#10152F]/95 hover:bg-[#1C1635] text-[#D8C19A] border-rose-400/50 hover:border-[#D8C19A] shadow-lg ring-2 ring-rose-500/20'
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
                : 'bg-rose-400/40 h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#FFEAA7] h-3.5 animate-bounce'
                : 'bg-rose-400/40 h-1.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#D8C19A] h-3 animate-pulse'
                : 'bg-rose-400/40 h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted
                ? 'bg-[#FFEAA7] h-2 animate-bounce'
                : 'bg-rose-400/40 h-1'
            }`}
          />
        </div>

        {isPlaying && !isMuted ? (
          <Volume2 className="w-4 h-4 text-[#FFEAA7] shrink-0 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-rose-300 shrink-0" />
        )}

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] sm:text-xs font-bold tracking-tight text-[#FFF5E9] font-montserrat flex items-center gap-1">
            Sahiba
          </span>
          <span className="text-[9px] font-semibold tracking-wider uppercase font-serif">
            {isPlaying && !isMuted ? (
              <span className="text-[#D8C19A]">Tap to Mute</span>
            ) : (
              <span className="text-rose-300">Muted · Tap to Play</span>
            )}
          </span>
        </div>
      </button>
    </div>
  );
};
