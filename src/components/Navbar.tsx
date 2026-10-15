import React, { useState } from 'react';
import { Menu, X, QrCode, Mail } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand title, single line wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="font-playfair text-xl md:text-2xl font-bold tracking-tight text-[#7A1B28] hover:text-[#58121C] transition-colors whitespace-nowrap shrink-0"
        >
          Toshik & Tanaya
        </a>

        {/* Zone 2: 4–5 nav links, 1–2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3E3D]">
          <button
            onClick={() => scrollTo('ceremony')}
            className="hover:text-[#7A1B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Ceremony
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-[#7A1B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="hover:text-[#7A1B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Venue & Map
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#7A1B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Photo Gallery
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="hover:text-[#7A1B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Blessings
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQrModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#7A1B28] bg-white hover:bg-[#FAF7F2] border border-[#D4AF37] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            title="Scan or Share Engagement Invitation QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-[#AA820A]" />
            <span className="hidden sm:inline">QR Code</span>
          </button>
          <button
            onClick={onOpenCardModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            title="View & Download Traditional Engagement Card"
          >
            <Mail className="w-3.5 h-3.5 text-[#E8DFC8]" />
            <span>Invitation Card</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3E3D] hover:text-[#7A1B28] rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFC8] bg-[#FAF7F2] px-6 py-4 space-y-3">
          <button
            onClick={() => scrollTo('ceremony')}
            className="block w-full text-left py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#7A1B28]"
          >
            Ceremony & Families
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="block w-full text-left py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#7A1B28]"
          >
            Event Schedule
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="block w-full text-left py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#7A1B28]"
          >
            Venue & Location
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="block w-full text-left py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#7A1B28]"
          >
            Interactive Gallery
          </button>
          <button
            onClick={() => scrollTo('wishes')}
            className="block w-full text-left py-2 text-sm font-medium text-[#4A3E3D] hover:text-[#7A1B28]"
          >
            Wishes & Blessings
          </button>
          <div className="pt-2 border-t border-[#E8DFC8] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQrModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-[#7A1B28] bg-white border border-[#D4AF37] rounded-md shadow-sm"
            >
              <QrCode className="w-4 h-4 text-[#AA820A]" />
              <span>Share Event QR Code</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCardModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-md transition-colors"
            >
              <Mail className="w-4 h-4 text-[#E8DFC8]" />
              <span>View Traditional Invitation Card</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
