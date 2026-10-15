import React from 'react';
import { Heart, Users } from 'lucide-react';

export const CoupleStory: React.FC = () => {
  return (
    <section id="ceremony" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
            <Heart className="w-3.5 h-3.5 fill-[#AA820A]" />
            <span>Auspicious Betrothal & Engagement</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#7A1B28]">
            The Beginning of Forever: Our Families Unite
          </h2>
          <p className="text-sm text-[#665753] leading-relaxed">
            With the graceful blessings of Lord Ganesha and our beloved parents, we embark upon a holy journey of love, trust, and companionship as we formalize our engagement.
          </p>
        </div>

        {/* 2 Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Groom's Family */}
          <div className="bg-white border border-[#E8DFC8] rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FAF3DE] border border-[#EADBBD] flex items-center justify-center text-[#AA820A] mb-6">
              <Users className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
                The Groom's Family
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#7A1B28]">
                Toshik Karadbhajne
              </h3>
              <div className="space-y-1 text-sm text-[#4A3E3D]">
                <p>
                  Beloved son of:
                </p>
                <p className="font-semibold text-base text-[#2D2421]">
                  Mr. Dinkar Karadbhajne & Mrs. Vandana Karadbhajne
                </p>
              </div>

              <p className="text-xs md:text-sm text-[#665753] leading-relaxed pt-2">
                "We warmly welcome our cherished friends, relatives, and well-wishers to witness the auspicious engagement ceremony and ring exchange of our son Toshik with Tanaya."
              </p>
            </div>
          </div>

          {/* Bride's Family */}
          <div className="bg-white border border-[#E8DFC8] rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#FBEFEA] border border-[#F3D5C9] flex items-center justify-center text-[#C05C46] mb-6">
              <Heart className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C05C46]">
                The Bride's Family
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#7A1B28]">
                Tanaya Sarve
              </h3>
              <div className="space-y-1 text-sm text-[#4A3E3D]">
                <p>
                  Cherished daughter of:
                </p>
                <p className="font-semibold text-base text-[#2D2421]">
                  Mr. Dattatray Sarve & Mrs. Sulochana Sarve
                </p>
              </div>

              <p className="text-xs md:text-sm text-[#665753] leading-relaxed pt-2">
                "With hearts full of joy and gratitude, we invite you to bestow your warmest blessings upon our beloved daughter Tanaya and Toshik on their auspicious Sakharpuda ceremony."
              </p>
            </div>
          </div>
        </div>

        {/* Traditional Blessing Verse Quote */}
        <div className="max-w-3xl mx-auto bg-[#FAF3DE]/70 border border-[#EADBBD] rounded-2xl p-6 text-center space-y-2">
          <p className="font-playfair text-base md:text-lg text-[#7A1B28] italic">
            "मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षो मङ्गलाय तनो हरिः॥"
          </p>
          <p className="text-xs text-[#73635E]">
            May eternal auspiciousness, peace, and abundance reside in the home and hearts of Toshik & Tanaya.
          </p>
        </div>
      </div>
    </section>
  );
};
