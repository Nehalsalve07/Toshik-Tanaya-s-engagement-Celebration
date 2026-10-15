import React from 'react';
import { Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import { WEDDING_DETAILS } from '../utils/calendar';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF3DE]/80 border-t border-[#E8DFC8] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand & Blessings */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-playfair text-2xl font-bold text-[#7A1B28]">
              Toshik & Tanaya
            </span>
            <span className="text-xs text-[#AA820A]">·</span>
            <span className="text-xs uppercase tracking-widest text-[#AA820A] font-semibold">
              Shubha Sakharpuda 2026
            </span>
          </div>

          <p className="text-xs text-[#665753] max-w-md">
            With sincere gratitude from the Karadbhajne and Sarve families. Thank you for gracing our auspicious occasion with your presence and blessings.
          </p>

          <p className="text-[11px] text-[#8A7A75] flex items-center justify-center md:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#AA820A]" />
            <span>Aditya Villa, Besa-Pipla Rd, Maharashtra 440037</span>
          </p>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#4A3E3D]">
          <button
            onClick={() => scrollTo('home')}
            className="hover:text-[#7A1B28] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('ceremony')}
            className="hover:text-[#7A1B28] transition-colors cursor-pointer"
          >
            Families
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-[#7A1B28] transition-colors cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="hover:text-[#7A1B28] transition-colors cursor-pointer"
          >
            Venue
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#7A1B28] transition-colors cursor-pointer"
          >
            Gallery
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#E8DFC8]/60 text-center text-[11px] text-[#8A7A75] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          10 November 2026 · Auspicious Engagement Muhurat 4:30 PM
        </p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 fill-[#7A1B28] text-[#7A1B28]" />
          <span>for friends & family</span>
        </p>
      </div>
    </footer>
  );
};
