import React, { useRef, useState, useEffect } from 'react';
import { X, Printer, Download, Sparkles, Heart, QrCode, ArrowLeft } from 'lucide-react';
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
          errorCorrectionLevel: 'M',
          margin: 1,
          width: 200,
          color: {
            dark: '#7A1B28',
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
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#FAF7F2] rounded-3xl shadow-2xl border-4 border-[#D4AF37] p-6 sm:p-10 my-8 text-center"
        onClick={(e) => e.stopPropagation()}
        ref={cardRef}
      >
        {/* Back Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="print:hidden absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7A1B28] bg-white hover:bg-[#FAF3DE] rounded-full border border-[#D4AF37]/50 shadow-sm transition-all cursor-pointer group"
          aria-label="Back to website"
        >
          <ArrowLeft className="w-4 h-4 text-[#AA820A] group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="print:hidden absolute top-4 right-4 p-2 text-[#8A7A75] hover:text-[#2D2421] bg-white rounded-full border border-[#E8DFC8] transition-colors cursor-pointer shadow-sm"
          aria-label="Close invitation card"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Outer Ornamental Frame */}
        <div className="border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 relative bg-white/70">
          {/* Corner traditional symbols */}
          <span className="absolute top-2 left-2 text-[#AA820A] text-sm">卐</span>
          <span className="absolute top-2 right-2 text-[#AA820A] text-sm">卐</span>
          <span className="absolute bottom-2 left-2 text-[#AA820A] text-sm">卐</span>
          <span className="absolute bottom-2 right-2 text-[#AA820A] text-sm">卐</span>

          {/* Sanskrit Blessings */}
          <div className="space-y-1 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#AA820A]">
              ॥ श्री गणेशाय नमः ॥ · ॥ शुभ साखरपुडा व वाङ्निश्चय ॥
            </p>
            <p className="font-serif text-xs text-[#7A1B28] italic">
              "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
            </p>
          </div>

          {/* Royal Invitation Text */}
          <div className="space-y-4 mb-6">
            <p className="text-xs sm:text-sm text-[#4A3E3D] uppercase tracking-wider">
              Together with the Sarve & Karadbhajne Families
            </p>
            <p className="text-xs sm:text-sm text-[#665753]">
              Request the honour of your auspicious presence and blessings on the joyous occasion of the engagement ceremony & ring exchange of
            </p>

            {/* Groom */}
            <div className="pt-2">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#7A1B28]">
                Toshik
              </h2>
              <p className="text-xs sm:text-sm text-[#665753] mt-0.5">
                Son of <strong className="text-[#2D2421]">Mr. Dinkar Karadbhajne</strong> &{' '}
                <strong className="text-[#2D2421]">Mrs. Vandana Karadbhajne</strong>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-[#D4AF37] py-1">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
              <span className="font-playfair italic text-lg sm:text-xl text-[#AA820A]">gets engaged to</span>
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
            </div>

            {/* Bride */}
            <div>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#7A1B28]">
                Tanaya
              </h2>
              <p className="text-xs sm:text-sm text-[#665753] mt-0.5">
                Daughter of <strong className="text-[#2D2421]">Mr. Dattatray Sarve</strong> &{' '}
                <strong className="text-[#2D2421]">Mrs. Sulochana Sarve</strong>
              </p>
            </div>
          </div>

          {/* Muhurat & Venue */}
          <div className="py-4 border-y border-[#D4AF37]/40 space-y-2 mb-6">
            <div className="text-sm sm:text-base font-bold text-[#7A1B28]">
              Tuesday, 10 November 2026 · Auspicious Engagement Muhurat at 4:30 PM
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-[#2D2421]">
                Venue: {WEDDING_DETAILS.venueName}
              </p>
              <p className="text-xs text-[#665753] max-w-md mx-auto">
                {WEDDING_DETAILS.venueAddress}
              </p>
            </div>
          </div>

          {/* Welcome Note & Scannable QR Code */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D4AF37]/30 text-left">
            <div className="text-xs text-[#665753] space-y-1 max-w-sm text-center sm:text-left">
              <p className="text-[11px] text-[#8A7A75] italic">
                "We look forward to celebrating this joyous milestone and betrothal surrounded by dear friends and family."
              </p>
              <p className="text-[10px] text-[#AA820A] font-semibold uppercase tracking-wider">
                Scan QR with your phone to view online schedule & directions
              </p>
            </div>

            {/* Embedded QR Code for print & mobile scan */}
            {qrDataUrl && (
              <div className="shrink-0 p-2 bg-white rounded-xl border border-[#D4AF37]/50 shadow-sm flex flex-col items-center">
                <img
                  src={qrDataUrl}
                  alt="Scannable Engagement Invitation QR Code"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                <span className="text-[9px] font-bold text-[#7A1B28] mt-0.5">
                  Scan for Details
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Print / Share QR / Close) */}
        <div className="print:hidden flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#7A1B28] hover:bg-[#58121C] rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save as PDF</span>
          </button>
          {onOpenQrModal && (
            <button
              onClick={() => {
                onClose();
                onOpenQrModal();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#7A1B28] bg-white hover:bg-[#FAF7F2] border border-[#D4AF37] rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#AA820A]" />
              <span>Share QR Code</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#7A1B28] hover:text-[#58121C] bg-[#FAF3DE] hover:bg-[#F3E7C4] border border-[#D4AF37] rounded-xl shadow-sm transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#AA820A] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
