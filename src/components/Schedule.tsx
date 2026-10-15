import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Music, Sun, Heart, Utensils, Shirt } from 'lucide-react';
import { WEDDING_SCHEDULE } from '../data/weddingData';
import { getGoogleCalendarUrl } from '../utils/calendar';

export const Schedule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rituals' | 'celebration'>('all');

  const filteredEvents = WEDDING_SCHEDULE.filter((event) => {
    if (selectedCategory === 'rituals') return event.id === 'sakharpuda-ceremony' || event.id === 'ring-exchange';
    if (selectedCategory === 'celebration') return event.id === 'guest-swagat' || event.id === 'cake-music' || event.id === 'reception-banquet';
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music':
        return <Music className="w-5 h-5 text-[#AA820A]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#AA820A]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#7A1B28]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#AA820A]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#AA820A]" />;
    }
  };

  return (
    <section id="schedule" className="py-16 md:py-24 bg-white border-t border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ceremonial Itinerary</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#7A1B28]">
            Engagement Schedule & Auspicious Muhurats
          </h2>
          <p className="text-sm text-[#665753] leading-relaxed">
            Tuesday, 10 November 2026 · Auspicious Sakharpuda, Ring Exchange & Gala Reception at Aditya Villa.
          </p>

          {/* Interactive Filter Tabs (Segmented control) */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl mt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              All Ceremonies ({WEDDING_SCHEDULE.length})
            </button>
            <button
              onClick={() => setSelectedCategory('rituals')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'rituals'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Sakharpuda & Ring Muhurat
            </button>
            <button
              onClick={() => setSelectedCategory('celebration')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'celebration'
                  ? 'bg-[#7A1B28] text-white shadow-sm'
                  : 'text-[#665753] hover:text-[#2D2421]'
              }`}
            >
              Celebration & Dinner
            </button>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredEvents.map((event, idx) => {
            const isMainMuhurat = event.id === 'sakharpuda-ceremony' || event.id === 'ring-exchange';

            return (
              <div
                key={event.id}
                className={`relative bg-[#FAF7F2] rounded-2xl p-6 md:p-8 transition-all ${
                  isMainMuhurat
                    ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#FAF3DE] via-[#FAF7F2] to-[#FAF3DE] shadow-md'
                    : 'border border-[#E8DFC8] hover:border-[#D4AF37]/60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {/* Left: Icon & Timings */}
                  <div className="flex items-start gap-4 md:w-1/3 shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isMainMuhurat
                          ? 'bg-[#7A1B28] text-white shadow-sm'
                          : 'bg-white border border-[#E8DFC8]'
                      }`}
                    >
                      {isMainMuhurat ? <Heart className="w-6 h-6 text-white" /> : getIcon(event.iconName)}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-medium text-[#AA820A] block">
                        {event.date}
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-[#2D2421] text-base">
                        <Clock className="w-4 h-4 text-[#7A1B28] shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#665753]">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle / Right: Details, Rituals, Dress Code */}
                  <div className="md:w-2/3 space-y-3">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#7A1B28]">
                        {event.title}
                      </h3>
                      {event.marathiTitle && (
                        <span className="text-xs text-[#8A7A75] font-serif">
                          ({event.marathiTitle})
                        </span>
                      )}
                      {isMainMuhurat && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A1B28] bg-[#FBEFEA] border border-[#F3D5C9] px-2 py-0.5 rounded-md">
                          Auspicious Muhurat
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#4A3E3D] leading-relaxed">
                      {event.description}
                    </p>

                    {/* Dress Code / Suggestions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#665753] border-t border-[#E8DFC8]/70">
                      <div className="flex items-center gap-1.5 font-medium text-[#2D2421]">
                        <Shirt className="w-3.5 h-3.5 text-[#AA820A]" />
                        <span>Suggested Attire:</span>
                      </div>
                      <span className="text-[#665753]">{event.dressCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Prompt */}
        <div className="text-center mt-12">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#7A1B28] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#D4AF37]/60 rounded-xl transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#AA820A]" />
            <span>Sync Engagement Ceremony to Google Calendar</span>
          </a>
        </div>
      </div>
    </section>
  );
};
