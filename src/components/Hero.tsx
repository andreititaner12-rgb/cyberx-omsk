import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface LineCoord {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  pathD: string;
}

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [lineCoords, setLineCoords] = useState<LineCoord[]>([]);

  // Exact order requested: КЛУБЫ, ПРАЙС, ЖЕЛЕЗО, ТУРНИРЫ, АКЦИИ
  const navItems = [
    { label: 'КЛУБЫ', target: 'arenas' },
    { label: 'ПРАЙС', target: 'pricing' },
    { label: 'ЖЕЛЕЗО', target: 'hardware' },
    { label: 'ТУРНИРЫ', target: 'tournaments' },
    { label: 'АКЦИИ', target: 'promotions' },
  ];

  // Video IntersectionObserver for 60fps zero-lag performance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Update dynamic SVG circuit lines connecting nav items to bottom capsule
  const updateLines = () => {
    if (!sectionRef.current || !buttonRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();

    const targetX = btnRect.left + btnRect.width / 2 - sectionRect.left;
    const targetY = btnRect.top - sectionRect.top;

    const coords: LineCoord[] = [];

    navButtonRefs.current.forEach((btn, index) => {
      if (!btn) return;
      const bRect = btn.getBoundingClientRect();
      const x1 = bRect.left + bRect.width / 2 - sectionRect.left;
      const y1 = bRect.bottom - sectionRect.top + 4; // Start right beneath the text underline

      // 5-pin micro-terminal spacing on top edge of capsule
      const pinOffset = (index - 2) * 10;
      const x2 = targetX + pinOffset;
      const y2 = targetY - 2;

      const dy = y2 - y1;
      const dx = x2 - x1;

      let pathD = '';
      if (Math.abs(dx) < 3) {
        // Direct vertical line for center item (ЖЕЛЕЗО)
        pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        // Smooth futuristic cyber-curve with vertical start and graceful sweep to capsule
        const cp1x = x1;
        const cp1y = y1 + dy * 0.52;
        const cp2x = x2 - dx * 0.18;
        const cp2y = y2 - dy * 0.16;
        pathD = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
      }

      coords.push({
        id: navItems[index].target,
        x1,
        y1,
        x2,
        y2,
        pathD,
      });
    });

    setLineCoords(coords);
  };

  useLayoutEffect(() => {
    updateLines();
    const handleResize = () => updateLines();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    // Initial recalculation after entrance animations complete
    const timer = setTimeout(updateLines, 800);
    const timer2 = setTimeout(updateLines, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden select-none bg-[#020204] z-10"
    >
      {/* 1. Full-Screen Atmospheric Background Video (Cropped clean without text, 1080p Web-Optimized) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          className="w-full h-full object-cover object-center scale-[1.01] filter brightness-[0.85] contrast-[1.08]"
          src="/hero-bg.mp4"
        />
        
        {/* Soft Franchised Crimson & Obsidian Ambient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* 2. Interactive Connecting Schematic Cyber-Lines (HUD Circuit Traces) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="active-pulse-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4D4D" stopOpacity="1" />
            <stop offset="60%" stopColor="#E32124" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B0000" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {lineCoords.map((line, index) => {
          const isActive = isButtonHovered || hoveredNav === index;

          return (
            <g key={line.id}>
              {/* Base Subtle Blueprint Circuit Line */}
              <path
                d={line.pathD}
                fill="none"
                stroke={isActive ? '#E32124' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth={isActive ? 2 : 1.2}
                strokeDasharray={isActive ? 'none' : '3 3'}
                className="transition-colors duration-300"
                style={{
                  filter: isActive ? 'url(#hero-glow-red)' : 'none',
                }}
              />

              {/* Glowing High-Energy Flow when Active */}
              <AnimatePresence>
                {isActive && (
                  <motion.path
                    d={line.pathD}
                    fill="none"
                    stroke="url(#active-pulse-gradient)"
                    strokeWidth={2.5}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{ filter: 'url(#hero-glow-red)' }}
                  />
                )}
              </AnimatePresence>

              {/* Top Pin Terminal Node under Nav item */}
              <circle
                cx={line.x1}
                cy={line.y1}
                r={isActive ? 3.5 : 2}
                fill={isActive ? '#E32124' : 'rgba(255, 255, 255, 0.25)'}
                className="transition-all duration-300"
                style={{ filter: isActive ? 'drop-shadow(0 0 6px #E32124)' : 'none' }}
              />

              {/* Bottom Target Convergence Pin */}
              <circle
                cx={line.x2}
                cy={line.y2}
                r={isActive ? 3 : 1.5}
                fill={isActive ? '#FF4D4D' : 'rgba(255, 255, 255, 0.2)'}
                className="transition-all duration-300"
                style={{ filter: isActive ? 'drop-shadow(0 0 6px #FF4D4D)' : 'none' }}
              />
            </g>
          );
        })}
      </svg>

      {/* 3. Focus Text Navigation Categories positioned directly under CYBER lettering */}
      <div 
        ref={navContainerRef}
        className="absolute top-[54%] sm:top-[57%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center z-20"
      >
        <div className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-9 md:gap-x-12 gap-y-2.5 font-mono text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
          {navItems.map((item, index) => {
            const isThisHovered = hoveredNav === index;
            return (
              <React.Fragment key={item.target}>
                {/* 21st Focus Text Staggered Blur Animation */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    filter: 'blur(14px)', 
                    scale: 0.88, 
                    y: 16 
                  }}
                  animate={{ 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    scale: 1, 
                    y: 0 
                  }}
                  transition={{ 
                    duration: 0.75, 
                    delay: 0.35 + index * 0.22, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="relative inline-flex items-center"
                >
                  <button
                    ref={(el) => (navButtonRefs.current[index] = el)}
                    onClick={() => scrollTo(item.target)}
                    onMouseEnter={() => {
                      setHoveredNav(index);
                      sound.playHover();
                    }}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="hover:text-white text-zinc-200 transition-colors duration-200 py-1.5 relative group cursor-pointer"
                  >
                    <span className={`transition-all duration-200 ${
                      isThisHovered 
                        ? 'text-white drop-shadow-[0_0_20px_rgba(227,33,36,1)]' 
                        : 'group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                    <span 
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#E32124] transition-all duration-300 ease-out shadow-[0_0_10px_#E32124] ${
                        isThisHovered ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} 
                    />
                  </button>
                </motion.div>

                {/* Staggered soft divider */}
                {index < navItems.length - 1 && (
                  <motion.span 
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 0.3, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.45 + index * 0.22 }}
                    className="text-white/30 select-none font-light text-sm sm:text-base"
                  >
                    |
                  </motion.span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Screen: Gentle Graceful Entrance Capsule «НАЧАТЬ ЗНАКОМСТВО» */}
      <div className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          initial={{ 
            opacity: 0, 
            scale: 0.86, 
            filter: 'blur(12px)', 
            y: 24 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)', 
            y: 0 
          }}
          transition={{ 
            duration: 0.95, 
            delay: 1.75, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="flex flex-col items-center"
        >
          <button
            ref={buttonRef}
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => {
              setIsButtonHovered(true);
              sound.playHover();
            }}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(227,33,36,0.7)] hover:shadow-[0_0_55px_rgba(227,33,36,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer border border-white/25 overflow-hidden"
            aria-label="Начать знакомство"
          >
            {/* Shimmer Light Reflection Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            
            <Sparkles className="w-4 h-4 text-white/90 animate-pulse" />
            <span>НАЧАТЬ ЗНАКОМСТВО</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-white group-hover:text-white" />
            </motion.div>
          </button>
        </motion.div>
      </div>

    </section>
  );
};
