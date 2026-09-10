import React, { useState, useEffect } from 'react';
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
  Cpu,
  Zap, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer, CardItem } from './ui/ThreeDCard';

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
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

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
    <section id="arenas" className="relative py-20 sm:py-28 bg-transparent scroll-mt-24">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#E32124]/[0.035] rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-red-600/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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
        </div>

        {/* 3 Aceternity 3D Perspective Tilt Cards with Siblings Focus Blur */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-20 items-stretch">
          {ARENAS.map((arena) => {
            const isSelected = arena.id === activeId;
            const isFlagship = arena.id === 'cyberx-arena';
            const isEvropa = arena.id === 'cyberx-evropa';
            const isAnyHovered = hoveredCardId !== null;
            const isThisHovered = hoveredCardId === arena.id;
            const isSiblingDimmed = isAnyHovered && !isThisHovered;

            return (
              <CardContainer 
                key={arena.id}
                containerClassName={`w-full transition-all duration-300 ${
                  isSiblingDimmed ? 'opacity-40 blur-[0.5px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
                onHoverChange={(hovered) => {
                  setHoveredCardId(hovered ? arena.id : null);
                  if (hovered) sound.playHover();
                }}
                className="w-full h-full"
              >
                <div
                  onClick={() => handleSelectArena(arena.id)}
                  className={`relative group p-5 sm:p-6 lg:p-7 rounded-3xl bg-[#09090e] cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between select-none min-h-[500px] sm:min-h-[580px] w-full border ${
                    isSelected
                      ? 'border-[#E32124] shadow-[0_0_35px_rgba(227,33,36,0.35)] ring-1 ring-[#E32124]/50'
                      : 'border-white/[0.08] hover:border-[#E32124]/70 hover:shadow-[0_0_30px_rgba(227,33,36,0.25)] shadow-xl'
                  }`}
                >
                  {/* Top glowing neon edge strip */}
                  <div className={`absolute top-0 left-8 right-8 h-[2px] transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-transparent via-[#E32124] to-transparent opacity-100'
                      : 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#E32124] to-transparent'
                  }`} />

                  <div className="relative z-20 flex-1 flex flex-col">
                    
                    {/* Category Badge & Rating Row */}
                    <CardItem translateZ={20} className="flex items-center justify-between gap-1.5 mb-4 w-full">
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
                            <Cpu className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span>НЕФТЯНИКИ</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>ОКТЯБРЬ</span>
                          </>
                        )}
                      </span>

                      <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{arena.rating.toFixed(1)}</span>
                      </div>
                    </CardItem>

                    {/* Club Title */}
                    <CardItem translateZ={30} className="w-full">
                      <h3 className="font-display font-black text-xl lg:text-2xl text-white tracking-tight group-hover:text-[#E32124] transition-colors uppercase">
                        {arena.name.split('//')[0].trim()}
                      </h3>
                    </CardItem>

                    {/* Address */}
                    <CardItem translateZ={20} className="w-full">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 mb-5 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                        <span className="truncate">{arena.address}</span>
                      </div>
                    </CardItem>

                    {/* Tall High-Res Photo Container with 3D Depth */}
                    <CardItem translateZ={40} className="w-full">
                      <div className="relative h-56 lg:h-60 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 group-hover:border-[#E32124]/50 transition-all shadow-lg bg-black">
                        <img
                          src={arena.image}
                          alt={arena.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-transparent pointer-events-none" />

                        {/* Badges on image */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          <span className="px-2.5 py-1 rounded-lg bg-[#000000]/85 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white">
                            {arena.rigsCount} ПК
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#E32124] text-[10px] font-mono font-bold text-white shadow-md shadow-red-600/40">
                            {arena.ps5RoomsCount} PS5
                          </span>
                        </div>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl flex items-center justify-between text-xs font-mono bg-black/80 backdrop-blur-sm px-3 py-1.5 border border-white/10 z-10">
                          <span className="text-zinc-200 truncate font-medium">
                            {isFlagship ? '2 Premium + 2 Автосима' : isEvropa ? 'Solo Ryzen 7800X3D' : 'Solo & Trio Rooms'}
                          </span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>24/7</span>
                          </span>
                        </div>
                      </div>
                    </CardItem>

                    {/* Specs & Hardware Chips */}
                    <CardItem translateZ={25} className="space-y-2 mb-6 mt-auto w-full">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                        <Gauge className="w-4 h-4 text-[#E32124] shrink-0" />
                        <span className="truncate">
                          {isFlagship ? 'BenQ 600Hz & ASUS 480Hz' : isEvropa ? 'BenQ 600Hz + Ryzen 7800X3D' : 'BenQ 600Hz Extreme Speed'}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-300">
                        <Gamepad2 className="w-4 h-4 text-[#E32124] shrink-0" />
                        <span className="truncate">
                          {isFlagship ? 'RTX 5070 Ti / 3060 Ti' : isEvropa ? 'RTX 5070 Ti DLSS 3.5' : 'RTX 5070 Ti & i5-14600KF'}
                        </span>
                      </div>
                    </CardItem>

                  </div>

                  {/* Bottom Row: Price & Action Button */}
                  <CardItem translateZ={35} className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 relative z-20 font-mono mt-auto w-full">
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
                        handleSelectArena(arena.id);
                      }}
                      className={`px-4 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E32124] text-white shadow-red-600/40'
                          : 'bg-white/10 text-white group-hover:bg-[#E32124] group-hover:text-white'
                      }`}
                    >
                      <span>Обзор</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </CardItem>

                </div>
              </CardContainer>
            );
          })}
        </div>

        {/* Selected Arena Deep Dive Details & Walkthrough Section with Smooth Re-mount Animation */}
        <div id="arena-deep-dive" className="scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl border border-white/[0.12] overflow-hidden shadow-2xl relative bg-[#09090f]/95"
            >
              {/* Top red laser neon strip */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Column: Interactive Auto-Sliding Photo Gallery */}
                <div 
                  className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-black flex flex-col justify-between"
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
                        transition={{ duration: 0.5, ease: 'easeOut' }}
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

                    {/* Exclusive Features Banner */}
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
                        <Flame className="w-5 h-5 text-[#E32124] shrink-0" />
                        <div className="text-xs text-zinc-300">
                          <span className="font-bold text-white">Фишка Октябрь на Серова:</span> Двухуровневый клуб, Solo и Trio комнаты с мониторами <span className="text-[#E32124] font-bold">BenQ 600Hz</span> и VIP лаунж PS5.
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Direct Action Button (Original Clean Layout) */}
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
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
