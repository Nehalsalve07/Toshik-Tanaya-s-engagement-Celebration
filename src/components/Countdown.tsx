import React, { useState, useEffect } from 'react';
import { Calendar, Download, ExternalLink, Clock } from 'lucide-react';
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-white/90 backdrop-blur-md border border-[#E8DFC8] rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Subtle decorative gold corner motif */}
        <div className="absolute top-2 left-2 text-[#D4AF37]/50 text-xs font-serif">❖</div>
        <div className="absolute top-2 right-2 text-[#D4AF37]/50 text-xs font-serif">❖</div>
        <div className="absolute bottom-2 left-2 text-[#D4AF37]/50 text-xs font-serif">❖</div>
        <div className="absolute bottom-2 right-2 text-[#D4AF37]/50 text-xs font-serif">❖</div>

        <div className="text-center space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
            <Clock className="w-3.5 h-3.5" />
            <span>Counting Down to Shubha Sakharpuda & Ring Ceremony</span>
          </div>
          <h3 className="font-playfair text-2xl md:text-3xl text-[#7A1B28]">
            {timeLeft.isPassed ? "The Auspicious Celebrations Have Begun!" : "Every Second Towards Our Engagement"}
          </h3>
          <p className="text-xs md:text-sm text-[#665753]">
            10 November 2026 · 4:30 PM IST · Aditya Villa, Besa-Pipla
          </p>
        </div>

        {/* 4 Counter Blocks */}
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto mb-6">
          <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-[#FAF7F2] border border-[#EFE6D5] rounded-xl">
            <span className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#7A1B28] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#8A7A75] mt-1">
              Days
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-[#FAF7F2] border border-[#EFE6D5] rounded-xl">
            <span className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#7A1B28] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#8A7A75] mt-1">
              Hours
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-[#FAF7F2] border border-[#EFE6D5] rounded-xl">
            <span className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#7A1B28] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#8A7A75] mt-1">
              Minutes
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-[#FAF7F2] border border-[#EFE6D5] rounded-xl">
            <span className="font-playfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#AA820A] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[#8A7A75] mt-1">
              Seconds
            </span>
          </div>
        </div>

        {/* Calendar Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EFE6D5]/80 text-xs text-[#665753]">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#AA820A]">Save the Date:</span>
            <span>Tuesday, 10 November 2026 · Auspicious Engagement Muhurat (4:30 PM)</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#7A1B28] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D4AF37]/50 rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>

            {calendarMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-[#E8DFC8] rounded-xl shadow-lg p-2 z-50">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs text-[#3D3230] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                >
                  <span>Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#AA820A]" />
                </a>
                <button
                  onClick={() => {
                    setCalendarMenuOpen(false);
                    downloadIcsFile();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#3D3230] hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Apple / Outlook (iCal)</span>
                  <Download className="w-3.5 h-3.5 text-[#AA820A]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
