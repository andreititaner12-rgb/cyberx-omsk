import React, { useState } from 'react';
import { ARENAS } from '../data/arenaData';
import {
  MapPin,
  Compass,
  Bus,
  Car,
  PhoneCall,
  Send,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { Dynamic2GisMap } from './Dynamic2GisMap';

interface LocationMapSectionProps {
  onOpenBooking: (arenaId: string) => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onOpenBooking }) => {
  const [selectedArenaId, setSelectedArenaId] = useState(ARENAS[1].id);
  const active = ARENAS.find((a) => a.id === selectedArenaId) || ARENAS[1];

  const details: Record<string, { gisUrl: string; landmark: string; transport: string[]; parking: string; entrance: string }> = {
    'cyberx-arena': {
      gisUrl: 'https://2gis.ru/omsk/search/CyberX%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2019',
      landmark: 'Исторический центр, напротив Драматического театра и сквера им. Дзержинского.',
      transport: [
        'Ост. «Драмтеатр» — 2 мин пешком (автобусы, троллейбусы)',
        'Ост. «КДЦ Маяковский» / «Соборная площадь» — 5 мин пешком',
        'Ост. «Краеведческий музей» — 4 мин пешком',
      ],
      parking: 'Бесплатная парковка вдоль ул. Ленина и со стороны двора.',
      entrance: 'Главный вход со стороны ул. Ленина, яркая красная вывеска CyberX Arena.',
    },
    'cyberx-evropa': {
      gisUrl: 'https://2gis.ru/omsk/firm/70000001105204416',
      landmark: 'Нефтяники, студенческий кластер возле ОмГТУ (Политех).',
      transport: [
        'Ост. «Технический университет (Политех)» — 3 мин пешком',
        'Ост. «ДК им. Малунцева» — 6 мин пешком',
        'Ост. «Кристалл» — 7 мин пешком',
      ],
      parking: 'Просторная бесплатная парковка перед зданием.',
      entrance: 'Вход со стороны проспекта Мира, вывеска CyberX Community.',
    },
    'cyberx-oktyabr': {
      gisUrl: 'https://2gis.ru/omsk/firm/70000001102629279',
      landmark: 'Ленинский округ, район Ленинского рынка и киноцентра «Галактика».',
      transport: [
        'Ост. «Улица Серова» — 2 мин пешком',
        'Ост. «Ленинский рынок» / «Площадь Серова» — 4 мин пешком',
        'Ост. «Ж/д вокзал» — 10 мин пешком',
      ],
      parking: 'Удобная парковочная зона прямо перед входом.',
      entrance: 'Отдельный вход с ул. Серова (ТК Октябрь, 1 этаж), вывеска CyberX с подсветкой.',
    },
  };

  const d = details[active.id] || details['cyberx-arena'];

  return (
    <section id="location" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="08"
          label="География"
          title="Как нас найти"
          lead="Три точки в Омске: центр, студгородок и Ленинский округ. Выбери клуб — камера карты плавно перелетит на его локацию, а маршрут откроется в 2ГИС в один клик."
        />

        {/* Выбор клуба */}
        <Reveal delay={0.06} className="mt-10 sm:mt-12">
          <div className="flex gap-6 sm:gap-8 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ARENAS.map((arena) => {
              const isActive = selectedArenaId === arena.id;
              return (
                <button
                  key={arena.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedArenaId(arena.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative whitespace-nowrap pb-4 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-cyberx-faint hover:text-white/70'
                  }`}
                >
                  <span className="font-display font-bold uppercase text-sm sm:text-base tracking-wide">
                    {arena.name.split('//')[0].trim()}
                  </span>
                  <span className="ml-2.5 text-[11px] font-mono text-cyberx-faint">{arena.address}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-cyberx-red origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Карта + информация */}
        <Reveal delay={0.12} className="mt-8">
          <div className="rounded-3xl overflow-hidden border border-white/[0.08] bg-cyberx-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Инфо */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow text-cyberx-red">{active.metro}</div>
                    <h3 className="mt-2 font-display font-black uppercase text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                      {active.name.split('//')[0].trim()}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm font-mono text-cyberx-muted">
                      <MapPin size={14} className="text-cyberx-red" />
                      {active.address}
                    </div>
                  </div>
                  <span className="eyebrow text-cyberx-muted shrink-0 hidden sm:block">24/7</span>
                </div>

                {/* Шаги: ориентир / транспорт / парковка */}
                <div className="mt-7 divide-y divide-white/[0.06] hairline-t hairline-b -mx-1 px-1">
                  <div className="py-4 flex items-start gap-4">
                    <Compass size={16} className="text-cyberx-red shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">Ориентир</div>
                      <div className="mt-1 text-[13px] text-white/80 leading-relaxed">{d.landmark}</div>
                    </div>
                  </div>

                  <div className="py-4 flex items-start gap-4">
                    <Bus size={16} className="text-cyberx-red shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">Транспорт</div>
                      <ul className="mt-1 space-y-1">
                        {d.transport.map((stop, i) => (
                          <li key={i} className="text-[13px] text-white/80 flex items-start gap-2">
                            <span className="mt-[8px] h-px w-3 bg-white/30 shrink-0" aria-hidden />
                            {stop}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="py-4 flex items-start gap-4">
                    <Car size={16} className="text-cyberx-red shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-cyberx-faint font-mono">Парковка и вход</div>
                      <div className="mt-1 text-[13px] text-white/80 leading-relaxed">{d.parking}</div>
                      <div className="mt-1 text-[12px] text-white/60 leading-relaxed">{d.entrance}</div>
                    </div>
                  </div>
                </div>

                {/* Действия */}
                <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href={d.gisUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white hover:border-emerald-400 hover:text-emerald-300 transition-all duration-300 py-3 eyebrow font-semibold"
                  >
                    Маршрут в 2ГИС
                  </a>
                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenBooking(active.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="flex-1 btn-primary !py-3"
                  >
                    Забронировать
                  </button>
                  <a
                    href={`tel:${active.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] text-white/80 hover:text-white hover:border-white/30 transition-all py-3 px-4"
                    title={active.phone}
                  >
                    <PhoneCall size={15} />
                  </a>
                  <a
                    href={`https://t.me/${active.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] text-white/80 hover:text-white hover:border-white/30 transition-all py-3 px-4"
                    title={active.telegram}
                  >
                    <Send size={15} />
                  </a>
                </div>
              </div>

              {/* Карта */}
              <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                <Dynamic2GisMap
                  selectedArenaId={selectedArenaId}
                  onSelectArena={setSelectedArenaId}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
