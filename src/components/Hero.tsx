import React from 'react';
import { Sparkles } from 'lucide-react';
import { IMAGES } from '../data/weddingData';
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

  return (
    <section id="home" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#FAF0DC]/60 via-[#F3EDE2]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Sanskrit Auspicious Invocation Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-medium text-[#AA820A] bg-[#FAF3DE] border border-[#EADBBD] rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>॥ श्री गणेशाय नमः ॥</span>
            <span className="text-[#8A7A75]">·</span>
            <span>शुभ साखरपुडा सोहळा (Engagement Ceremony)</span>
          </div>
          <p className="text-xs md:text-sm text-[#73635E] italic max-w-xl mx-auto">
            "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
          </p>
        </div>

        {/* 2-Column Balanced Split: Left Typography / Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          {/* Left Column: Simple & Classic Typographic Invitation */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#AA820A]">
                The Engagement Ceremony
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#6E5D57]">
                Together with their families, cordially invite you to celebrate the joyous union of
              </p>
            </div>

            {/* Couple Names - Classic & Stately */}
            <div className="space-y-4 py-1">
              <div>
                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-[#5C141F] tracking-tight">
                  Toshik
                </h1>
                <p className="font-serif italic text-sm text-[#7D6B64] mt-1">
                  Son of Mrs. Vandana & Mr. Dinkar Karadbhajne
                </p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
                <span className="font-playfair italic text-2xl sm:text-3xl text-[#B39345]">&</span>
                <div className="h-[1px] w-12 bg-[#D4AF37]/50" />
              </div>

              <div>
                <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-[#5C141F] tracking-tight">
                  Tanaya
                </h2>
                <p className="font-serif italic text-sm text-[#7D6B64] mt-1">
                  Daughter of Mrs. Sulochana & Mr. Dattatray Sarve
                </p>
              </div>
            </div>

            {/* Auspicious Blessing Line */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs tracking-widest text-[#8C6D15] uppercase font-serif pt-1">
              <span>✦</span>
              <span>॥ सप्रेम निमंत्रण ॥</span>
              <span>✦</span>
            </div>

            {/* Simple & Classic Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToSchedule}
                className="px-6 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white bg-[#7A1B28] hover:bg-[#60141F] rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                View Schedule
              </button>
              <button
                onClick={onOpenCardModal}
                className="px-6 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#7A1B28] bg-transparent hover:bg-[#7A1B28]/5 border border-[#7A1B28] rounded-full transition-all duration-200 cursor-pointer"
              >
                View Invitation Card
              </button>
            </div>
          </div>

          {/* Right Column: Hero Couple Visual Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative golden framing border */}
              <div className="absolute -inset-2 rounded-3xl border border-[#D4AF37]/40 pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl border border-[#D4AF37]/20 pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] bg-[#EFE6D5]">
                <img
                  src={IMAGES.heroCouple}
                  alt="Toshik and Tanaya in Royal Indian Engagement Attire"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#200A0E]/70 via-transparent to-black/10 pointer-events-none" />

                {/* Overlay Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <p className="font-playfair text-xl font-bold tracking-wide">
                    Toshik & Tanaya
                  </p>
                  <p className="text-xs text-[#F2CB60] tracking-widest uppercase mt-0.5">
                    10 November 2026 · Shubha Sakharpuda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Countdown Row */}
        <div className="mt-8">
          <Countdown />
        </div>
      </div>
    </section>
  );
};
