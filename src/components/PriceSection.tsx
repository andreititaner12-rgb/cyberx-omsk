import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Crown, 
  Flame, 
  Tv, 
  Sparkles, 
  Gamepad2, 
  Gauge, 
  Clock, 
  Moon, 
  Sun, 
  Coffee,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ARENAS } from '../data/arenaData';
import { sound } from '../utils/sound';

interface PriceRow {
  period: string;
  subtext?: string;
  weekday: string;
  weekend: string;
  icon?: React.ReactNode;
}

interface PriceCategory {
  id: string;
  title: string;
  badge?: string;
  highlight?: boolean;
  icon: React.ReactNode;
  specs: string;
  rows: PriceRow[];
  extraInfo?: string;
}

export const PriceSection: React.FC<{ onOpenBooking: (arenaId?: string, zoneId?: string) => void }> = ({ onOpenBooking }) => {
  const [selectedArenaId, setSelectedArenaId] = useState<string>('cyberx-arena');
  const [activeTab, setActiveTab] = useState<'pc' | 'lounge'>('pc');

  // Exact data from official CyberX Arena (ул. Ленина, 19) price sheets
  const arenaLeninaPCPrices: PriceCategory[] = [
    {
      id: 'standard',
      title: 'STANDARD',
      badge: 'БАЗОВЫЙ',
      specs: 'RTX 3060 Ti • 240Hz • Dark Project KD87A',
      icon: <Monitor className="w-5 h-5 text-zinc-300 group-hover:text-[#E32124] transition-colors" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'standard-plus',
      title: 'STANDARD+',
      badge: 'ПОПУЛЯРНЫЙ',
      highlight: true,
      specs: 'RTX 4060 Ti • 280Hz • HyperX Cloud II',
      icon: <Sparkles className="w-5 h-5 text-[#E32124] group-hover:scale-110 transition-transform" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '130 ₽', weekend: '150 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '170 ₽', weekend: '190 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '430 ₽', weekend: '490 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '700 ₽', weekend: '800 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'vip',
      title: 'VIP',
      badge: 'PRO КИБЕРСПОРТ',
      specs: 'RTX 4070 SUPER • 360Hz • Logitech Superlight',
      icon: <Crown className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '160 ₽', weekend: '190 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '210 ₽', weekend: '240 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '540 ₽', weekend: '630 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '850 ₽', weekend: '980 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'super-vip',
      title: 'SUPER VIP',
      badge: 'ФЛАГМАН',
      specs: 'Ryzen 7800X3D • RTX 4080 • BenQ 400Hz',
      icon: <Flame className="w-5 h-5 text-[#E32124] group-hover:animate-pulse" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '220 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '270 ₽', weekend: '300 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 300 ₽', weekend: '1 400 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'solo',
      title: 'SOLO ROOM',
      badge: 'ПРИВАТНАЯ КОМНАТА',
      specs: '1 Игрок • Закрытая звукоизоляция • Full Top Gear',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '250 ₽', weekend: '270 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '300 ₽', weekend: '330 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '800 ₽', weekend: '900 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 400 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 500 ₽', weekend: '2 000 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    }
  ];

  const arenaLeninaLoungePrices: PriceCategory[] = [
    {
      id: 'sim-racing',
      title: 'АВТОСИМУЛЯТОРЫ',
      badge: 'SIM-RACING 2 КОКПИТА',
      highlight: true,
      specs: 'Moza R9 Direct Drive • Квартет педалей • Спортивный ковш',
      icon: <Gauge className="w-5 h-5 text-[#E32124] group-hover:rotate-45 transition-transform" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '400 ₽', weekend: '500 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '600 ₽', weekend: '700 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 100 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 350 ₽', weekend: '1 500 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
      ]
    },
    {
      id: 'tv-lounge',
      title: 'АРЕНДА TV (PS5)',
      badge: 'PLAYSTATION 5',
      specs: '4K OLED 65" • DualSense • Топ библиотека игр',
      icon: <Tv className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '300 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '350 ₽', weekend: '350 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '900 ₽', weekend: '900 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 200 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 000 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'premium-lounge',
      title: 'PREMIUM LOUNGE',
      badge: 'ДО 14 ЧЕЛОВЕК',
      specs: 'Приватная зона отдыха для больших компаний и праздников',
      icon: <Gamepad2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00 (+1 чел: 200 ₽)', weekday: '1 500 ₽', weekend: '1 500 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный (+1 чел: 300 ₽)', weekday: '2 000 ₽', weekend: '2 000 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00 (+1 чел: 600 ₽)', weekday: '5 000 ₽', weekend: '5 000 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной (+1 чел: 750 ₽)', weekday: '7 000 ₽', weekend: '7 000 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
      ]
    },
    {
      id: 'tv-pro-services',
      title: 'TV PRO & УСЛУГИ',
      badge: 'ДОП. ОПЦИИ',
      specs: 'Геймпады, дополнительные игроки и паровые коктейли',
      icon: <Coffee className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />,
      rows: [
        { period: 'TV PRO (1 ЧАС)', subtext: 'Увеличенный экран', weekday: '450 ₽', weekend: '450 ₽', icon: <Tv className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'TV PRO (3 ЧАСА)', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 000 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Доп. игрок TV', subtext: 'За 1 час', weekday: '200 ₽', weekend: '200 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Доплата за 1 геймпад', subtext: 'За 1 час', weekday: '200 ₽', weekend: '200 ₽', icon: <Gamepad2 className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Доплата за 2 геймпада', subtext: 'За 1 час', weekday: '350 ₽', weekend: '350 ₽', icon: <Gamepad2 className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Паровой коктейль', subtext: 'Lounge Hookah', weekday: '1 200 ₽', weekend: '1 200 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
      ]
    }
  ];

  // Placeholder pricing for Evropa & Oktyabr
  const arenaOtherPCPrices: PriceCategory[] = [
    {
      id: 'standard-other',
      title: 'STANDARD',
      badge: 'БАЗОВЫЙ',
      specs: 'RTX 3060 / 4060 • 240Hz • Механика',
      icon: <Monitor className="w-5 h-5 text-zinc-300 group-hover:text-[#E32124] transition-colors" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'bootcamp-other',
      title: 'BOOTCAMP (5v5)',
      badge: 'КОМАНДНЫЙ',
      highlight: true,
      specs: 'Изолированная комната 5 ПК • 280Hz • HyperX',
      icon: <Crown className="w-5 h-5 text-[#E32124] group-hover:scale-110 transition-transform" />,
      rows: [
        { period: 'УТРО (за 1 ПК)', subtext: '08:00 – 14:00', weekday: '140 ₽', weekend: '160 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС (за 1 ПК)', subtext: 'Обычный тариф', weekday: '180 ₽', weekend: '210 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА (за 1 ПК)', subtext: '08:00 – 19:00', weekday: '460 ₽', weekend: '530 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ (за 1 ПК)', subtext: 'Дневной сет', weekday: '750 ₽', weekend: '850 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ (за 1 ПК)', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '1 050 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'vip-other',
      title: 'VIP ROOM',
      badge: 'PRO КИБЕРСПОРТ',
      specs: 'RTX 4070 Ti • 360Hz • ZOWIE • Solo / Duo',
      icon: <Sparkles className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '170 ₽', weekend: '200 ₽', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '220 ₽', weekend: '250 ₽', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '580 ₽', weekend: '660 ₽', icon: <Sparkles className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '900 ₽', weekend: '1 050 ₽', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 100 ₽', weekend: '1 250 ₽', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    }
  ];

  const currentPCCategories = selectedArenaId === 'cyberx-arena' ? arenaLeninaPCPrices : arenaOtherPCPrices;
  const currentLoungeCategories = selectedArenaId === 'cyberx-arena' ? arenaLeninaLoungePrices : arenaLeninaLoungePrices.slice(1);

  return (
    <section id="pricing" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 select-none">
      
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E32124]/[0.05] rounded-full blur-[140px]" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>ПРОЗРАЧНЫЕ ТАРИФЫ // 24/7 БРОНИРОВАНИЕ</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-white">
          ПРАЙС-<span className="text-[#E32124] drop-shadow-[0_0_20px_rgba(227,33,36,0.6)]">ЛИСТ</span> АРЕН
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base">
          Честные цены без скрытых доплат. Выбирай свой клуб в Омске и удобный игровой пакет.
        </p>
      </div>

      {/* 1. Arena Switcher Tabs (Европа, Ленина, Октябрь) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0B0B12] border border-white/10 shadow-2xl max-w-full overflow-x-auto">
          {ARENAS.map((arena) => {
            const isSelected = selectedArenaId === arena.id;
            return (
              <button
                key={arena.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedArenaId(arena.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#E32124] text-white shadow-[0_0_25px_rgba(227,33,36,0.7)] scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{arena.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-Category Tabs (ПК ЗОНЫ // LOUNGE & СИМУЛЯТОРЫ) */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('pc');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-white/10 text-white border border-white/20 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#E32124]" />
            <span>ПК ЗОНЫ ({currentPCCategories.length})</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('lounge');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'lounge'
                ? 'bg-white/10 text-white border border-white/20 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gauge className="w-4 h-4 text-[#E32124]" />
            <span>LOUNGE & СИМУЛЯТОРЫ ({currentLoungeCategories.length})</span>
          </button>
        </div>
      </div>

      {/* 3. Dynamic Price Grid Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedArenaId}-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(activeTab === 'pc' ? currentPCCategories : currentLoungeCategories).map((category) => (
            <div
              key={category.id}
              className={`group relative rounded-3xl bg-[#090910] p-6 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                category.highlight
                  ? 'border-[#E32124]/60 shadow-[0_0_35px_rgba(227,33,36,0.2)] bg-gradient-to-b from-[#120B0F] to-[#090910]'
                  : 'border-white/10 hover:border-[#E32124]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-[#E32124]/40 transition-colors">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-[#E32124] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-[240px]">
                        {category.specs}
                      </p>
                    </div>
                  </div>
                  {category.badge && (
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      category.highlight
                        ? 'bg-[#E32124] text-white shadow-[0_0_15px_rgba(227,33,36,0.6)]'
                        : 'bg-white/10 text-zinc-300 border border-white/10'
                    }`}>
                      {category.badge}
                    </span>
                  )}
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  <div className="col-span-6 flex items-center gap-1">ТАРИФ // ВРЕМЯ</div>
                  <div className="col-span-3 text-right">ПН-ЧТ</div>
                  <div className="col-span-3 text-right text-zinc-200 font-bold">ПТ-ВС</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-1.5 mb-6">
                  {category.rows.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-2 py-2 px-3 rounded-xl hover:bg-white/[0.04] transition-colors items-center text-xs font-mono"
                    >
                      <div className="col-span-6 flex items-center gap-2">
                        {row.icon}
                        <div>
                          <div className="text-white font-medium">{row.period}</div>
                          {row.subtext && <div className="text-[10px] text-zinc-500">{row.subtext}</div>}
                        </div>
                      </div>
                      <div className="col-span-3 text-right text-zinc-300 font-bold">
                        {row.weekday}
                      </div>
                      <div className="col-span-3 text-right text-[#E32124] font-bold drop-shadow-[0_0_8px_rgba(227,33,36,0.3)]">
                        {row.weekend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTA Button */}
              <div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenBooking(selectedArenaId, category.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    category.highlight
                      ? 'bg-[#E32124] hover:bg-[#FF2A2E] text-white shadow-[0_0_20px_rgba(227,33,36,0.6)] hover:scale-[1.02] active:scale-98'
                      : 'bg-white/10 hover:bg-white/20 text-white hover:text-white border border-white/10 hover:border-white/30'
                  }`}
                >
                  <span>ЗАБРОНИРОВАТЬ МЕСТО</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Important Weekend Policy Note */}
      <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start sm:items-center gap-3 max-w-4xl mx-auto text-xs font-mono text-zinc-400">
        <CheckCircle2 className="w-4 h-4 text-[#E32124] shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <span className="text-zinc-200 font-bold">* Выходные дни:</span> с 22:00 пятницы (или предпраздничного дня) до 22:00 воскресенья (или предпраздничного дня). Оплата услуг осуществляется по действующим тарифам клуба.
        </div>
      </div>

    </section>
  );
};
