import React, { useState, useRef } from 'react';
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
  Filter,
  Users,
  Zap
} from 'lucide-react';
import { ARENAS } from '../data/arenaData';
import { sound } from '../utils/sound';

interface PriceRow {
  period: string;
  subtext?: string;
  weekday: string;
  weekend: string;
  icon?: React.ReactNode;
  filterKey?: 'morning' | '1h' | '3h' | '5h' | 'night';
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

  // Spotlight and Focus state
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'morning' | '1h' | '3h' | '5h' | 'night'>('all');

  // Throttled sound ref
  const lastSoundTimeRef = useRef<number>(0);

  const playThrottledHover = () => {
    const now = performance.now();
    if (now - lastSoundTimeRef.current > 200) {
      lastSoundTimeRef.current = now;
      sound.playHover();
    }
  };

  // 1. CyberX Arena (ул. Ленина, 19) — Флагман
  const arenaLeninaPCPrices: PriceCategory[] = [
    {
      id: 'standard',
      title: 'STANDARD',
      badge: 'БАЗОВЫЙ',
      specs: 'RTX 3060 Ti • 240Hz • Dark Project KD87A',
      icon: <Monitor className="w-5 h-5 text-zinc-300" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'standard-plus',
      title: 'STANDARD+',
      badge: 'ПОПУЛЯРНЫЙ',
      highlight: true,
      specs: 'RTX 4060 Ti • 280Hz • HyperX Cloud II',
      icon: <Zap className="w-5 h-5 text-[#E32124]" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '130 ₽', weekend: '150 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '170 ₽', weekend: '190 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '430 ₽', weekend: '490 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '700 ₽', weekend: '800 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'vip',
      title: 'VIP',
      badge: 'PRO КИБЕРСПОРТ',
      specs: 'RTX 4070 SUPER • 360Hz • Logitech Superlight',
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '160 ₽', weekend: '190 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '210 ₽', weekend: '240 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '540 ₽', weekend: '630 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '850 ₽', weekend: '980 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'super-vip',
      title: 'SUPER VIP',
      badge: 'ФЛАГМАН',
      specs: 'Ryzen 7800X3D • RTX 4080 • BenQ 400Hz',
      icon: <Flame className="w-5 h-5 text-[#E32124]" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '220 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '270 ₽', weekend: '300 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '650 ₽', weekend: '750 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 300 ₽', weekend: '1 400 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'solo',
      title: 'SOLO ROOM',
      badge: 'ПРИВАТНАЯ КОМНАТА',
      specs: '1 Игрок • Закрытая звукоизоляция • Full Top Gear',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '250 ₽', weekend: '270 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '300 ₽', weekend: '330 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 400 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 500 ₽', weekend: '2 000 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    }
  ];

  // 2. CyberX Европа (просп. Мира, 42к1) & CyberX Октябрь (ул. Серова, 19А) — Сбалансированный полный состав
  const arenaOtherPCPrices: PriceCategory[] = [
    {
      id: 'standard-other',
      title: 'STANDARD',
      badge: 'БАЗОВЫЙ',
      specs: 'RTX 3060 / 4060 • 240Hz • Механика Dark Project',
      icon: <Monitor className="w-5 h-5 text-zinc-300" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '110 ₽', weekend: '130 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '150 ₽', weekend: '170 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '380 ₽', weekend: '430 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '600 ₽', weekend: '700 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '600 ₽', weekend: '800 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'bootcamp-other',
      title: 'BOOTCAMP (5v5)',
      badge: 'КОМАНДНЫЙ',
      highlight: true,
      specs: 'Изолированная комната 5 ПК • 280Hz • HyperX',
      icon: <Users className="w-5 h-5 text-[#E32124]" />,
      rows: [
        { period: 'УТРО (за 1 ПК)', subtext: '08:00 – 14:00', weekday: '140 ₽', weekend: '160 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС (за 1 ПК)', subtext: 'Обычный тариф', weekday: '180 ₽', weekend: '210 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА (за 1 ПК)', subtext: '08:00 – 19:00', weekday: '460 ₽', weekend: '530 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ (за 1 ПК)', subtext: 'Дневной сет', weekday: '750 ₽', weekend: '850 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ (за 1 ПК)', subtext: '22:00 – 08:00', weekday: '900 ₽', weekend: '1 050 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'vip-other',
      title: 'VIP ROOM',
      badge: 'PRO КИБЕРСПОРТ',
      specs: 'RTX 4070 Ti • 360Hz • ZOWIE • Dark Project',
      icon: <Crown className="w-5 h-5 text-amber-400" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '170 ₽', weekend: '200 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '220 ₽', weekend: '250 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '580 ₽', weekend: '660 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '900 ₽', weekend: '1 050 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 100 ₽', weekend: '1 250 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'solo-600hz-other',
      title: 'SOLO ROOM 600HZ',
      badge: 'ТОП ФЛАГМАН',
      specs: 'Ryzen 7 7800X3D • BenQ 600Hz • Звукоизоляция',
      icon: <Flame className="w-5 h-5 text-[#E32124]" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '220 ₽', weekend: '240 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '280 ₽', weekend: '310 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '720 ₽', weekend: '800 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 100 ₽', weekend: '1 250 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 400 ₽', weekend: '1 600 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'duo-other',
      title: 'DUO ROOM',
      badge: 'ПАРНЫЙ ЗАЛ',
      specs: '2 Игрока • RTX 4070 • 280Hz • Приватный комфорт',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      rows: [
        { period: 'УТРО (за 1 ПК)', subtext: '08:00 – 14:00', weekday: '150 ₽', weekend: '170 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС (за 1 ПК)', subtext: 'Обычный тариф', weekday: '190 ₽', weekend: '220 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА (за 1 ПК)', subtext: '08:00 – 19:00', weekday: '500 ₽', weekend: '570 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ (за 1 ПК)', subtext: 'Дневной сет', weekday: '800 ₽', weekend: '900 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ (за 1 ПК)', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 150 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    }
  ];

  // 3. Lounge & Consoles (Uniform 5-row cards for pixel-perfect stability)
  const arenaLoungePrices: PriceCategory[] = [
    {
      id: 'sim-racing',
      title: 'АВТОСИМУЛЯТОРЫ',
      badge: selectedArenaId === 'cyberx-arena' ? 'SIM-RACING 2 КОКПИТА' : 'CYBERX ARENA (ЛЕНИНА, 19)',
      highlight: true,
      specs: 'Moza R9 Direct Drive • Квартет педалей • Спортивный ковш',
      icon: <Gauge className="w-5 h-5 text-[#E32124]" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '400 ₽', weekend: '500 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '600 ₽', weekend: '700 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 100 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 350 ₽', weekend: '1 500 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ СЕТ', subtext: '22:00 – 08:00', weekday: '2 000 ₽', weekend: '2 500 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'tv-lounge',
      title: 'АРЕНДА TV (PS5)',
      badge: 'PLAYSTATION 5',
      specs: '4K OLED 65" • DualSense • Топ библиотека игр',
      icon: <Tv className="w-5 h-5 text-blue-400" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '300 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '350 ₽', weekend: '350 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'premium-lounge',
      title: 'PREMIUM LOUNGE',
      badge: 'ДО 14 ЧЕЛОВЕК',
      specs: 'Приватная зона отдыха для больших компаний',
      icon: <Gamepad2 className="w-5 h-5 text-purple-400" />,
      rows: [
        { period: 'УТРО (за 1 час)', subtext: '08:00 – 14:00', weekday: '1 500 ₽', weekend: '1 500 ₽', filterKey: 'morning', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
        { period: '1 ЧАС', subtext: 'Обычный тариф', weekday: '2 000 ₽', weekend: '2 000 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: '3 ЧАСА', subtext: '08:00 – 19:00', weekday: '5 000 ₽', weekend: '5 000 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-red-400" /> },
        { period: '5 ЧАСОВ', subtext: 'Дневной сет', weekday: '7 000 ₽', weekend: '7 000 ₽', filterKey: '5h', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
        { period: 'НОЧЬ СЕТ', subtext: '22:00 – 08:00', weekday: '8 000 ₽', weekend: '8 000 ₽', filterKey: 'night', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
      ]
    },
    {
      id: 'tv-pro-services',
      title: 'TV PRO & УСЛУГИ',
      badge: 'ДОП. ОПЦИИ',
      specs: 'Большой экран, геймпады и паровые коктейли',
      icon: <Coffee className="w-5 h-5 text-orange-400" />,
      rows: [
        { period: 'TV PRO (1 ЧАС)', subtext: 'Увеличенный экран', weekday: '450 ₽', weekend: '450 ₽', filterKey: '1h', icon: <Tv className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'TV PRO (3 ЧАСА)', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: '3h', icon: <Zap className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Доп. игрок TV', subtext: 'За 1 час', weekday: '200 ₽', weekend: '200 ₽', filterKey: '1h', icon: <Clock className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Доплата за геймпад', subtext: '1–2 DualSense', weekday: '200 ₽', weekend: '350 ₽', filterKey: '1h', icon: <Gamepad2 className="w-3.5 h-3.5 text-zinc-400" /> },
        { period: 'Паровой коктейль', subtext: 'Lounge Hookah', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: 'night', icon: <Flame className="w-3.5 h-3.5 text-[#E32124]" /> },
      ]
    }
  ];

  const currentPCCategories = selectedArenaId === 'cyberx-arena' ? arenaLeninaPCPrices : arenaOtherPCPrices;
  const currentLoungeCategories = arenaLoungePrices;
  const displayedCategories = activeTab === 'pc' ? currentPCCategories : currentLoungeCategories;

  return (
    <section id="pricing" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 select-none">
      
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E32124]/[0.05] rounded-full blur-[140px]" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5 text-[#E32124]" />
          <span>ПРОЗРАЧНЫЕ ТАРИФЫ // 24/7 БРОНИРОВАНИЕ</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-white">
          ПРАЙС-<span className="text-[#E32124] drop-shadow-[0_0_20px_rgba(227,33,36,0.6)]">ЛИСТ</span> АРЕН
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base">
          Честные цены без скрытых доплат. Выберите интересующий клуб и категорию.
        </p>
      </div>

      {/* 1. Arena Switcher Tabs (Европа, Ленина, Октябрь) */}
      <div className="flex justify-center mb-6">
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
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#E32124] text-white shadow-[0_0_25px_rgba(227,33,36,0.7)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{arena.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-Category Tabs & Quick Time Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#090912]/80 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
        
        {/* Category Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-black/40 border border-white/10 w-full md:w-auto justify-center">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('pc');
            }}
            className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-[#E32124] text-white shadow-md shadow-red-600/30 font-extrabold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>ПК ЗОНЫ ({currentPCCategories.length})</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('lounge');
            }}
            className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'lounge'
                ? 'bg-[#E32124] text-white shadow-md shadow-red-600/30 font-extrabold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>LOUNGE & СИМУЛЯТОРЫ ({currentLoungeCategories.length})</span>
          </button>
        </div>

        {/* Quick Spotlight / Time Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E32124]" />
            <span>Фокус:</span>
          </span>

          {[
            { id: 'all', label: 'Все' },
            { id: 'morning', label: '🌅 Утро' },
            { id: '1h', label: '⚡ 1 Час' },
            { id: '3h', label: '✨ 3 Часа' },
            { id: '5h', label: '🔥 5 Часов' },
            { id: 'night', label: '🌙 Ночь' }
          ].map((filter) => {
            const isFilterActive = selectedTimeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTimeFilter(isFilterActive && filter.id !== 'all' ? 'all' : filter.id as typeof selectedTimeFilter);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors duration-150 shrink-0 cursor-pointer border ${
                  isFilterActive
                    ? 'bg-white/20 text-white border-white/40 shadow-sm ring-1 ring-white/30'
                    : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Rock-Solid Pixel Aligned Price Grid with Zero Layout Shift & Zero Tearing */}
      <div 
        onMouseLeave={() => {
          setHoveredCardId(null);
          setHoveredRowId(null);
        }}
      >
        <motion.div
          key={`${selectedArenaId}-${activeTab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedCategories.map((category) => {
            const isThisCardHovered = hoveredCardId === category.id;
            const hasCardHover = hoveredCardId !== null;
            
            // Pure GPU opacity dimming - 0 layout shifts, 0 tearing
            const cardDimmed = hasCardHover && !isThisCardHovered;

            return (
              <div
                key={category.id}
                onMouseEnter={() => {
                  playThrottledHover();
                  setHoveredCardId(category.id);
                }}
                className={`group relative rounded-3xl p-6 border flex flex-col justify-between transition-opacity duration-200 ease-out will-change-opacity ${
                  isThisCardHovered
                    ? 'bg-gradient-to-b from-[#180E14] to-[#0A0A12] border-[#E32124] shadow-[0_0_35px_rgba(227,33,36,0.3)] z-10'
                    : category.highlight
                    ? 'border-[#E32124]/50 shadow-[0_0_20px_rgba(227,33,36,0.15)] bg-gradient-to-b from-[#120B0F] to-[#090910]'
                    : 'bg-[#090910] border-white/10'
                } ${
                  cardDimmed 
                    ? 'opacity-30' 
                    : 'opacity-100'
                }`}
              >
                {/* Top Card Bar */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-2xl border transition-colors duration-150 ${
                        isThisCardHovered
                          ? 'bg-[#E32124]/20 border-[#E32124] text-white shadow-lg shadow-red-600/30'
                          : 'bg-white/[0.05] border-white/10 text-zinc-300'
                      }`}>
                        {category.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-sans font-black text-lg sm:text-xl tracking-wide uppercase transition-colors duration-150 ${
                            isThisCardHovered ? 'text-[#E32124]' : 'text-white'
                          }`}>
                            {category.title}
                          </h3>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-[240px]">
                          {category.specs}
                        </p>
                      </div>
                    </div>
                    
                    {category.badge && (
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors duration-150 ${
                        isThisCardHovered || category.highlight
                          ? 'bg-[#E32124] text-white shadow-[0_0_15px_rgba(227,33,36,0.6)]'
                          : 'bg-white/10 text-zinc-300 border border-white/10'
                      }`}>
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Table Column Headers */}
                  <div className="grid grid-cols-12 gap-1 sm:gap-2 py-2 px-2.5 sm:px-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    <div className="col-span-6 flex items-center gap-1">ТАРИФ // ВРЕМЯ</div>
                    <div className="col-span-3 text-right">ПН-ЧТ</div>
                    <div className="col-span-3 text-right text-zinc-200 font-bold">ПТ-ВС</div>
                  </div>

                  {/* Table Rows with Pure GPU Color/Border Transition (0 Coordinate Movement) */}
                  <div className="space-y-1.5 mb-6">
                    {category.rows.map((row, idx) => {
                      const rowUniqueId = `${category.id}-${idx}`;
                      const isThisRowHovered = hoveredRowId === rowUniqueId;
                      const hasRowHoverInCard = isThisCardHovered && hoveredRowId !== null;
                      
                      // Check if row matches time filter
                      const matchesFilter = selectedTimeFilter === 'all' || row.filterKey === selectedTimeFilter;

                      // Row dimming logic
                      const isRowDimmed = 
                        (!matchesFilter) || 
                        (hasRowHoverInCard && !isThisRowHovered);

                      const isRowActive = isThisRowHovered || (selectedTimeFilter !== 'all' && matchesFilter);

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => {
                            setHoveredRowId(rowUniqueId);
                          }}
                          onMouseLeave={() => setHoveredRowId(null)}
                          className={`grid grid-cols-12 gap-1 sm:gap-2 py-2 px-2.5 sm:px-3 rounded-xl transition-all duration-150 items-center text-[11px] sm:text-xs font-mono cursor-default relative min-h-[40px] sm:min-h-[44px] ${
                            isRowActive
                              ? 'bg-gradient-to-r from-[#E32124]/20 via-[#E32124]/10 to-transparent border-l-4 border-[#E32124] shadow-inner shadow-red-950/30'
                              : 'hover:bg-white/[0.05]'
                          } ${
                            isRowDimmed
                              ? 'opacity-35'
                              : 'opacity-100'
                          }`}
                        >
                          <div className="col-span-6 flex items-center gap-1.5 sm:gap-2 min-w-0">
                            <div className="shrink-0">
                              {row.icon}
                            </div>
                            <div className="truncate">
                              <div className={`transition-colors duration-150 truncate ${isRowActive ? 'text-white font-bold' : 'text-zinc-200 font-medium'}`}>
                                {row.period}
                              </div>
                              {row.subtext && (
                                <div className={`text-[9px] sm:text-[10px] truncate ${isRowActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                  {row.subtext}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Weekday Price */}
                          <div className={`col-span-3 text-right font-bold transition-colors duration-150 tabular-nums ${
                            isRowActive ? 'text-white' : 'text-zinc-300'
                          }`}>
                            {row.weekday}
                          </div>

                          {/* Weekend Price (Highlighted) */}
                          <div className={`col-span-3 text-right font-bold transition-colors duration-150 tabular-nums ${
                            isRowActive 
                              ? 'text-[#FF3B3F] drop-shadow-[0_0_8px_rgba(255,59,63,0.9)]' 
                              : 'text-[#E32124] drop-shadow-[0_0_6px_rgba(227,33,36,0.3)]'
                          }`}>
                            {row.weekend}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Booking CTA Button */}
                <div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenBooking(selectedArenaId, category.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer ${
                      isThisCardHovered || category.highlight
                        ? 'bg-[#E32124] hover:bg-[#FF2A2E] text-white shadow-[0_0_20px_rgba(227,33,36,0.6)] active:opacity-90'
                        : 'bg-white/10 hover:bg-white/20 text-white hover:text-white border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>ЗАБРОНИРОВАТЬ МЕСТО</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

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
