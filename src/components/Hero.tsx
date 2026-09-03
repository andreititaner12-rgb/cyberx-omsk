import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
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

  const navItems = [
    { label: 'КЛУБЫ', target: 'arenas' },
    { label: 'ТУРНИРЫ', target: 'tournaments' },
    { label: 'АКЦИИ', target: 'promotions' },
    { label: 'ЖЕЛЕЗО', target: 'hardware' },
    { label: '2ГИС', target: 'location' },
  ];

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden select-none bg-[#020204] z-10"
    >
      {/* 1. Full-Screen Background Video (1080p 60fps with Auto-Pause when off-screen) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          className="w-full h-full object-cover object-center scale-[1.01] filter brightness-[0.88] contrast-[1.06]"
          src="/hero-bg.mp4"
        />
        
        {/* Soft Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* 2. Elevated & Enlarged Navigation Categories positioned directly under CYBER letters */}
      <div className="absolute top-[54%] sm:top-[57%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 text-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-2 font-mono text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
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

      {/* 3. Bottom Screen: Downward Scroll Trigger */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => sound.playHover()}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(227,33,36,0.7)] transition-all duration-300 group active:scale-95 cursor-pointer"
            aria-label="Начать знакомство"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
          </button>
          
          <span 
            onClick={() => scrollTo('manifesto')}
            className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors cursor-pointer drop-shadow-md"
          >
            НАЧАТЬ ЗНАКОМСТВО
          </span>
        </motion.div>
      </div>

    </section>
  );
};
