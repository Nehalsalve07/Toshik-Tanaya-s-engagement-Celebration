import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Car, Plane, Train, Sparkles, SunDim } from 'lucide-react';
import { WEDDING_DETAILS } from '../utils/calendar';
import { IMAGES } from '../data/weddingData';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_DETAILS.venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    WEDDING_DETAILS.mapSearchQuery
  )}`;

  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
    'Aditya villa, Plot no 141 Shri Suraj Gruhniwaran soc Besa Pipla Maharashtra 440037'
  )}`;

  return (
    <section id="venue" className="py-16 md:py-24 bg-gradient-to-b from-[#21183F] via-[#161B3D] to-[#10152F] border-t border-[#D8C19A]/20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-[#D8C19A] bg-[#10152F]/70 border border-[#D8C19A]/30 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span className="font-montserrat">Celebration Venue</span>
          </div>
          <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFF5E9] leading-tight">
            Aditya Villa & Lawns
          </h2>
          <p className="font-cormorant text-xs sm:text-base text-[#D8C19A]/90 leading-relaxed">
            A serene, royal villa estate located on Besa-Pipla Road, prepared with grandeur to welcome you for the sacred rites and evening reception.
          </p>
        </div>

        {/* 2-Column Venue Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12">
          {/* Left: Venue Image & Ambiance card */}
          <div className="lg:col-span-6 bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#21183F]">
              <img
                src={IMAGES.venueVilla}
                alt="Aditya Villa Wedding Reception Setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10152F]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#D8C19A] font-montserrat">
                  Grand Villa Courtyard & Lawns
                </span>
                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#FFF5E9]">
                  {WEDDING_DETAILS.venueName}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#73526E] font-montserrat">
                  Address & Coordinates
                </p>
                <p className="font-cormorant text-sm sm:text-base md:text-lg font-semibold text-[#342044] leading-relaxed">
                  {WEDDING_DETAILS.venueAddress}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#342044] bg-white hover:bg-[#FFFDF9] border border-[#D8C19A] rounded-full transition-all cursor-pointer shadow-sm touch-manipulation active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A88B58]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#342044] hover:bg-[#21183F] border border-[#D8C19A] rounded-full shadow-md transition-all touch-manipulation active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFEAA7]" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#73526E] bg-white hover:bg-[#FFF8EF] border border-[#D8C19A]/50 rounded-full transition-colors touch-manipulation active:scale-95"
                >
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Embedded Interactive Google Map & Landmark Details */}
          <div className="lg:col-span-6 bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D8C19A]/40 pb-3">
                <div>
                  <h3 className="font-cormorant text-xl font-bold text-[#342044]">
                    Interactive Route & Area Guide
                  </h3>
                  <p className="text-xs text-[#73526E]">
                    Besa-Pipla Road, Nagpur Metropolitan Region
                  </p>
                </div>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A88B58] bg-[#FFF8EF] border border-[#D8C19A] rounded-full">
                  Free Valet Parking
                </span>
              </div>

              {/* Map Preview Frame */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#D8C19A] shadow-inner bg-[#21183F]">
                <iframe
                  title="Aditya Villa Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    WEDDING_DETAILS.mapSearchQuery
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              </div>

              {/* Landmark Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#5B4058]">
                <div className="p-3 bg-white/80 rounded-xl border border-[#D8C19A]/40">
                  <p className="font-bold text-[#342044]">Landmark:</p>
                  <p className="text-[11px] text-[#73526E]">Near New Hanuman Nagar & Besa Square</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-[#D8C19A]/40">
                  <p className="font-bold text-[#342044]">Atmosphere:</p>
                  <p className="text-[11px] text-[#73526E]">Open air lush lawns with grand pavilion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Travel Modes Guide (Hidden on mobile screens, shown on tablet/desktop) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          <div className="bg-[#161B3D]/80 text-[#FFF5E9] border border-[#D8C19A]/30 rounded-2xl p-6 shadow-md backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#21183F] border border-[#D8C19A]/40 flex items-center justify-center text-[#FFEAA7] mb-4">
              <Plane className="w-5 h-5 text-[#FFEAA7]" />
            </div>
            <h4 className="font-cormorant text-lg font-bold text-[#FFF5E9]">By Air</h4>
            <p className="text-xs text-[#D8C19A]/80 mt-1 leading-relaxed">
              Dr. Babasaheb Ambedkar International Airport (NAG) is located approx 8.5 km from Aditya Villa (~18 mins drive via Wardha Rd / Outer Ring Rd).
            </p>
          </div>

          <div className="bg-[#161B3D]/80 text-[#FFF5E9] border border-[#D8C19A]/30 rounded-2xl p-6 shadow-md backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#21183F] border border-[#D8C19A]/40 flex items-center justify-center text-[#FFEAA7] mb-4">
              <Train className="w-5 h-5 text-[#FFEAA7]" />
            </div>
            <h4 className="font-cormorant text-lg font-bold text-[#FFF5E9]">By Train</h4>
            <p className="text-xs text-[#D8C19A]/80 mt-1 leading-relaxed">
              Nagpur Junction Railway Station is located approx 11 km from the venue (~25 mins drive). Ajni Railway Station is approx 7.5 km.
            </p>
          </div>

          <div className="bg-[#161B3D]/80 text-[#FFF5E9] border border-[#D8C19A]/30 rounded-2xl p-6 shadow-md backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#21183F] border border-[#D8C19A]/40 flex items-center justify-center text-[#FFEAA7] mb-4">
              <Car className="w-5 h-5 text-[#FFEAA7]" />
            </div>
            <h4 className="font-cormorant text-lg font-bold text-[#FFF5E9]">By Road & Cabs</h4>
            <p className="text-xs text-[#D8C19A]/80 mt-1 leading-relaxed">
              Ola, Uber, and city autos operate smoothly to Aditya Villa on Besa-Pipla Road. Spacious valet parking available for private vehicles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
