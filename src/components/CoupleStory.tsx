import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';

export const CoupleStory: React.FC = () => {
  return (
    <section
      id="ceremony"
      className="py-16 md:py-24 bg-gradient-to-b from-[#21183F] via-[#161B3D] to-[#10152F] relative border-t border-[#D8C19A]/20"
    >
      {/* Decorative background ambient glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D8C19A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F4C8D7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-[#D8C19A] bg-[#10152F]/60 border border-[#D8C19A]/30 rounded-full">
            <Heart className="w-3.5 h-3.5 fill-[#D8C19A] text-[#D8C19A]" />
            <span className="font-montserrat">Auspicious Betrothal & Engagement</span>
          </div>
          <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFF5E9] leading-tight">
            The Beginning of Forever
          </h2>
          <p className="font-cormorant text-xs sm:text-base text-[#D8C19A]/90 leading-relaxed max-w-xl mx-auto">
            With the graceful blessings of Lord Ganesha and our beloved parents, we embark upon a holy journey of love, trust, and companionship as we formalize our engagement.
          </p>
        </div>

        {/* 2 Family Cards in Warm Ivory with Gold Filigree */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Groom's Family */}
          <div className="bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-3 right-4 text-[#D8C19A] text-xs">✦</div>
            <div className="absolute bottom-3 left-4 text-[#D8C19A] text-xs">✦</div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#D8C19A] flex items-center justify-center text-[#A88B58] mb-4 sm:mb-6 shadow-sm">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#A88B58]" />
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-[#73526E]">
                The Groom's Family
              </span>
              <h3 className="font-script text-3xl sm:text-5xl text-[#342044] leading-tight">
                Toshik Karadbhajne
              </h3>

              <div className="space-y-1 text-sm text-[#5B4058] border-t border-b border-[#D8C19A]/40 py-3 my-2">
                <p className="font-cormorant italic text-xs text-[#73526E]">Beloved son of:</p>
                <p className="font-cormorant font-bold text-base sm:text-lg text-[#342044]">
                  Mr. Dinkar Karadbhajne & Mrs. Vandana Karadbhajne
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5B4058] leading-relaxed pt-1 font-serif italic">
                "We warmly welcome our cherished friends, relatives, and well-wishers to witness the auspicious engagement ceremony and ring exchange of our son Toshik with Tanaya."
              </p>
            </div>
          </div>

          {/* Bride's Family */}
          <div className="bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute top-3 right-4 text-[#D8C19A] text-xs">✦</div>
            <div className="absolute bottom-3 left-4 text-[#D8C19A] text-xs">✦</div>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border border-[#D8C19A] flex items-center justify-center text-[#C95B7E] mb-4 sm:mb-6 shadow-sm">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#C95B7E] fill-[#FCE7F0]" />
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-[#C95B7E]">
                The Bride's Family
              </span>
              <h3 className="font-script text-3xl sm:text-5xl text-[#342044] leading-tight">
                Tanaya Sarve
              </h3>

              <div className="space-y-1 text-sm text-[#5B4058] border-t border-b border-[#D8C19A]/40 py-3 my-2">
                <p className="font-cormorant italic text-xs text-[#73526E]">Cherished daughter of:</p>
                <p className="font-cormorant font-bold text-base sm:text-lg text-[#342044]">
                  Mr. Dattatray Sarve & Mrs. Sharayu Sarve
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5B4058] leading-relaxed pt-1 font-serif italic">
                "With hearts full of joy and gratitude, we invite you to bestow your warmest blessings upon our beloved daughter Tanaya and Toshik on their auspicious Sakharpuda ceremony."
              </p>
            </div>
          </div>
        </div>

        {/* Traditional Blessing Verse Quote Card */}
        <div className="max-w-3xl mx-auto bg-[#161B3D]/80 border border-[#D8C19A]/50 rounded-2xl p-6 sm:p-8 text-center space-y-2 backdrop-blur-md shadow-lg">
          <Sparkles className="w-5 h-5 text-[#FFEAA7] mx-auto mb-1" />
          <p className="font-cormorant text-base sm:text-xl text-[#FFF5E9] italic tracking-wide">
            "मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षो मङ्गलाय तनो हरिः॥"
          </p>
          <p className="font-cormorant text-xs sm:text-sm text-[#D8C19A]/85">
            May eternal auspiciousness, peace, and abundance reside in the home and hearts of Toshik & Tanaya.
          </p>
        </div>
      </div>
    </section>
  );
};
