import React, { useState } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { ARENAS } from '../data/arenaData';
import { Tournament } from '../types';
import { 
  Trophy, 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  Activity, 
  Zap, 
  ChevronRight, 
  Crosshair, 
  Gamepad2, 
  Tv, 
  ShieldCheck 
} from 'lucide-react';
import { sound } from '../utils/sound';

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
  const [activeArenaIndex, setActiveArenaIndex] = useState(0);
  const currentArena = ARENAS[activeArenaIndex];
  const tournament = tournamentData || { prizePool: '150 000 ₽', title: 'CyberX Omsk Major CS2' };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#000000]">
      
      {/* Dynamic Ambient Background Canvas */}
      <HeroCanvas />

      {/* CyberX Brandbook Background Watermarks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-[0.04]">
        <div className="absolute -right-20 top-1/4 font-display font-black text-[180px] lg:text-[260px] tracking-tighter text-white rotate-90 whitespace-nowrap">
          CYBERX
        </div>
        <div className="absolute -left-20 bottom-10 font-display font-black text-[160px] lg:text-[220px] tracking-tighter text-[#E32124] whitespace-nowrap">
          OMSK
        </div>
      </div>

      {/* Atmospheric Brand Gradients */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#E32124]/20 via-[#930E10]/10 to-transparent rounded-full blur-[140px] opacity-80" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[450px] bg-gradient-to-tl from-[#E32124]/15 via-[#590507]/10 to-transparent rounded-full blur-[130px]" />

      {/* Reticle / Crosshair HUD Element */}
      <div className="pointer-events-none absolute top-32 right-12 lg:right-32 hidden md:block opacity-20">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border border-dashed border-[#E32124] rounded-full animate-spin" style={{ animationDuration: '30s' }} />
          <Crosshair className="w-12 h-12 text-[#E32124]" />
        </div>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Top Telemetry Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/15 border border-[#E32124]/40 text-[#E32124] text-xs font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E32124] animate-pulse" />
              CYBERX OMSK // 3 КЛУБА ONLINE
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Оптический пинг: 0.8 ms
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="hidden md:inline">ЛЕНИНА • МИРА • СЕРОВА</span>
            <span>•</span>
            <span className="text-white font-semibold">156 ИГРОВЫХ ПК</span>
            <span>•</span>
            <span className="text-[#E32124] font-bold">540Hz OLED</span>
          </div>
        </div>

        {/* Main Hero Typography & Composition */}
        <div className="max-w-4xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#E32124]" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Премиальная киберспортивная сеть Омска
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.92] text-white">
            CYBERX<span className="text-[#E32124] drop-shadow-[0_0_35px_rgba(227,33,36,0.8)]">.</span> <br />
            АРЕНЫ ОМСКА<span className="text-white/25">_</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
            Три флагманских киберспортивных пространства в Омске: <span className="text-white font-bold">Ленина</span>, <span className="text-white font-bold">Мира</span> и <span className="text-white font-bold">Серова</span>. Мониторы 540Hz, эксклюзивные <span className="text-white font-bold">Premium сьюты 5 ПК + PS5</span>, 2 автосимулятора Sim-Racing и кино-лаунж с проектором.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playTrigger();
                onOpenBooking(currentArena.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] via-[#C9181B] to-[#930E10] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-xl shadow-red-600/35 hover:shadow-red-600/55 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 overflow-hidden"
            >
              <Zap className="w-5 h-5 text-white" />
              <span>Забронировать место</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            {/* Quick Tournament Teaser Badge */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenTournaments();
              }}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center gap-3.5 px-5 py-3.5 rounded-xl bg-[#0B0B10]/90 hover:bg-[#12121A] border border-white/[0.08] hover:border-[#E32124]/60 backdrop-blur-md transition-all shadow-lg"
            >
              <div className="w-9 h-9 rounded-lg bg-[#E32124]/15 border border-[#E32124]/30 flex items-center justify-center text-[#E32124] group-hover:scale-110 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#E32124] uppercase">
                    Ближайший LAN // Омск
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-xs font-semibold text-white group-hover:text-[#E32124] transition-colors flex items-center gap-1">
                  <span>{tournament.title}</span>
                  <span className="text-zinc-400 font-mono">({tournament.prizePool})</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>
          </div>

        </div>

        {/* 3 Arena Fast Selector in Hero */}
        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
              Выберите арену CyberX в Омске:
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Ленина • Мира • Серова (24/7)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ARENAS.map((arena, idx) => {
              const isSelected = activeArenaIndex === idx;
              return (
                <div
                  key={arena.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveArenaIndex(idx);
                    onSelectArena(arena.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-xl ${
                    isSelected
                      ? 'bg-[#151520]/95 border-[#E32124] shadow-xl shadow-red-950/40'
                      : 'bg-[#0A0A0E]/70 hover:bg-[#101017]/90 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Active highlight line */}
                  {isSelected && (
                    <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-white group-hover:text-[#E32124] transition-colors">
                          {arena.name.split('//')[0].trim()}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E32124] text-white">
                            АКТИВНО
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {arena.address}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white">
                        {arena.rigsCount} ИГРОВЫХ ПК
                      </span>
                      <p className="text-[10px] font-mono text-zinc-500">
                        {arena.area}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px] text-zinc-400">
                    <span className="truncate">
                      {arena.id === 'cyberx-lenina' 
                        ? '🔥 2 Premium сьюта + Автосимуляторы' 
                        : `${arena.ps5RoomsCount} PS5 залов + VIP`}
                    </span>
                    <span className="text-[#E32124] font-semibold group-hover:translate-x-0.5 transition-transform">
                      Обзор →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Bottom Holographic Specs Ribbon */}
      <div className="relative z-10 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="glass-panel p-3 rounded-xl border border-white/[0.06] flex items-center gap-3">
            <Gamepad2 className="w-4 h-4 text-[#E32124] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-white">2 Premium зала</div>
              <div className="text-[10px] text-zinc-400">Эксклюзив на Ленина</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-xl border border-white/[0.06] flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#E32124] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-white">2 Автосимулятора</div>
              <div className="text-[10px] text-zinc-400">Sim-Racing Direct Drive</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-xl border border-white/[0.06] flex items-center gap-3">
            <Tv className="w-4 h-4 text-[#E32124] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-white">Лаунж с проектором 150"</div>
              <div className="text-[10px] text-zinc-400">Кино & Мейджоры на Ленина</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-xl border border-white/[0.06] flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#E32124] shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-white">10 PS5 Залов</div>
              <div className="text-[10px] text-zinc-400">4 на Ленина, по 3 на Мира и Серова</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
