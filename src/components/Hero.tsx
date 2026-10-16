import React from 'react';
import { Sparkles, Calendar, Heart, Clock, MapPin, ChevronDown } from 'lucide-react';
import { HangingDecorations } from './HangingDecorations';
import { CoupleIllustration } from './CoupleIllustration';
import { Countdown } from './Countdown';

interface HeroProps {
  onOpenCardModal: () => void;
  onOpenQrModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCardModal }) => {
  const scrollToSchedule = () => {
    const el = document.getElementById('schedule');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCouple = () => {
    const el = document.getElementById('ceremony');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#10152F] via-[#161B3D] to-[#21183F] flex flex-col justify-between"
    >
      {/* Hanging Blossoms, Pearl Strands, Twinkling Stars & Fairy Lights */}
      <HangingDecorations />

      {/* Ambient Radial Lighting Behind Center Panel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] md:w-[900px] h-[600px] bg-gradient-to-b from-[#D8C19A]/15 via-[#F4C8D7]/10 to-transparent blur-3xl pointer-events-none -z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 w-full flex-1 flex flex-col items-center justify-center">
        {/* Sacred Sanskrit Invocation Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 space-y-1 animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-semibold tracking-wider text-[#D8C19A] bg-[#10152F]/80 border border-[#D8C19A]/40 rounded-full shadow-lg backdrop-blur-md">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FFEAA7]" />
            <span className="font-serif">॥ श्री गणेशाय नमः ॥</span>
            <span className="text-[#D8C19A]/50">·</span>
            <span className="text-[#FFF5E9]/90 tracking-widest text-[10px] sm:text-[11px] uppercase">
              Shubha Sakharpuda
            </span>
          </div>
        </div>

        {/* --- CENTRAL LUXURY WARM IVORY INVITATION ARCH PANEL (85–92% width on mobile) --- */}
        <div className="relative w-[92%] sm:w-[88%] md:w-full max-w-xl sm:max-w-2xl mx-auto transition-all">
          {/* Subtle Outer Golden Glow Frame */}
          <div className="absolute -inset-1 sm:-inset-1.5 rounded-t-[100px] sm:rounded-t-[160px] md:rounded-t-[220px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#D8C19A]/40 via-[#D8C19A]/15 to-[#9AA77A]/15 blur-[2px] pointer-events-none" />

          {/* Central Ivory Card Container */}
          <div className="relative bg-[#FFF5E9] text-[#342044] rounded-t-[100px] sm:rounded-t-[160px] md:rounded-t-[220px] rounded-b-2xl sm:rounded-b-3xl shadow-2xl border-2 border-[#D8C19A] pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 md:px-12 text-center overflow-hidden transition-all duration-500">
            {/* Top Arch Ornamental Ring Motif */}
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D8C19A] flex items-center justify-center bg-[#FFF8EF] shadow-inner text-[#A88B58]">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#D8C19A] text-[#A88B58]" />
              </div>
            </div>

            {/* Inner Scalloped / Double Inset Border */}
            <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-t-[92px] sm:rounded-t-[152px] md:rounded-t-[210px] rounded-b-xl sm:rounded-b-2xl border border-[#D8C19A]/50 pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 md:inset-5 rounded-t-[86px] sm:rounded-t-[146px] md:rounded-t-[204px] rounded-b-lg sm:rounded-b-xl border border-[#D8C19A]/25 pointer-events-none hidden sm:block" />

            {/* Four Corner Traditional Motifs */}
            <span className="absolute top-2.5 left-3 sm:top-3 sm:left-4 text-[#D8C19A] text-[10px] sm:text-xs select-none">✦</span>
            <span className="absolute top-2.5 right-3 sm:top-3 sm:right-4 text-[#D8C19A] text-[10px] sm:text-xs select-none">✦</span>
            <span className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-[#D8C19A] text-[10px] sm:text-xs select-none">✦</span>
            <span className="absolute bottom-2.5 right-3 sm:bottom-3 sm:right-4 text-[#D8C19A] text-[10px] sm:text-xs select-none">✦</span>

            {/* Poster Exact Copy & Typographic Hierarchy */}
            <div className="space-y-0.5 sm:space-y-1 relative z-10 pt-1">
              <p className="font-cormorant text-[clamp(0.65rem,2.4vw,0.9rem)] tracking-[0.25em] uppercase text-[#73526E] font-semibold">
                WELCOME TO THE
              </p>

              <h1 className="font-script text-[clamp(2.75rem,11vw,5.5rem)] text-[#342044] tracking-normal leading-[1.05] py-0.5 select-none drop-shadow-sm">
                Engagement
              </h1>

              <p className="font-cormorant text-[clamp(0.65rem,2.4vw,0.85rem)] tracking-[0.3em] uppercase text-[#73526E] font-semibold pt-0.5">
                OF
              </p>
            </div>

            {/* Couple Names in Script & Stately Serif */}
            <div className="my-3 sm:my-5 space-y-0.5 sm:space-y-1 relative z-10">
              <div className="font-script text-[clamp(2.5rem,10vw,4.75rem)] text-[#342044] leading-none drop-shadow-sm hover:scale-[1.02] transition-transform duration-300">
                Toshik
              </div>
              <p className="text-[clamp(0.68rem,2.3vw,0.8rem)] text-[#73526E] italic font-serif">
                Son of Mrs. Vandana & Mr. Dinkar Karadbhajne
              </p>

              <div className="flex items-center justify-center gap-2 sm:gap-3 py-0.5 sm:py-1">
                <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#D8C19A] to-transparent" />
                <span className="font-script text-[clamp(1.75rem,6vw,2.5rem)] text-[#A88B58] select-none">
                  &
                </span>
                <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#D8C19A] to-transparent" />
              </div>

              <div className="font-script text-[clamp(2.5rem,10vw,4.75rem)] text-[#342044] leading-none drop-shadow-sm hover:scale-[1.02] transition-transform duration-300">
                Tanaya
              </div>
              <p className="text-[clamp(0.68rem,2.3vw,0.8rem)] text-[#73526E] italic font-serif">
                Daughter of Mrs. Sulochana & Mr. Dattatray Sarve
              </p>
            </div>

            {/* Poster Date & Auspicious Muhurat */}
            <div className="space-y-0.5 sm:space-y-1 relative z-10 pt-2 pb-1.5 border-t border-b border-[#D8C19A]/40 max-w-sm mx-auto my-2.5 sm:my-3 px-2">
              <p className="font-cormorant text-[clamp(0.85rem,3.4vw,1.15rem)] font-bold tracking-[0.16em] uppercase text-[#342044]">
                ON 10 NOVEMBER 2026, 4:30 PM
              </p>
              <p className="font-cormorant text-[clamp(0.72rem,2.6vw,0.9rem)] italic tracking-widest text-[#73526E]">
                With family & friends
              </p>
              <p className="text-[clamp(0.65rem,2.3vw,0.75rem)] text-[#8C6D15] font-serif pt-0.5">
                ✦ Aditya Villa · Besa-Pipla Rd · Maharashtra ✦
              </p>
            </div>

            {/* Elegant Tasteful Couple Illustration at bottom of poster panel */}
            <div className="mt-3 -mb-2 relative z-10 max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
              <CoupleIllustration />
            </div>

            {/* Action Buttons within Card with Touch-Friendly 44px Minimum Tap Targets */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-4 sm:pt-5 relative z-10">
              <button
                onClick={scrollToSchedule}
                className="min-h-[44px] min-w-[44px] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#342044] hover:bg-[#21183F] border border-[#D8C19A]/50 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D8C19A]" />
                <span>View Schedule</span>
              </button>
              <button
                onClick={onOpenCardModal}
                className="min-h-[44px] min-w-[44px] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#342044] bg-white hover:bg-[#FFF8EF] border border-[#D8C19A] rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A88B58]" />
                <span>Invitation Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Countdown Row Directly Anchored Below the Poster Panel */}
        <div className="w-full mt-8 sm:mt-10">
          <Countdown />
        </div>

        {/* Smooth Scroll Prompt */}
        <div className="mt-6 sm:mt-8 text-center pb-2">
          <button
            onClick={scrollToCouple}
            className="min-h-[44px] inline-flex flex-col items-center justify-center gap-1 text-xs text-[#D8C19A]/85 hover:text-[#D8C19A] transition-colors cursor-pointer group touch-manipulation px-4 py-2"
          >
            <span className="font-cormorant tracking-widest uppercase text-[11px]">Explore Celebrations</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D8C19A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
