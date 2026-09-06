import React, { useRef, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Smart intersection observer: auto-pause video when scrolled out of view to free 100% GPU memory
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

  // Exact order requested: КЛУБЫ, ПРАЙС, ЖЕЛЕЗО, ТУРНИРЫ, АКЦИИ
  const navItems = [
    { label: 'КЛУБЫ', target: 'arenas' },
    { label: 'ПРАЙС', target: 'pricing' },
    { label: 'ЖЕЛЕЗО', target: 'hardware' },
    { label: 'ТУРНИРЫ', target: 'tournaments' },
    { label: 'АКЦИИ', target: 'promotions' },
  ];

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

      {/* 2. Elevated Navigation Categories positioned directly under CYBER lettering */}
      <div className="absolute top-[54%] sm:top-[57%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-9 md:gap-x-12 gap-y-2.5 font-mono text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.target}>
              <button
                onClick={() => scrollTo(item.target)}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white text-zinc-200 transition-colors duration-200 py-1.5 relative group cursor-pointer"
              >
                <span className="group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(227,33,36,0.9)] transition-all">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E32124] group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_10px_#E32124]" />
              </button>
              {index < navItems.length - 1 && (
                <span className="text-white/30 select-none font-light text-sm sm:text-base">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* 3. Bottom Screen: Prominent Glowing Crimson Capsule «НАЧАТЬ ЗНАКОМСТВО» */}
      <div className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
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
