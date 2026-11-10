import React from 'react';

const OceanWaves: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden h-32 bg-transparent flex items-end select-none pointer-events-none">
      {/* Styles for ultra-gentle, smooth looping flat waves, cargo ship, and tugboat towing a barge */}
      <style>{`
        @keyframes waveLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes waveRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes shipRollFlat {
          0%, 100% { transform: translateY(0.2px) rotate(-0.15deg); }
          50% { transform: translateY(-1.2px) rotate(0.25deg); }
        }
        @keyframes shipSwayRightToLeft {
          0% { left: 115%; }
          100% { left: -25%; }
        }
        .animate-wave-back-flat {
          animation: waveLeft 45s linear infinite;
        }
        .animate-wave-mid-flat {
          animation: waveRight 35s linear infinite;
        }
        .animate-wave-front-flat {
          animation: waveLeft 25s linear infinite;
        }
        .animate-cargo-patrol {
          animation: shipSwayRightToLeft 44s linear infinite;
          animation-delay: -10s; /* Start midway through the journey */
        }
        .animate-tugboat-patrol {
          animation: shipSwayRightToLeft 58s linear infinite;
          animation-delay: -32s; /* Staggered from the cargo ship */
        }
        .animate-ship-roll {
          animation: shipRollFlat 6.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background ambient sea luster to smooth the start of water */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b3d54] to-transparent pointer-events-none z-0 opacity-40"></div>

      {/* Layer 1: Back Wave (Gentle Deep Sea Blue - very calm flat profile) */}
      <div className="absolute left-0 bottom-0 w-[200%] h-full flex animate-wave-back-flat opacity-60 z-10">
        <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
          {/* Water level is at y=40, height of water is 80 (approx 66% of container) */}
          <path d="M0,40 Q360,37 720,40 T1440,40 L1440,120 L0,120 Z" fill="#0b3d54" />
          {/* Highlighted wave lip */}
          <path d="M0,40 Q360,37 720,40 T1440,40" fill="none" stroke="#0e5c7c" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
          <path d="M0,40 Q360,37 720,40 T1440,40 L1440,120 L0,120 Z" fill="#0b3d54" />
          <path d="M0,40 Q360,37 720,40 T1440,40" fill="none" stroke="#0e5c7c" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Tugboat towing a Barge: Positioned on Wave Layer 1 (lowered to sit perfectly in the water) */}
      <div className="absolute bottom-[66px] w-full h-12 z-15 animate-tugboat-patrol">
        <div className="relative w-56 h-10 animate-ship-roll">
          {/* Tugboat pulling barge facing LEFT (leading tugboat on left, cable, barge on right) */}
          <svg
            viewBox="0 0 160 40"
            className="w-full h-full text-brand-300 drop-shadow-[0_2px_5px_rgba(224,242,254,0.35)]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. THE TUGBOAT (Left, coordinates x: 10 to 45) */}
            {/* Hull */}
            <path d="M8 25 C10 32 12 34 38 34 C43 34 43 25 43 25 Z" fill="#0284c7" />
            <path d="M8 25 L43 25 L41 23 L10 23 Z" fill="#e0f2fe" opacity="0.9" />
            
            {/* Cabin / Bridge Wheelhouse */}
            <path d="M18 23 L18 15 L29 15 L32 19 L36 19 L36 23 Z" fill="#ffffff" />
            {/* Dark glass windows */}
            <rect x="21" y="16.5" width="4" height="4.5" fill="#0f172a" rx="0.5" />
            <rect x="27.5" y="16.5" width="2" height="4.5" fill="#0f172a" rx="0.5" />
            
            {/* Red Stack / Chimney exhaustion */}
            <rect x="31" y="12" width="2.5" height="5" fill="#ef4444" />
            <rect x="30" y="11" width="4.5" height="1.2" fill="#1e293b" />
            
            {/* Fenders (tyres on the side) */}
            <circle cx="16" cy="29.5" r="2.2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
            <circle cx="24" cy="30" r="2.2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
            <circle cx="32" cy="29.5" r="2.2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
            
            {/* Engine smoke effect */}
            <circle cx="29" cy="7.5" r="1" fill="#ffffff" opacity="0.15" />
            <circle cx="27" cy="4.5" r="1.5" fill="#ffffff" opacity="0.08" />

            {/* 2. TOWING CABLE (High Tension Line linking Tugboat and Barge) */}
            <path d="M43 26.5 Q61 29 79 24.5" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />

            {/* 3. THE BARGE (Right, coordinates x: 79 to 148) */}
            {/* Flat-bottomed heavy steel barge */}
            <path d="M79 24.5 L83 32 L144 32 L148 24.5 Z" fill="#334155" />
            {/* Rub rail border highlight */}
            <line x1="79" y1="24.5" x2="148" y2="24.5" stroke="#64748b" strokeWidth="1" />
            
            {/* Loaded bulk cargo stacks on Barge */}
            {/* Pile 1: Green freight cargo box */}
            <rect x="85" y="16.5" width="16" height="8" rx="0.5" fill="#10b981" />
            {/* Pile 2: Sand/aggregate mound */}
            <path d="M101 24.5 Q115 11 129 24.5 Z" fill="#b45309" opacity="0.9" />
            {/* Pile 3: Yellow container box */}
            <rect x="130" y="16.5" width="14" height="8" rx="0.5" fill="#eab308" />
          </svg>
        </div>
      </div>

      {/* Layer 2: Middle Wave (Marine Blue Seawater - very flat and calm) */}
      <div className="absolute left-0 bottom-0 w-[200%] h-full flex animate-wave-mid-flat opacity-80 z-20">
        <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
          <path d="M0,45 Q360,42 720,45 T1440,45 L1440,120 L0,120 Z" fill="#0b3d54" />
          <path d="M0,45 Q360,42 720,45 T1440,45" fill="none" stroke="#00839a" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
          <path d="M0,45 Q360,42 720,45 T1440,45 L1440,120 L0,120 Z" fill="#0b3d54" />
          <path d="M0,45 Q360,42 720,45 T1440,45" fill="none" stroke="#00839a" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Cargo Vessel: Riding beautifully and high on Wave Layer 2 (raised from 60px to 68px so more of the hull is visible and sits perfectly) */}
      <div className="absolute bottom-[68px] w-full h-14 z-25 animate-cargo-patrol">
        <div className="relative w-44 h-12 animate-ship-roll">
          {/* Custom Crafted High-Fidelity cargo ship with perfect proportions */}
          <svg
            viewBox="0 0 120 45"
            className="w-full h-full text-brand-300 dark:text-brand-300 drop-shadow-[0_4px_10px_rgba(34,211,238,0.25)]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Vessel Hull - sits at a perfect depth for realistic buoyancy */}
            <path d="M3 28 L14 38 L98 38 L114 28 L116 22 L111 22 L105 28 Z" fill="#0c4a6e" />
            <path d="M3 28 L105 28 L111 22 L116 22 Z" fill="#38bdf8" opacity="0.3" />
            
            {/* Cargo Load Deck base */}
            <rect x="18" y="24" width="64" height="4" rx="1" fill="#041d2a" />
            
            {/* Stacked Freight Containers */}
            <rect x="22" y="14" width="14" height="10" rx="1" fill="#0284c7" opacity="0.95" />
            <rect x="38" y="11" width="16" height="13" rx="1" fill="#00d26a" opacity="0.85" />
            <rect x="56" y="14" width="13" height="10" rx="1" fill="#f97316" opacity="0.95" />
            <rect x="71" y="16" width="11" height="8" rx="1" fill="#38bdf8" opacity="0.9" />
            
            {/* Pilot House / Bridge Castle */}
            <path d="M86 24 L98 24 L98 12 L94 12 L91 18 L86 18 Z" fill="#ffffff" />
            
            {/* Rectangular Glass Windows */}
            <rect x="91" y="14" width="3" height="3" fill="#0f172a" opacity="0.8" />
            
            {/* Main Masts */}
            <line x1="94" y1="12" x2="94" y2="5" stroke="#ffffff" strokeWidth="1" />
            <line x1="94" y1="7" x2="92" y2="7" stroke="#ffffff" strokeWidth="1" />
            
            {/* Funnel Exhaust stack */}
            <rect x="82" y="14" width="3" height="6" fill="#1C1917" />
            <rect x="81" y="13" width="5" height="1.5" fill="#EF4444" />
            
            {/* Soft engine smoke */}
            <circle cx="80" cy="8" r="1.2" fill="#FFFFFF" opacity="0.15" />
            <circle cx="78" cy="4" r="1.6" fill="#FFFFFF" opacity="0.1" />
          </svg>
        </div>
      </div>

       {/* Layer 3: Solid Front Wave (Seawater matching bottom color, covers bottom hull of the ship beautifully) */}
       <div className="absolute left-0 right-0 bottom-0 w-[200%] h-full flex animate-wave-front-flat z-30 opacity-100">
         <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
           {/* Water level is at y=48 */}
           <path d="M0,48 Q360,46 720,48 T1440,48 L1440,120 L0,120 Z" fill="#041d2a" />
           {/* Cyan/teal reflective dynamic surface highlight */}
           <path d="M0,48 Q360,46 720,48 T1440,48" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeOpacity="0.35" strokeLinecap="round" />
         </svg>
         <svg viewBox="0 0 1440 120" className="w-1/2 h-full" preserveAspectRatio="none">
           <path d="M0,48 Q360,46 720,48 T1440,48 L1440,120 L0,120 Z" fill="#041d2a" />
           <path d="M0,48 Q360,46 720,48 T1440,48" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeOpacity="0.35" strokeLinecap="round" />
         </svg>
       </div>
    </div>
  );
};

export default OceanWaves;
