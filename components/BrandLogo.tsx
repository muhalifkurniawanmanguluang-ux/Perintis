import React from 'react';

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'horizontal' | 'vertical' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  lightModeForce?: boolean; // force light colors even in dark themes if needed
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconOnly = false,
  variant = 'horizontal',
  size = 'md',
  lightModeForce = false,
}) => {
  // Size classes
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'h-8',
    md: variant === 'icon' ? 'w-10 h-10' : 'h-10 md:h-12',
    lg: variant === 'icon' ? 'w-16 h-16' : 'h-16 md:h-20',
    xl: variant === 'icon' ? 'w-24 h-24' : 'h-24 md:h-28',
    auto: 'w-full h-auto',
  };

  const selectedSize = sizeClasses[size];

  // Colors based on theme. If lightModeForce is true, we force colors that look good on dark backgrounds (e.g. for footer)
  const textColorClass = lightModeForce 
    ? 'text-white' 
    : 'text-zinc-900 dark:text-white';

  const renderIcon = () => {
    // Elegant colors matching the brand identity
    const mainHullColor = lightModeForce 
      ? 'fill-white' 
      : 'fill-[#041d2a] dark:fill-white';
    
    const superstructureColor = lightModeForce
      ? 'fill-brand-200'
      : 'fill-[#0c4a6e] dark:fill-brand-200';

    return (
      <svg
        id="pbp-logo-icon"
        viewBox="0 0 160 120"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0, 15)">
          {/* AESTHETIC BG HIGHLIGHT FOR GLOW EFFECT */}
          <circle cx="80" cy="45" r="30" fill="#0ea5e9" opacity="0.08" className="blur-xl" />

          {/* 1. SLEEK CABIN & SUPERSTRUCTURE LAYERS (Slices) */}
          {/* Top Cabin Cap */}
          <path
            d="M 64,28 C 68,28 77,29 82,31 L 80,33 C 76,32 68,31 64,31 Z"
            className={superstructureColor}
          />
          {/* Upper Deck Windows Slice */}
          <path
            d="M 58,32 C 64,32 79,33 89,35 L 86,38 C 78,37 64,36 58,35 Z"
            className={superstructureColor}
          />
          {/* Main Passenger Deck Slice */}
          <path
            d="M 51,37 C 59,37 84,38 97,41 L 93,44 C 81,42 61,41 51,40 Z"
            className={superstructureColor}
          />

          {/* 2. MAIN HULL SWOOP (Bold, elegant outline pointing proudly to the right) */}
          <path
            d="M 44,42 C 58,41 95,38 116,31 C 106,37 90,41 72,42 C 56,43 45,43 44,42 Z"
            className={mainHullColor}
          />

          {/* 3. STYLIZED DYNAMIC SPLIT SECTIONS (Horizontal yacht body speedlines) */}
          <path
            d="M 38,45 C 52,44 88,41 108,35 C 98,40 82,44 65,45 C 50,46 40,46 38,45 Z"
            className={mainHullColor}
          />

          {/* 4. BRAND CORE WAVES (Layered wave sweeps flowing elegantly underneath the vessel hull) */}
          {/* Upper Wave Core: Deep Royal Navy Blue Layer */}
          <path
            d="M 32,49 C 48,47 80,45 100,50 C 88,52 68,54 48,54 C 38,54 34,52 32,49 Z"
            fill="#0b3d54"
          />

          {/* Middle Wave Sweep: Dynamic Electric/Ocean Blue Wave Layer */}
          <path
            d="M 28,52 C 45,50 78,47 105,53 C 90,56 68,58 45,57 C 35,56 30,55 28,52 Z"
            fill="#0ea5e9"
          />

          {/* Base Wave Highlight: Sleek Metallic Steel Blue Highlight Wave */}
          <path
            d="M 37,55 C 54,53 82,50 110,54 C 95,58 70,60 50,59 C 42,58 39,57 37,55 Z"
            fill="#93c5fd"
            opacity="0.9"
          />
        </g>
      </svg>
    );
  };

  // If icon-only configuration
  if (iconOnly || variant === 'icon') {
    return (
      <div className={`flex items-center justify-center shrink-0 ${selectedSize} ${className}`}>
        {renderIcon()}
      </div>
    );
  }

  // Horizontal logo layout (Icon left, PT PERINTIS text right)
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 md:gap-4 shrink-0 overflow-hidden ${selectedSize} ${className}`}>
        {/* Icon */}
        <div className="h-full aspect-square py-1 shrink-0">
          {renderIcon()}
        </div>
        
        {/* Professional Typography Stack */}
        <div className="flex flex-col justify-center leading-none text-left">
          <span 
            className={`font-sans font-black text-lg md:text-xl xl:text-2xl tracking-wider ${textColorClass} transition-colors uppercase`}
          >
            PT PERINTIS
          </span>
          <span 
            className="font-sans font-bold text-[9px] md:text-[10px] xl:text-[11px] tracking-[0.24em] text-brand-500 uppercase mt-1 leading-none"
          >
            BERMUDA PERKASA
          </span>
        </div>
      </div>
    );
  }

  // Vertical stacked layout (Icon top, PT PERINTIS center-bottom)
  return (
    <div className={`flex flex-col items-center text-center ${selectedSize} ${className}`}>
      {/* Icon */}
      <div className="w-24 h-24 md:w-28 md:h-28 mb-4">
        {renderIcon()}
      </div>
      
      {/* Visual text branding */}
      <div className="flex flex-col items-center justify-center leading-none">
        <span 
          className={`font-sans font-black text-xl md:text-2xl lg:text-3xl tracking-wider ${textColorClass} uppercase`}
        >
          PT PERINTIS
        </span>
        <span 
          className="font-sans font-bold text-xs md:text-sm tracking-[0.3em] text-brand-400 dark:text-brand-300 uppercase mt-2.5 leading-none"
        >
          BERMUDA PERKASA
        </span>
      </div>
    </div>
  );
};
