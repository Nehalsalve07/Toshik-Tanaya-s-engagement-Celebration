import React, { useRef, useState, useEffect } from 'react';
import { X, Printer, Heart, QrCode, ArrowLeft, Sparkles, Calendar, MapPin } from 'lucide-react';
import QRCode from 'qrcode';
import { WEDDING_DETAILS } from '../utils/calendar';

interface InvitationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQrModal?: () => void;
}

export const InvitationCardModal: React.FC<InvitationCardModalProps> = ({
  isOpen,
  onClose,
  onOpenQrModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
      QRCode.toDataURL(
        url,
        {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 320,
          color: {
            dark: '#342044',
            light: '#FFFFFF',
          },
        },
        (err, data) => {
          if (!err && data) setQrDataUrl(data);
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#10152F]/92 backdrop-blur-md flex items-start md:items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto"
      onClick={onClose}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div
        className="relative w-full max-w-xl md:max-w-3xl lg:max-w-4xl bg-[#FFF5E9] text-[#342044] rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-[#D8C19A] p-3.5 sm:p-6 md:p-7 lg:p-8 my-auto text-center transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        ref={cardRef}
      >
        {/* Top Control Bar for Mobile, Laptop & Desktop */}
        <div className="print:hidden flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-[#D8C19A]/40">
          <span className="text-xs sm:text-sm md:text-base font-semibold text-[#73526E] uppercase tracking-wider font-cormorant">
            Digital Engagement Invitation Card
          </span>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center text-[#73526E] hover:text-[#342044] bg-white hover:bg-[#FFF8EF] rounded-full border border-[#D8C19A] transition-colors cursor-pointer shadow-xs active:scale-95 ml-auto"
            aria-label="Close invitation card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Outer Ornamental Frame with Arch & Gold Corner Accents */}
        <div className="border border-[#D8C19A] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6 lg:p-7 relative bg-white/80 shadow-inner">
          {/* Corner Traditional Gold Symbols */}
          <span className="absolute top-1.5 left-2 text-[#D8C19A] text-xs sm:text-sm select-none">✦</span>
          <span className="absolute top-1.5 right-2 text-[#D8C19A] text-xs sm:text-sm select-none">✦</span>
          <span className="absolute bottom-1.5 left-2 text-[#D8C19A] text-xs sm:text-sm select-none">✦</span>
          <span className="absolute bottom-1.5 right-2 text-[#D8C19A] text-xs sm:text-sm select-none">✦</span>

          {/* Hanging Floral Garland Decorative Accent */}
          <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
            <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-[#D8C19A]" />
            <span className="text-xs sm:text-sm text-[#E8A5B8]">🌸</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#A88B58] font-cinzel">
              शुभ साखरपुडा व वाङ्निश्चय
            </span>
            <span className="text-xs sm:text-sm text-[#E8A5B8]">🌸</span>
            <span className="h-[1px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-[#D8C19A]" />
          </div>

          {/* Sanskrit Blessings */}
          <div className="space-y-0.5 mb-2 sm:mb-3">
            <p className="font-montserrat text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#73526E]">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-serif text-[10px] sm:text-xs text-[#342044] italic leading-relaxed">
              "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
            </p>
          </div>

          {/* Invitation Intro */}
          <div className="space-y-1 mb-2 sm:mb-4">
            <p className="font-cormorant text-[10px] sm:text-xs md:text-sm text-[#73526E] uppercase tracking-widest font-semibold">
              WELCOME TO THE ENGAGEMENT CEREMONY OF
            </p>
            <p className="font-serif text-[11px] sm:text-xs text-[#5B4058] max-w-xl mx-auto leading-normal">
              Together with the Karadbhajne & Sarve Families, cordially invite you to celebrate the joyous union and betrothal of
            </p>
          </div>

          {/* Couple Presentation - Responsive 3-Column on Laptop/Desktop, Vertical on Mobile */}
          <div className="my-2 sm:my-3 py-2 border-y border-[#D8C19A]/40 flex flex-col md:flex-row items-center justify-around gap-2 sm:gap-4">
            {/* Groom */}
            <div className="flex-1 text-center md:text-right px-2">
              <h2 className="font-script text-3xl sm:text-4xl md:text-4.5xl lg:text-5xl text-[#342044] leading-tight">
                Toshik
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs md:text-sm text-[#73526E] mt-0.5">
                Son of <strong className="text-[#342044]">Mr. Dinkar Karadbhajne</strong> &{' '}
                <strong className="text-[#342044]">Mrs. Vandana Karadbhajne</strong>
              </p>
            </div>

            {/* Central Romantic Ring & Ampersand Emblem */}
            <div className="flex md:flex-col items-center justify-center gap-1.5 sm:gap-2 px-3 shrink-0">
              <div className="hidden md:block h-6 w-[1px] bg-gradient-to-b from-transparent to-[#D8C19A]" />
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D8C19A] flex items-center justify-center bg-[#FFF8EF] shadow-inner text-[#A88B58]">
                <Heart className="w-4 h-4 fill-[#D8C19A] text-[#A88B58]" />
              </div>
              <span className="font-script text-2xl sm:text-3xl text-[#A88B58] select-none leading-none">
                &
              </span>
              <div className="hidden md:block h-6 w-[1px] bg-gradient-to-t from-transparent to-[#D8C19A]" />
            </div>

            {/* Bride */}
            <div className="flex-1 text-center md:text-left px-2">
              <h2 className="font-script text-3xl sm:text-4xl md:text-4.5xl lg:text-5xl text-[#342044] leading-tight">
                Tanaya
              </h2>
              <p className="font-cormorant text-[11px] sm:text-xs md:text-sm text-[#73526E] mt-0.5">
                Daughter of <strong className="text-[#342044]">Mr. Dattatray Sarve</strong> &{' '}
                <strong className="text-[#342044]">Mrs. Sulochana Sarve</strong>
              </p>
            </div>
          </div>

          {/* Muhurat & Venue Banner - Responsive Grid on Laptop */}
          <div className="py-2.5 px-3 sm:px-5 bg-[#FFF8EF] rounded-xl border border-[#D8C19A]/60 mb-2 sm:mb-4 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center text-center md:text-left">
              <div className="md:border-r md:border-[#D8C19A]/50 md:pr-4 flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4 text-[#A88B58] shrink-0" />
                <div>
                  <span className="font-cormorant text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-[#342044] block">
                    ON 10 NOVEMBER 2026, 4:30 PM
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#73526E] font-medium">
                    Auspicious Sakharpuda & Ring Exchange
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-[#A88B58] shrink-0" />
                <div>
                  <p className="font-cormorant text-xs sm:text-sm md:text-base font-semibold text-[#342044]">
                    Venue: {WEDDING_DETAILS.venueName}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#73526E] leading-tight">
                    {WEDDING_DETAILS.venueAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Note & Scannable QR Code */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D8C19A]/40 text-center sm:text-left">
            <div className="text-xs text-[#5B4058] space-y-1 max-w-lg">
              <p className="text-[10px] sm:text-xs text-[#73526E] italic font-serif leading-snug">
                "With family & friends — We look forward to celebrating this joyous milestone surrounded by your warm love and blessings."
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#A88B58] font-bold uppercase tracking-wider font-montserrat">
                Scan QR with your phone to view online itinerary & Google Maps directions
              </p>
            </div>

            {/* Embedded QR Code */}
            {qrDataUrl && (
              <div className="shrink-0 p-1.5 sm:p-2 bg-white rounded-xl border border-[#D8C19A] shadow-xs flex items-center gap-2.5">
                <img
                  src={qrDataUrl}
                  alt="Scannable Engagement Invitation QR Code"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain"
                />
                <div className="text-left pr-1">
                  <span className="text-[10px] font-bold text-[#342044] block font-montserrat leading-tight">
                    Digital Pass
                  </span>
                  <span className="text-[8px] text-[#73526E] block font-medium">
                    Scan for Details
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="print:hidden flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 min-h-[40px] text-xs font-semibold uppercase tracking-wider text-white bg-[#342044] hover:bg-[#21183F] rounded-full shadow-md transition-all cursor-pointer border border-[#D8C19A]/50 active:scale-95 hover:shadow-lg"
          >
            <Printer className="w-4 h-4 text-[#FFEAA7]" />
            <span>Print / Save PDF</span>
          </button>

          {onOpenQrModal && (
            <button
              onClick={() => {
                onClose();
                onOpenQrModal();
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold text-[#342044] bg-white hover:bg-[#FFF8EF] border border-[#D8C19A] rounded-full shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <QrCode className="w-4 h-4 text-[#A88B58]" />
              <span>Share QR Code</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
