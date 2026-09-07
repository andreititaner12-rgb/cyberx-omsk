import React, { useState, useRef, useEffect } from 'react';
import { ARENAS } from '../data/arenaData';
import { 
  MapPin, 
  Send, 
  Clock, 
  Star, 
  Check, 
  ArrowRight, 
  Building2, 
  Tv, 
  Gamepad2, 
  Gauge, 
  PhoneCall, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Users,
  Sparkle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';

interface ArenaEcosystemProps {
  onOpenBooking: (arenaId: string) => void;
  selectedArenaId?: string;
}

export const ArenaEcosystem: React.FC<ArenaEcosystemProps> = ({
  onOpenBooking,
  selectedArenaId,
}) => {
  // Flagship CyberX Arena is in the center and selected by default
  const [activeId, setActiveId] = useState<string>(selectedArenaId || 'cyberx-arena');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Gallery slider state for deep-dive section
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [isHoveringGallery, setIsHoveringGallery] = useState<boolean>(false);

  const currentArena = ARENAS.find((a) => a.id === activeId) || ARENAS[1];
  const galleryPhotos = currentArena.gallery && currentArena.gallery.length > 0 
    ? currentArena.gallery 
    : [currentArena.image];

  // Reset gallery to first photo when switching arenas
  useEffect(() => {
    setGalleryIndex(0);
  }, [activeId]);

  // Auto-slide gallery every 4.5 seconds when not hovered
  useEffect(() => {
    if (isHoveringGallery || galleryPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryPhotos.length, isHoveringGallery]);

  const handleSelectArena = (arenaId: string) => {
    sound.playClick();
    setActiveId(arenaId);
    
    // Smooth scroll down to deep dive details
    const detailsEl = document.getElementById('arena-deep-dive');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextPhoto = () => {
    sound.playClick();
    setGalleryIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevPhoto = () => {
    sound.playClick();
    setGalleryIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <section id="arenas" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-24">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#E32124]/[0.035] rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-red-600/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Building2 className="w-3.5 h-3.5" />
            Выбор киберспортивного пространства
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            3 КЛУБА В ОМСКЕ <span className="text-[#E32124]">//</span> АРЕНЫ
          </h2>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
            Три флагманских пространства в Омске: <strong className="text-white font-medium">CyberX Arena</strong> (Ленина, 19), <strong className="text-white font-medium">CyberX Европа</strong> (Мира, 42к1) и <strong className="text-white font-medium">CyberX Октябрь</strong> (Серова, 19А). 182 игровых ПК, BenQ 600Hz, Premium Squad сьюты и 2 автосимулятора Sim-Racing.
          </p>
          <p className="mt-2 text-zinc-500 text-xs sm:text-sm font-mono">
            Нажмите на карточку клуба для просмотра детального оснащения, галереи фото и бронирования.
          </p>
        </motion.div>

        {/* 3 Tall, Rounded 3D Focus Cards with Staggered Deliberate Revealing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-20 items-stretch">
          {ARENAS.map((arena, idx) => {
            const isSelected = arena.id === activeId;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={arena.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.85, 
                  delay: 0.15 * idx + 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="h-full"
              >
                <HoloCardItem
                  arena={arena}
                  idx={idx}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  onHover={(i) => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                  onSelect={(id) => handleSelectArena(id)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Selected Arena Deep Dive Details & Walkthrough Section with Auto-Sliding Photo Gallery */}
        <motion.div 
          id="arena-deep-dive" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-28"
        >
          <div className="glass-card rounded-3xl border border-white/[0.12] overflow-hidden shadow-2xl relative bg-[#09090f]/95">
            
            {/* Top red laser neon strip */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Interactive Auto-Sliding Photo Gallery */}
              <div 
                className="lg:col-span-6 relative min-h-[460px] lg:min-h-full overflow-hidden bg-black flex flex-col justify-between"
                onMouseEnter={() => setIsHoveringGallery(true)}
                onMouseLeave={() => setIsHoveringGallery(false)}
              >
                {/* Crossfading Gallery Image */}
                <div className="absolute inset-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeId}-${galleryIndex}`}
                      src={galleryPhotos[galleryIndex]}
                      alt={`${currentArena.name} - Фото ${galleryIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#000000] via-[#000000]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                </div>

                {/* Top Info Bar on Image */}
                <div className="relative z-20 p-6 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-[#000000]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {currentArena.workingHours}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-[#E32124] text-white text-xs font-mono font-bold shadow-lg shadow-red-600/30">
                      {currentArena.rigsCount} Игровых ПК
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-black/80 border border-white/15 text-white text-xs font-mono font-bold">
                      {currentArena.ps5RoomsCount} PS5 залов
                    </span>
                  </div>

                  {/* Photo Counter */}
                  <span className="px-3 py-1 rounded-lg bg-black/80 border border-white/15 text-xs font-mono text-zinc-300 backdrop-blur-md shrink-0">
                    {galleryIndex + 1} / {galleryPhotos.length}
                  </span>
                </div>

                {/* Navigation Arrows on Image */}
                <div className="relative z-20 px-4 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={prevPhoto}
                    className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto active:scale-90 shadow-lg cursor-pointer"
                    aria-label="Предыдущее фото"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#E32124] text-white border border-white/20 hover:border-[#E32124] backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto active:scale-90 shadow-lg cursor-pointer"
                    aria-label="Следующее фото"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Bottom Title + Thumbnail Previews */}
                <div className="relative z-20 p-6 space-y-3">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-wider text-[#E32124] uppercase">
                      Галерея и обзор клуба в Омске
                    </span>
                    <div className="text-2xl sm:text-3xl font-display font-black text-white mt-1 uppercase">
                      {currentArena.name}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
                      {currentArena.tagline}
                    </p>
                  </div>

                  {/* Thumbnail Previews (no scrollbar) */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {galleryPhotos.map((photo, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          sound.playClick();
                          setGalleryIndex(pIdx);
                        }}
                        className={`h-10 w-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          galleryIndex === pIdx
                            ? 'border-[#E32124] ring-2 ring-[#E32124]/50 scale-105'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`Превью ${pIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Details, Infrastructure & Booking Action */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  
                  {/* Address & Direct Contacts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#08080c] border border-white/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 block">Адрес в Омске</span>
                      <div className="text-xs font-bold text-white mt-0.5">{currentArena.address}</div>
                      <div className="text-[11px] text-[#E32124] mt-0.5">{currentArena.metro}</div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 block">Бронь и консультации</span>
                      <a 
                        href={`tel:${currentArena.phone}`} 
                        className="text-xs font-mono font-semibold text-white hover:text-[#E32124] transition-colors flex items-center gap-1.5 mt-0.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{currentArena.phone}</span>
                      </a>
                      <a 
                        href={`https://t.me/${currentArena.telegram.replace('@', '')}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1.5 mt-1"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-400" />
                        <span>{currentArena.telegram}</span>
                      </a>
                    </div>
                  </div>

                  {/* Key Infrastructure Highlights */}
                  <div className="mb-6">
                    <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-3">
                      Особенности и оснащение клуба:
                    </span>
                    <div className="space-y-2.5">
                      {currentArena.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-lg bg-[#E32124]/15 border border-[#E32124]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#E32124]">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-xs sm:text-sm text-zinc-300">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusive Features Banner (Rounded) */}
                  {currentArena.id === 'cyberx-arena' && (
                    <div className="p-3.5 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 mb-6 flex items-center gap-3">
                      <Tv className="w-5 h-5 text-[#E32124] shrink-0" />
                      <div className="text-xs text-zinc-300">
                        <span className="font-bold text-white">Эксклюзив Arena на Ленина:</span> 2 автосимулятора Sim-Racing, 2 Premium Squad зала (5 ПК + PS5 + стол) и Кино-Лаунж 150".
                      </div>
                    </div>
                  )}

                  {currentArena.id === 'cyberx-evropa' && (
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] mb-6 flex items-center gap-3">
                      <Gauge className="w-5 h-5 text-[#E32124] shrink-0" />
                      <div className="text-xs text-zinc-300">
                        <span className="font-bold text-white">Фишка Европа на Мира:</span> Solo Room с процессором <span className="text-white font-semibold">AMD Ryzen 7 7800X3D</span> и монитором <span className="text-[#E32124] font-bold">BenQ 600Hz</span>.
                      </div>
                    </div>
                  )}

                  {currentArena.id === 'cyberx-oktyabr' && (
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] mb-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#E32124] shrink-0" />
                      <div className="text-xs text-zinc-300">
                        <span className="font-bold text-white">Фишка Октябрь на Серова:</span> Trio Rooms (3 ПК), Duo Room (2 ПК) и Solo Room с монитором 600Hz.
                      </div>
                    </div>
                  )}

                </div>

                {/* Direct Action Button (Rounded) */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Стартовый тариф</div>
                    <div className="text-xl font-display font-black text-white">
                      от {currentArena.id === 'cyberx-arena' ? 130 : currentArena.id === 'cyberx-evropa' ? 70 : 100} ₽ <span className="text-xs font-mono font-normal text-zinc-400">/ час</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenBooking(currentArena.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="py-3.5 px-8 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.2em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Забронировать в {currentArena.name.split('//')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Tall, Smooth Rounded 3D Card
interface HoloCardItemProps {
  arena: typeof ARENAS[0];
  idx: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (i: number) => void;
  onLeave: () => void;
  onSelect: (id: string) => void;
}

const HoloCardItem: React.FC<HoloCardItemProps> = ({
  arena,
  idx,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const isFlagship = arena.id === 'cyberx-arena';
  const isEvropa = arena.id === 'cyberx-evropa';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Gentle 3D tilt
    const rX = -((y - rect.height / 2) / 22);
    const rY = (x - rect.width / 2) / 22;

    setRotateX(rX);
    setRotateY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
    onHover(idx);
  };

  const handleMouseLeave = () => {
    onLeave();
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full h-full flex items-center justify-center"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(arena.id)}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
            : isSelected
            ? 'rotateX(0deg) rotateY(0deg) translateY(-2px)'
            : 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative group p-6 lg:p-7 rounded-3xl bg-[#09090e] cursor-pointer transition-all duration-200 ease-out flex flex-col justify-between select-none min-h-[580px] w-full border ${
          isHovered
            ? 'z-30 border-[#E32124] shadow-[0_0_40px_rgba(227,33,36,0.35)] ring-1 ring-[#E32124]/50'
            : isSelected
            ? 'z-20 border-[#E32124]/80 shadow-[0_0_25px_rgba(227,33,36,0.2)] ring-1 ring-[#E32124]/30'
            : 'border-white/[0.08] hover:border-white/20 shadow-xl'
        }`}
      >
        
        {/* Aceternity Glowing Effect Border */}
        <GlowingEffect
          spread={25}
          glow={isHovered || isSelected}
          borderWidth={1.5}
        />

        {/* Soft Specular Glare Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18), rgba(227,33,36,0.12) 30%, transparent 70%)`,
          }}
        />

        {/* Top glowing neon edge strip */}
        <div className={`absolute top-0 left-8 right-8 h-[2px] transition-all duration-300 ${
          isHovered || isSelected
            ? 'bg-gradient-to-r from-transparent via-[#E32124] to-transparent opacity-100'
            : 'opacity-0'
        }`} />

        <div className="relative z-20">
          
          {/* Category Badge & Rating Row (Rounded) */}
          <div className="flex items-center justify-between gap-1.5 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all ${
              isFlagship 
                ? 'bg-[#E32124] text-white shadow-md shadow-red-600/40' 
                : isEvropa
                ? 'bg-red-950/80 text-red-300 border border-red-500/30'
                : 'bg-zinc-800 text-zinc-300 border border-white/10'
            }`}>
              {isFlagship ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>ФЛАГМАН // ЦЕНТР</span>
                </>
              ) : isEvropa ? (
                <>
                  <Sparkle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>НЕФТЯНИКИ</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>ОКТЯБРЬ</span>
                </>
              )}
            </span>

            <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{arena.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Club Title */}
          <h3 className="font-display font-black text-xl lg:text-2xl text-white tracking-tight group-hover:text-[#E32124] transition-colors uppercase">
            {arena.name.split('//')[0].trim()}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 mb-5 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
            <span className="truncate">{arena.address}</span>
          </div>

          {/* Tall High-Res Photo Container (Rounded) */}
          <div className="relative h-56 lg:h-60 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 group-hover:border-[#E32124]/50 transition-all shadow-lg bg-black">
            <img
              src={arena.image}
              alt={arena.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent" />

            {/* Badges on image (Rounded) */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-[#000000]/85 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white">
                {arena.rigsCount} ПК
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-[10px] font-mono font-bold text-white shadow-md shadow-red-600/40">
                {arena.ps5RoomsCount} PS5
              </span>
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl flex items-center justify-between text-xs font-mono bg-black/80 backdrop-blur-sm px-3 py-1.5 border border-white/10">
              <span className="text-zinc-200 truncate font-medium">
                {isFlagship ? '2 Premium + 2 Автосима' : isEvropa ? 'Solo Ryzen 7800X3D' : 'Solo & Trio Rooms'}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                24/7
              </span>
            </div>
          </div>

          {/* Specs & Hardware Chips (Rounded) */}
          <div className="space-y-2 mb-6">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
              <Gauge className="w-4 h-4 text-[#E32124] shrink-0" />
              <span className="truncate">{isFlagship ? 'BenQ 600Hz & ASUS 480Hz' : 'BenQ 600Hz Extreme Speed'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
              <Gamepad2 className="w-4 h-4 text-[#E32124] shrink-0" />
              <span className="truncate">{isFlagship ? 'RTX 5070 Ti / 3060 Ti' : 'RTX 5070 Ti DLSS 3.5'}</span>
            </div>
          </div>

        </div>

        {/* Bottom Row: Price & Action Button (Rounded) */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 relative z-20 font-mono">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">Стартовый тариф</span>
            <span className="text-lg lg:text-xl font-display font-black text-white whitespace-nowrap">
              от {arena.id === 'cyberx-arena' ? 130 : arena.id === 'cyberx-evropa' ? 70 : 100} ₽<span className="text-xs font-mono font-normal text-zinc-400">/час</span>
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(arena.id);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer ${
              isHovered || isSelected
                ? 'bg-[#E32124] text-white shadow-red-600/40'
                : 'bg-white/10 text-white hover:bg-[#E32124] hover:text-white'
            }`}
          >
            <span>Обзор</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
