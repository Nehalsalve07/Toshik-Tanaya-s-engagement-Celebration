import React, { useState, useEffect } from 'react';
import { Heart, MessageSquareHeart, Send, Sparkles } from 'lucide-react';
import { GuestWish } from '../types/wedding';
import { INITIAL_WISHES } from '../data/weddingData';

const WISHES_STORAGE_KEY = 'wedding_wishes_toshik_tanaya_v2';

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      author: author.trim(),
      relationship: relationship.trim() || 'Well-wisher',
      message: message.trim(),
      createdAt: 'Just now',
      likes: 1,
    };

    setTimeout(() => {
      const updated = [newWish, ...wishes];
      saveWishes(updated);
      setAuthor('');
      setRelationship('');
      setMessage('');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section id="wishes" className="py-16 md:py-24 bg-gradient-to-b from-[#21183F] via-[#161B3D] to-[#10152F] border-t border-[#D8C19A]/20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
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
            Leave a sacred prayer, playful wish, or loving congratulations as Toshik & Tanaya celebrate their auspicious engagement and begin their new journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Form: Warm Ivory Invitation Card Styling */}
          <div className="lg:col-span-5 bg-[#FFF5E9] text-[#342044] border-2 border-[#D8C19A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative">
            <span className="absolute top-3 right-4 text-[#D8C19A] text-xs">✦</span>
            <span className="absolute bottom-3 left-4 text-[#D8C19A] text-xs">✦</span>

            <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#73526E] font-montserrat">
                Write a Blessing
              </span>
              <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#342044]">
                Send Wishes to the Couple
              </h3>
              <p className="text-xs text-[#73526E]">
                Your loving message will appear immediately on the celebration wishes wall.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Deshmukh"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 sm:px-4 py-2 text-sm bg-white border border-[#D8C19A] rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#342044] text-[#342044]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                  Relation / Connection
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's College Friend / Bride's Cousin"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 sm:px-4 py-2 text-sm bg-white border border-[#D8C19A] rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#342044] text-[#342044]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#342044] block font-montserrat">
                  Blessing Message *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Wishing you a lifetime of laughter, joy, and togetherness..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 text-sm bg-white border border-[#D8C19A] rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#342044] text-[#342044]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !author.trim() || !message.trim()}
                className="w-full min-h-[44px] py-2.5 sm:py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#342044] hover:bg-[#21183F] disabled:opacity-50 rounded-full transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 border border-[#D8C19A]/50 touch-manipulation active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-[#FFEAA7]" />
                <span>{isSubmitting ? 'Sending Blessing...' : 'Post Your Blessing'}</span>
              </button>
            </form>
          </div>

          {/* Right: Live Wishes Stream */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 max-h-[640px] overflow-y-auto pr-0.5">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="bg-[#161B3D] border border-[#D8C19A]/40 hover:border-[#D8C19A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FFF5E9] text-[#342044] font-bold font-cormorant text-base sm:text-lg flex items-center justify-center border border-[#D8C19A] shrink-0">
                      {item.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-cormorant text-base sm:text-lg font-bold text-[#FFF5E9]">
                        {item.author}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#D8C19A]/80 font-montserrat">
                        {item.relationship} · {item.createdAt}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1 bg-[#10152F]/70 hover:bg-[#10152F] border border-[#D8C19A]/30 rounded-full text-xs text-white transition-all cursor-pointer touch-manipulation active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#F4C8D7] text-[#F4C8D7]" />
                    <span className="tabular-nums font-semibold text-[#FFF5E9]">{item.likes}</span>
                  </button>
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-[#FFF5E9]/90 leading-relaxed pl-0 sm:pl-12 pt-1 sm:pt-0">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
