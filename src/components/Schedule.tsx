import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Music, Sun, Heart, Utensils, Shirt } from 'lucide-react';
import { WEDDING_SCHEDULE } from '../data/weddingData';
import { getGoogleCalendarUrl } from '../utils/calendar';

export const Schedule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rituals' | 'celebration'>('all');

  const filteredEvents = WEDDING_SCHEDULE.filter((event) => {
    if (selectedCategory === 'rituals') return event.id === 'ring-exchange';
    if (selectedCategory === 'celebration') return event.id === 'cake-music' || event.id === 'reception-banquet';
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music':
        return <Music className="w-5 h-5 text-[#A88B58]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#A88B58]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#9B2A4B] fill-[#FCE7F0]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#A88B58]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#A88B58]" />;
    }
  };

  return (
    <section id="schedule" className="py-16 md:py-24 bg-gradient-to-b from-[#10152F] via-[#161B3D] to-[#21183F] border-t border-[#D8C19A]/20">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-[#D8C19A] bg-[#10152F]/70 border border-[#D8C19A]/30 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span className="font-montserrat">Ceremonial Itinerary</span>
          </div>
          <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFF5E9] leading-tight">
            Engagement Schedule & Muhurats
          </h2>
          <p className="font-cormorant text-xs sm:text-base text-[#D8C19A]/90 leading-relaxed">
            Tuesday, 10 November 2026 · Auspicious Ring Exchange, Music & Gala Reception at Aditya Villa.
          </p>

          {/* Interactive Filter Tabs (Shown only if multiple events exist) */}
          {WEDDING_SCHEDULE.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-[#10152F]/80 border border-[#D8C19A]/40 rounded-2xl mt-4 backdrop-blur-sm max-w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`min-h-[38px] px-3 sm:px-4 py-1.5 text-xs font-montserrat font-semibold rounded-xl transition-all cursor-pointer touch-manipulation ${
                  selectedCategory === 'all'
                    ? 'bg-[#D8C19A] text-[#10152F] shadow-md'
                    : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
                }`}
              >
                All Events ({WEDDING_SCHEDULE.length})
              </button>
              <button
                onClick={() => setSelectedCategory('rituals')}
                className={`min-h-[38px] px-3 sm:px-4 py-1.5 text-xs font-montserrat font-semibold rounded-xl transition-all cursor-pointer touch-manipulation ${
                  selectedCategory === 'rituals'
                    ? 'bg-[#D8C19A] text-[#10152F] shadow-md'
                    : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
                }`}
              >
                Ring Ceremony Muhurat
              </button>
              <button
                onClick={() => setSelectedCategory('celebration')}
                className={`min-h-[38px] px-3 sm:px-4 py-1.5 text-xs font-montserrat font-semibold rounded-xl transition-all cursor-pointer touch-manipulation ${
                  selectedCategory === 'celebration'
                    ? 'bg-[#D8C19A] text-[#10152F] shadow-md'
                    : 'text-[#FFF5E9]/80 hover:text-[#FFF5E9]'
                }`}
              >
                Celebration & Dinner
              </button>
            </div>
          )}
        </div>

        {/* Timeline Events List in Ivory Cards */}
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {filteredEvents.map((event) => {
            const isMainMuhurat = event.id === 'sakharpuda-ceremony' || event.id === 'ring-exchange';

            return (
              <div
                key={event.id}
                className={`relative bg-[#FFF5E9] text-[#342044] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 shadow-xl ${
                  isMainMuhurat
                    ? 'border-2 border-[#D8C19A] ring-2 ring-[#D8C19A]/30 shadow-2xl'
                    : 'border border-[#D8C19A]/60 hover:border-[#D8C19A]'
                }`}
              >
                {/* Decorative corner accent */}
                <span className="absolute top-3 right-4 text-[#D8C19A] text-xs">✦</span>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {/* Left: Icon & Timings */}
                  <div className="flex items-start gap-4 md:w-1/3 shrink-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        isMainMuhurat
                          ? 'bg-[#FFF8EF] border-[#D8C19A] text-[#A88B58] shadow-inner'
                          : 'bg-white border-[#D8C19A]/60'
                      }`}
                    >
                      {getIcon(event.iconName)}
                    </div>

                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold font-montserrat tracking-widest uppercase text-[#342044] bg-[#D8C19A]/30 rounded-full border border-[#D8C19A]/60">
                        {event.time}
                      </span>
                      <p className="font-cormorant text-xs font-semibold text-[#73526E]">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Details */}
                  <div className="flex-1 space-y-2">
                    <div className="space-y-0.5">
                      <h3 className="font-cormorant text-xl md:text-2xl font-bold text-[#342044]">
                        {event.title}
                      </h3>
                      {event.marathiTitle && (
                        <p className="text-xs font-semibold text-[#8C6D15] font-montserrat tracking-wider uppercase">
                          ✦ {event.marathiTitle} ✦
                        </p>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#5B4058] leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#73526E] border-t border-[#D8C19A]/30">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#A88B58]" />
                        <span>{event.location}</span>
                      </div>
                      {event.dressCode && (
                        <div className="flex items-center gap-1.5 font-medium">
                          <Shirt className="w-3.5 h-3.5 text-[#A88B58]" />
                          <span>Attire: {event.dressCode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
