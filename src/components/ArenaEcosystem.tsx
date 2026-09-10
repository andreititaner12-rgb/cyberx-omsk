import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  PhoneCall,
  Send,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Navigation,
} from 'lucide-react';
import { ARENAS } from '../data/arenaData';
import { sound } from '../utils/sound';
import { scrollToSection, getLenis } from '../utils/scroll';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal, EASE_OUT } from './ui/Reveal';

interface ArenaEcosystemProps {
  onOpenBooking: (arenaId: string) => void;
  selectedArenaId?: string;
}

const ARENA_META: Record<string, { tag: string; rigs: number; ps5: number; from: number; sim: string }> = {
  'cyberx-arena': {
    tag: 'Флагман · центр города',
    rigs: 86,
    ps5: 4,
    from: 130,
    sim: '2 Sim-Racing · 2 Premium зала · кино-лаунж 150"',
  },
  'cyberx-evropa': {
    tag: 'Студгородок · Нефтяники',
    rigs: 46,
    ps5: 3,
    from: 70,
    sim: 'Solo Room на Ryzen 7 7800X3D + 600Hz',
  },
  'cyberx-oktyabr': {
    tag: 'Ленинский округ',
    rigs: 50,
    ps5: 3,
    from: 100,
    sim: 'Solo 600Hz · Trio- и Duo-комнаты',
  },
};

export const ArenaEcosystem: React.FC<ArenaEcosystemProps> = ({
  onOpenBooking,
  selectedArenaId,
}) => {
  const [activeId, setActiveId] = useState<string>(selectedArenaId || 'cyberx-arena');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const current = ARENAS.find((a) => a.id === activeId) || ARENAS[1];
  const gallery = current.gallery && current.gallery.length > 0 ? current.gallery : [current.image];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeId]);

  // Автопрокрутка галереи, когда курсор не над ней
  useEffect(() => {
    if (galleryPaused || gallery.length <= 1) return;
    const t = setInterval(
      () => setGalleryIndex((i) => (i + 1) % gallery.length),
      5200
    );
    return () => clearInterval(t);
  }, [gallery.length, galleryPaused]);

  const selectArena = (id: string, scrollToDetail = true) => {
    sound.playClick();
    setActiveId(id);
    if (scrollToDetail) {
      const el = document.getElementById('arena-deep-dive');
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { offset: -84, duration: 1.3 });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section id="arenas" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="01"
          label="Клубы сети"
          title="Три арены — выбери свою"
          lead="Ленина, 19 — флагман со сценой и автосимуляторами. Мира, 42к1 — студгородок с Solo на 7800X3D. Серова, 19А — приватные залы Ленинского округа. Нажми на клуб, чтобы посмотреть оснащение, фото и забронировать."
        />

        {/* Карточки клубов */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {ARENAS.map((arena, i) => {
              const meta = ARENA_META[arena.id];
              const isActive = arena.id === activeId;
              const isDimmed = hoveredId !== null && hoveredId !== arena.id;
              const isFlagship = arena.id === 'cyberx-arena';

            return (
              <Reveal key={arena.id} delay={i * 0.08} y={34}>
                <article
                  onMouseEnter={() => {
                    setHoveredId(arena.id);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`top-line group relative flex flex-col h-full rounded-2xl overflow-hidden bg-cyberx-surface border border-white/[0.08] cursor-pointer transition-all duration-500 ease-out ${
                    isActive ? 'border-white/[0.18] is-active' : ''
                  } ${isDimmed ? 'opacity-60' : 'opacity-100'}`}
                >
                  {/* Фото */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={arena.image}
                      alt={arena.name}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyberx-ink/85 via-transparent to-transparent" />

                    {/* Метаданные поверх фото, внизу */}
                    <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-2">
                      <span className="eyebrow text-white/85">{meta.tag}</span>
                      {isFlagship && (
                        <span className="eyebrow text-cyberx-red font-semibold">
                          Флагман
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Текстовая часть */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3 className="font-display font-extrabold uppercase text-xl sm:text-2xl tracking-tight text-white leading-tight">
                      {arena.name.split('//')[0].trim()}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-cyberx-muted">
                      <MapPin className="w-3.5 h-3.5 text-cyberx-red shrink-0" />
                      <span className="truncate">{arena.address}</span>
                    </div>

                    {/* Факты: тонкая линия, не чипы */}
                    <dl className="mt-5 hairline-t pt-4 space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-xs text-cyberx-faint font-mono">Игровых ПК</dt>
                        <dd className="text-sm font-semibold text-white tabular-nums">{meta.rigs}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-xs text-cyberx-faint font-mono">PS5 залов</dt>
                        <dd className="text-sm font-semibold text-white tabular-nums">{meta.ps5}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-xs text-cyberx-faint font-mono">Режим работы</dt>
                        <dd className="text-sm font-semibold text-white">24/7</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3 pt-1">
                        <dt className="text-xs text-cyberx-faint font-mono leading-snug pt-0.5">Особенности</dt>
                        <dd className="text-xs text-white/80 text-right leading-snug max-w-[60%]">{meta.sim}</dd>
                      </div>
                    </dl>

                    {/* Футер карточки */}
                    <div className="mt-6 pt-4 hairline-t flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">
                          от
                        </div>
                        <div className="font-display font-extrabold text-xl text-white whitespace-nowrap">
                          {meta.from} ₽
                          <span className="text-xs font-sans font-normal text-cyberx-muted"> /час</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectArena(arena.id);
                        }}
                        className={`inline-flex items-center gap-2 rounded-full py-2.5 px-4 eyebrow font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-cyberx-red text-white'
                            : 'border border-white/15 text-white hover:border-cyberx-red hover:text-cyberx-red'
                        }`}
                      >
                        Обзор
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Deep dive выбранного клуба */}
        <div id="arena-deep-dive" className="mt-14 sm:mt-20 scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] bg-cyberx-surface"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Галерея */}
                <div
                  className="relative lg:col-span-5 min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-black"
                  onMouseEnter={() => setGalleryPaused(true)}
                  onMouseLeave={() => setGalleryPaused(false)}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={`${activeId}-${galleryIndex}`}
                      src={gallery[galleryIndex]}
                      alt={`${current.name} — фото ${galleryIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1.06 }}
                      exit={{ opacity: 0 }}
                      transition={{ opacity: { duration: 0.6 }, scale: { duration: 8, ease: 'linear' } }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

                  {/* Счётчик */}
                  <div className="absolute top-4 right-4 eyebrow text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full tabular-nums">
                    {galleryIndex + 1} / {gallery.length}
                  </div>

                  {/* Стрелки */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length);
                      }}
                      className="h-10 w-10 rounded-full bg-black/60 border border-white/15 text-white hover:border-white/40 transition-all flex items-center justify-center backdrop-blur-md active:scale-90"
                      aria-label="Предыдущее фото"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setGalleryIndex((i) => (i + 1) % gallery.length);
                      }}
                      className="h-10 w-10 rounded-full bg-black/60 border border-white/15 text-white hover:border-white/40 transition-all flex items-center justify-center backdrop-blur-md active:scale-90"
                      aria-label="Следующее фото"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Миниатюры */}
                  <div className="absolute bottom-16 left-4 right-4 flex gap-2">
                    {gallery.map((photo, i) => (
                      <button
                        key={photo + i}
                        onClick={() => {
                          sound.playClick();
                          setGalleryIndex(i);
                        }}
                        aria-label={`Фото ${i + 1}`}
                        className={`h-9 w-14 rounded-md overflow-hidden border transition-all duration-300 ${
                          galleryIndex === i
                            ? 'border-cyberx-red'
                            : 'border-white/20 opacity-50 hover:opacity-90'
                        }`}
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Детали */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="eyebrow text-cyberx-red">{ARENA_META[current.id]?.tag}</span>
                    <span className="flex items-center gap-1.5 eyebrow text-cyberx-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {current.workingHours}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display font-black uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
                    {current.name}
                  </h3>
                  <p className="mt-2 text-sm text-cyberx-muted">{current.tagline}</p>

                  {/* Контакты */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={`tel:${current.phone}`}
                      className="group rounded-xl border border-white/[0.08] hover:border-white/20 px-4 py-3 transition-colors"
                    >
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono mb-1">
                        Телефон клуба
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-cyberx-red transition-colors">
                        <PhoneCall className="w-4 h-4 text-cyberx-red" />
                        {current.phone}
                      </div>
                    </a>
                    <a
                      href={`https://t.me/${current.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-xl border border-white/[0.08] hover:border-white/20 px-4 py-3 transition-colors"
                    >
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono mb-1">
                        Telegram
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-cyberx-red transition-colors">
                        <Send className="w-4 h-4 text-cyberx-red" />
                        {current.telegram}
                      </div>
                    </a>
                  </div>

                  {/* Оснащение */}
                  <div className="mt-6">
                    <div className="eyebrow text-cyberx-faint mb-3">Оснащение</div>
                    <ul className="space-y-2.5">
                      {current.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px] sm:text-sm text-white/80 leading-relaxed">
                          <span className="mt-[7px] h-px w-4 bg-cyberx-red shrink-0" aria-hidden />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-8 hairline-t flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">
                        Стартовый тариф
                      </div>
                      <div className="font-display font-extrabold text-2xl text-white">
                        от {ARENA_META[current.id]?.from} ₽
                        <span className="text-xs font-sans font-normal text-cyberx-muted"> /час</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          sound.playTrigger();
                          onOpenBooking(current.id);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className="btn-primary"
                      >
                        Забронировать
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          scrollToSection('location');
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className="btn-ghost"
                      >
                        <Navigation size={14} />
                        Как добраться
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
