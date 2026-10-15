import React, { useMemo } from 'react';

interface PetalConfig {
  id: number;
  left: number; // percentage 0 - 100
  duration: number; // seconds
  delay: number; // seconds
  size: number; // width in px
  type: 'marigold' | 'rose' | 'jasmine' | 'marigold-yellow';
  animClass: string;
}

interface FloralPetalsProps {
  isActive?: boolean;
}

export const FloralPetals: React.FC<FloralPetalsProps> = ({ isActive = true }) => {
  // Deterministic seed generation so it doesn't recalculate on every re-render
  const petals = useMemo<PetalConfig[]>(() => {
    const list: PetalConfig[] = [];
    const count = 32;

    const flowerTypes: ('marigold' | 'rose' | 'jasmine' | 'marigold-yellow')[] = [
      'marigold',
      'rose',
      'marigold-yellow',
      'rose',
      'marigold',
      'jasmine',
      'rose',
      'marigold',
    ];

    const animClasses = ['petal-anim-1', 'petal-anim-2', 'petal-anim-3'];

    for (let i = 0; i < count; i++) {
      // Spread evenly across the width with slight jitter
      const baseLeft = (i / count) * 98 + 1;
      const jitter = ((i * 7) % 5) - 2;
      const left = Math.max(1, Math.min(98, baseLeft + jitter));

      const duration = 8.5 + ((i * 3) % 6.5); // 8.5s to 15s
      const delay = -1 * ((i * 1.3) % 11); // negative delay starts animation midway so petals are immediately falling!
      const size = 13 + ((i * 4) % 10); // 13px to 23px
      const type = flowerTypes[i % flowerTypes.length];
      const animClass = animClasses[i % animClasses.length];

      list.push({
        id: i,
        left,
        duration,
        delay,
        size,
        type,
        animClass,
      });
    }

    return list;
  }, []);

  if (!isActive) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute top-0 ${petal.animClass}`}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: `${Math.round(petal.size * 1.25)}px`,
          }}
        >
          {petal.type === 'rose' && (
            /* Traditional Red/Crimson Velvet Rose Petal (Gulabi Pankhudi) */
            <svg
              viewBox="0 0 24 30"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(122,27,40,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`roseGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A1325" />
                  <stop offset="45%" stopColor="#B31D34" />
                  <stop offset="100%" stopColor="#D9384E" />
                </linearGradient>
              </defs>
              <path
                d="M12 2C6 2 2 8 2 16C2 23 7 28 12 29C17 28 22 23 22 16C22 8 18 2 12 2Z"
                fill={`url(#roseGrad-${petal.id})`}
              />
              {/* Subtle central petal vein */}
              <path
                d="M12 5C12 12 12 21 12 26"
                stroke="#F28E9B"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          )}

          {petal.type === 'marigold' && (
            /* Traditional Saffron Orange Marigold Petal (Kesari Genda) */
            <svg
              viewBox="0 0 24 28"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(217,119,6,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`marigoldGrad-${petal.id}`} x1="0%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <path
                d="M12 1.5C7.5 1.5 3 6.5 3 14C3 21 7 26.5 12 27.5C17 26.5 21 21 21 14C21 6.5 16.5 1.5 12 1.5Z"
                fill={`url(#marigoldGrad-${petal.id})`}
              />
              <path
                d="M12 4C12 11 11.5 20 12 25"
                stroke="#FDE68A"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          )}

          {petal.type === 'marigold-yellow' && (
            /* Bright Yellow Marigold Petal (Pivla Zendu) */
            <svg
              viewBox="0 0 22 26"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(234,179,8,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`yellowGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" />
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#FDE047" />
                </linearGradient>
              </defs>
              <path
                d="M11 2C6.8 2 2.5 7 2.5 13.5C2.5 19.5 6.5 24.5 11 25.5C15.5 24.5 19.5 19.5 19.5 13.5C19.5 7 15.2 2 11 2Z"
                fill={`url(#yellowGrad-${petal.id})`}
              />
              <path
                d="M11 4C11 11 11 18 11 23"
                stroke="#FEF08A"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          )}

          {petal.type === 'jasmine' && (
            /* Fragrant Auspicious White Jasmine / Mogra Petal */
            <svg
              viewBox="0 0 20 26"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(180,160,120,0.2)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`jasmineGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF9EE" />
                  <stop offset="60%" stopColor="#FFFDF7" />
                  <stop offset="100%" stopColor="#F4ECE1" />
                </linearGradient>
              </defs>
              <path
                d="M10 2C6 2 2 7 2 13.5C2 19 6 24 10 25C14 24 18 19 18 13.5C18 7 14 2 10 2Z"
                fill={`url(#jasmineGrad-${petal.id})`}
                stroke="#EADBBD"
                strokeWidth="0.5"
              />
              <path
                d="M10 5C10 11 10 18 10 22"
                stroke="#D4AF37"
                strokeWidth="0.6"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
