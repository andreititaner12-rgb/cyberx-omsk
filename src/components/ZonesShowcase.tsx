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
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface ZonesShowcaseProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  zonesList?: ZoneType[];
}

export const ZonesShowcase: React.FC<ZonesShowcaseProps> = ({ onOpenBooking, zonesList }) => {
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const displayZones = zonesList && zonesList.length >= 6 ? zonesList : ZONES;
  const expandedZone = displayZones.find((z) => z.id === expandedZoneId) || null;

  const handleCardClick = (zone: ZoneType, e: React.MouseEvent) => {
    sound.playClick();

    // Автосимы → перенаправляем в отдельный блок SIM-RACING (#sim-racing), окно не открываем
    if (zone.id === 'sim-racing') {
      const el = document.getElementById('sim-racing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Запоминаем точку, из которой вырастает модальное окно (центр ячейки)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOrigin({
      x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
      y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
    });
    setExpandedZoneId((prev) => (prev === zone.id ? null : zone.id));
  };

  const closeExpanded = () => {
    sound.playClick();
    setExpandedZoneId(null);
  };

  // Колонки в каждой строке всегда в сумме дают 12, поэтому наложения исключены.
  const layout = {
    premium: 'md:col-span-2 lg:col-span-7 min-h-[400px] lg:min-h-[440px]',
    sim: 'lg:col-span-5 min-h-[400px] lg:min-h-[440px]',
    solo: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    cinema: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    ps5: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    open: 'lg:col-span-12 min-h-[240px] lg:min-h-[300px]',
  };

  return (
    <section id="zones" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-24">

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#E32124]/[0.035] rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
            Интерактивная карта игровых пространств. Нажмите на любую зону, чтобы раскрыть детальную спецификацию прямо в окне. При клике на Автосимы — откроется отдельный раздел.
          </p>
        </motion.div>

        {/* Creative Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 mb-10">

          {/* PREMIUM — большой вертикальный герой (span 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={layout.premium}
          >
            <BentoZoneCard
              zone={displayZones[0]}
              isExpanded={expandedZoneId === displayZones[0].id}
              onClick={(e) => handleCardClick(displayZones[0], e)}
              accentBadge="ХИТ // ЭКСКЛЮЗИВ ARENA"
              accentColor="#E32124"
              tall
            />
          </motion.div>

          {/* SIM-RACING — открывает отдельный раздел */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={layout.sim}
          >
            <BentoZoneCard
              zone={displayZones[1]}
              isExpanded={false}
              onClick={(e) => handleCardClick(displayZones[1], e)}
              accentBadge="MOZA DIRECT DRIVE"
              redirectTo="sim-racing"
            />
          </motion.div>

          {/* SOLO ROOM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={layout.solo}
          >
            <BentoZoneCard
              zone={displayZones[3]}
              isExpanded={expandedZoneId === displayZones[3].id}
              onClick={(e) => handleCardClick(displayZones[3], e)}
              accentBadge="600HZ BENQ SPEED"
            />
          </motion.div>

          {/* КИНО-ЛАУНЖ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={layout.cinema}
          >
            <BentoZoneCard
              zone={displayZones[2]}
              isExpanded={expandedZoneId === displayZones[2].id}
              onClick={(e) => handleCardClick(displayZones[2], e)}
              accentBadge='150" ЭКРАН + СЦЕНА'
            />
          </motion.div>

          {/* PS5 DELUXE ЗАЛЫ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={layout.ps5}
          >
            <BentoZoneCard
              zone={displayZones[4]}
              isExpanded={expandedZoneId === displayZones[4].id}
              onClick={(e) => handleCardClick(displayZones[4], e)}
              accentBadge="10 ЗАЛОВ // ВСЕ КЛУБЫ"
            />
          </motion.div>

          {/* ОТКРЫТЫЙ ЗАЛ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={layout.open}
          >
            <BentoZoneCard
              zone={displayZones[5]}
              isExpanded={expandedZoneId === displayZones[5].id}
              onClick={(e) => handleCardClick(displayZones[5], e)}
              accentBadge="182 ИГРОВЫХ ПК В ОМСКЕ"
            />
          </motion.div>

        </div>

      </div>

      {/* Full-Screen Lightbox Modal — вырастает из кликнутой ячейки */}
      <AnimatePresence>
        {expandedZone && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Затемнение фона */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeExpanded}
            />

            {/* Окно */}
            <motion.div
              key={expandedZone.id}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              style={{ transformOrigin: origin ? `${origin.x}% ${origin.y}%` : '50% 50%' }}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl border border-[#E32124]/50 bg-[#0a0a12] shadow-[0_0_80px_rgba(227,33,36,0.35)]"
            >
              <ExpandedZoneModal
                zone={expandedZone}
                onClose={closeExpanded}
                onOpenBooking={onOpenBooking}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ===== Expanded Zone Modal (Full-Screen Detail) =====
interface ExpandedZoneModalProps {
  zone: ZoneType;
  onClose: () => void;
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
}

const ExpandedZoneModal: React.FC<ExpandedZoneModalProps> = ({ zone, onClose, onOpenBooking }) => {
  const gallery = zone.gallery && zone.gallery.length > 0 ? zone.gallery : [zone.image];
  const [activeImage, setActiveImage] = useState(0);

  const image = gallery[activeImage];

  const next = () => setActiveImage((i) => (i + 1) % gallery.length);
  const prev = () => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
      {/* Media Side (Unobstructed Gallery Viewer) */}
      <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[360px] lg:min-h-full bg-black flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            src={image}
            alt={zone.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />

        {/* Верхние бейджи и счётчик фото */}
        <div className="relative z-20 p-5 flex items-start justify-between gap-2 font-mono">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#000000]/80 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#E32124]" />
              {zone.capacity}
            </span>
            {zone.badge && (
              <span className="px-3 py-1.5 rounded-xl bg-[#E32124] text-white text-xs font-bold shadow-lg shadow-red-600/30">
                {zone.badge}
              </span>
            )}
          </div>

          {gallery.length > 1 && (
            <span className="px-3 py-1 rounded-lg bg-black/80 border border-white/15 text-xs font-mono text-zinc-300 backdrop-blur-md shrink-0">
              {activeImage + 1} / {gallery.length}
            </span>
          )}
        </div>

        {/* Стрелки навигации по галерее */}
        {gallery.length > 1 && (
          <div className="relative z-20 px-3 flex items-center justify-between pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); sound.playClick(); prev(); }}
              className="p-2.5 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md transition-all pointer-events-auto active:scale-90 shadow-lg cursor-pointer"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); sound.playClick(); next(); }}
              className="p-2.5 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md transition-all pointer-events-auto active:scale-90 shadow-lg cursor-pointer"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Нижний ряд миниатюр (без наложений текста) */}
        {gallery.length > 1 && (
          <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="flex flex-wrap gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={(e) => { e.stopPropagation(); sound.playClick(); setActiveImage(i); }}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeImage 
                      ? 'border-[#E32124] ring-2 ring-[#E32124]/50 scale-105' 
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Информация (Детали и описание) */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col max-h-[92vh] overflow-y-auto">
        <div>
          {/* Верхняя строка с кнопкой закрытия */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/[0.08]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E32124] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Спецификация пространства CyberX
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-[#E32124] text-zinc-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Свернуть</span>
            </button>
          </div>

          {/* Заголовок и подзаголовок зоны */}
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight">
              {zone.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
              {zone.tagline}
            </p>
          </div>

          {/* Описание */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
            {zone.description}
          </p>

          {/* Железо */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3 flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-[#E32124]" />
              Оснащение и конфигурация:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {zone.hardwareBrief.map((hw, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E32124] shrink-0" />
                  <span className="truncate">{hw}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Особенности */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2.5 flex items-center gap-2">
              <Coffee className="w-3.5 h-3.5 text-[#E32124]" />
              Особенности и сервис:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {zone.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-mono">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Цена и CTA */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-white">
                {zone.pricePerHour} ₽
              </span>
              <span className="text-xs text-zinc-400">/ час</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Ночной пакет (10 ч): <span className="text-white font-bold">{zone.priceNight} ₽</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTrigger();
              onOpenBooking(
                zone.id.includes('premium') || zone.id.includes('sim-racing') || zone.id.includes('projector')
                  ? 'cyberx-arena'
                  : undefined,
                zone.id,
              );
            }}
            onMouseEnter={() => sound.playHover()}
            className="py-3.5 px-8 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.2em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Забронировать {zone.name.split('//')[0].trim()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== Bento Zone Card =====
interface BentoZoneCardProps {
  zone: ZoneType;
  className?: string;
  isExpanded?: boolean;
  onClick: (e: React.MouseEvent) => void;
  accentBadge?: string;
  accentColor?: string;
  tall?: boolean;
  redirectTo?: string;
}

const BentoZoneCard: React.FC<BentoZoneCardProps> = ({
  zone,
  isExpanded = false,
  onClick,
  accentBadge,
  tall = false,
  redirectTo,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => sound.playHover()}
      className={`group relative overflow-hidden cursor-pointer rounded-3xl transition-all duration-300 border backdrop-blur-md flex flex-col justify-between p-5 sm:p-6 select-none shadow-xl h-full ${
        isExpanded
          ? 'border-[#E32124] ring-1 ring-[#E32124]/60 shadow-[0_0_35px_rgba(227,33,36,0.3)]'
          : 'border-white/[0.1] hover:border-[#E32124]/50 hover:shadow-2xl'
      }`}
    >
      {/* Фото */}
      <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden isolate transform-gpu">
        <img
          src={zone.image}
          alt={zone.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.65] group-hover:brightness-[0.75] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Верхние бейджи */}
      <div className="relative z-10 flex items-start justify-between gap-2 font-mono">
        <div className="flex flex-wrap items-center gap-2">
          {accentBadge && (
            /эксклюзив/i.test(accentBadge) ? (
              <span className="badge-gold-shimmer px-2.5 py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase">
                {accentBadge}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-white text-[9px] font-bold tracking-wider uppercase shadow-md shadow-red-600/40">
                {accentBadge}
              </span>
            )
          )}
          {(!accentBadge || !/эксклюзив/i.test(accentBadge)) && (
            /эксклюзив/i.test(zone.category) ? (
              <span className="badge-gold-shimmer px-2.5 py-1 rounded-lg text-[9px] font-extrabold tracking-wider uppercase">
                {zone.category}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-white text-[9px] font-semibold uppercase">
                {zone.category}
              </span>
            )
          )}
        </div>

        {redirectTo ? (
          <div className="p-2 rounded-xl bg-[#E32124] text-white shadow-md shadow-red-600/40 group-hover:scale-110 transition-transform">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white group-hover:text-[#E32124] group-hover:bg-white transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Нижний контент и цена */}
      <div className="relative z-10 mt-auto pt-8 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h3 className={`font-display font-black text-white group-hover:text-[#E32124] transition-colors leading-tight uppercase ${tall ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
              {zone.name}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl font-light line-clamp-1 sm:line-clamp-2">
              {zone.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase block">Тариф</span>
              <span className="text-base sm:text-lg font-display font-black text-white">
                {zone.pricePerHour} ₽ <span className="text-[10px] font-normal text-zinc-400">/ час</span>
              </span>
            </div>

            <div className={`px-3.5 py-2 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
              redirectTo
                ? 'bg-[#E32124] text-white'
                : isExpanded
                  ? 'bg-[#E32124] text-white'
                  : 'bg-white/10 group-hover:bg-[#E32124] text-white'
            }`}>
              {redirectTo ? (
                <>
                  <span>Открыть раздел</span>
                  <ExternalLink className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>{isExpanded ? 'Закрыть' : 'Обзор'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
