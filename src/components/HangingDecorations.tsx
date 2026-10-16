import React from 'react';

export const HangingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Background Twinkling Stars */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
            <stop offset="60%" stopColor="#D8C19A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10152F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Scattered Sparkle Stars */}
        {[
          { x: '8%', y: '12%', s: 2.2, d: '0s' },
          { x: '16%', y: '28%', s: 1.6, d: '1.2s' },
          { x: '24%', y: '9%', s: 2.5, d: '2.4s' },
          { x: '35%', y: '18%', s: 1.8, d: '0.8s' },
          { x: '44%', y: '8%', s: 2.8, d: '1.6s' },
          { x: '58%', y: '14%', s: 1.5, d: '2.1s' },
          { x: '68%', y: '7%', s: 2.4, d: '0.4s' },
          { x: '78%', y: '22%', s: 2.0, d: '1.9s' },
          { x: '86%', y: '10%', s: 2.6, d: '2.7s' },
          { x: '94%', y: '19%', s: 1.7, d: '1.1s' },
          { x: '12%', y: '48%', s: 1.5, d: '3.1s' },
          { x: '88%', y: '42%', s: 1.9, d: '2.2s' },
          { x: '6%', y: '72%', s: 2.2, d: '1.4s' },
          { x: '92%', y: '68%', s: 2.0, d: '0.9s' },
          { x: '3%', y: '32%', s: 1.4, d: '2.8s' },
          { x: '96%', y: '36%', s: 1.6, d: '1.7s' },
        ].map((star, i) => (
          <g key={i} className="twinkle-star" style={{ animationDelay: star.d }}>
            <circle cx={star.x} cy={star.y} r={star.s} fill="url(#starGlow)" />
            {star.s > 2 && (
              <circle cx={star.x} cy={star.y} r={star.s * 1.8} fill="#FFFDF5" opacity="0.3" />
            )}
          </g>
        ))}
      </svg>

      {/* Top Hanging Floral Canopy & Pearl Strands SVG - Scaled for mobile */}
      <svg
        className="absolute top-0 left-0 w-full h-[160px] sm:h-[220px] md:h-[320px] lg:h-[400px]"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pearl Gradient */}
          <radialGradient id="pearlShine" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFF4EA" />
            <stop offset="85%" stopColor="#E2D4C3" />
            <stop offset="100%" stopColor="#BAA490" />
          </radialGradient>

          {/* Fairy Light Bulb Glow */}
          <radialGradient id="fairyGlowAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E0" stopOpacity="1" />
            <stop offset="40%" stopColor="#FFDE82" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#FFC83B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFB300" stopOpacity="0" />
          </radialGradient>

          {/* Blossom Petal Gradient */}
          <linearGradient id="blossomPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#F9D2DE" />
            <stop offset="100%" stopColor="#EFA7BA" />
          </linearGradient>

          {/* Deep Blossom Accent */}
          <linearGradient id="blossomRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F0" />
            <stop offset="70%" stopColor="#E695AD" />
            <stop offset="100%" stopColor="#C4607F" />
          </linearGradient>

          {/* Sage Leaf Gradient */}
          <linearGradient id="sageLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BCCB98" />
            <stop offset="100%" stopColor="#7E8F5D" />
          </linearGradient>
        </defs>

        {/* --- VERTICAL PEARL STRINGS --- */}
        {/* Left Pearl Strands */}
        {[
          { x: 45, len: 260, sway: 'pearl-sway', delay: '0s' },
          { x: 95, len: 320, sway: 'pearl-sway', delay: '0.8s' },
          { x: 160, len: 230, sway: 'pearl-sway', delay: '1.4s' },
          { x: 230, len: 190, sway: 'pearl-sway', delay: '0.3s' },
          { x: 310, len: 140, sway: 'pearl-sway', delay: '1.9s' },
          // Right Pearl Strands
          { x: 890, len: 150, sway: 'pearl-sway', delay: '1.6s' },
          { x: 970, len: 210, sway: 'pearl-sway', delay: '0.5s' },
          { x: 1040, len: 280, sway: 'pearl-sway', delay: '1.1s' },
          { x: 1105, len: 340, sway: 'pearl-sway', delay: '0.2s' },
          { x: 1155, len: 250, sway: 'pearl-sway', delay: '1.7s' },
        ].map((strand, sIdx) => {
          const count = Math.floor(strand.len / 16);
          return (
            <g key={sIdx} className={strand.sway} style={{ animationDelay: strand.delay }}>
              {/* Thin thread */}
              <line
                x1={strand.x}
                y1={0}
                x2={strand.x}
                y2={strand.len}
                stroke="#D8C19A"
                strokeWidth="0.7"
                strokeOpacity="0.6"
              />
              {/* Pearls along thread */}
              {Array.from({ length: count }).map((_, pIdx) => {
                const py = 15 + pIdx * 16;
                const r = pIdx === count - 1 ? 4.5 : pIdx % 3 === 0 ? 3.5 : 2.5;
                return (
                  <circle
                    key={pIdx}
                    cx={strand.x}
                    cy={py}
                    r={r}
                    fill="url(#pearlShine)"
                    stroke="#D8C19A"
                    strokeWidth="0.4"
                  />
                );
              })}
              {/* Tear drop pearl at bottom */}
              <ellipse
                cx={strand.x}
                cy={strand.len + 6}
                rx="3.5"
                ry="6"
                fill="url(#pearlShine)"
                stroke="#D8C19A"
                strokeWidth="0.4"
              />
            </g>
          );
        })}

        {/* --- FAIRY LIGHT STRANDS WITH GLOW --- */}
        {/* Swagged string lines across top */}
        <path
          d="M -20,20 Q 150,90 320,40 Q 500,95 680,45 Q 860,95 1050,40 Q 1150,75 1220,20"
          fill="none"
          stroke="#8A7750"
          strokeWidth="0.9"
          strokeOpacity="0.6"
        />
        <path
          d="M -20,60 Q 200,140 420,70 Q 640,150 860,75 Q 1060,140 1220,60"
          fill="none"
          stroke="#8A7750"
          strokeWidth="0.7"
          strokeOpacity="0.4"
        />

        {/* Glowing Fairy Light Bulbs */}
        {[
          { x: 30, y: 35, d: '0s' },
          { x: 80, y: 65, d: '0.7s' },
          { x: 140, y: 85, d: '1.4s' },
          { x: 210, y: 75, d: '2.1s' },
          { x: 280, y: 50, d: '0.3s' },
          { x: 360, y: 65, d: '1.8s' },
          { x: 440, y: 88, d: '1.1s' },
          { x: 520, y: 92, d: '2.5s' },
          { x: 600, y: 75, d: '0.6s' },
          { x: 680, y: 55, d: '1.9s' },
          { x: 760, y: 80, d: '1.3s' },
          { x: 840, y: 92, d: '0.4s' },
          { x: 920, y: 75, d: '2.2s' },
          { x: 1000, y: 55, d: '1.6s' },
          { x: 1070, y: 70, d: '0.9s' },
          { x: 1140, y: 45, d: '2.0s' },
        ].map((bulb, bIdx) => (
          <g key={bIdx} className="fairy-light" style={{ animationDelay: bulb.d }}>
            {/* Outer soft aura */}
            <circle cx={bulb.x} cy={bulb.y} r="18" fill="url(#fairyGlowAmber)" />
            {/* Bulb glass */}
            <ellipse cx={bulb.x} cy={bulb.y} rx="3" ry="4" fill="#FFFBE8" />
            <circle cx={bulb.x} cy={bulb.y - 1} r="1.5" fill="#FFFFFF" />
          </g>
        ))}

        {/* --- HANGING CHERRY BLOSSOM BRANCHES (LEFT CLUSTER) --- */}
        <g className="branch-sway">
          {/* Main Branch Vines */}
          <path
            d="M -40,-10 C 80,40 120,120 180,180 C 220,220 260,260 270,300"
            fill="none"
            stroke="#534336"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 120,110 C 80,160 50,220 30,280"
            fill="none"
            stroke="#534336"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 180,180 C 230,170 300,190 350,220"
            fill="none"
            stroke="#534336"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Leaves Along Branch */}
          {[
            { x: 60, y: 60, rot: 25 },
            { x: 90, y: 90, rot: -30 },
            { x: 130, y: 130, rot: 45 },
            { x: 160, y: 160, rot: -20 },
            { x: 210, y: 210, rot: 35 },
            { x: 250, y: 270, rot: -40 },
            { x: 80, y: 170, rot: 60 },
            { x: 45, y: 240, rot: -50 },
            { x: 250, y: 175, rot: 15 },
            { x: 310, y: 200, rot: -25 },
          ].map((leaf, lIdx) => (
            <ellipse
              key={lIdx}
              cx={leaf.x}
              cy={leaf.y}
              rx="12"
              ry="5"
              fill="url(#sageLeaf)"
              transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
              opacity="0.9"
            />
          ))}

          {/* Pink Cherry Blossom Flowers */}
          {[
            { x: 40, y: 40, s: 1.1, rot: 12 },
            { x: 100, y: 80, s: 1.3, rot: 45 },
            { x: 70, y: 130, s: 1.0, rot: -20 },
            { x: 140, y: 125, s: 1.4, rot: 30 },
            { x: 190, y: 180, s: 1.3, rot: -15 },
            { x: 160, y: 220, s: 0.9, rot: 50 },
            { x: 230, y: 225, s: 1.2, rot: 10 },
            { x: 270, y: 295, s: 1.1, rot: -35 },
            { x: 40, y: 260, s: 0.95, rot: 25 },
            { x: 320, y: 215, s: 1.0, rot: -10 },
            { x: 360, y: 225, s: 0.85, rot: 40 },
          ].map((blossom, bIdx) => (
            <g
              key={bIdx}
              transform={`translate(${blossom.x}, ${blossom.y}) scale(${blossom.s}) rotate(${blossom.rot})`}
            >
              {/* 5 Petals */}
              {[0, 72, 144, 216, 288].map((angle, pIdx) => (
                <path
                  key={pIdx}
                  d="M 0,0 C -6,-14 6,-14 0,0"
                  fill={pIdx % 2 === 0 ? 'url(#blossomPink)' : 'url(#blossomRose)'}
                  transform={`rotate(${angle})`}
                  opacity="0.95"
                />
              ))}
              {/* Flower Center Stamen */}
              <circle cx="0" cy="0" r="2.8" fill="#FFEAA7" />
              <circle cx="0" cy="0" r="1.2" fill="#D68095" />
            </g>
          ))}
        </g>

        {/* --- HANGING CHERRY BLOSSOM BRANCHES (RIGHT CLUSTER) --- */}
        <g className="branch-sway" style={{ animationDelay: '1.2s' }}>
          {/* Main Branch Vines */}
          <path
            d="M 1240,-10 C 1120,40 1080,120 1020,180 C 980,220 940,260 930,300"
            fill="none"
            stroke="#534336"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 1080,110 C 1120,160 1150,220 1170,280"
            fill="none"
            stroke="#534336"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 1020,180 C 970,170 900,190 850,220"
            fill="none"
            stroke="#534336"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Leaves Along Right Branch */}
          {[
            { x: 1140, y: 60, rot: -25 },
            { x: 1110, y: 90, rot: 30 },
            { x: 1070, y: 130, rot: -45 },
            { x: 1040, y: 160, rot: 20 },
            { x: 990, y: 210, rot: -35 },
            { x: 950, y: 270, rot: 40 },
            { x: 1120, y: 170, rot: -60 },
            { x: 1155, y: 240, rot: 50 },
            { x: 950, y: 175, rot: -15 },
            { x: 890, y: 200, rot: 25 },
          ].map((leaf, lIdx) => (
            <ellipse
              key={lIdx}
              cx={leaf.x}
              cy={leaf.y}
              rx="12"
              ry="5"
              fill="url(#sageLeaf)"
              transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
              opacity="0.9"
            />
          ))}

          {/* Pink Cherry Blossom Flowers */}
          {[
            { x: 1160, y: 40, s: 1.1, rot: -12 },
            { x: 1100, y: 80, s: 1.3, rot: -45 },
            { x: 1130, y: 130, s: 1.0, rot: 20 },
            { x: 1060, y: 125, s: 1.4, rot: -30 },
            { x: 1010, y: 180, s: 1.3, rot: 15 },
            { x: 1040, y: 220, s: 0.9, rot: -50 },
            { x: 970, y: 225, s: 1.2, rot: -10 },
            { x: 930, y: 295, s: 1.1, rot: 35 },
            { x: 1160, y: 260, s: 0.95, rot: -25 },
            { x: 880, y: 215, s: 1.0, rot: 10 },
            { x: 840, y: 225, s: 0.85, rot: -40 },
          ].map((blossom, bIdx) => (
            <g
              key={bIdx}
              transform={`translate(${blossom.x}, ${blossom.y}) scale(${blossom.s}) rotate(${blossom.rot})`}
            >
              {[0, 72, 144, 216, 288].map((angle, pIdx) => (
                <path
                  key={pIdx}
                  d="M 0,0 C -6,-14 6,-14 0,0"
                  fill={pIdx % 2 === 0 ? 'url(#blossomPink)' : 'url(#blossomRose)'}
                  transform={`rotate(${angle})`}
                  opacity="0.95"
                />
              ))}
              <circle cx="0" cy="0" r="2.8" fill="#FFEAA7" />
              <circle cx="0" cy="0" r="1.2" fill="#D68095" />
            </g>
          ))}
        </g>

        {/* Center Canopy Garland Drapes */}
        <g>
          {[480, 540, 600, 660, 720].map((xPos, idx) => (
            <g key={idx} transform={`translate(${xPos}, ${20 + (idx % 2) * 15})`}>
              <ellipse cx="0" cy="0" rx="9" ry="4" fill="url(#sageLeaf)" transform="rotate(-15)" />
              <circle cx="2" cy="-2" r="6" fill="url(#blossomPink)" />
              <circle cx="2" cy="-2" r="2" fill="#FFEAA7" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
