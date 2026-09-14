
export type TimeFilter = 'all' | 'morning' | '1h' | '3h' | '5h' | 'night';

export interface PriceRow {
  period: string;
  subtext?: string;
  weekday: string;
  weekend: string;
  filterKey?: Exclude<TimeFilter, 'all'>;
}

export interface PriceCategory {
  id: string;
  title: string;
  badge?: string;
  highlight?: boolean;
  specs: string;
  rows: PriceRow[];
}

/** Прайс трёх групп: ПК флагмана (Ленина), ПК других клубов, Lounge и симы. */
export interface PricingContent {
  lenina: PriceCategory[];
  other: PriceCategory[];
  lounge: PriceCategory[];
}

export const DEFAULT_PRICING: PricingContent = {
  // 1. CyberX Arena (ул. Ленина, 19) — Флагман
  lenina: [
    {
      id: 'standard',
      title: 'Standard',
      badge: 'Базовый',
      specs: 'RTX 3060 Ti · 240Hz · Dark Project KD87A',
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
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '250 ₽', weekend: '270 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '300 ₽', weekend: '330 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '800 ₽', weekend: '900 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: 'дневной сет', weekday: '1 200 ₽', weekend: '1 400 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 500 ₽', weekend: '2 000 ₽', filterKey: 'night' },
      ],
    },
  ],

  // 2. Европа & Октябрь
  other: [
    {
      id: 'standard-other',
      title: 'Standard',
      badge: 'Базовый',
      specs: 'RTX 3060 / 4060 · 240Hz · механика Dark Project',
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
      rows: [
        { period: 'Утро (1 ПК)', subtext: '08:00 – 14:00', weekday: '150 ₽', weekend: '170 ₽', filterKey: 'morning' },
        { period: '1 час (1 ПК)', subtext: 'обычный тариф', weekday: '190 ₽', weekend: '220 ₽', filterKey: '1h' },
        { period: '3 часа (1 ПК)', subtext: '08:00 – 19:00', weekday: '500 ₽', weekend: '570 ₽', filterKey: '3h' },
        { period: '5 часов (1 ПК)', subtext: 'дневной сет', weekday: '800 ₽', weekend: '900 ₽', filterKey: '5h' },
        { period: 'Ночь (1 ПК)', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 150 ₽', filterKey: 'night' },
      ],
    },
  ],

  // 3. Lounge & Consoles
  lounge: [
    {
      id: 'sim-racing',
      title: 'Автосимуляторы',
      badge: 'Sim-Racing · 2 кокпита',
      highlight: true,
      specs: 'Moza R9 Direct Drive · педали Load Cell · ковш',
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
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '200 ₽', weekend: '300 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '350 ₽', weekend: '350 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '900 ₽', weekend: '900 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: '08:00 – 19:00', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: '5h' },
        { period: 'Ночь', subtext: '22:00 – 08:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'premium-lounge',
      title: 'Premium Lounge',
      badge: 'До 14 человек',
      specs: 'Приватная зона отдыха для больших компаний',
      rows: [
        { period: 'Утро (1 час)', subtext: '08:00 – 14:00', weekday: '1 500 ₽', weekend: '1 500 ₽', filterKey: 'morning' },
        { period: '1 час', subtext: 'обычный тариф', weekday: '2 000 ₽', weekend: '2 000 ₽', filterKey: '1h' },
        { period: '3 часа', subtext: '08:00 – 19:00', weekday: '5 000 ₽', weekend: '5 000 ₽', filterKey: '3h' },
        { period: '5 часов', subtext: '08:00 – 19:00', weekday: '7 000 ₽', weekend: '7 000 ₽', filterKey: '5h' },
        { period: 'Ночной сет', subtext: '22:00 – 08:00', weekday: '8 000 ₽', weekend: '8 000 ₽', filterKey: 'night' },
      ],
    },
    {
      id: 'tv-pro-services',
      title: 'TV Pro и услуги',
      badge: 'Доп. опции',
      specs: 'Большой экран, геймпады и паровые коктейли',
      rows: [
        { period: 'TV Pro (1 час)', subtext: 'увеличенный экран', weekday: '450 ₽', weekend: '450 ₽', filterKey: '1h' },
        { period: 'TV Pro (3 часа)', subtext: '08:00 – 19:00', weekday: '1 000 ₽', weekend: '1 000 ₽', filterKey: '3h' },
        { period: 'Доп. игрок TV', subtext: 'за 1 час', weekday: '200 ₽', weekend: '200 ₽', filterKey: '1h' },
        { period: 'Доплата за геймпад', subtext: '1–2 DualSense', weekday: '200 ₽', weekend: '350 ₽', filterKey: '1h' },
        { period: 'Паровой коктейль', subtext: 'lounge hookah', weekday: '1 200 ₽', weekend: '1 200 ₽', filterKey: 'night' },
      ],
    },
  ],
};
