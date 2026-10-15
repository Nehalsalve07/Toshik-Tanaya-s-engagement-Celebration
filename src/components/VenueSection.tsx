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
    <section id="venue" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Celebration Venue</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#7A1B28]">
            Aditya Villa & Grounds
          </h2>
          <p className="text-sm text-[#665753] leading-relaxed">
            A serene, royal villa estate located on Besa-Pipla Road, prepared with grandeur to welcome you for the sacred rites and evening reception.
          </p>
        </div>

        {/* 2-Column Venue Showcase: Left Venue Photo & Highlights / Right Map & Directions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: Venue Image & Ambiance card */}
          <div className="lg:col-span-6 bg-white border border-[#E8DFC8] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE6D5]">
              <img
                src={IMAGES.venueVilla}
                alt="Aditya Villa Wedding Reception Setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#F2CB60]">
                  Grand Villa Courtyard & Lawns
                </span>
                <h3 className="font-playfair text-xl font-bold">
                  {WEDDING_DETAILS.venueName}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#AA820A]">
                  Address & Coordinates
                </p>
                <p className="text-sm font-medium text-[#2D2421] leading-relaxed">
                  {WEDDING_DETAILS.venueAddress}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#4A3E3D] bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E8DFC8] rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#AA820A]" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-lg shadow-sm transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#665753] hover:text-[#7A1B28] transition-colors"
                >
                  <span>Apple Maps</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Navigation & Travel Guide Card */}
          <div className="lg:col-span-6 bg-white border border-[#E8DFC8] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-[#7A1B28]">
                    Directions & Travel Information
                  </h3>
                  <p className="text-xs text-[#665753] mt-0.5">
                    Aditya Villa, Besa-Pipla Road, Nagpur Region
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#FAF3DE] flex items-center justify-center text-[#AA820A]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Transit Distance Highlights */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D5]">
                  <Plane className="w-5 h-5 text-[#AA820A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#2D2421]">
                      From Nagpur Airport (NAG)
                    </p>
                    <p className="text-xs text-[#665753]">
                      Dr. Babasaheb Ambedkar International Airport is approximately <strong>8.5 km</strong> away (15–20 minutes drive via Somalwada & Besa Rd).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D5]">
                  <Train className="w-5 h-5 text-[#AA820A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#2D2421]">
                      From Nagpur Railway Station (NGP)
                    </p>
                    <p className="text-xs text-[#665753]">
                      Nagpur Central Railway Station is approximately <strong>11.5 km</strong> away (25–30 minutes drive via Manewada Ring Road).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE6D5]">
                  <Car className="w-5 h-5 text-[#AA820A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#2D2421]">
                      Parking & Valet
                    </p>
                    <p className="text-xs text-[#665753]">
                      Complimentary valet service and dedicated parking for 150+ guest vehicles directly adjacent to Shri Suraj Gruhniwaran society entrance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Climate snapshot for November */}
              <div className="flex items-center gap-3 p-3 bg-[#FAF3DE]/70 rounded-xl border border-[#EADBBD]">
                <SunDim className="w-5 h-5 text-[#AA820A] shrink-0" />
                <p className="text-xs text-[#665753]">
                  <strong>Nagpur Weather in November:</strong> Pleasant autumn climate (~22°C to 26°C in the evenings). Outdoor banquet settings will be delightfully comfortable.
                </p>
              </div>
            </div>

            {/* Direct Quick Map Button */}
            <div className="pt-6 border-t border-[#E8DFC8]">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-xl transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Turn-by-Turn Navigation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
