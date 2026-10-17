import React, { useMemo } from 'react';

interface PetalConfig {
  id: number;
  left: number; // percentage 0 - 100
  duration: number; // seconds
  delay: number; // seconds
  size: number; // width in px
  type: 'cherry-blossom' | 'rose-blush' | 'jasmine-white' | 'cherry-deep';
  animClass: string;
}

interface FloralPetalsProps {
  isActive?: boolean;
}

export const FloralPetals: React.FC<FloralPetalsProps> = ({ isActive = true }) => {
  const petals = useMemo<PetalConfig[]>(() => {
    const list: PetalConfig[] = [];
    const count = 20; // Lightweight optimal count for 60fps performance on mobile & desktop

    const flowerTypes: ('cherry-blossom' | 'rose-blush' | 'jasmine-white' | 'cherry-deep')[] = [
      'cherry-blossom',
      'rose-blush',
      'jasmine-white',
      'cherry-blossom',
      'cherry-deep',
      'rose-blush',
      'jasmine-white',
    ];

    const animClasses = ['petal-anim-1', 'petal-anim-2', 'petal-anim-3'];

    for (let i = 0; i < count; i++) {
      const baseLeft = (i / count) * 96 + 2;
      const jitter = ((i * 7) % 5) - 2;
      const left = Math.max(2, Math.min(96, baseLeft + jitter));

      const duration = 10 + ((i * 3) % 7); // 10s to 16s
      const delay = -1 * ((i * 1.8) % 12);
      const size = 12 + ((i * 3.5) % 9); // 12px to 21px
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
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20"
      aria-hidden="true"
    >
      {/* Shared Gradient Definitions to eliminate GPU overhead and DOM bloat */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="sharedSakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#F4C8D7" />
            <stop offset="100%" stopColor="#E599B2" />
          </linearGradient>

          <linearGradient id="sharedSakuraDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F0" />
            <stop offset="60%" stopColor="#E896B0" />
            <stop offset="100%" stopColor="#C95B7E" />
          </linearGradient>

          <linearGradient id="sharedRoseBlush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5F8" />
            <stop offset="45%" stopColor="#F8BBD0" />
            <stop offset="100%" stopColor="#E91E63" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id="sharedJasmineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="60%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8DFD5" />
          </radialGradient>
        </defs>
      </svg>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute top-0 will-change-transform ${petal.animClass}`}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            transform: 'translate3d(0,0,0)',
          }}
        >
          {/* Cherry Blossom Petal (Soft Pink) */}
          {petal.type === 'cherry-blossom' && (
            <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-xs opacity-85">
              <path
                d="M 12 1 C 5 7 1 18 6 27 C 11 31 16 31 20 25 C 24 16 19 6 12 1 Z"
                fill="url(#sharedSakuraGrad)"
              />
              <path
                d="M 12 3 Q 12 18 14 26"
                stroke="#D68095"
                strokeWidth="0.6"
                fill="none"
                opacity="0.6"
              />
            </svg>
          )}

          {/* Deep Cherry Petal */}
          {petal.type === 'cherry-deep' && (
            <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-xs opacity-80">
              <path
                d="M 12 1 C 4 8 2 20 7 28 C 12 32 17 31 21 24 C 23 15 18 5 12 1 Z"
                fill="url(#sharedSakuraDeep)"
              />
            </svg>
          )}

          {/* Rose Blush Petal */}
          {petal.type === 'rose-blush' && (
            <svg viewBox="0 0 26 30" className="w-full h-full drop-shadow-xs opacity-85">
              <path
                d="M 13 2 C 7 7 2 16 5 24 C 9 29 17 29 21 24 C 24 16 19 7 13 2 Z"
                fill="url(#sharedRoseBlush)"
              />
            </svg>
          )}

          {/* White Jasmine Blossom */}
          {petal.type === 'jasmine-white' && (
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-xs opacity-90">
              <g transform="translate(12, 12)">
                {[0, 72, 144, 216, 288].map((deg, idx) => (
                  <ellipse
                    key={idx}
                    cx="0"
                    cy="-6"
                    rx="3.2"
                    ry="6.5"
                    fill="url(#sharedJasmineGrad)"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2.2" fill="#FFEAA7" />
              </g>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
