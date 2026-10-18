import React from 'react';
import toshikTanayaCoupleImg from '../assets/images/toshik_tanaya_transparent_attached_couple.png';

export const CoupleIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[240px] sm:max-w-[290px] md:max-w-[330px] mx-auto flex flex-col items-center select-none">
      {/* Couple illustration merged seamlessly with the warm ivory card background */}
      <div className="relative w-full flex items-center justify-center">
        <img
          src={toshikTanayaCoupleImg}
          alt="Toshik & Tanaya Engagement Couple in Royal Gold Lehenga & Midnight Bandhgala"
          className="w-full h-auto object-contain block drop-shadow-sm transition-transform duration-500 hover:scale-[1.01]"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    </div>
  );
};
