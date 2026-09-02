import React, { useState } from 'react';
import { ARENAS } from '../data/arenaData';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Bus, 
  Clock, 
  PhoneCall, 
  Send, 
  ExternalLink,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationMapSectionProps {
  onOpenBooking: (arenaId: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onOpenBooking }) => {
  const [selectedArenaId, setSelectedArenaId] = useState<string>(ARENAS[0].id);

  const activeArena = ARENAS.find((a) => a.id === selectedArenaId) || ARENAS[0];

  const arenaLocationDetails: Record<string, {
    gisUrl: string;
    landmark: string;
    publicTransport: string[];
    parking: string;
    entranceHint: string;
    mapQuery: string;
  }> = {
    'cyberx-arena': {
      gisUrl: 'https://2gis.ru/omsk/search/CyberX%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2019',
      landmark: 'Исторический центр, напротив Драматического театра и сквера им. Дзержинского',
      publicTransport: [
        'Ост. «Драмтеатр» — 2 мин пешком (автобусы, троллейбусы)',
        'Ост. «КДЦ Маяковский» / «Соборная площадь» — 5 мин пешком',
        'Ост. «Краеведческий музей» — 4 мин пешком'
      ],
      parking: 'Бесплатная парковка вдоль ул. Ленина и со стороны двора',
      entranceHint: 'Главный вход со стороны ул. Ленина, яркая красная вывеска CyberX Arena',
      mapQuery: 'Омск, ул. Ленина, 19',
    },
    'cyberx-evropa': {
      gisUrl: 'https://2gis.ru/omsk/search/CyberX%20%D0%9C%D0%B8%D1%80%D0%B0%2042%D0%BA1',
      landmark: 'Нефтяники, студенческий кластер возле ОмГТУ (Политех)',
      publicTransport: [
        'Ост. «Технический университет (Политех)» — 3 мин пешком',
        'Ост. «ДК им. Малунцева» — 6 мин пешком',
        'Ост. «Кристалл» — 7 мин пешком'
      ],
      parking: 'Просторная бесплатная парковка перед зданием',
      entranceHint: 'Вход со стороны проспекта Мира, вывеска CyberX Community',
      mapQuery: 'Омск, просп. Мира, 42к1',
    },
    'cyberx-oktyabr': {
      gisUrl: 'https://2gis.ru/omsk/search/CyberX%20%D0%A1%D0%B5%D1%80%D0%BE%D0%B2%D0%B0%2019%D0%90',
      landmark: 'Ленинский округ, район Ленинского рынка и киноцентра «Галактика»',
      publicTransport: [
        'Ост. «Улица Серова» — 2 мин пешком',
        'Ост. «Ленинский рынок» / «Площадь Серова» — 4 мин пешком',
        'Ост. «Ж/д вокзал» — 10 мин пешком'
      ],
      parking: 'Удобная парковочная зона прямо перед входом',
      entranceHint: 'Отдельный вход с ул. Серова, вывеска CyberX с подсветкой',
      mapQuery: 'Омск, ул. Серова, 19А',
    },
  };

  const details = arenaLocationDetails[activeArena.id] || arenaLocationDetails['cyberx-arena'];

  const open2Gis = () => {
    sound.playClick();
    window.open(details.gisUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="relative py-24 sm:py-32 bg-[#020204] overflow-hidden border-t border-white/[0.08]">
      
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E32124]/[0.035] rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Compass className="w-3.5 h-3.5" />
            Навигация и адреса в Омске
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            КАК ДО НАС <span className="text-[#E32124]">//</span> ДОБРАТЬСЯ?
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Выберите интересующий клуб CyberX в Омске, постройте удобный пеший или автомобильный маршрут в 2ГИС или свяжитесь с администратором.
          </p>
        </motion.div>

        {/* Interactive Arena Switcher Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
        >
          {ARENAS.map((arena) => {
            const isSelected = arena.id === selectedArenaId;
            return (
              <button
                key={arena.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedArenaId(arena.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border backdrop-blur-xl relative ${
                  isSelected
                    ? 'bg-[#151522] border-[#E32124] shadow-xl shadow-red-950/40 translate-y-[-2px]'
                    : 'bg-[#0a0a0f]/80 hover:bg-[#101018] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Active Indicator Top Glow */}
                {isSelected && (
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#E32124]">
                    {arena.id === 'cyberx-arena' ? 'Флагман • Центр' : arena.id === 'cyberx-evropa' ? 'Нефтяники' : 'Ленинский р-н'}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>24/7</span>
                  </div>
                </div>

                <div className="font-display font-black text-base sm:text-lg text-white">
                  {arena.name.split('//')[0].trim()}
                </div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
                  <span>{arena.address}</span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Main Map & Route Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArena.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl border border-white/[0.1] overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Route & Navigation Info */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  
                  {/* Top Arena Info */}
                  <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#E32124] uppercase block mb-1">
                        Выбранный клуб
                      </span>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                        {activeArena.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#E32124] shrink-0" />
                        <span>{activeArena.address}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Открыто 24/7
                      </span>
                    </div>
                  </div>

                  {/* Landmarks and Directions Breakdown */}
                  <div className="space-y-4 pt-6">
                    
                    {/* Landmark */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                      <Compass className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ориентир</div>
                        <div className="text-xs text-zinc-300 mt-0.5">{details.landmark}</div>
                      </div>
                    </div>

                    {/* Public Transit */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                      <Bus className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Общественный транспорт</div>
                        {details.publicTransport.map((stop, i) => (
                          <div key={i} className="text-xs text-zinc-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#E32124]" />
                            <span>{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Parking & Entrance */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                      <Car className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Парковка и вход</div>
                        <div className="text-xs text-zinc-300 mt-0.5">{details.parking}</div>
                        <div className="text-[11px] text-[#E32124] mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{details.entranceHint}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Direct Action Buttons */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  
                  {/* Primary 2GIS Route Button */}
                  <button
                    onClick={open2Gis}
                    className="flex-1 py-4 px-6 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#20C05C] via-[#1AA64F] to-[#14803C] hover:from-[#26D969] hover:to-[#20C05C] shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Открыть маршрут в 2ГИС</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  {/* Quick Booking Button */}
                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenBooking(activeArena.id);
                    }}
                    className="py-4 px-5 rounded-xl bg-[#E32124] hover:bg-[#FF2A2E] text-xs font-display font-black uppercase text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                  >
                    <span>Забронировать</span>
                  </button>

                  {/* Phone Call */}
                  <a
                    href={`tel:${activeArena.phone}`}
                    className="py-4 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono font-semibold text-white transition-all flex items-center justify-center gap-1.5"
                    title="Позвонить"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/${activeArena.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-4 px-4 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 transition-all flex items-center justify-center"
                    title="Написать в Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>

                </div>

              </div>

              {/* Right Interactive 2GIS Visual Interactive Card */}
              <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full bg-[#07070b] overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.08] group">
                
                {/* Photo of the club facade/interior */}
                <img
                  src={activeArena.image}
                  alt={activeArena.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                
                {/* Dark cyber overlay with grid lines */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/60 to-transparent" />

                {/* Stylized Cyber Map HUD Pin Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  
                  {/* Pulsing Radar Pin */}
                  <div className="relative mb-4 cursor-pointer" onClick={open2Gis}>
                    <div className="w-16 h-16 rounded-full bg-[#E32124]/20 border border-[#E32124] animate-ping absolute inset-0" />
                    <div className="w-16 h-16 rounded-full bg-[#E32124] flex items-center justify-center shadow-xl shadow-red-600/60 relative z-10 hover:scale-110 transition-transform">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="bg-[#000000]/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 max-w-sm shadow-2xl">
                    <div className="text-xs font-mono font-bold text-[#E32124] uppercase">
                      2ГИС Омск
                    </div>
                    <div className="text-sm font-display font-black text-white mt-0.5">
                      {activeArena.name.split('//')[0].trim()}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {activeArena.address}
                    </div>

                    <button
                      onClick={open2Gis}
                      className="mt-3 w-full py-2 px-4 rounded-xl bg-[#20C05C] hover:bg-[#26D969] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <span>Перейти в карточку 2ГИС →</span>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    <span>Координаты:</span>
                    <span className="text-white">{activeArena.coordinates.x.toFixed(4)}, {activeArena.coordinates.y.toFixed(4)}</span>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
