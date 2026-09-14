import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Crown,
  Flame,
  Tv,
  Gamepad2,
  Gauge,
  Clock,
  Moon,
  Sun,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import { ARENAS } from '../data/arenaData';
import { DEFAULT_PRICING, PricingContent, TimeFilter } from '../data/pricingData';
import { sound } from '../utils/sound';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

export const PriceSection: React.FC<{
  onOpenBooking: (arenaId?: string, zoneId?: string) => void;
  /** Прайс из контента владельца (дефолт — DEFAULT_PRICING) */
  pricing?: PricingContent;
}> = ({ onOpenBooking, pricing }) => {
  const [selectedArenaId, setSelectedArenaId] = useState('cyberx-arena');
  const [activeTab, setActiveTab] = useState<'pc' | 'lounge'>('pc');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const { lenina: leninaPC, other: otherPC, lounge } = pricing || DEFAULT_PRICING;

  const rowIcon = (k: TimeFilter | undefined) => {
    switch (k) {
      case 'morning': return <Sun size={13} className="text-cyberx-muted" />;
      case '1h': return <Clock size={13} className="text-cyberx-muted" />;
      case '3h': return <Zap size={13} className="text-cyberx-muted" />;
      case '5h': return <Flame size={13} className="text-cyberx-muted" />;
      case 'night': return <Moon size={13} className="text-cyberx-muted" />;
      default: return <Clock size={13} className="text-cyberx-muted" />;
    }
  };

  const pcCategories = selectedArenaId === 'cyberx-arena' ? leninaPC : otherPC;
  const categories = activeTab === 'pc' ? pcCategories : lounge;

  const filters: { id: TimeFilter; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'morning', label: 'Утро' },
    { id: '1h', label: '1 час' },
    { id: '3h', label: '3 часа' },
    { id: '5h', label: '5 часов' },
    { id: 'night', label: 'Ночь' },
  ];

  return (
    <section id="pricing" className="relative scroll-mt-24 select-none">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="06"
          label="Прайс-лист"
          title="Честные тарифы без скрытых доплат"
          lead="Выбери клуб и категорию. Утренние окна дешевле, ночные сеты — для тех, кто играет в свои часы. Все цены фиксированные, оплата любым удобным способом."
        />

        {/* Переключатель клубов */}
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
                  <span className="ml-2.5 text-[11px] font-mono text-cyberx-faint">
                    {arena.address}
                  </span>
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

        {/* Подкатегории + фильтр времени */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex self-start rounded-full border border-white/[0.1] p-1">
            {(
              [
                { id: 'pc', label: `ПК-зоны · ${pcCategories.length}` },
                { id: 'lounge', label: `Lounge и симы · ${lounge.length}` },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(t.id);
                }}
                className={`rounded-full px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === t.id
                    ? 'bg-cyberx-red text-white'
                    : 'text-cyberx-muted hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => {
              const active = timeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.playClick();
                    setTimeFilter(active && f.id !== 'all' ? 'all' : f.id);
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-mono tracking-wider whitespace-nowrap border transition-all duration-300 ${
                    active
                      ? 'border-white/40 bg-white/10 text-white'
                      : 'border-white/[0.07] text-cyberx-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Сетка тарифов */}
        <motion.div
          key={`${selectedArenaId}-${activeTab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {categories.map((cat) => {
            const displayBadge =
              cat.id === 'sim-racing' && selectedArenaId !== 'cyberx-arena'
                ? 'CyberX Arena (Ленина, 19)'
                : cat.badge;
            return (
            <div
              key={cat.id}
              className={`top-line group flex flex-col rounded-2xl border p-5 sm:p-6 bg-cyberx-surface transition-colors duration-300 ${
                cat.highlight ? 'border-white/[0.16]' : 'border-white/[0.08]'
              }`}
            >
              {/* Шапка тарифа */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                    <CategoryIcon id={cat.id} highlight={!!cat.highlight} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display font-extrabold uppercase text-lg tracking-tight text-white">
                        {cat.title}
                      </h3>
                      {displayBadge && (
                        <span
                          className={`text-[9px] font-mono uppercase tracking-[0.16em] ${
                            cat.highlight ? 'text-cyberx-red' : 'text-cyberx-faint'
                          }`}
                        >
                          {displayBadge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] font-mono text-cyberx-muted truncate">{cat.specs}</p>
                  </div>
                </div>
              </div>

              {/* Таблица */}
              <div className="mt-5">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-cyberx-faint">
                  <div className="col-span-6">Тариф / время</div>
                  <div className="col-span-3 text-right">Пн–Чт</div>
                  <div className="col-span-3 text-right text-white/70">Пт–Вс</div>
                </div>

                <div className="mt-1 space-y-0.5">
                  {cat.rows.map((row, idx) => {
                    const matches = timeFilter === 'all' || row.filterKey === timeFilter;
                    const highlighted = timeFilter !== 'all' && matches;
                    return (
                      <div
                        key={idx}
                        className={`grid grid-cols-12 gap-2 items-center px-3 py-2.5 min-h-[42px] rounded-lg text-[11px] sm:text-xs font-mono transition-all duration-200 border-l-2 ${
                          highlighted
                            ? 'bg-cyberx-red/[0.08] border-cyberx-red'
                            : 'border-transparent hover:bg-white/[0.04]'
                        } ${matches ? '' : 'opacity-35'}`}
                      >
                        <div className="col-span-6 flex items-center gap-2 min-w-0">
                          {rowIcon(row.filterKey)}
                          <div className="min-w-0">
                            <div className={`truncate ${highlighted ? 'text-white font-semibold' : 'text-white/85'}`}>
                              {row.period}
                            </div>
                            {row.subtext && (
                              <div className="text-[9px] text-cyberx-faint truncate">{row.subtext}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3 text-right tabular-nums text-white/80">{row.weekday}</div>
                        <div className="col-span-3 text-right tabular-nums font-semibold text-cyberx-red">
                          {row.weekend}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenBooking(selectedArenaId, cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`mt-5 w-full py-2.5 rounded-xl eyebrow font-semibold border transition-all duration-300 ${
                  cat.highlight
                    ? 'border-cyberx-red/60 text-white hover:bg-cyberx-red hover:border-cyberx-red'
                    : 'border-white/[0.12] text-white/85 hover:border-cyberx-red hover:text-cyberx-red'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  Забронировать
                  <ChevronRight size={13} />
                </span>
              </button>
            </div>
            );
          })}
        </motion.div>

        {/* Примечание */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex items-start gap-3 max-w-4xl mx-auto p-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] text-xs font-mono text-cyberx-muted">
            <CheckCircle2 size={15} className="text-cyberx-red shrink-0 mt-0.5" />
            <p>
              <span className="text-white/85 font-semibold">Выходные дни:</span> с 22:00 пятницы (или
              предпраздничного дня) до 22:00 воскресенья (или предпраздничного дня). Оплата услуг
              осуществляется по действующим тарифам клуба.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* Иконка категории прайса (данные сериализуемы — иконка вынесена из данных) */
const CategoryIcon: React.FC<{ id: string; highlight?: boolean }> = ({ id, highlight }) => {
  const cls = highlight ? 'text-cyberx-red' : 'text-cyberx-muted';
  switch (id) {
    case 'standard-plus': return <Zap size={18} className={cls} />;
    case 'vip': case 'vip-other': return <Crown size={18} className={cls} />;
    case 'super-vip': case 'solo-600hz-other': return <Flame size={18} className={cls} />;
    case 'solo': case 'duo-other': return <ShieldCheck size={18} className={cls} />;
    case 'bootcamp-other': return <Users size={18} className={cls} />;
    case 'sim-racing': return <Gauge size={18} className={cls} />;
    case 'tv-lounge': return <Tv size={18} className={cls} />;
    case 'premium-lounge': return <Gamepad2 size={18} className={cls} />;
    case 'tv-pro-services': return <Coffee size={18} className={cls} />;
    default: return <Monitor size={18} className={cls} />;
  }
};
