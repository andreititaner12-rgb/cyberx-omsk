import { ARENAS, ZONES, UPCOMING_TOURNAMENT, PROMOTIONS } from './arenaData';
import { DEFAULT_PRICING, PricingContent } from './pricingData';
import { ArenaLocation, ZoneType, Tournament, Promotion } from '../types';
import { CMS_API_BASE } from '../config';
import { MASTER_SECRET_KEY } from '../components/OwnerSecurityGate';

/* ============================================================
   Единая модель контента сайта.
   Всё, что редактируется в кабинете владельца, описано здесь.
   remote/черновик поверх DEFAULT_CONTENT по ключам верхнего уровня.
   ============================================================ */

export interface HeroContent {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  videoSrc: string;
  poster: string;
}

export interface BookingContent {
  /** Ссылки Langame по клубам */
  langame: Record<string, string>;
  appStore: string;
  /** QR-картинки по клубам */
  qr: Record<string, string>;
}

export interface BrandLinks {
  vk: string;
  telegram: string;
  email: string;
}

export interface SiteContent {
  hero: HeroContent;
  arenas: ArenaLocation[];
  zones: ZoneType[];
  pricing: PricingContent;
  promotions: Promotion[];
  tournament: Tournament;
  booking: BookingContent;
  brandLinks: BrandLinks;
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    eyebrow: 'Сеть киберспортивных арен — Омск',
    titleTop: 'CyberX',
    titleBottom: 'Арены Омска',
    description:
      '182 ПК на мониторах до 600Hz, Premium-комнаты, автосимуляторы Sim-Racing и LAN-сцена. Три клуба в центре Омска и в округах — открыты круглосуточно.',
    videoSrc: '/hero-bg-compact.mp4',
    poster: '/hero-bg-poster.jpg',
  },
  arenas: ARENAS,
  zones: ZONES,
  pricing: DEFAULT_PRICING,
  promotions: PROMOTIONS,
  tournament: UPCOMING_TOURNAMENT,
  booking: {
    langame: {
      'cyberx-arena': 'https://langame.ru/club/799452760',
      'cyberx-evropa': 'https://langame.ru/club/799457743',
      'cyberx-oktyabr': 'https://langame.ru/club/799456444',
    },
    appStore: 'https://apps.apple.com/ru/app/cyberx/id6504088566',
    qr: {
      'cyberx-arena': '/qr/qr-lenina.png',
      'cyberx-evropa': '/qr/qr-evropa.png',
      'cyberx-oktyabr': '/qr/qr-oktyabr.png',
    },
  },
  brandLinks: {
    vk: 'https://vk.com/omsklenina',
    telegram: 'https://t.me/cyberxcommunityomsklenina',
    email: 'cyberx55@yandex.ru',
  },
};

/** Наложение частичного контента (опубликованного/черновика) на дефолты. */
export function mergeContent(overlay: Partial<SiteContent> | null | undefined): SiteContent {
  const base = DEFAULT_CONTENT;
  if (!overlay) return base;
  return {
    hero: { ...base.hero, ...(overlay.hero || {}) },
    arenas: overlay.arenas && overlay.arenas.length >= 3 ? overlay.arenas : base.arenas,
    zones: overlay.zones && overlay.zones.length >= 6 ? overlay.zones : base.zones,
    pricing: overlay.pricing ? { ...base.pricing, ...overlay.pricing } : base.pricing,
    promotions: overlay.promotions && overlay.promotions.length > 0 ? overlay.promotions : base.promotions,
    tournament: overlay.tournament ? { ...base.tournament, ...overlay.tournament } : base.tournament,
    booking: {
      langame: { ...base.booking.langame, ...(overlay.booking?.langame || {}) },
      appStore: overlay.booking?.appStore || base.booking.appStore,
      qr: { ...base.booking.qr, ...(overlay.booking?.qr || {}) },
    },
    brandLinks: { ...base.brandLinks, ...(overlay.brandLinks || {}) },
  };
}

/* ============================================================
   CMS-клиент. CMS_API_BASE пустой → локальный режим (без API).
   ============================================================ */

export const cms = {
  connected(): boolean {
    return CMS_API_BASE.trim().length > 0;
  },

  apiBase(): string {
    return CMS_API_BASE.trim().replace(/\/+$/, '');
  },

  /** Загрузить опубликованный контент (null — если API выключен/пуст/ошибка). */
  async fetchContent(): Promise<Partial<SiteContent> | null> {
    if (!this.connected()) return null;
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${this.apiBase()}/api/content`, { signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) return null;
      const data = await res.json();
      return data && typeof data === 'object' ? (data as Partial<SiteContent>) : null;
    } catch {
      return null;
    }
  },

  /** Опубликовать контент (возвращает false, если API не подключён). */
  async publish(content: SiteContent): Promise<boolean> {
    if (!this.connected()) return false;
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(`${this.apiBase()}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-cyberx-key': MASTER_SECRET_KEY },
        body: JSON.stringify(content),
        signal: controller.signal,
      });
      clearTimeout(t);
      return res.ok;
    } catch {
      return false;
    }
  },

  /** Загрузить файл (фото) на API, вернуть публичный URL или null. */
  async uploadImage(file: File): Promise<string | null> {
    if (!this.connected()) return null;
    try {
      const form = new FormData();
      form.append('file', file);
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 60000);
      const res = await fetch(`${this.apiBase()}/api/upload`, {
        method: 'POST',
        headers: { 'x-cyberx-key': MASTER_SECRET_KEY },
        body: form,
        signal: controller.signal,
      });
      clearTimeout(t);
      if (!res.ok) return null;
      const data = await res.json();
      return typeof data?.url === 'string' ? data.url : null;
    } catch {
      return null;
    }
  },
};

/* ============================================================
   Локальный черновик (localStorage) + миграция старых ключей
   ============================================================ */

export const DRAFT_STORAGE_KEY = 'cyberx_cms_content';

export function loadDraft(): Partial<SiteContent> | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Partial<SiteContent>;
    // Миграция с старого формата (отдельные ключи)
    const legacy: Partial<SiteContent> = {};
    const lt = localStorage.getItem('cyberx_live_tournament');
    const lp = localStorage.getItem('cyberx_live_promos');
    const lz = localStorage.getItem('cyberx_live_zones');
    if (lt) legacy.tournament = JSON.parse(lt);
    if (lp) legacy.promotions = JSON.parse(lp);
    if (lz) legacy.zones = JSON.parse(lz);
    return Object.keys(legacy).length > 0 ? legacy : null;
  } catch {
    return null;
  }
}

export function saveDraft(content: SiteContent) {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(content));
  } catch {
    /* quota — игнорируем */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem('cyberx_live_tournament');
    localStorage.removeItem('cyberx_live_promos');
    localStorage.removeItem('cyberx_live_zones');
  } catch {
    /* noop */
  }
}
