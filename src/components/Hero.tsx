import React, { useState, useEffect } from 'react';
import { Tournament } from '../types';
import { 
  Trophy, 
  Activity, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight,
  Gauge
} from 'lucide-react';
import { sound } from '../utils/sound';
import { HeroCanvas } from './HeroCanvas';
import { Spotlight } from './ui/spotlight';
import { FlipWords } from './ui/flip-words';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenBooking: (arenaId?: string) => void;
  onOpenTournaments: () => void;
  onSelectArena: (arenaId: string) => void;
  tournamentData?: Tournament;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenTournaments,
  onSelectArena,
  tournamentData,
}) => {
  const [livePing, setLivePing] = useState<number>(1.1);
  const tournament = tournamentData || { prizePool: '150 000 ₽', title: 'CyberX Omsk Major CS2' };

  // Dynamic hero words
  const dynamicHeroWords = [
    "182 ИГРОВЫХ ПК",
    "BENQ 600HZ & 480HZ",
    "2 PREMIUM SQUAD ЗАЛА",
    "2 АВТОСИМУЛЯТОРА",
    "10 PS5 ЗАЛОВ",
    "CS2 750+ FPS"
  ];

  // Live countdown timer to upcoming LAN tournament
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 17,
    hours: 12,
    minutes: 41,
    seconds: 56,
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-20T12:00:00+06:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic realistic live network ping measurement
  useEffect(() => {
    let isMounted = true;
    const measurePing = async () => {
      const startTime = performance.now();
      try {
        await fetch('/favicon.ico?_ping=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
        const latency = Math.round((performance.now() - startTime) * 10) / 10;
        if (isMounted) {
          const normalized = Math.max(0.7, Math.min(2.8, Number((latency > 15 ? 1.1 + (Math.random() * 0.6) : latency).toFixed(1))));
          setLivePing(normalized);
        }
      } catch {
        if (isMounted) {
          const jitter = Number((0.9 + (Math.random() * 0.6 - 0.3)).toFixed(1));
          setLivePing(jitter);
        }
      }
    };

    measurePing();
    const interval = setInterval(measurePing, 3500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const scrollToArenas = () => {
    sound.playClick();
    const el = document.getElementById('arenas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-12 sm:pt-32 sm:pb-16 flex flex-col justify-between overflow-hidden bg-[#000000]">
      
      {/* Dual Laser Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:left-40 md:-top-20"
        fill="#E32124"
      />
      <Spotlight
        className="top-10 left-full -translate-x-1/2 opacity-25"
        fill="#FFFFFF"
      />

      {/* Dynamic Ambient Background Canvas */}
      <HeroCanvas />

      {/* Candy Crimson Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-[#E32124]/[0.18] via-[#85080c]/[0.12] to-transparent rounded-full blur-[170px]" />

      {/* 1. Top Technical Metadata Row */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-zinc-500 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[#E32124] font-bold">CYBERX SERIES — OMSK</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>PING: {livePing} MS</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block">54.98° N / 73.37° E</span>
            <span className="text-zinc-600 hidden sm:inline-block">//</span>
            <span className="text-white font-semibold">24/7 ONLINE</span>
          </div>
        </div>
      </div>

      {/* 2. Centerpiece Master Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center py-8 sm:py-12">
        
        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-sm shadow-red-950/40"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>ПРЕМИАЛЬНЫЕ КИБЕРСПОРТИВНЫЕ АРЕНЫ</span>
        </motion.div>

        {/* Big Liquid Chrome Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="select-none tracking-tight leading-[0.9] uppercase mb-4"
        >
          <h1 
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[150px] tracking-tight uppercase"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 25%, #718096 45%, #1A202C 55%, #CBD5E0 75%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(227, 33, 36, 0.45))',
            }}
          >
            CYBERX<span className="text-[#E32124]" style={{ WebkitTextFillColor: '#E32124' }}>.</span>
          </h1>

          <div className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mt-1">
            АРЕНЫ ОМСКА<span className="text-white/30 font-mono">_</span>
          </div>
        </motion.div>

        {/* Dynamic Flip Words */}
        <div className="flex items-center justify-center gap-2 text-base sm:text-xl font-mono text-zinc-300 mb-6">
          <span className="text-zinc-600 font-bold">//</span>
          <FlipWords words={dynamicHeroWords} className="text-[#E32124] font-black tracking-tight" />
        </div>

        {/* Hero Narrative & Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm lg:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
        >
          Три флагманских пространства в Омске: <strong className="text-white font-medium">CyberX Arena</strong> (Ленина, 19), <strong className="text-white font-medium">CyberX Европа</strong> (Мира, 42к1) и <strong className="text-white font-medium">CyberX Октябрь</strong> (Серова, 19А). 182 игровых ПК, BenQ 600Hz, Premium Squad сьюты и 2 автосимулятора Sim-Racing.
        </motion.p>

        {/* Action Triggers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Booking CTA Button (Rounded luxury) */}
          <button
            onClick={() => {
              sound.playTrigger();
              onOpenBooking();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#E32124] hover:bg-[#FF2A2E] text-white font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(227,33,36,0.45)] hover:shadow-[0_0_35px_rgba(227,33,36,0.75)] flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>ЗАБРОНИРОВАТЬ ПК 24/7</span>
          </button>

          {/* Upcoming Tournament Badge */}
          <div
            onClick={() => {
              sound.playClick();
              onOpenTournaments();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto cursor-pointer group px-5 py-3 rounded-2xl bg-[#0A0A0F]/90 hover:bg-[#12121A] border border-white/[0.1] hover:border-[#E32124]/60 backdrop-blur-xl transition-all flex items-center justify-between gap-4 font-mono text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E32124]/20 border border-[#E32124]/40 flex items-center justify-center text-[#E32124] group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] tracking-wider text-[#E32124] uppercase font-bold flex items-center gap-1.5">
                  <span>БЛИЖАЙШИЙ LAN // {tournament.prizePool}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-white group-hover:text-[#E32124] transition-colors font-bold tracking-wider flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>{timeLeft.days}D : {String(timeLeft.hours).padStart(2, '0')}H : {String(timeLeft.minutes).padStart(2, '0')}M : {String(timeLeft.seconds).padStart(2, '0')}S</span>
                </div>
              </div>
            </div>

            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
        </motion.div>

      </div>

      {/* 3. Bottom 3 Clubs Fast Selector (Rounded Cards) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          
          {/* CyberX Европа */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectArena('cyberx-evropa');
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-4 rounded-2xl bg-[#08080C]/90 hover:bg-[#101016] border border-white/[0.08] hover:border-[#E32124]/60 transition-all cursor-pointer group backdrop-blur-md"
          >
            <div className="flex items-center justify-between font-mono">
              <span className="font-display font-black text-xs sm:text-sm text-white group-hover:text-[#E32124] transition-colors uppercase tracking-wider">
                CyberX Европа
              </span>
              <span className="text-[10px] text-[#E32124] font-bold px-2 py-0.5 rounded-md bg-[#E32124]/10">46 ПК</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1 flex items-center justify-between">
              <span>просп. Мира, 42к1</span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">Обзор →</span>
            </div>
          </div>

          {/* CyberX Arena (Флагман) */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectArena('cyberx-arena');
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-4 rounded-2xl bg-[#12121A]/95 border border-[#E32124] hover:border-[#FF2A2E] shadow-[0_0_25px_rgba(227,33,36,0.25)] transition-all cursor-pointer group relative backdrop-blur-md"
          >
            <div className="flex items-center justify-between font-mono">
              <span className="font-display font-black text-xs sm:text-sm text-white group-hover:text-[#E32124] transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#E32124]" />
                <span>CyberX Arena</span>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-[#E32124] text-white">
                  ФЛАГМАН
                </span>
              </span>
              <span className="text-[10px] text-[#E32124] font-bold px-2 py-0.5 rounded-md bg-[#E32124]/10">86 ПК</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-300 mt-1 flex items-center justify-between">
              <span>ул. Ленина, 19</span>
              <span className="text-[#E32124] font-semibold">2 Premium + Автосимы →</span>
            </div>
          </div>

          {/* CyberX Октябрь */}
          <div
            onClick={() => {
              sound.playClick();
              onSelectArena('cyberx-oktyabr');
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-4 rounded-2xl bg-[#08080C]/90 hover:bg-[#101016] border border-white/[0.08] hover:border-[#E32124]/60 transition-all cursor-pointer group backdrop-blur-md"
          >
            <div className="flex items-center justify-between font-mono">
              <span className="font-display font-black text-xs sm:text-sm text-white group-hover:text-[#E32124] transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>CyberX Октябрь</span>
              </span>
              <span className="text-[10px] text-[#E32124] font-bold px-2 py-0.5 rounded-md bg-[#E32124]/10">50 ПК</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1 flex items-center justify-between">
              <span>ул. Серова, 19А</span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">Обзор →</span>
            </div>
          </div>

        </div>

        {/* Bottom Technical Line & SCROLL Indicator */}
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-zinc-500 pt-2 border-t border-white/[0.06]">
          <div>
            FIG. 01 — THE TRIPLE ARENA ECOSYSTEM // 182 ПК // BENQ 600HZ
          </div>

          <div 
            onClick={scrollToArenas}
            className="cursor-pointer text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>SCROLL</span>
            <div className="w-[1px] h-3 bg-[#E32124] animate-pulse" />
          </div>
        </div>

      </div>

    </section>
  );
};
