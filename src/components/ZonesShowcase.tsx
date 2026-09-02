import React, { useState } from 'react';
import { ZONES } from '../data/arenaData';
import { ZoneType } from '../types';
import { 
  Users, 
  Monitor, 
  Check, 
  ArrowRight, 
  Layers, 
  Coffee, 
  Zap, 
  X,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';

interface ZonesShowcaseProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
}

export const ZonesShowcase: React.FC<ZonesShowcaseProps> = ({ onOpenBooking }) => {
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);

  const expandedZone = ZONES.find((z) => z.id === expandedZoneId) || null;

  const handleCardClick = (zone: ZoneType) => {
    sound.playClick();
    if (expandedZoneId === zone.id) {
      setExpandedZoneId(null);
    } else {
      setExpandedZoneId(zone.id);
      // Smooth scroll slightly so expanded card is nicely framed
      setTimeout(() => {
        const el = document.getElementById('expanded-zone-drawer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  return (
    <section id="zones" className="relative py-24 sm:py-32 bg-[#000000] overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#E32124]/[0.035] rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Layers className="w-3.5 h-3.5" />
            Архитектура пространств CyberX Омск
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            ЗОНЫ <span className="text-[#E32124]">//</span> И ЭКСКЛЮЗИВЫ
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Интерактивная карта игровых локаций. Нажмите на любую зону с реальным фото, чтобы раскрыть подробную спецификацию и бронирование.
          </p>
        </motion.div>

        {/* Dynamic Asymmetric Bento Grid of Gaming Zones with in-card photos */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mb-10">
          
          {/* 1. PREMIUM SQUAD SUITE (Large Wide Anchor - 8 Cols) */}
          <BentoZoneCard
            zone={ZONES[0]}
            className="md:col-span-12 lg:col-span-8 min-h-[320px] lg:min-h-[360px]"
            isExpanded={expandedZoneId === ZONES[0].id}
            onClick={() => handleCardClick(ZONES[0])}
            accentBadge="ХИТ // ЭКСКЛЮЗИВ ARENA"
            accentColor="#E32124"
          />

          {/* 2. SIM-RACING // 2 КОКПИТА (4 Cols) */}
          <BentoZoneCard
            zone={ZONES[1]}
            className="md:col-span-6 lg:col-span-4 min-h-[320px] lg:min-h-[360px]"
            isExpanded={expandedZoneId === ZONES[1].id}
            onClick={() => handleCardClick(ZONES[1])}
            accentBadge="DIRECT DRIVE"
          />

          {/* 3. SOLO ROOM // RYZEN 7800X3D + 600HZ (4 Cols) */}
          <BentoZoneCard
            zone={ZONES[3]}
            className="md:col-span-6 lg:col-span-4 min-h-[300px] lg:min-h-[340px]"
            isExpanded={expandedZoneId === ZONES[3].id}
            onClick={() => handleCardClick(ZONES[3])}
            accentBadge="600HZ BENQ SPEED"
          />

          {/* 4. КИНО-ЛАУНЖ С ПРОЕКТОРОМ 150" (4 Cols) */}
          <BentoZoneCard
            zone={ZONES[2]}
            className="md:col-span-6 lg:col-span-4 min-h-[300px] lg:min-h-[340px]"
            isExpanded={expandedZoneId === ZONES[2].id}
            onClick={() => handleCardClick(ZONES[2])}
            accentBadge='150" ЭКРАН + СЦЕНА'
          />

          {/* 5. PS5 DELUXE ЗАЛЫ (4 Cols) */}
          <BentoZoneCard
            zone={ZONES[4]}
            className="md:col-span-6 lg:col-span-4 min-h-[300px] lg:min-h-[340px]"
            isExpanded={expandedZoneId === ZONES[4].id}
            onClick={() => handleCardClick(ZONES[4])}
            accentBadge="10 ЗАЛОВ // ВСЕ КЛУБЫ"
          />

          {/* 6. ОТКРЫТЫЙ ЗАЛ // SUPER VIP & STANDART (Full Width - 12 Cols) */}
          <BentoZoneCard
            zone={ZONES[5]}
            className="md:col-span-12 min-h-[260px] lg:min-h-[300px]"
            isExpanded={expandedZoneId === ZONES[5].id}
            onClick={() => handleCardClick(ZONES[5])}
            accentBadge="182 ИГРОВЫХ ПК В ОМСКЕ"
          />

        </div>

        {/* Smooth Expandable In-Place Drawer when a zone is clicked */}
        <AnimatePresence>
          {expandedZone && (
            <motion.div
              id="expanded-zone-drawer"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="glass-card rounded-3xl border border-[#E32124]/60 overflow-hidden shadow-[0_0_50px_rgba(227,33,36,0.25)] relative mb-12 scroll-mt-28"
            >
              {/* Top Red Glow Strip */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Visual Media & Quick Tags */}
                <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full">
                  <img
                    src={expandedZone.image}
                    alt={expandedZone.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent" />

                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#E32124]" />
                      {expandedZone.capacity}
                    </span>
                    {expandedZone.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#E32124] text-white text-xs font-mono font-bold shadow-lg shadow-red-600/30">
                        {expandedZone.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-2xl lg:text-3xl font-display font-black text-white">
                      {expandedZone.name}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
                      {expandedZone.tagline}
                    </p>
                  </div>
                </div>

                {/* Information, Hardware List, Pricing & Direct Action */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    
                    {/* Close / Collapse button */}
                    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E32124] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Полная спецификация пространства
                      </span>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setExpandedZoneId(null);
                        }}
                        className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-[#E32124] text-zinc-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Свернуть</span>
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                      {expandedZone.description}
                    </p>

                    {/* Hardware Specifications */}
                    <div className="mb-6">
                      <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-[#E32124]" />
                        Оснащение и конфигурация:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {expandedZone.hardwareBrief.map((hw, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] shrink-0" />
                            <span className="truncate">{hw}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities / Perks */}
                    <div className="mb-6">
                      <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2.5 flex items-center gap-2">
                        <Coffee className="w-3.5 h-3.5 text-[#E32124]" />
                        Особенности и сервис:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {expandedZone.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Pricing & Booking CTA */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-black text-2xl text-white">
                          {expandedZone.pricePerHour} ₽
                        </span>
                        <span className="text-xs font-mono text-zinc-400">/ час</span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400">
                        Ночной пакет (10 ч): <span className="text-white font-bold">{expandedZone.priceNight} ₽</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playTrigger();
                        onOpenBooking(
                          expandedZone.id.includes('premium') || expandedZone.id.includes('sim-racing') || expandedZone.id.includes('projector') 
                            ? 'cyberx-arena' 
                            : undefined, 
                          expandedZone.id
                        );
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="py-3.5 px-8 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Забронировать {expandedZone.name.split('//')[0].trim()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

// Bento Zone Card with In-Card High-Definition Photo & Dynamic Hover
interface BentoZoneCardProps {
  zone: ZoneType;
  className?: string;
  isExpanded?: boolean;
  onClick: () => void;
  accentBadge?: string;
  accentColor?: string;
}

const BentoZoneCard: React.FC<BentoZoneCardProps> = ({
  zone,
  className = '',
  isExpanded = false,
  onClick,
  accentBadge,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => sound.playHover()}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border backdrop-blur-md flex flex-col justify-between p-6 select-none shadow-xl ${
        isExpanded
          ? 'border-[#E32124] ring-2 ring-[#E32124]/60 shadow-[0_0_35px_rgba(227,33,36,0.3)] scale-[1.01]'
          : 'border-white/[0.1] hover:border-white/30 hover:shadow-2xl hover:scale-[1.01]'
      } ${className}`}
    >
      {/* Aceternity Glowing Effect Border */}
      <GlowingEffect
        spread={25}
        glow={isExpanded}
        borderWidth={1.5}
      />

      {/* Real In-Card High-Resolution Background Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={zone.image}
          alt={zone.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.65] group-hover:brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/50 to-transparent" />
      </div>

      {/* Top Badges */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {accentBadge && (
            <span className="px-2.5 py-1 rounded-full bg-[#E32124] text-white text-[9px] font-mono font-bold tracking-wider uppercase shadow-md shadow-red-600/40">
              {accentBadge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[9px] font-mono font-semibold">
            {zone.category}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white group-hover:text-[#E32124] group-hover:bg-white transition-all">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Bottom Content & Pricing */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white group-hover:text-[#E32124] transition-colors leading-tight">
              {zone.name}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl font-light line-clamp-1 sm:line-clamp-2">
              {zone.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Тариф</span>
              <span className="text-base sm:text-lg font-display font-black text-white">
                {zone.pricePerHour} ₽ <span className="text-[10px] font-mono font-normal text-zinc-400">/ час</span>
              </span>
            </div>

            <div className={`px-3.5 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
              isExpanded
                ? 'bg-[#E32124] text-white'
                : 'bg-white/10 group-hover:bg-[#E32124] text-white'
            }`}>
              <span>{isExpanded ? 'Закрыть' : 'Обзор'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
