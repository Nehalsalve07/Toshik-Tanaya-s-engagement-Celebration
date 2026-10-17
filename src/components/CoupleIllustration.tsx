import React from 'react';
import toshikTanayaCoupleImg from '../assets/images/toshik_tanaya_exact_attached_couple_1792254953173.jpg';

export const CoupleIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto flex flex-col items-center select-none">
      {/* Main Couple Illustration matching the uploaded gold lehenga & black bandhgala attire */}
      <div className="relative w-full overflow-hidden rounded-2xl group">
        <img
          src={toshikTanayaCoupleImg}
          alt="Toshik & Tanaya Engagement Couple in Royal Gold Lehenga & Midnight Bandhgala"
          className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-700 hover:scale-[1.02]"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Soft feather gradient at base so it blends seamlessly into the ivory card */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FFF5E9] via-[#FFF5E9]/60 to-transparent pointer-events-none" />
      </div>

      {/* SVG Floral Corner Accents Flanking the Couple */}
      <div className="absolute -bottom-2 -left-6 sm:-left-8 w-20 sm:w-24 pointer-events-none select-none opacity-90">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Sage Leaves */}
          <ellipse cx="25" cy="45" rx="22" ry="8" fill="#8FA470" transform="rotate(-30 25 45)" />
          <ellipse cx="45" cy="55" rx="18" ry="7" fill="#758B55" transform="rotate(20 45 55)" />
          <ellipse cx="10" cy="50" rx="16" ry="6" fill="#8FA470" transform="rotate(-65 10 50)" />

          {/* White Roses & Blush Bud */}
          <circle cx="28" cy="40" r="14" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="1" />
          <circle cx="28" cy="40" r="9" fill="#FFF5EB" />
          <circle cx="28" cy="40" r="4" fill="#F4C8D7" />

          <circle cx="50" cy="48" r="10" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="1" />
          <circle cx="50" cy="48" r="5" fill="#FCE4EC" />

          {/* Baby's breath tiny dots */}
          <circle cx="15" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="36" cy="22" r="2.5" fill="#FFFFFF" />
          <circle cx="62" cy="40" r="2.2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="absolute -bottom-2 -right-6 sm:-right-8 w-20 sm:w-24 pointer-events-none select-none opacity-90">
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Sage Leaves */}
          <ellipse cx="75" cy="45" rx="22" ry="8" fill="#8FA470" transform="rotate(30 75 45)" />
          <ellipse cx="55" cy="55" rx="18" ry="7" fill="#758B55" transform="rotate(-20 55 55)" />
          <ellipse cx="90" cy="50" rx="16" ry="6" fill="#8FA470" transform="rotate(65 90 50)" />

          {/* White Roses & Blush Bud */}
          <circle cx="72" cy="40" r="14" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="1" />
          <circle cx="72" cy="40" r="9" fill="#FFF5EB" />
          <circle cx="72" cy="40" r="4" fill="#F4C8D7" />

          <circle cx="50" cy="48" r="10" fill="#FFFFFF" stroke="#E5DACD" strokeWidth="1" />
          <circle cx="50" cy="48" r="5" fill="#FCE4EC" />

          {/* Baby's breath tiny dots */}
          <circle cx="85" cy="28" r="2.5" fill="#FFFFFF" />
          <circle cx="64" cy="22" r="2.5" fill="#FFFFFF" />
          <circle cx="38" cy="40" r="2.2" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
};
