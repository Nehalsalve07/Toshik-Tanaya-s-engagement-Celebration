import React, { useState, useEffect } from 'react';
import { Calendar, Download, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS, getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = WEDDING_DETAILS.eventDate.getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
      {/* Outer Card with Ivory & Champagne Gold Styling */}
      <div className="relative bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Decorative corner accents */}
        <span className="absolute top-2 left-2.5 text-[#D8C19A] text-[10px] sm:text-xs">✦</span>
        <span className="absolute top-2 right-2.5 text-[#D8C19A] text-[10px] sm:text-xs">✦</span>
        <span className="absolute bottom-2 left-2.5 text-[#D8C19A] text-[10px] sm:text-xs">✦</span>
        <span className="absolute bottom-2 right-2.5 text-[#D8C19A] text-[10px] sm:text-xs">✦</span>

        {/* Inner thin decorative border */}
        <div className="absolute inset-1.5 sm:inset-2 md:inset-3 rounded-xl sm:rounded-2xl border border-[#D8C19A]/40 pointer-events-none" />

        <div className="relative z-10 text-center space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#73526E]">
            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D8C19A]" />
            <span className="font-cormorant text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-[#342044]">
              Auspicious Muhurat Countdown
            </span>
          </div>
          <h3 className="font-script text-2xl sm:text-4xl md:text-5xl text-[#342044] leading-tight px-1">
            {timeLeft.isPassed ? "The Auspicious Celebrations Have Begun!" : "Every Second Towards Forever"}
          </h3>
          <p className="font-cormorant text-[11px] sm:text-xs md:text-sm text-[#73526E] font-medium tracking-wide">
            10 November 2026 · 4:30 PM IST · Aditya Villa
          </p>
        </div>

        {/* 4 Counter Blocks in Warm Ivory & Plum - Mobile optimized grid */}
        <div className="relative z-10 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-xl mx-auto mb-4 sm:mb-6">
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 bg-white/95 border border-[#D8C19A]/70 rounded-xl sm:rounded-2xl shadow-xs">
            <span className="font-cormorant text-xl sm:text-3xl md:text-5xl font-bold text-[#342044] tabular-nums leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#73526E] mt-1 sm:mt-1.5 font-montserrat">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 bg-white/95 border border-[#D8C19A]/70 rounded-xl sm:rounded-2xl shadow-xs">
            <span className="font-cormorant text-xl sm:text-3xl md:text-5xl font-bold text-[#342044] tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#73526E] mt-1 sm:mt-1.5 font-montserrat">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 bg-white/95 border border-[#D8C19A]/70 rounded-xl sm:rounded-2xl shadow-xs">
            <span className="font-cormorant text-xl sm:text-3xl md:text-5xl font-bold text-[#342044] tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#73526E] mt-1 sm:mt-1.5 font-montserrat">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 bg-gradient-to-b from-[#FFFDF8] to-[#FFF0F4] border border-[#D8C19A] rounded-xl sm:rounded-2xl shadow-xs">
            <span className="font-cormorant text-xl sm:text-3xl md:text-5xl font-bold text-[#9B2A4B] tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-[#9B2A4B] mt-1 sm:mt-1.5 font-montserrat">
              Secs
            </span>
          </div>
        </div>

        {/* Calendar Reminder Button & Dropdown with 44px minimum tap target */}
        <div className="relative z-10 flex justify-center">
          <div className="relative inline-block text-left w-full sm:w-auto">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#342044] hover:bg-[#21183F] border border-[#D8C19A] rounded-full shadow-md transition-all cursor-pointer touch-manipulation active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFEAA7]" />
              <span>Save Date to Calendar</span>
            </button>

            {calendarMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 max-w-[90vw] rounded-2xl shadow-2xl bg-white border border-[#D8C19A] p-2 z-50 animate-fadeIn">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="min-h-[44px] flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-[#342044] hover:bg-[#FFF5E9] rounded-xl transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#D8C19A]" />
                  <span>Google Calendar</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile();
                    setCalendarMenuOpen(false);
                  }}
                  className="w-full min-h-[44px] flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-[#342044] hover:bg-[#FFF5E9] rounded-xl transition-colors cursor-pointer text-left"
                >
                  <Download className="w-4 h-4 text-[#D8C19A]" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
