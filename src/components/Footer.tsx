import React from 'react';
import { Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import { WEDDING_DETAILS } from '../utils/calendar';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#21183F] via-[#2A1810] to-[#180D08] border-t-4 border-[#785338] pt-12 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] px-4 sm:px-6 overflow-hidden">
      {/* Wooden Deck Balcony Planks Visual Texture & Warm Lantern Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="woodPlanks" width="100" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="100" y2="0" stroke="#FFF" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="0" y1="39" x2="100" y2="39" stroke="#000" strokeWidth="1" strokeOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#woodPlanks)" />
        </svg>
      </div>

      {/* Warm Ambient Lantern Glows at Corners */}
      <div className="absolute bottom-0 left-4 sm:left-8 w-36 sm:w-48 h-36 sm:h-48 bg-[#FFAE33]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-4 sm:right-8 w-36 sm:w-48 h-36 sm:h-48 bg-[#FFAE33]/15 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Floral Corner Clusters & Balcony Lanterns */}
      <div className="absolute -bottom-6 left-0 w-28 sm:w-44 pointer-events-none opacity-80 overflow-hidden">
        <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Leaves */}
          <ellipse cx="40" cy="80" rx="35" ry="12" fill="#697D4B" transform="rotate(-25 40 80)" />
          <ellipse cx="80" cy="90" rx="30" ry="10" fill="#7E9659" transform="rotate(15 80 90)" />
          {/* White Roses */}
          <circle cx="50" cy="70" r="22" fill="#FFFDF9" stroke="#E8DFD5" strokeWidth="1.5" />
          <circle cx="50" cy="70" r="14" fill="#FFF5EB" />
          <circle cx="50" cy="70" r="7" fill="#F4C8D7" />
          {/* Lantern */}
          <rect x="95" y="45" width="22" height="32" rx="4" fill="#3D291D" stroke="#D8C19A" strokeWidth="1.5" />
          <circle cx="106" cy="61" r="8" fill="#FFEAA7" opacity="0.9" />
          <circle cx="106" cy="61" r="14" fill="#FFC83B" opacity="0.35" />
        </svg>
      </div>

      <div className="absolute -bottom-6 right-0 w-28 sm:w-44 pointer-events-none opacity-80 overflow-hidden">
        <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <ellipse cx="120" cy="80" rx="35" ry="12" fill="#697D4B" transform="rotate(25 120 80)" />
          <ellipse cx="80" cy="90" rx="30" ry="10" fill="#7E9659" transform="rotate(-15 80 90)" />
          <circle cx="110" cy="70" r="22" fill="#FFFDF9" stroke="#E8DFD5" strokeWidth="1.5" />
          <circle cx="110" cy="70" r="14" fill="#FFF5EB" />
          <circle cx="110" cy="70" r="7" fill="#F4C8D7" />
          <rect x="43" y="45" width="22" height="32" rx="4" fill="#3D291D" stroke="#D8C19A" strokeWidth="1.5" />
          <circle cx="54" cy="61" r="8" fill="#FFEAA7" opacity="0.9" />
          <circle cx="54" cy="61" r="14" fill="#FFC83B" opacity="0.35" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand & Closing Gratitude */}
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="font-script text-3xl sm:text-4xl text-[#FFF5E9]">
              Toshik & Tanaya
            </span>
            <span className="text-[#D8C19A] text-xs">·</span>
            <span className="text-[11px] uppercase tracking-widest text-[#D8C19A] font-montserrat font-bold">
              Shubha Sakharpuda 2026
            </span>
          </div>

          <p className="font-cormorant text-xs sm:text-base text-[#FFF5E9]/80 leading-relaxed">
            With sincere gratitude from the Karadbhajne and Sarve families. Thank you for gracing our auspicious celebration with your heartfelt blessings and warm presence.
          </p>

          <p className="text-xs text-[#D8C19A]/85 flex items-center justify-center md:justify-start gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span>Aditya Villa, Besa-Pipla Rd, Maharashtra 440037</span>
          </p>
        </div>

        {/* Quick Nav with 44px Tap Targets */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs uppercase tracking-widest font-montserrat text-[#FFF5E9]/80">
          <button
            onClick={() => scrollTo('home')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('ceremony')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Families
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Venue
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2.5 py-1.5 hover:text-[#D8C19A] transition-colors cursor-pointer touch-manipulation"
          >
            Blessings
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 sm:mt-10 pt-6 border-t border-[#D8C19A]/20 text-center text-xs text-[#D8C19A]/75 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 font-montserrat">
        <p>
          10 November 2026 · Auspicious Engagement Muhurat 4:30 PM
        </p>
        <p className="flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-[#F4C8D7] text-[#F4C8D7]" />
          <span>for friends & family</span>
        </p>
      </div>
    </footer>
  );
};
