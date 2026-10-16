import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ChevronUp, ChevronDown, Music2, Upload, Trash2, RotateCcw } from 'lucide-react';
import { musicPlayer, IndianRagaType } from '../utils/audioSynth';

interface MusicToggleProps {
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

interface TrackInfo {
  name: string;
  hindi: string;
  desc: string;
  icon: string;
  isRealSong: boolean;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  isPetalsActive = true,
  onTogglePetals,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<IndianRagaType>('natarang');
  const [showTrackMenu, setShowTrackMenu] = useState(false);
  const [customTrackName, setCustomTrackName] = useState<string>('');
  const [deletedTracks, setDeletedTracks] = useState<IndianRagaType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trackLabels: Record<IndianRagaType, TrackInfo> = {
    love_piano: {
      name: 'Love Piano Romance',
      hindi: 'प्रेम पियानो संगीत (Romantic Piano)',
      desc: 'Gentle lyrical love piano melody for heartfelt couple moments',
      icon: '🎹',
      isRealSong: true,
    },
    natarang: {
      name: 'Natarang Utsav Song',
      hindi: 'नटरंग उत्सव गीत (ढोलक व सनई)',
      desc: 'Celebratory Maharashtrian Wedding Dholak & Sanai (Apsara Aali / Natarang style)',
      icon: '🥁',
      isRealSong: true,
    },
    shehnai_song: {
      name: 'Goonj Uthi Shehnai',
      hindi: 'गूँज उठी शहनाई',
      desc: 'Authentic Indian Vivah Song: Tere Sur Aur Mere Geet',
      icon: '🎶',
      isRealSong: true,
    },
    mangalashtak: {
      name: 'Mangalashtak & Sanai',
      hindi: 'मंगलाष्टक व सनई चौघडा',
      desc: 'Auspicious Shubhmangal Saavdhan & Vedic Temple Chimes',
      icon: '🪔',
      isRealSong: true,
    },
    shehnai_pahadi: {
      name: 'Shehnai Mangal Dhun',
      hindi: 'शहनाई मंगल धुन',
      desc: 'Festive Marriage Shehnai & Dholak (Raga Pahadi)',
      icon: '🪈',
      isRealSong: true,
    },
    bansuri: {
      name: 'Bansuri Raag Yaman',
      hindi: 'बांसुरी राग यमन',
      desc: 'Classical Indian bamboo flute & Tanpura',
      icon: '🎋',
      isRealSong: false,
    },
    sitar: {
      name: 'Sitar Jhankar',
      hindi: 'सितार झंकार',
      desc: 'Traditional royal sitar & manjira chimes',
      icon: '🪕',
      isRealSong: false,
    },
    custom: {
      name: customTrackName || 'Custom Audio Song',
      hindi: 'आपले स्वतःचे ऑडिओ गाणे',
      desc: 'Custom audio song chosen from your device',
      icon: '🎵',
      isRealSong: true,
    },
  };

  const toggleMusic = async () => {
    const playing = await musicPlayer.toggle();
    setIsPlaying(playing);
  };

  const handleSelectTrack = (track: IndianRagaType, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrack(track);
    musicPlayer.setTrack(track);
    setIsPlaying(true);
    setShowTrackMenu(false);
  };

  const handleDeleteTrack = (track: IndianRagaType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (track === 'custom') {
      // Clear custom audio
      setCustomTrackName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (currentTrack === 'custom') {
        const remaining = (Object.keys(trackLabels) as IndianRagaType[]).filter(
          (k) => k !== 'custom' && !deletedTracks.includes(k)
        );
        const nextTrack = remaining[0] || 'love_piano';
        setCurrentTrack(nextTrack);
        musicPlayer.setTrack(nextTrack);
      }
      return;
    }

    const nextDeleted = [...deletedTracks, track];
    setDeletedTracks(nextDeleted);

    // If the active track is deleted, switch to the first remaining track
    if (currentTrack === track) {
      const remaining = (Object.keys(trackLabels) as IndianRagaType[]).filter(
        (k) => !nextDeleted.includes(k) && (k !== 'custom' || customTrackName)
      );
      if (remaining.length > 0) {
        setCurrentTrack(remaining[0]);
        musicPlayer.setTrack(remaining[0]);
      } else {
        musicPlayer.stop();
        setIsPlaying(false);
      }
    }
  };

  const handleRestoreAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletedTracks([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setCustomTrackName(cleanName);
      musicPlayer.setCustomAudio(url);
      setCurrentTrack('custom');
      setIsPlaying(true);
      setShowTrackMenu(false);
    }
  };

  useEffect(() => {
    const handleFirstTouch = () => {
      musicPlayer.init();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('click', handleFirstTouch, { passive: true });
    window.addEventListener('touchstart', handleFirstTouch, { passive: true });

    return () => {
      musicPlayer.stop();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const visibleTrackKeys = (Object.keys(trackLabels) as IndianRagaType[]).filter((t) => {
    if (deletedTracks.includes(t)) return false;
    if (t === 'custom' && !customTrackName) return false;
    return true;
  });

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 sm:left-6 z-40 flex items-center gap-2">
      {/* Track Selection Popover in Warm Ivory */}
      {showTrackMenu && (
        <div className="absolute bottom-14 left-0 bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl p-3 shadow-2xl backdrop-blur-md w-[calc(100vw-1.5rem)] sm:w-[360px] max-w-[360px] max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#D8C19A]/40 px-1">
            <div className="flex items-center gap-1.5">
              <Music2 className="w-4 h-4 text-[#A88B58]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#342044] font-montserrat">
                Select Song / Music
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#342044] bg-white px-2 py-0.5 rounded-full border border-[#D8C19A]">
              विवाह मंगल संगीत
            </span>
          </div>

          {/* Quick Custom Audio Song Upload / Delete Row */}
          <div className="mb-2.5">
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              id="audio-file-selector"
            />
            {customTrackName ? (
              <div className="flex items-center justify-between gap-2 p-2 bg-white border border-[#D8C19A] rounded-xl text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base">🎵</span>
                  <div className="truncate text-left">
                    <p className="font-semibold text-[#342044] truncate">{customTrackName}</p>
                    <p className="text-[10px] text-[#73526E]">Custom uploaded song</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 py-1 text-[11px] font-semibold text-[#342044] bg-[#FFF8EF] hover:bg-white border border-[#D8C19A] rounded-lg shadow-xs transition-all cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    onClick={(e) => handleDeleteTrack('custom', e)}
                    title="Delete custom uploaded audio"
                    aria-label="Delete custom audio"
                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#342044] bg-white hover:bg-[#FFF8EF] border border-dashed border-[#D8C19A] rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#A88B58]" />
                <span>Upload Custom Audio Song (MP3 / Audio)</span>
              </button>
            )}
          </div>

          {/* Track List with individual Delete Options */}
          <div className="space-y-1.5">
            {visibleTrackKeys.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#73526E]">
                <p>All preset songs have been removed.</p>
                <button
                  onClick={handleRestoreAll}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#342044] bg-white hover:bg-[#FFF8EF] border border-[#D8C19A] rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore all songs</span>
                </button>
              </div>
            ) : (
              visibleTrackKeys.map((t) => {
                const info = trackLabels[t];
                const isSelected = currentTrack === t;
                return (
                  <div
                    key={t}
                    className="flex items-center gap-1 group/row"
                  >
                    {/* Main Track Selection Button */}
                    <button
                      onClick={(e) => handleSelectTrack(t, e)}
                      className={`flex-1 text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#342044] text-white font-medium shadow-md ring-1 ring-[#D8C19A]'
                          : 'text-[#342044] hover:bg-white border border-transparent hover:border-[#D8C19A]/50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-base mt-0.5">{info.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold leading-tight">{info.name}</p>
                            {info.isRealSong && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                                  isSelected
                                    ? 'bg-[#D8C19A] text-[#10152F]'
                                    : 'bg-white text-[#73526E] border border-[#D8C19A]/50'
                                }`}
                              >
                                {t === 'love_piano' ? 'Love Music' : 'Song'}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-[11px] font-serif ${
                              isSelected ? 'text-[#FFEAA7]' : 'text-[#73526E]'
                            }`}
                          >
                            {info.hindi}
                          </p>
                          <p
                            className={`text-[10px] leading-tight mt-0.5 ${
                              isSelected ? 'text-white/80' : 'text-[#73526E]/80'
                            }`}
                          >
                            {info.desc}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] bg-[#D8C19A] text-[#10152F] font-bold px-2 py-0.5 rounded-full shrink-0 shadow-sm ml-1.5">
                          Playing
                        </span>
                      )}
                    </button>

                    {/* Delete Option for this song */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteTrack(t, e)}
                      title={`Delete "${info.name}"`}
                      aria-label={`Delete option for ${info.name}`}
                      className="p-2 text-[#73526E] hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-200 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Restore Deleted Songs Bar if any tracks were deleted */}
          {deletedTracks.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-[#D8C19A]/40 flex items-center justify-between text-[11px] text-[#73526E] px-1">
              <span>{deletedTracks.length} song{deletedTracks.length > 1 ? 's' : ''} deleted</span>
              <button
                onClick={handleRestoreAll}
                className="inline-flex items-center gap-1 text-[#342044] hover:text-[#10152F] font-semibold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore deleted songs</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Button 1: Main Audio Toggle Button (midnight navy and gold) */}
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-1.5 h-8 px-3 rounded-full shadow-lg border transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#342044] text-[#FFEAA7] border-[#D8C19A] ring-1 ring-[#D8C19A]/50'
            : 'bg-[#10152F]/90 hover:bg-[#161B3D] text-[#FFF5E9] border-[#D8C19A]/60 hover:border-[#D8C19A] shadow-md hover:scale-105 active:scale-95'
        }`}
        title={
          isPlaying
            ? `Click to Pause (${customTrackName || trackLabels[currentTrack]?.name || 'Song'})`
            : `Click to Play (${customTrackName || trackLabels[currentTrack]?.name || 'Song'})`
        }
        aria-label="Toggle celebration song"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-2.5">
              <span className="w-0.5 bg-[#FFEAA7] h-1.5 animate-pulse rounded-full" />
              <span className="w-0.5 bg-[#FFEAA7] h-2.5 animate-bounce rounded-full" />
              <span className="w-0.5 bg-[#FFEAA7] h-1.5 animate-pulse rounded-full" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#FFEAA7] shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-[#FFF5E9] font-montserrat">
              Music
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#D8C19A] shrink-0" />
            <span className="text-[11px] font-bold text-[#FFF5E9] tracking-tight font-montserrat">
              Music
            </span>
          </>
        )}
      </button>

      {/* Button 2: Track switcher button */}
      <button
        onClick={() => setShowTrackMenu(!showTrackMenu)}
        className="h-8 w-8 flex items-center justify-center rounded-full bg-[#10152F]/90 border border-[#D8C19A]/60 text-[#D8C19A] hover:text-[#FFF5E9] hover:bg-[#161B3D] shadow-md transition-all cursor-pointer shrink-0"
        title="Choose Song / Melody (Love Piano, Natarang, Shehnai, Upload MP3, Delete songs)"
        aria-label="Change song or open music menu"
      >
        {showTrackMenu ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
