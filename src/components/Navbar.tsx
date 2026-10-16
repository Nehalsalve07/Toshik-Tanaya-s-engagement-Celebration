import React, { useState } from 'react';
import { Menu, X, QrCode, Mail, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenCardModal: () => void;
  onOpenQrModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCardModal, onOpenQrModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#10152F]/95 backdrop-blur-md border-b border-[#D8C19A]/25 pt-[env(safe-area-inset-top,0px)] transition-all">
      {/* Target element: div:nth-of-type(1) inside header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 px-3 sm:px-6 h-14 sm:h-16 md:h-18">
        {/* Brand Wordmark with Fluid Scaling and Truncation Safety */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="group flex items-center gap-1.5 sm:gap-2 min-w-0 shrink transition-transform active:scale-98 min-h-[44px]"
        >
          <span className="font-script text-xl sm:text-2xl md:text-3xl text-[#FFF5E9] group-hover:text-[#D8C19A] transition-colors truncate">
            Toshik & Tanaya
          </span>
          <span className="hidden lg:inline-block text-[10px] tracking-widest uppercase font-cormorant text-[#D8C19A] border-l border-[#D8C19A]/40 pl-2 shrink-0">
            10 Nov 2026
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-xs uppercase tracking-widest font-montserrat text-[#FFF5E9]/85 font-medium">
          <button
            onClick={() => scrollTo('ceremony')}
            className="hover:text-[#D8C19A] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Ceremony
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-[#D8C19A] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="hover:text-[#D8C19A] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Venue & Map
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#D8C19A] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="hover:text-[#D8C19A] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Blessings
          </button>
        </nav>

        {/* Action Buttons - Scaled and Optimized for Mobile Screens */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* QR Code Action: Icon Button on Mobile, Text on Larger Screens */}
          <button
            onClick={onOpenQrModal}
            className="inline-flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-[40px] w-9 h-9 sm:w-auto sm:px-3 text-xs font-semibold text-[#D8C19A] bg-[#21183F]/80 hover:bg-[#342044] border border-[#D8C19A]/40 rounded-full shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer touch-manipulation active:scale-95"
            title="Scan or Share Engagement Invitation QR Code"
            aria-label="Scan or share QR code"
          >
            <QrCode className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#FFEAA7]" />
            <span className="hidden sm:inline">QR Pass</span>
          </button>

          {/* Primary Invitation Card CTA: Hidden on Mobile, Shown on Larger Screens */}
          <button
            onClick={onOpenCardModal}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[38px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#10152F] bg-gradient-to-r from-[#FFF5E9] via-[#D8C19A] to-[#FFF5E9] hover:from-[#FFFFFF] hover:to-[#D8C19A] rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0 cursor-pointer border border-[#D8C19A] touch-manipulation active:scale-95"
            title="View Digital Engagement Invitation Card"
            aria-label="View invitation card"
          >
            <Mail className="w-3.5 h-3.5 text-[#342044]" />
            <span>Invite Card</span>
          </button>

          {/* Touch-Friendly Hamburger Button (44x44px minimum) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#FFF5E9] hover:text-[#D8C19A] rounded-xl transition-colors cursor-pointer touch-manipulation active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#D8C19A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Clean 44px+ Touch Targets */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D8C19A]/20 bg-[#10152F]/98 backdrop-blur-xl px-4 py-4 space-y-1 text-sm font-medium shadow-2xl animate-fadeIn">
          <button
            onClick={() => scrollTo('ceremony')}
            className="flex items-center w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-[#FFF5E9] hover:text-[#D8C19A] hover:bg-[#21183F]/60 active:bg-[#21183F] transition-all cursor-pointer font-montserrat text-xs uppercase tracking-wider"
          >
            Ceremony & Families
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="flex items-center w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-[#FFF5E9] hover:text-[#D8C19A] hover:bg-[#21183F]/60 active:bg-[#21183F] transition-all cursor-pointer font-montserrat text-xs uppercase tracking-wider"
          >
            Engagement Schedule & Muhurats
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="flex items-center w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-[#FFF5E9] hover:text-[#D8C19A] hover:bg-[#21183F]/60 active:bg-[#21183F] transition-all cursor-pointer font-montserrat text-xs uppercase tracking-wider"
          >
            Aditya Villa Venue & Map
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="flex items-center w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-[#FFF5E9] hover:text-[#D8C19A] hover:bg-[#21183F]/60 active:bg-[#21183F] transition-all cursor-pointer font-montserrat text-xs uppercase tracking-wider"
          >
            Photo Memories
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="flex items-center w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-[#FFF5E9] hover:text-[#D8C19A] hover:bg-[#21183F]/60 active:bg-[#21183F] transition-all cursor-pointer font-montserrat text-xs uppercase tracking-wider"
          >
            Guest Blessings & Wishes
          </button>

          {/* Quick Modal Triggers in Drawer */}
          <div className="pt-3 border-t border-[#D8C19A]/20 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCardModal();
              }}
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#10152F] bg-gradient-to-r from-[#FFF5E9] via-[#D8C19A] to-[#FFF5E9] rounded-xl shadow-sm cursor-pointer active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Full Card</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQrModal();
              }}
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#D8C19A] bg-[#21183F] border border-[#D8C19A]/40 rounded-xl shadow-sm cursor-pointer active:scale-95"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Share QR</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
