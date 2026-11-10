import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  disabledOnMobile?: boolean;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ 
  text, 
  className = '', 
  wordClassName = '',
  disabledOnMobile = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedRatio, setRevealedRatio] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the viewport the text block is
      const startReveal = windowHeight * 0.9;
      const endReveal = windowHeight * 0.05;
      
      let ratio = (startReveal - top) / (startReveal - endReveal);
      ratio = Math.max(0, Math.min(1, ratio));
      setRevealedRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (disabledOnMobile && isMobile) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => {
        // Calculate progress for each individual word
        const wordStart = wordIdx / words.length;
        const wordEnd = (wordIdx + 1) / words.length;
        
        let opacity = 0.25;
        if (revealedRatio >= wordEnd) {
          opacity = 1;
        } else if (revealedRatio > wordStart) {
          const progress = (revealedRatio - wordStart) / (wordEnd - wordStart);
          opacity = 0.25 + progress * 0.75;
        }

        return (
          <span 
            key={wordIdx} 
            className={`inline-block mr-[0.25em] transition-all duration-300 transform ${wordClassName}`}
            style={{ 
              opacity,
              transform: revealedRatio > wordStart ? 'translateY(0)' : 'translateY(6px)',
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollRevealText;
