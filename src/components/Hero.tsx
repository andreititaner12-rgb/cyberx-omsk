import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled silently
      });
    }
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
      className="relative h-screen min-h-[700px] w-full flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. Full-Screen Background Video Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.85] contrast-[1.05]"
          src="/hero-bg.mp4"
        />
        
        {/* Cinematic Vignette & Bottom Soft Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Ambient Crimson Glow Accents */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#E32124]/[0.08] rounded-full blur-[160px] z-10" />

      {/* Top Header Row with Top-Right Translucent Glow Booking Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-7 flex items-center justify-between">
        {/* Left spacing for brand breathing room */}
        <div className="w-10" />

        {/* Top-Right Booking Button (Translucent with soft red gradient hover) */}
        {onOpenBooking && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => {
                sound.playTrigger();
                onOpenBooking();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group px-6 py-2.5 rounded-2xl font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-200 hover:text-white bg-white/[0.05] hover:bg-[#E32124]/20 border border-white/15 hover:border-[#E32124]/60 backdrop-blur-xl shadow-lg hover:shadow-[0_0_25px_rgba(227,33,36,0.35)] transition-all duration-300 overflow-hidden active:scale-95 cursor-pointer"
            >
              {/* Soft red gradient sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E32124]/25 via-[#930E10]/30 to-[#E32124]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10">ЗАБРОНИРОВАТЬ</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. Middle Spacer to allow the 3D Video Logo to shine completely uninterrupted */}
      <div className="relative z-20 my-auto pointer-events-none" />

      {/* 3. Bottom Bar: Category Navigation with Generous Spacing & Scroll Trigger */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full pb-8 sm:pb-12 flex flex-col items-center">
        
        {/* Minimalist Spaced Navigation Links with Dividers */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-8 gap-y-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-zinc-300/90 mb-8 sm:mb-10 drop-shadow-md"
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.target}>
              <button
                onClick={() => scrollTo(item.target)}
                onMouseEnter={() => sound.playHover()}
                className="hover:text-white transition-colors duration-200 py-1 relative group cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E32124] group-hover:w-full transition-all duration-300 ease-out" />
              </button>
              {index < navItems.length - 1 && (
                <span className="text-white/20 select-none font-light">|</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Downward Scroll Action Button & Label */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2.5"
        >
          <button
            onClick={() => scrollTo('manifesto')}
            onMouseEnter={() => sound.playHover()}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(227,33,36,0.6)] transition-all duration-300 group active:scale-95 cursor-pointer"
            aria-label="Начать знакомство"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
          </button>
          
          <span 
            onClick={() => scrollTo('manifesto')}
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            НАЧАТЬ ЗНАКОМСТВО
          </span>
        </motion.div>

      </div>

    </section>
  );
};
