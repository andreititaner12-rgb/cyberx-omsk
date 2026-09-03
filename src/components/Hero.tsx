import React, { useRef, useEffect } from 'react';
import { ArrowDown, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenBooking?: (arenaId?: string) => void;
  onOpenTournaments?: () => void;
  onSelectArena?: (arenaId: string) => void;
  tournamentData?: any;
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
      className="relative h-screen min-h-[700px] w-full flex flex-col justify-between overflow-hidden bg-[#000000] select-none"
    >
      {/* 1. Full-Screen Background Video Animation (Optimized 1080p 60fps) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.75] contrast-[1.08]"
          src="/hero-bg.mp4"
        />
        
        {/* Cinematic Vignette & Bottom Gradient Transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/25 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Ambient Crimson Glow Accents */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#E32124]/[0.10] rounded-full blur-[160px] z-10" />

      {/* Top Header Row with Top-Right Pulsing Booking Button */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-7 flex items-center justify-between">
        {/* Left spacing to balance the header logo */}
        <div className="w-10" />

        {/* Top-Right Booking Button with subtle live pulsing glow */}
        {onOpenBooking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => {
                sound.playTrigger();
                onOpenBooking();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group px-5 sm:px-6 py-2.5 rounded-2xl font-mono text-xs font-bold tracking-[0.2em] uppercase text-white bg-[#0A0A0F]/80 hover:bg-[#E32124] border border-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.35)] hover:shadow-[0_0_35px_rgba(227,33,36,0.7)] backdrop-blur-md transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {/* Subtle pulsing live indicator dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E32124]" />
              </span>

              <span>ЗАБРОНИРОВАТЬ</span>
              <Zap className="w-3.5 h-3.5 text-[#E32124] group-hover:text-white transition-colors" />
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. Centerpiece Typography (Spacious, Elegant & Clean) */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center my-auto py-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Main Title */}
          <h1 className="font-display font-black tracking-tight leading-[0.92] uppercase text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            <span 
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[150px] block"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 65%, #CBD5E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CYBERX<span className="text-[#E32124]" style={{ WebkitTextFillColor: '#E32124' }}>.</span>
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] block text-white/95 mt-1 sm:mt-2">
              АРЕНЫ ОМСКА
            </span>
          </h1>

          {/* Adjusted, Clean Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-zinc-300/90 max-w-2xl mx-auto font-normal leading-relaxed pt-2 drop-shadow-md"
          >
            Премиальные киберспортивные арены в Омске. Соревновательное железо, VIP комнаты и круглосуточный сервис 24/7.
          </motion.p>
        </motion.div>

      </div>

      {/* 3. Bottom Bar: Category Navigation with Elevated Spacing & Scroll Trigger */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full pb-8 sm:pb-12 flex flex-col items-center">
        
        {/* Minimalist Spaced Navigation Links with Dividers (Elevated above scroll button) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-8 gap-y-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-zinc-300/80 mb-8 sm:mb-10"
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

        {/* Downward Scroll Action Button & Pulse Label */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-2.5"
        >
          <button
            onClick={() => scrollTo('arenas')}
            onMouseEnter={() => sound.playHover()}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(227,33,36,0.6)] transition-all duration-300 group active:scale-95 cursor-pointer"
            aria-label="Начать знакомство"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
          </button>
          
          <span 
            onClick={() => scrollTo('arenas')}
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            НАЧАТЬ ЗНАКОМСТВО
          </span>
        </motion.div>

      </div>

    </section>
  );
};
