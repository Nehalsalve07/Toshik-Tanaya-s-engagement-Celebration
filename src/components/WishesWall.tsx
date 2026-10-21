import React, { useState, useEffect } from 'react';
import { Heart, MessageSquareHeart } from 'lucide-react';
import { GuestWish } from '../types/wedding';
import { INITIAL_WISHES } from '../data/weddingData';

const WISHES_STORAGE_KEY = 'wedding_wishes_toshik_tanaya_v2';

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHES_STORAGE_KEY);
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(INITIAL_WISHES);
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(INITIAL_WISHES));
      }
    } catch {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  const saveWishes = (updated: GuestWish[]) => {
    setWishes(updated);
    try {
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // quota safeguard
    }
  };

  const handleLike = (id: string) => {
    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    saveWishes(updated);
  };

  return (
    <section id="wishes" className="py-16 md:py-24 bg-gradient-to-b from-[#21183F] via-[#161B3D] to-[#10152F] border-t border-[#D8C19A]/20">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-widest uppercase text-[#D8C19A] bg-[#10152F]/70 border border-[#D8C19A]/30 rounded-full">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#FFEAA7]" />
            <span className="font-montserrat">Guestbook of Love</span>
          </div>
          <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-[#FFF5E9] leading-tight">
            Blessings for Toshik & Tanaya
          </h2>
          <p className="font-cormorant text-xs sm:text-base text-[#D8C19A]/90 leading-relaxed">
            Heartfelt prayers, blessings, and loving wishes as Toshik & Tanaya celebrate their auspicious engagement and begin their beautiful lifelong journey together.
          </p>
        </div>

        {/* Wishes Stream: Centered elegant cards */}
        <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="bg-[#161B3D] border border-[#D8C19A]/40 hover:border-[#D8C19A] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#FFF5E9] text-[#342044] font-bold font-cormorant text-lg sm:text-xl flex items-center justify-center border border-[#D8C19A] shrink-0 shadow-sm">
                    {item.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-cormorant text-lg sm:text-xl font-bold text-[#FFF5E9]">
                      {item.author}
                    </h4>
                    <p className="text-xs text-[#D8C19A]/90 font-montserrat">
                      {item.relationship} · {item.createdAt}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(item.id)}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#10152F]/80 hover:bg-[#10152F] border border-[#D8C19A]/40 rounded-full text-xs text-white transition-all cursor-pointer touch-manipulation active:scale-95 shadow-sm"
                  title="Love this blessing"
                  aria-label="Like blessing"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#F4C8D7] text-[#F4C8D7]" />
                  <span className="tabular-nums font-semibold text-[#FFF5E9]">{item.likes}</span>
                </button>
              </div>

              <p className="font-serif italic text-sm sm:text-base text-[#FFF5E9]/95 leading-relaxed pl-0 sm:pl-14 pt-1 sm:pt-0">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
