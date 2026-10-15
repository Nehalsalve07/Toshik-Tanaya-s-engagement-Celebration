import React, { useState, useEffect } from 'react';
import { Heart, MessageSquareHeart, Send, Sparkles } from 'lucide-react';
import { GuestWish } from '../types/wedding';
import { INITIAL_WISHES } from '../data/weddingData';

const WISHES_STORAGE_KEY = 'wedding_wishes_toshik_tanaya';

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
    <section id="wishes" className="py-16 md:py-24 bg-white border-t border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#AA820A]">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Guestbook of Love</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl text-[#7A1B28]">
            Engagement Blessings for Toshik & Tanaya
          </h2>
          <p className="text-sm text-[#665753] leading-relaxed">
            Leave a sacred prayer, playful wish, or loving congratulations as Toshik & Tanaya celebrate their auspicious engagement and begin their new journey together.
          </p>
        </div>

        {/* 2-Column: Left Form / Right Wall Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Leave a wish form */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-playfair text-xl font-bold text-[#7A1B28] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#AA820A]" />
              <span>Leave Your Blessing</span>
            </h3>
            <p className="text-xs text-[#665753] mb-6">
              Your warm words will be displayed immediately for the couple and guests.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Deshmukh"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                  Relation to Couple
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's College Friend / Bride's Cousin"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E3D] block">
                  Your Message & Blessings *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="May your life together be blessed with endless laughter, boundless understanding, and lifelong joy..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#7A1B28]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Blessing</span>
              </button>
            </form>
          </div>

          {/* Right: Wishes feed */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-5 hover:border-[#D4AF37]/60 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-playfair font-bold text-sm text-[#2D2421]">
                      {wish.author}
                    </h4>
                    <span className="text-[11px] text-[#AA820A] font-medium">
                      {wish.relationship}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#8A7A75]">{wish.createdAt}</span>
                    <button
                      onClick={() => handleLike(wish.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#7A1B28] hover:bg-[#FAF0DC] rounded-lg border border-[#EADBBD] transition-colors cursor-pointer"
                    >
                      <Heart className="w-3 h-3 fill-[#7A1B28] text-[#7A1B28]" />
                      <span className="tabular-nums font-semibold">{wish.likes}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[#4A3E3D] leading-relaxed italic">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
