import React, { useState } from 'react';
import { ZONES } from '../data/arenaData';
import { ZoneType } from '../types';
import {
  Users,
  Monitor,
  Coffee,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal, EASE_OUT } from './ui/Reveal';

interface ZonesShowcaseProps {
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  zonesList?: ZoneType[];
}

export const ZonesShowcase: React.FC<ZonesShowcaseProps> = ({ onOpenBooking, zonesList }) => {
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const zones = zonesList && zonesList.length >= 6 ? zonesList : ZONES;
  const expanded = zones.find((z) => z.id === expandedZoneId) || null;

  const openZone = (zone: ZoneType, e: React.MouseEvent) => {
    sound.playClick();

    // Автосимы — отдельная секция
    if (zone.id === 'sim-racing') {
      scrollToSection('sim-racing');
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setOrigin({
      x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
      y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
    });
    setExpandedZoneId((prev) => (prev === zone.id ? null : zone.id));
  };

  const close = () => {
    sound.playClick();
    setExpandedZoneId(null);
  };

  const layout = {
    premium: 'md:col-span-2 lg:col-span-7 min-h-[400px] lg:min-h-[440px]',
    sim: 'lg:col-span-5 min-h-[400px] lg:min-h-[440px]',
    solo: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    cinema: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    ps5: 'lg:col-span-4 min-h-[300px] lg:min-h-[340px]',
    open: 'lg:col-span-12 min-h-[240px] lg:min-h-[300px]',
  };

  const cards: { zone: ZoneType; span: string; delay: number }[] = [
    { zone: zones[0], span: layout.premium, delay: 0.05 },
    { zone: zones[1], span: layout.sim, delay: 0.12 },
    { zone: zones[3], span: layout.solo, delay: 0.18 },
    { zone: zones[2], span: layout.cinema, delay: 0.12 },
    { zone: zones[4], span: layout.ps5, delay: 0.18 },
    { zone: zones[5], span: layout.open, delay: 0.24 },
  ];

  return (
    <section id="zones" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="02"
          label="Пространства"
          title="Зоны и эксклюзивы"
          lead="Интерактивная карта пространств сети. Нажми на зону — раскроется полная спецификация: железо, вместимость, тарифы. Автосимуляторы живут в отдельном разделе ниже."
        />

        {/* Bento-сетка */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {cards.map(({ zone, span, delay }) => (
            <Reveal key={zone.id} delay={delay} y={30} className={`${span} h-full`}>
              <div
                onClick={(e) => openZone(zone, e)}
                onMouseEnter={() => sound.playHover()}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] cursor-pointer bg-cyberx-surface"
              >
                {/* Фото */}
                <img
                  src={zone.image}
                  alt={zone.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.7] group-hover:scale-[1.05] transition-all duration-[1.3s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                {/* Красная нить сверху при hover */}
                <span
                  className="absolute top-0 left-5 right-5 h-[2px] bg-cyberx-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  aria-hidden
                />

                {/* Сверху: категория + иконка */}
                <div className="relative z-10 flex items-start justify-between p-5">
                  <span className="eyebrow text-white/70">{zone.category}</span>
                  <span className="h-9 w-9 rounded-full bg-black/50 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-cyberx-red group-hover:border-cyberx-red group-hover:text-white transition-all duration-300">
                    {zone.id === 'sim-racing' ? (
                      <ArrowUpRight size={15} />
                    ) : (
                      <Maximize2 size={14} />
                    )}
                  </span>
                </div>

                {/* Снизу: название + цена */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold uppercase text-lg sm:text-2xl text-white leading-tight tracking-tight">
                      {zone.name.split('//')[0].trim()}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-white/60 line-clamp-1 sm:line-clamp-2 max-w-md">
                      {zone.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-mono">
                      тариф
                    </div>
                    <div className="font-display font-extrabold text-lg sm:text-xl text-white whitespace-nowrap">
                      {zone.pricePerHour.toLocaleString('ru-RU')} ₽
                      <span className="text-[10px] font-sans font-normal text-white/50"> /час</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Раскрывающееся окно зоны */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              key={expanded.id}
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{ transformOrigin: origin ? `${origin.x}% ${origin.y}%` : '50% 50%' }}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/[0.12] bg-cyberx-surface shadow-modal"
            >
              <ExpandedZoneModal zone={expanded} onClose={close} onOpenBooking={onOpenBooking} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ===== Детали зоны ===== */
const ExpandedZoneModal: React.FC<{
  zone: ZoneType;
  onClose: () => void;
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
}> = ({ zone, onClose, onOpenBooking }) => {
  const gallery = zone.gallery && zone.gallery.length > 0 ? zone.gallery : [zone.image];
  const [imgIndex, setImgIndex] = useState(0);
  const image = gallery[imgIndex];

  const next = () => setImgIndex((i) => (i + 1) % gallery.length);
  const prev = () => setImgIndex((i) => (i - 1 + gallery.length) % gallery.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full max-h-[92vh]">
      {/* Медиа */}
      <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[360px] lg:min-h-full bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={image}
            src={image}
            alt={zone.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          <span className="eyebrow text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-cyberx-red" />
            {zone.capacity}
          </span>
          {gallery.length > 1 && (
            <span className="eyebrow text-white/70 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full tabular-nums">
              {imgIndex + 1} / {gallery.length}
            </span>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  onClick={() => {
                    sound.playClick();
                    setImgIndex(i);
                  }}
                  aria-label={`Фото ${i + 1}`}
                  className={`h-10 w-14 rounded-md overflow-hidden border transition-all ${
                    i === imgIndex ? 'border-cyberx-red' : 'border-white/20 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  prev();
                }}
                className="h-10 w-10 rounded-full bg-black/60 border border-white/15 text-white hover:border-white/40 transition-all flex items-center justify-center active:scale-90"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick();
                  next();
                }}
                className="h-10 w-10 rounded-full bg-black/60 border border-white/15 text-white hover:border-white/40 transition-all flex items-center justify-center active:scale-90"
                aria-label="Следующее фото"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Инфо */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between gap-4 pb-4 hairline-b">
          <span className="eyebrow text-cyberx-red">Спецификация пространства</span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 eyebrow text-cyberx-muted hover:text-white transition-colors"
          >
            <X size={14} />
            Закрыть
          </button>
        </div>

        <h3 className="mt-5 font-display font-black uppercase text-2xl sm:text-3xl text-white tracking-tight leading-tight">
          {zone.name}
        </h3>
        <p className="mt-1.5 text-sm text-cyberx-muted">{zone.tagline}</p>
        <p className="mt-4 text-[13px] sm:text-sm text-white/70 leading-relaxed">
          {zone.description}
        </p>

        <div className="mt-6">
          <div className="eyebrow text-cyberx-faint mb-3 flex items-center gap-2">
            <Monitor size={13} className="text-cyberx-red" />
            Оснащение
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {zone.hardwareBrief.map((hw, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-white/75 py-1.5">
                <span className="mt-[7px] h-px w-3.5 bg-cyberx-red shrink-0" aria-hidden />
                <span className="leading-snug">{hw}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="eyebrow text-cyberx-faint mb-3 flex items-center gap-2">
            <Coffee size={13} className="text-cyberx-red" />
            Сервис
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {zone.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-white/75 py-1.5">
                <span className="mt-[7px] h-px w-3.5 bg-white/40 shrink-0" aria-hidden />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6 hairline-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-extrabold text-2xl text-white">
              {zone.pricePerHour.toLocaleString('ru-RU')} ₽
              <span className="text-xs font-sans font-normal text-cyberx-muted"> /час</span>
            </div>
            <div className="text-[11px] text-cyberx-faint mt-0.5">
              ночной пакет: <span className="text-white/80">{zone.priceNight.toLocaleString('ru-RU')} ₽</span>
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
            className="btn-primary"
          >
            Забронировать
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
