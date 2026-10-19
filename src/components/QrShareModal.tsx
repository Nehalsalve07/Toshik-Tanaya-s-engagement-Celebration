import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, QrCode, Download, Share2, Copy, Check, MessageCircle, Sparkles, MapPin, Calendar, Heart, ArrowLeft } from 'lucide-react';
import { WEDDING_DETAILS } from '../utils/calendar';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrShareModal: React.FC<QrShareModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getSiteUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href.split('#')[0];
    }
    return 'https://ais-pre-44ilhv4ix4gp5l5xncsjoq-267222827121.asia-southeast1.run.app';
  };

  const siteUrl = getSiteUrl();

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setShareSupported(true);
    }

    if (isOpen) {
      QRCode.toDataURL(
        siteUrl,
        {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 512,
          color: {
            dark: '#342044',
            light: '#FFFFFF',
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrDataUrl(url);
          }
        }
      );
    }
  }, [isOpen, siteUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = siteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const shareText = `🌸 Toshik & Tanaya's Engagement Ceremony 🌸\n\nWe cordially invite you to celebrate the joyous Sakharpuda & Ring Ceremony of Toshik (Son of Mr. Dinkar & Mrs. Vandana Karadbhajne) & Tanaya (Daughter of Mr. Dattatray & Mrs. Sharayu Sarve).\n\n📅 Tuesday, 10 November 2026 at 4:30 PM\n📍 Aditya Villa, Besa-Pipla Rd, Maharashtra\n\nView the ceremony details, muhurat schedule & directions:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Toshik & Tanaya's Engagement Invitation",
          text: shareText,
          url: siteUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const message = `🌸 *Toshik & Tanaya's Engagement Ceremony* 🌸\n\nTogether with our families, we cordially invite you to celebrate our auspicious Sakharpuda & Ring Ceremony!\n\n🤵 *Toshik* (S/o Mr. Dinkar & Mrs. Vandana Karadbhajne)\n👰 *Tanaya* (D/o Mr. Dattatray & Mrs. Sharayu Sarve)\n\n📅 *Date:* 10 November 2026\n⏰ *Muhurat:* 4:30 PM\n📍 *Venue:* Aditya Villa, Besa-Pipla Rd, Maharashtra 440037\n\n✨ Tap below to view the full invitation, schedule & venue map:\n${siteUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Warm Ivory
    ctx.fillStyle = '#FFF5E9';
    ctx.fillRect(0, 0, 800, 1000);

    // Decorative Borders
    ctx.strokeStyle = '#D8C19A';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 960);
    ctx.strokeStyle = '#342044';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(32, 32, 736, 936);

    // Header Text
    ctx.fillStyle = '#73526E';
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px serif';
    ctx.fillText('॥ श्री गणेशाय नमः ॥ · ॥ शुभ साखरपुडा ॥', 400, 90);

    ctx.fillStyle = '#73526E';
    ctx.font = '16px sans-serif';
    ctx.fillText('ENGAGEMENT CEREMONY INVITATION', 400, 130);

    ctx.fillStyle = '#342044';
    ctx.font = 'bold 44px serif';
    ctx.fillText('Toshik  &  Tanaya', 400, 190);

    ctx.fillStyle = '#A88B58';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('10 November 2026  •  4:30 PM', 400, 230);

    ctx.fillStyle = '#5B4058';
    ctx.font = '18px sans-serif';
    ctx.fillText('Venue: Aditya Villa, Besa-Pipla, Maharashtra', 400, 265);

    // QR Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 200, 310, 400, 400);

      // Inner Monogram
      ctx.beginPath();
      ctx.arc(400, 510, 46, 0, Math.PI * 2);
      ctx.fillStyle = '#342044';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#D8C19A';
      ctx.stroke();

      ctx.fillStyle = '#FFEAA7';
      ctx.font = 'bold 20px serif';
      ctx.fillText('T & T', 400, 517);

      ctx.fillStyle = '#342044';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Scan to View Engagement Invitation', 400, 770);

      ctx.fillStyle = '#73526E';
      ctx.font = '16px sans-serif';
      ctx.fillText('Interactive Schedule • Venue GPS Directions • Photo Gallery', 400, 810);

      ctx.fillStyle = '#73526E';
      ctx.font = '14px sans-serif';
      ctx.fillText('Sarve & Karadbhajne Families Cordially Welcome You', 400, 850);

      const link = document.createElement('a');
      link.download = 'Toshik_Tanaya_Engagement_QR_Invitation.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = qrDataUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#10152F]/92 backdrop-blur-md flex items-start md:items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto"
      onClick={onClose}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div
        className="relative w-full max-w-md md:max-w-3xl lg:max-w-4xl bg-[#FFF5E9] text-[#342044] rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-[#D8C19A] p-3.5 sm:p-6 md:p-7 lg:p-8 my-auto text-center transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        ref={cardRef}
      >
        {/* Top Control Bar with Clear Separation */}
        <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-3 border-b border-[#D8C19A]/40">
          <span className="text-xs sm:text-sm md:text-base font-semibold text-[#73526E] uppercase tracking-wider font-cormorant">
            Digital QR Pass & Instant Sharing
          </span>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center text-[#73526E] hover:text-[#342044] bg-white hover:bg-[#FFF8EF] rounded-full border border-[#D8C19A] transition-colors cursor-pointer shadow-xs active:scale-95 ml-auto"
            aria-label="Close QR Code Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Responsive Layout on Laptop / Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center text-center md:text-left">
          {/* Left Column (QR Presentation Box) - 5 Cols on Laptop */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="p-3.5 sm:p-5 bg-white rounded-2xl border-2 border-[#D8C19A] shadow-inner inline-block relative max-w-[260px] sm:max-w-[280px] w-full">
              <span className="absolute top-2 left-2 text-[#D8C19A] text-xs">✦</span>
              <span className="absolute top-2 right-2 text-[#D8C19A] text-xs">✦</span>
              <span className="absolute bottom-2 left-2 text-[#D8C19A] text-xs">✦</span>
              <span className="absolute bottom-2 right-2 text-[#D8C19A] text-xs">✦</span>

              {qrDataUrl ? (
                <div className="relative inline-block w-full">
                  <img
                    src={qrDataUrl}
                    alt="Unique QR Code for Toshik & Tanaya's Engagement Invitation"
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto rounded-xl object-contain shadow-xs"
                  />
                  {/* Center Monogram Emblem */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-[#342044] rounded-full border-2 border-[#D8C19A] flex items-center justify-center shadow-lg">
                    <span className="font-serif font-bold text-[#FFEAA7] text-[10px] sm:text-xs tracking-tight">
                      T & T
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center text-[#73526E] text-xs">
                  Generating Auspicious QR Code...
                </div>
              )}

              <p className="text-[10px] sm:text-[11px] font-bold text-[#342044] mt-2 tracking-wide font-montserrat text-center">
                Toshik & Tanaya • 10 Nov 2026
              </p>
            </div>
          </div>

          {/* Right Column (Info, Shloka & Share Buttons) - 7 Cols on Laptop */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            {/* Auspicious Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8C19A] text-[#73526E] text-[10px] sm:text-xs font-bold font-montserrat shadow-xs">
              <Sparkles className="w-3 h-3 text-[#A88B58]" />
              <span>॥ शुभ साखरपुडा · डिजिटल आमंत्रण ॥</span>
            </div>

            <div>
              <h3 className="font-script text-3xl sm:text-3.5xl md:text-4xl font-bold text-[#342044] leading-tight">
                Engagement QR Invitation
              </h3>
              <p className="text-[11px] sm:text-xs text-[#73526E] mt-1 max-w-md font-serif leading-relaxed">
                Scan this unique QR code with any smartphone camera to instantly access the celebration details, venue GPS map, and ceremony schedule.
              </p>
            </div>

            {/* Event Quick Info Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#5B4058]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8C19A] shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#A88B58]" />
                10 Nov 2026, 4:30 PM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D8C19A] shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#A88B58]" />
                Aditya Villa, Besa-Pipla
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-1">
              <button
                onClick={handleDownloadQr}
                className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-full font-semibold text-xs tracking-wide text-white bg-[#342044] hover:bg-[#21183F] shadow-md transition-all cursor-pointer border border-[#D8C19A]/50 active:scale-95"
              >
                <Download className="w-4 h-4 text-[#FFEAA7]" />
                <span>Download Pass</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-full font-semibold text-xs tracking-wide text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5">
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-full border transition-all cursor-pointer active:scale-95 ${
                  copied
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white hover:bg-[#FFF8EF] text-[#342044] border-[#D8C19A]'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#A88B58]" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              {shareSupported && (
                <button
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-full bg-white hover:bg-[#FFF8EF] text-[#342044] border border-[#D8C19A] transition-all cursor-pointer active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#A88B58]" />
                  <span>More Options</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 min-h-[36px] text-xs font-semibold text-[#73526E] hover:text-[#342044] bg-[#FFF8EF] hover:bg-white border border-[#D8C19A] rounded-full transition-all cursor-pointer active:scale-95"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
