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
import { sound } from '../utils/sound';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

type TimeFilter = 'all' | 'morning' | '1h' | '3h' | '5h' | 'night';

interface PriceRow {
  period: string;
  subtext?: string;
  weekday: string;
  weekend: string;
  icon?: React.ReactNode;
  filterKey?: TimeFilter;
}

interface PriceCategory {
  id: string;
  title: string;
  badge?: string;
  highlight?: boolean;
  icon: React.ReactNode;
  specs: string;
  rows: PriceRow[];
}

export const PriceSection: React.FC<{ onOpenBooking: (arenaId?: string, zoneId?: string) => void }> = ({ onOpenBooking }) => {
  const [selectedArenaId, setSelectedArenaId] = useState('cyberx-arena');
  const [activeTab, setActiveTab] = useState<'pc' | 'lounge'>('pc');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

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

  // 1. CyberX Arena (ул. Ленина, 19) — Флагман
  const leninaPC: PriceCategory[] = [
    {
      id: 'standard',
      title: 'Standard',
      badge: 'Базовый',
      specs: 'RTX 3060 Ti · 240Hz · Dark Project KD87A',
      icon: <Monitor size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'standard-plus',
      title: 'Standard+',
      badge: 'Популярный',
      highlight: true,
      specs: 'RTX 4060 Ti · 280Hz · HyperX Cloud II',
      icon: <Zap size={18} className="text-cyberx-red" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '130 ₽', weekend: '150 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '170 ₽', weekend: '190 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '430 ₽', weekend: '490 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '700 ₽', weekend: '800 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'vip',
      title: 'VIP',
      badge: 'Pro киберспорт',
      specs: 'RTX 4070 Super · 360Hz · Logitech Superlight',
      icon: <Crown size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '160 ₽', weekend: '190 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '210 ₽', weekend: '240 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '540 ₽', weekend: '630 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '850 ₽', weekend: '980 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'super-vip',
      title: 'Super VIP',
      badge: 'Флагман',
      specs: 'Ryzen 7800X3D · RTX 4080 · BenQ 400Hz',
      icon: <Flame size={18} className="text-cyberx-red" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '220 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '270 ₽', weekend: '300 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 300 ₽', weekend: '1 400 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'solo',
      title: 'Solo Room',
      badge: 'Приватная комната',
      specs: '1 игрок · звукоизоляция · full top gear',
      icon: <ShieldCheck size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '250 ₽', weekend: '270 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '300 ₽', weekend: '330 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 200 ₽', weekend: '1 400 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 500 ₽', weekend: '2 000 ₽', filterKey: 'night' },
      ],
    },
  ];

  // 2. Европа & Октябрь
  const otherPC: PriceCategory[] = [
    {
      id: 'standard-other',
      title: 'Standard',
      badge: 'Базовый',
      specs: 'RTX 3060 / 4060 · 240Hz · механика Dark Project',
      icon: <Monitor size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'bootcamp-other',
      title: 'Bootcamp 5v5',
      badge: 'Командный',
      highlight: true,
      specs: 'Изолированная комната 5 ПК · 280Hz · HyperX',
      icon: <Users size={18} className="text-cyberx-red" />,
      rows: [
        { period: 'Утро (1 ПК)', subtext: '08:00 – 14:00', weekday: '140 ₽', weekend: '160 ₽', filterKey: 'morning' },
        { period: '1 час (1 ПК)', subtext: 'обычный тариф', weekday: '180 ₽', weekend: '210 ₽', filterKey: '1h' },
        { period: '3 часа (1 ПК)', subtext: '08:00 – 19:00', weekday: '460 ₽', weekend: '530 ₽', filterKey: '3h' },
        { period: '5 часов (1 ПК)', subtext: 'дневной сет', weekday: '750 ₽', weekend: '850 ₽', filterKey: '5h' },
        { period: 'Ночь (1 ПК)', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '1 050 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'vip-other',
      title: 'VIP Room',
      badge: 'Pro киберспорт',
      specs: 'RTX 4070 Ti · 360Hz · Zowie · Dark Project',
      icon: <Crown size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '170 ₽', weekend: '200 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '220 ₽', weekend: '250 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '580 ₽', weekend: '660 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '900 ₽', weekend: '1 050 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 100 ₽', weekend: '1 250 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'solo-600hz-other',
      title: 'Solo Room 600Hz',
      badge: 'Топ флагман',
      specs: 'Ryzen 7 7800X3D · BenQ 600Hz · звукоизоляция',
      icon: <Flame size={18} className="text-cyberx-red" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '220 ₽', weekend: '240 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '280 ₽', weekend: '310 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '720 ₽', weekend: '800 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 100 ₽', weekend: '1 250 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 400 ₽', weekend: '1 600 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'duo-other',
      title: 'Duo Room',
      badge: 'Парный зал',
      specs: '2 игрока · RTX 4070 · 280Hz · приватный комфорт',
      icon: <ShieldCheck size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 ПК)', subtext: '08:00 – 14:00', weekday: '150 ₽', weekend: '170 ₽', filterKey: 'morning' },
        { period: '1 час (1 ПК)', subtext: 'обычный тариф', weekday: '190 ₽', weekend: '220 ₽', filterKey: '1h' },
        { period: '3 часа (1 ПК)', subtext: '08:00 – 19:00', weekday: '500 ₽', weekend: '570 ₽', filterKey: '3h' },
        { period: '5 часов (1 ПК)', subtext: 'дневной сет', weekday: '800 ₽', weekend: '900 ₽', filterKey: '5h' },
        { period: 'Ночь (1 ПК)', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 150 ₽', filterKey: 'night' },
      ],
    },
  ];

  // 3. Lounge & Consoles
  const lounge: PriceCategory[] = [
    {
      id: 'sim-racing',
      title: 'Автосимуляторы',
      badge: selectedArenaId === 'cyberx-arena' ? 'Sim-Racing · 2 кокпита' : 'CyberX Arena (Ленина, 19)',
      highlight: true,
      specs: 'Moza R9 Direct Drive · педали Load Cell · ковш',
      icon: <Gauge size={18} className="text-cyberx-red" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '400 ₽', weekend: '500 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '600 ₽', weekend: '700 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 350 ₽', weekend: '1 500 ₽', filterKey: '5h' },
        { period: 'Ночной сет', subtext: '22:00 – 08:00', weekday: '2 000 ₽', weekend: '2 500 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'tv-lounge',
      title: 'Аренда TV (PS5)',
      badge: 'PlayStation 5',
      specs: '4K OLED 65" · DualSense · топ библиотека игр',
      icon: <Tv size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '300 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '350 ₽', weekend: '350 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'premium-lounge',
      title: 'Premium Lounge',
      badge: 'До 14 человек',
      specs: 'Приватная зона отдыха для больших компаний',
      icon: <Gamepad2 size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '1 500 ₽', weekend: '1 500 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '2 000 ₽', weekend: '2 000 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '5 000 ₽', weekend: '5 000 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '7 000 ₽', weekend: '7 000 ₽', filterKey: '5h' },
        { period: 'Ночной сет', subtext: '22:00 – 08:00', weekday: '8 000 ₽', weekend: '8 000 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'tv-pro-services',
      title: 'TV Pro и услуги',
      badge: 'Доп. опции',
      specs: 'Большой экран, геймпады и паровые коктейли',
      icon: <Coffee size={18} className="text-cyberx-muted" />,
      rows: [
        { period: 'TV Pro (1 час)', subtext: 'увеличенный экран', weekday: '450 ₽', weekend: '450 ₽', filterKey: '1h' },
        { period: 'TV Pro (3 часа)', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: '3h' },
        { period: 'Доп. игрок TV', subtext: 'за 1 час', weekday: '200 ₽', weekend: '200 ₽', filterKey: '1h' },
        { period: 'Доплата за геймпад', subtext: '1–2 DualSense', weekday: '200 ₽', weekend: '350 ₽', filterKey: '1h' },
        { period: 'Паровой коктейль', subtext: 'lounge hookah', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: 'night' },
      ],
    },
  ];

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
          {categories.map((cat) => (
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
                    {cat.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display font-extrabold uppercase text-lg tracking-tight text-white">
                        {cat.title}
                      </h3>
                      {cat.badge && (
                        <span
                          className={`text-[9px] font-mono uppercase tracking-[0.16em] ${
                            cat.highlight ? 'text-cyberx-red' : 'text-cyberx-faint'
                          }`}
                        >
                          {cat.badge}
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
          ))}
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
