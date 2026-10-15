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
      // Generate QR Code with high error correction and custom colors (Royal Maroon & Gold)
      QRCode.toDataURL(
        siteUrl,
        {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 320,
          color: {
            dark: '#7A1B28', // Royal Maroon
            light: '#FFFFFF', // Crisp White background for highest contrast and scan reliability
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
      // Fallback
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
    const shareText = `🌸 Toshik & Tanaya's Engagement Ceremony 🌸\n\nWe cordially invite you to celebrate the joyous Sakharpuda & Ring Ceremony of Toshik (Son of Mr. Dinkar & Mrs. Vandana Karadbhajne) & Tanaya (Daughter of Mr. Dattatray & Mrs. Sulochana Sarve).\n\n📅 Tuesday, 10 November 2026 at 4:30 PM\n📍 Aditya Villa, Besa-Pipla Rd, Maharashtra\n\nView the ceremony details, muhurat schedule & directions:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Toshik & Tanaya's Engagement Invitation",
          text: shareText,
          url: siteUrl,
        });
      } catch (err) {
        // Share cancelled or aborted
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const message = `🌸 *Toshik & Tanaya's Engagement Ceremony* 🌸\n\nTogether with our families, we cordially invite you to celebrate our auspicious Sakharpuda & Ring Ceremony!\n\n🤵 *Toshik* (S/o Mr. Dinkar & Mrs. Vandana Karadbhajne)\n👰 *Tanaya* (D/o Mr. Dattatray & Mrs. Sulochana Sarve)\n\n📅 *Date:* 10 November 2026\n⏰ *Muhurat:* 4:30 PM\n📍 *Venue:* Aditya Villa, Besa-Pipla Rd, Maharashtra 440037\n\n✨ Tap below to view the full invitation, schedule & venue map:\n${siteUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;

    // Create a high-res styled card on an off-screen canvas and trigger download
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, 800, 1000);

    // Decorative Borders
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 960);
    ctx.strokeStyle = '#AA820A';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 736, 936);

    // Header Text
    ctx.fillStyle = '#7A1B28';
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px serif';
    ctx.fillText('॥ श्री गणेशाय नमः ॥ · ॥ शुभ साखरपुडा ॥', 400, 90);

    ctx.fillStyle = '#665753';
    ctx.font = '18px sans-serif';
    ctx.fillText('ENGAGEMENT CEREMONY INVITATION', 400, 130);

    ctx.fillStyle = '#7A1B28';
    ctx.font = 'bold 44px serif';
    ctx.fillText('Toshik  &  Tanaya', 400, 190);

    ctx.fillStyle = '#AA820A';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('10 November 2026  •  4:30 PM', 400, 230);

    ctx.fillStyle = '#4A3E3D';
    ctx.font = '18px sans-serif';
    ctx.fillText('Venue: Aditya Villa, Besa-Pipla, Maharashtra', 400, 265);

    // QR Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw white card frame for QR
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 15;
      ctx.fillRect(200, 310, 400, 400);
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#E8DFC8';
      ctx.lineWidth = 3;
      ctx.strokeRect(200, 310, 400, 400);

      ctx.drawImage(img, 220, 330, 360, 360);

      // Monogram insignia in center of QR
      ctx.fillStyle = '#7A1B28';
      ctx.beginPath();
      ctx.arc(400, 510, 34, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#F5C042';
      ctx.font = 'bold 20px serif';
      ctx.fillText('T & T', 400, 517);

      // Footer Instructions
      ctx.fillStyle = '#7A1B28';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Scan to View Engagement Invitation', 400, 770);

      ctx.fillStyle = '#665753';
      ctx.font = '16px sans-serif';
      ctx.fillText('Interactive Schedule • Venue GPS Directions • Photo Gallery', 400, 810);

      ctx.fillStyle = '#8A7A75';
      ctx.font = '14px sans-serif';
      ctx.fillText('Sarve & Karadbhajne Families Cordially Welcome You', 400, 850);

      // Download
      const link = document.createElement('a');
      link.download = 'Toshik_Tanaya_Engagement_QR_Invitation.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = qrDataUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#FAF7F2] rounded-3xl shadow-2xl border-4 border-[#D4AF37] p-6 sm:p-8 my-6 text-center"
        onClick={(e) => e.stopPropagation()}
        ref={cardRef}
      >
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7A1B28] bg-white hover:bg-[#FAF3DE] rounded-full border border-[#D4AF37]/50 shadow-sm transition-all cursor-pointer group"
          aria-label="Back to invitation"
        >
          <ArrowLeft className="w-4 h-4 text-[#AA820A] group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8A7A75] hover:text-[#2D2421] bg-white rounded-full border border-[#E8DFC8] transition-colors cursor-pointer shadow-sm"
          aria-label="Close QR Code Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Auspicious Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3DE] border border-[#EADBBD] text-[#AA820A] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>॥ शुभ साखरपुडा · डिजिटल आमंत्रण पत्रिका ॥</span>
        </div>

        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#7A1B28]">
          Engagement Invitation QR Code
        </h3>
        <p className="text-xs text-[#665753] mt-1 max-w-md mx-auto">
          Scan this unique QR code with any smartphone camera to instantly access the celebration details, venue map, and photos.
        </p>

        {/* QR Code Presentation Frame */}
        <div className="mt-5 mb-5 p-5 bg-white rounded-2xl border-2 border-[#E8DFC8] shadow-inner inline-block relative group">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

          {qrDataUrl ? (
            <div className="relative inline-block">
              <img
                src={qrDataUrl}
                alt="Unique QR Code for Toshik & Tanaya's Engagement Invitation"
                className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-lg"
              />
              {/* Center Royal Monogram Emblem */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#7A1B28] rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
                <span className="font-serif font-bold text-[#F5C042] text-xs tracking-tight">
                  T & T
                </span>
              </div>
            </div>
          ) : (
            <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center text-[#8A7A75] text-xs">
              Generating Auspicious QR Code...
            </div>
          )}

          {/* Scannable Notice */}
          <p className="text-[11px] font-semibold text-[#7A1B28] mt-2 tracking-wide">
            Toshik & Tanaya • 10 Nov 2026 • Aditya Villa
          </p>
        </div>

        {/* Event Quick Info Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-[#4A3E3D]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8DFC8]">
            <Calendar className="w-3.5 h-3.5 text-[#AA820A]" />
            10 Nov 2026, 4:30 PM
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8DFC8]">
            <MapPin className="w-3.5 h-3.5 text-[#AA820A]" />
            Aditya Villa, Besa-Pipla
          </span>
        </div>

        {/* Share Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {/* Download QR Card */}
          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white bg-[#7A1B28] hover:bg-[#58121C] shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download QR Invitation</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
        </div>

        {/* Secondary Actions: Copy Link & Native Share */}
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white hover:bg-[#FAF7F2] text-[#4A3E3D] border-[#E8DFC8]'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#AA820A]" />}
            <span>{copied ? 'Link Copied!' : 'Copy Invitation Link'}</span>
          </button>

          {shareSupported && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-white hover:bg-[#FAF7F2] text-[#4A3E3D] border border-[#E8DFC8] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#AA820A]" />
              <span>More Share Options</span>
            </button>
          )}
        </div>

        {/* Back to Website Button */}
        <div className="mt-4 pt-3 border-t border-[#E8DFC8]/70 flex items-center justify-center">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#7A1B28] hover:text-[#58121C] bg-white hover:bg-[#FAF3DE] border border-[#D4AF37] rounded-xl transition-all shadow-sm cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#AA820A] group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Engagement Celebration</span>
          </button>
        </div>
      </div>
    </div>
  );
};
