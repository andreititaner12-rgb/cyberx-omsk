import React, { useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Parallax exit transformation on scroll
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 0.94]);

  // Exact order requested: КЛУБЫ, ПРАЙС, ЖЕЛЕЗО, ТУРНИРЫ, АКЦИИ
  const navItems = [
    { label: 'КЛУБЫ', target: 'arenas' },
    { label: 'ПРАЙС', target: 'pricing' },
    { label: 'ЖЕЛЕЗО', target: 'hardware' },
    { label: 'ТУРНИРЫ', target: 'tournaments' },
    { label: 'АКЦИИ', target: 'promotions' },
  ];

  // Play futuristic sound cues as navigation elements and capsule emerge
  useEffect(() => {
    if (!isReady) return;

    const timers: NodeJS.Timeout[] = [];

    navItems.forEach((_, idx) => {
      const delayMs = (0.15 + idx * 0.25) * 1000;
      const t = setTimeout(() => {
        sound.playNavAppear(idx);
      }, delayMs);
      timers.push(t);
    });

    // Capsule sound
    const tCapsule = setTimeout(() => {
      sound.playCapsuleAppear();
    }, 1550);
    timers.push(tCapsule);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isReady]);

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
      {/* Dynamic Parallax Container on Scroll */}
      <motion.div 
        style={{ 
          y: heroTranslateY, 
          opacity: heroOpacity, 
          scale: heroScale 
        }}
        className="absolute inset-0 w-full h-full transform-gpu origin-center"
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

        {/* 2. Focus Text Navigation Categories (Strictly triggers AFTER preloader finishes) */}
        <div className="absolute top-[52%] sm:top-[57%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center z-20">
          <div className="flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-9 md:gap-x-12 gap-y-2 font-mono text-xs sm:text-base md:text-lg font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-zinc-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            {navItems.map((item, index) => (
              <React.Fragment key={item.target}>
                {/* 21st Focus Text Staggered Blur & Scale Entrance */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    filter: 'blur(16px)', 
                    scale: 0.88, 
                    y: 14 
                  }}
                  animate={isReady ? { 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    scale: 1, 
                    y: 0 
                  } : { 
                    opacity: 0, 
                    filter: 'blur(16px)', 
                    scale: 0.88, 
                    y: 14 
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: isReady ? 0.15 + index * 0.25 : 0, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="relative inline-flex items-center"
                >
                  <button
                    onClick={() => scrollTo(item.target)}
                    onMouseEnter={() => sound.playHover()}
                    className="hover:text-white text-zinc-200 transition-colors duration-200 py-1.5 relative group cursor-pointer"
                  >
                    <span className="group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(227,33,36,0.9)] transition-all duration-200">
                      {item.label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E32124] group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_10px_#E32124]" />
                  </button>
                </motion.div>

                {/* Staggered soft divider */}
                {index < navItems.length - 1 && (
                  <motion.span 
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={isReady ? { opacity: 0.3, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
                    transition={{ 
                      duration: 0.5, 
                      delay: isReady ? 0.22 + index * 0.25 : 0 
                    }}
                    className="text-white/30 select-none font-light text-sm sm:text-base"
                  >
                    |
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. Bottom Screen: Gentle Graceful Entrance Capsule «НАЧАТЬ ЗНАКОМСТВО» */}
        <div className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
          <motion.div 
            initial={{ 
              opacity: 0, 
              scale: 0.85, 
              filter: 'blur(14px)', 
              y: 20 
            }}
            animate={isReady ? { 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)', 
              y: 0 
            } : { 
              opacity: 0, 
              scale: 0.85, 
              filter: 'blur(14px)', 
              y: 20 
            }}
            transition={{ 
              duration: 0.85, 
              delay: isReady ? 1.55 : 0, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => scrollTo('manifesto')}
              onMouseEnter={() => sound.playHover()}
              className="group relative px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(227,33,36,0.7)] hover:shadow-[0_0_55px_rgba(227,33,36,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer border border-white/25 overflow-hidden"
              aria-label="Начать знакомство"
            >
              {/* Shimmer Light Reflection Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              
              <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
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
      </motion.div>

    </section>
  );
};
