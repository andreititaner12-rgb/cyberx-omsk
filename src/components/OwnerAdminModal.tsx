import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Save,
  Download,
  Upload,
  CheckCircle2,
  Trophy,
  Tag,
  Layers,
  Building2,
  Shield,
  Copy,
  CheckCheck,
  LogOut,
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Globe,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { MASTER_SECRET_KEY } from './OwnerSecurityGate';
import {
  SiteContent,
  mergeContent,
  cms,
} from '../data/siteContent';

/* ============================================================
   Кабинет владельца (CMS) — редизайн v2.
   Редактирует единый объект SiteContent:
   hero, клубы (+фото/контакты), зоны (+фото), прайс,
   турнир, акции, ссылки на бронирование и соцсети.
   «Опубликовать» → API (см. server/), «Черновик» → localStorage.
   ============================================================ */

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Эффективный контент сайта (дефолты + опубликованный/черновик) */
  content: SiteContent;
  apiConnected: boolean;
  lastPublishedAt: string | null;
  onDraft: (c: SiteContent) => void;
  onPublish: (c: SiteContent) => Promise<boolean>;
  onResetDraft: () => void;
  onLogout: () => void;
}

type TabId = 'clubs' | 'zones' | 'prices' | 'tournaments' | 'promos' | 'system';

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
  { id: 'clubs', label: 'Клубы и hero', icon: Building2 },
  { id: 'zones', label: 'Зоны', icon: Layers },
  { id: 'prices', label: 'Прайс', icon: Tag },
  { id: 'tournaments', label: 'Турнир', icon: Trophy },
  { id: 'promos', label: 'Акции', icon: Tag },
  { id: 'system', label: 'Система', icon: Shield },
];

/* ---------- примитивы форм ---------- */

const inputCls =
  'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-cyberx-faint/60 focus:border-cyberx-red/70 focus:outline-none transition-colors';

const Field: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({
  label,
  children,
  className = '',
}) => (
  <div className={className}>
    <label className="eyebrow text-cyberx-faint block mb-1.5">{label}</label>
    {children}
  </div>
);

const linesToText = (lines: string[]) => (lines || []).join('\n');
const textToLines = (text: string) =>
  (text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

/** Поле изображения: URL + превью + загрузка на API (если подключён) */
const ImgField: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({
  label,
  value,
  onChange,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setBusy(true);
    const url = await cms.uploadImage(f);
    setBusy(false);
    if (url) {
      onChange(url);
      sound.playTrigger();
    } else {
      sound.playClick();
    }
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-2.5">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        <div className="w-14 h-10 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={14} className="text-cyberx-faint" />
          )}
        </div>
        {cms.connected() && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="shrink-0 h-9 px-3 rounded-lg border border-white/[0.12] text-cyberx-muted hover:text-white hover:border-white/30 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-40"
              title="Загрузить файл на сервер CMS"
            >
              {busy ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            </button>
          </>
        )}
      </div>
    </Field>
  );
};

/* ---------- основной компонент ---------- */

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
  content,
  apiConnected,
  lastPublishedAt,
  onDraft,
  onPublish,
  onResetDraft,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('clubs');
  const [draft, setDraft] = useState<SiteContent>(content);
  const [status, setStatus] = useState<{ text: string; tone: 'ok' | 'err' | 'info' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newPin, setNewPin] = useState('');

  // селекторы
  const [clubIdx, setClubIdx] = useState(1);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [priceGroup, setPriceGroup] = useState<'lenina' | 'other' | 'lounge'>('lenina');
  const importRef = useRef<HTMLInputElement | null>(null);

  // Сброс рабочего копирования при открытии / при смене внешнего контента
  useEffect(() => {
    if (isOpen) {
      setDraft(JSON.parse(JSON.stringify(content)) as SiteContent);
      setClubIdx(Math.max(0, (content.arenas || []).findIndex((a) => a.id === 'cyberx-arena')));
      if (content.arenas?.[1]) setClubIdx(1);
      setZoneIdx(0);
      setStatus(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, content]);

  // Замок скролла + Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  const flash = (text: string, tone: 'ok' | 'err' | 'info' = 'ok') => {
    setStatus({ text, tone });
    window.setTimeout(() => setStatus(null), 3200);
  };

  if (!isOpen) return null;

  /* ---------- мутаторы ---------- */

  const mutate = (fn: (d: SiteContent) => void) => {
    setDraft((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as SiteContent;
      fn(copy);
      return copy;
    });
  };

  const club = draft.arenas[clubIdx] || draft.arenas[0];
  const zone = draft.zones[zoneIdx] || draft.zones[0];
  const priceCats = draft.pricing[priceGroup];

  /* ---------- сохранения ---------- */

  const handleDraft = () => {
    sound.playTrigger();
    onDraft(draft);
    flash('Черновик сохранён в этом браузере', 'info');
  };

  const handlePublish = async () => {
    sound.playClick();
    setSaving(true);
    const ok = await onPublish(draft);
    setSaving(false);
    if (ok) flash('Опубликовано — сайт обновлён для всех посетителей');
    else if (apiConnected) flash('Ошибка публикации — сервер не ответил', 'err');
    else {
      onDraft(draft);
      flash('Бэкенд не подключён — изменения сохранены локально (см. вкладку Система)', 'info');
    }
  };

  const handleReset = () => {
    sound.playClick();
    onResetDraft();
    setDraft(JSON.parse(JSON.stringify(content)) as SiteContent);
    flash('Локальный черновик удалён — показан опубликованный контент', 'info');
  };

  const copySecretLink = () => {
    sound.playClick();
    const url = `${window.location.origin}/#admin?key=${MASTER_SECRET_KEY}`;
    try {
      navigator.clipboard?.writeText(url);
    } catch {
      /* noop */
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleUpdatePin = () => {
    if (newPin.trim().length >= 4) {
      sound.playTrigger();
      localStorage.setItem('cyberx_owner_pin', newPin.trim());
      setNewPin('');
      flash('PIN изменён');
    } else {
      flash('PIN должен быть не короче 4 символов', 'err');
    }
  };

  const handleExport = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'cyberx_omsk_cms_content.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImport = async (f: File | undefined) => {
    if (!f) return;
    try {
      const text = await f.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') throw new Error('bad');
      setDraft(mergeContent(parsed) as SiteContent);
      sound.playTrigger();
      flash('Контент импортирован из файла — проверьте и опубликуйте');
    } catch {
      sound.playClick();
      flash('Не удалось прочитать файл JSON', 'err');
    }
  };

  /* ---------- рендер ---------- */

  const tab = (id: TabId) => {
    sound.playClick();
    setActiveTab(id);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md select-none overscroll-contain"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden rounded-3xl bg-cyberx-surface border border-white/[0.1] shadow-modal"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-0 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow text-cyberx-red">Режим владельца // CMS</div>
              <h3 className="mt-2 font-display font-black uppercase text-2xl sm:text-3xl tracking-tight text-white leading-none">
                Управление контентом
              </h3>
              <p className="mt-2 text-xs text-cyberx-muted max-w-lg leading-relaxed">
                Все изменения сайта: тексты hero, клубы и фото, зоны, прайс, турнир, акции и ссылки.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${
                  apiConnected
                    ? 'border-emerald-500/30 text-emerald-300'
                    : 'border-white/[0.12] text-cyberx-faint'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${apiConnected ? 'bg-emerald-400' : 'bg-cyberx-faint'}`} />
                {apiConnected ? 'Бэкенд подключён' : 'Локальный режим'}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="h-10 w-10 rounded-full border border-white/[0.1] text-cyberx-muted hover:text-white hover:border-white/30 transition-all flex items-center justify-center shrink-0"
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Вкладки (подчёркнутые, как по всему сайту) */}
          <div className="mt-6 flex items-center gap-6 sm:gap-8 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => tab(t.id)}
                className={`relative pb-3.5 whitespace-nowrap flex items-center gap-2 transition-colors ${
                  activeTab === t.id ? 'text-white' : 'text-cyberx-faint hover:text-white/70'
                }`}
              >
                <t.icon size={14} className={activeTab === t.id ? 'text-cyberx-red' : ''} />
                <span className="eyebrow !tracking-[0.14em]">{t.label}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-cyberx-red origin-left transition-transform duration-300 ${
                    activeTab === t.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        {/* Тело */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 space-y-5">
          {/* ============ ВКЛАДКА: КЛУБЫ И HERO ============ */}
          {activeTab === 'clubs' && (
            <>
              {/* Hero */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="eyebrow text-cyberx-red">Первый экран (hero)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Надзаголовок">
                    <input className={inputCls} value={draft.hero.eyebrow} onChange={(e) => mutate((d) => void (d.hero.eyebrow = e.target.value))} />
                  </Field>
                  <Field label="Описание под заголовком">
                    <textarea rows={2} className={inputCls} value={draft.hero.description} onChange={(e) => mutate((d) => void (d.hero.description = e.target.value))} />
                  </Field>
                  <Field label="Заголовок, строка 1">
                    <input className={inputCls} value={draft.hero.titleTop} onChange={(e) => mutate((d) => void (d.hero.titleTop = e.target.value))} />
                  </Field>
                  <Field label="Заголовок, строка 2 (контурная)">
                    <input className={inputCls} value={draft.hero.titleBottom} onChange={(e) => mutate((d) => void (d.hero.titleBottom = e.target.value))} />
                  </Field>
                  <Field label="Видео (URL)">
                    <input className={inputCls} value={draft.hero.videoSrc} onChange={(e) => mutate((d) => void (d.hero.videoSrc = e.target.value))} />
                  </Field>
                  <ImgField label="Постер (заглушка видео)" value={draft.hero.poster} onChange={(v) => mutate((d) => void (d.hero.poster = v))} />
                </div>
              </div>

              {/* Клубы */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="eyebrow text-cyberx-red">Клубы: контактные данные и фото</div>
                <div className="flex items-center gap-6 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {draft.arenas.map((a, i) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        sound.playClick();
                        setClubIdx(i);
                      }}
                      className={`relative pb-3 whitespace-nowrap transition-colors ${
                        clubIdx === i ? 'text-white' : 'text-cyberx-faint hover:text-white/70'
                      }`}
                    >
                      <span className="eyebrow !tracking-[0.12em]">{a.name.split('//')[0].trim()}</span>
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-cyberx-red origin-left transition-transform duration-300 ${
                          clubIdx === i ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Название (формат: NAME // АДРЕС)">
                    <input className={inputCls} value={club.name} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].name = e.target.value))} />
                  </Field>
                  <Field label="Подзаголовок (tagline)">
                    <input className={inputCls} value={club.tagline} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].tagline = e.target.value))} />
                  </Field>
                  <Field label="Адрес">
                    <input className={inputCls} value={club.address} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].address = e.target.value))} />
                  </Field>
                  <Field label="Метро / остановки">
                    <input className={inputCls} value={club.metro} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].metro = e.target.value))} />
                  </Field>
                  <Field label="Телефон">
                    <input className={inputCls} value={club.phone} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].phone = e.target.value))} />
                  </Field>
                  <Field label="Telegram">
                    <input className={inputCls} value={club.telegram} onChange={(e) => mutate((d) => void (d.arenas[clubIdx].telegram = e.target.value))} />
                  </Field>
                </div>

                <ImgField
                  label="Главное фото клуба"
                  value={club.image}
                  onChange={(v) => mutate((d) => void (d.arenas[clubIdx].image = v))}
                />
                <GalleryEditor
                  label="Галерея клуба"
                  value={club.gallery || []}
                  onChange={(v) => mutate((d) => void (d.arenas[clubIdx].gallery = v))}
                />
                <Field label="Оснащение (по одному пункту в строке)">
                  <textarea
                    rows={5}
                    className={inputCls}
                    value={linesToText(club.features)}
                    onChange={(e) => mutate((d) => void (d.arenas[clubIdx].features = textToLines(e.target.value)))}
                  />
                </Field>
              </div>

              {/* Ссылки и бронирование */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="eyebrow text-cyberx-red">Ссылки: соцсети и бронирование</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="ВКонтакте (URL)">
                    <input className={inputCls} value={draft.brandLinks.vk} onChange={(e) => mutate((d) => void (d.brandLinks.vk = e.target.value))} />
                  </Field>
                  <Field label="Telegram-канал (URL)">
                    <input className={inputCls} value={draft.brandLinks.telegram} onChange={(e) => mutate((d) => void (d.brandLinks.telegram = e.target.value))} />
                  </Field>
                  <Field label="E-mail (URL)">
                    <input className={inputCls} value={draft.brandLinks.email} onChange={(e) => mutate((d) => void (d.brandLinks.email = e.target.value))} />
                  </Field>
                </div>
                <Field label="App Store (URL приложения)">
                  <input className={inputCls} value={draft.booking.appStore} onChange={(e) => mutate((d) => void (d.booking.appStore = e.target.value))} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {draft.arenas.map((a) => (
                    <div key={a.id} className="rounded-xl border border-white/[0.06] p-4 space-y-3">
                      <div className="eyebrow text-cyberx-muted">{a.name.split('//')[0].trim()}</div>
                      <Field label="Ссылка Langame (бронь)">
                        <input className={inputCls} value={draft.booking.langame[a.id] || ''} onChange={(e) => mutate((d) => void (d.booking.langame[a.id] = e.target.value))} />
                      </Field>
                      <ImgField
                        label="QR-код клуба"
                        value={draft.booking.qr[a.id] || ''}
                        onChange={(v) => mutate((d) => void (d.booking.qr[a.id] = v))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ============ ВКЛАДКА: ЗОНЫ ============ */}
          {activeTab === 'zones' && (
            <>
              <div className="flex items-center gap-6 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {draft.zones.map((z, i) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      sound.playClick();
                      setZoneIdx(i);
                    }}
                    className={`relative pb-3 whitespace-nowrap transition-colors ${
                      zoneIdx === i ? 'text-white' : 'text-cyberx-faint hover:text-white/70'
                    }`}
                  >
                    <span className="eyebrow !tracking-[0.12em]">{z.name.split('//')[0].trim()}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-cyberx-red origin-left transition-transform duration-300 ${
                        zoneIdx === i ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-cyberx-red">Зона: {zone.name.split('//')[0].trim()}</span>
                  <span className="text-[10px] font-mono text-cyberx-faint">id: {zone.id}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Название (формат: NAME // ОСОБЕННОСТЬ)">
                    <input className={inputCls} value={zone.name} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].name = e.target.value))} />
                  </Field>
                  <Field label="Категория (метка)">
                    <input className={inputCls} value={zone.category} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].category = e.target.value))} />
                  </Field>
                  <Field label="Вместимость">
                    <input className={inputCls} value={zone.capacity} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].capacity = e.target.value))} />
                  </Field>
                  <Field label="Подзаголовок">
                    <input className={inputCls} value={zone.tagline} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].tagline = e.target.value))} />
                  </Field>
                  <Field label="Тариф, ₽/час">
                    <input type="number" className={inputCls} value={zone.pricePerHour} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].pricePerHour = parseInt(e.target.value) || 0))} />
                  </Field>
                  <Field label="Ночной пакет, ₽">
                    <input type="number" className={inputCls} value={zone.priceNight} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].priceNight = parseInt(e.target.value) || 0))} />
                  </Field>
                </div>
                <Field label="Описание">
                  <textarea rows={3} className={inputCls} value={zone.description} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].description = e.target.value))} />
                </Field>
                <ImgField label="Главное фото зоны" value={zone.image} onChange={(v) => mutate((d) => void (d.zones[zoneIdx].image = v))} />
                <GalleryEditor label="Галерея зоны" value={zone.gallery || []} onChange={(v) => mutate((d) => void (d.zones[zoneIdx].gallery = v))} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Железо (по одному пункту в строке)">
                    <textarea rows={5} className={inputCls} value={linesToText(zone.hardwareBrief)} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].hardwareBrief = textToLines(e.target.value)))} />
                  </Field>
                  <Field label="Сервис (по одному пункту в строке)">
                    <textarea rows={5} className={inputCls} value={linesToText(zone.features)} onChange={(e) => mutate((d) => void (d.zones[zoneIdx].features = textToLines(e.target.value)))} />
                  </Field>
                </div>
              </div>
            </>
          )}

          {/* ============ ВКЛАДКА: ПРАЙС ============ */}
          {activeTab === 'prices' && (
            <>
              <div className="inline-flex self-start rounded-full border border-white/[0.1] p-1">
                {(
                  [
                    { id: 'lenina', label: `CyberX Arena · ПК · ${draft.pricing.lenina.length}` },
                    { id: 'other', label: `Европа/Октябрь · ПК · ${draft.pricing.other.length}` },
                    { id: 'lounge', label: `Lounge и симы · ${draft.pricing.lounge.length}` },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playClick();
                      setPriceGroup(g.id);
                    }}
                    className={`rounded-full px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all ${
                      priceGroup === g.id ? 'bg-cyberx-red text-white' : 'text-cyberx-muted hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {priceCats.map((cat, ci) => (
                <div key={cat.id} className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <Field label="Название тарифа" className="sm:col-span-2">
                      <input className={inputCls} value={cat.title} onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].title = e.target.value))} />
                    </Field>
                    <Field label="Метка">
                      <input className={inputCls} value={cat.badge || ''} onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].badge = e.target.value))} />
                    </Field>
                    <Field label="Конфиг (кратко)">
                      <input className={inputCls} value={cat.specs} onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].specs = e.target.value))} />
                    </Field>
                  </div>

                  <label className="flex items-center gap-2.5 text-[12px] text-cyberx-muted cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!cat.highlight}
                      onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].highlight = e.target.checked))}
                      className="accent-[#E32124] h-4 w-4"
                    />
                    Подсветить как рекомендуемый тариф
                  </label>

                  {/* Строки цен */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-cyberx-faint">
                      <div className="col-span-5">Период</div>
                      <div className="col-span-4">Подпись</div>
                      <div className="col-span-1">Пн–Чт</div>
                      <div className="col-span-2">Пт–Вс</div>
                    </div>
                    {cat.rows.map((row, ri) => (
                      <div key={ri} className="grid grid-cols-12 gap-2 items-center">
                        <input className={`${inputCls} col-span-5`} value={row.period} placeholder="1 час"
                          onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].rows[ri].period = e.target.value))} />
                        <input className={`${inputCls} col-span-4`} value={row.subtext || ''} placeholder="обычный тариф"
                          onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].rows[ri].subtext = e.target.value))} />
                        <input className={`${inputCls} col-span-1`} value={row.weekday}
                          onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].rows[ri].weekday = e.target.value))} />
                        <div className="col-span-2 flex items-center gap-1.5">
                          <input className={inputCls} value={row.weekend}
                            onChange={(e) => mutate((d) => void (d.pricing[priceGroup][ci].rows[ri].weekend = e.target.value))} />
                          <button
                            type="button"
                            onClick={() => mutate((d) => void d.pricing[priceGroup][ci].rows.splice(ri, 1))}
                            className="p-1.5 rounded-lg text-cyberx-faint hover:text-cyberx-red transition-colors"
                            title="Удалить строку"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        mutate((d) =>
                          void d.pricing[priceGroup][ci].rows.push({ period: 'Новый тариф', subtext: '', weekday: '0 ₽', weekend: '0 ₽', filterKey: '1h' })
                        )
                      }
                      className="text-[11px] font-mono uppercase tracking-wider text-cyberx-muted hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={13} /> Добавить строку
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => mutate((d) => void d.pricing[priceGroup].splice(ci, 1))}
                      className="text-[11px] font-mono uppercase tracking-wider text-cyberx-faint hover:text-cyberx-red flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 size={13} /> Удалить тариф
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  mutate((d) =>
                    void d.pricing[priceGroup].push({ id: `custom-${Date.now()}`, title: 'Новый тариф', badge: '', specs: '', rows: [{ period: '1 час', subtext: 'обычный тариф', weekday: '0 ₽', weekend: '0 ₽', filterKey: '1h' }] })
                  )
                }
                className="w-full py-3 rounded-xl border border-dashed border-white/[0.15] text-cyberx-muted hover:text-white hover:border-white/30 text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Plus size={14} /> Добавить тариф в группу
              </button>
            </>
          )}

          {/* ============ ВКЛАДКА: ТУРНИР ============ */}
          {activeTab === 'tournaments' && (
            <div className="rounded-2xl border border-white/[0.08] p-5 space-y-4">
              <div className="eyebrow text-cyberx-red">Главный турнир (карточка + таймер)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Название">
                  <input className={inputCls} value={draft.tournament.title} onChange={(e) => mutate((d) => void (d.tournament.title = e.target.value))} />
                </Field>
                <Field label="Игра">
                  <select className={inputCls} value={draft.tournament.game} onChange={(e) => mutate((d) => void (d.tournament.game = e.target.value as typeof draft.tournament.game))}>
                    {(['CS2', 'DOTA 2', 'VALORANT', 'EA FC 25', 'TEKKEN 8'] as const).map((g) => (
                      <option key={g} value={g} className="bg-cyberx-surface">{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Дата (текст на карточке)">
                  <input className={inputCls} value={draft.tournament.date} onChange={(e) => mutate((d) => void (d.tournament.date = e.target.value))} />
                </Field>
                <Field label="Дата ISO (таймер обратного отсчёта)">
                  <input className={inputCls} placeholder="2026-09-20T12:00:00+06:00" value={(draft.tournament as { dateISO?: string }).dateISO || ''} onChange={(e) => mutate((d) => void ((d.tournament as { dateISO?: string }).dateISO = e.target.value || undefined))} />
                </Field>
                <Field label="Призовой фонд">
                  <input className={inputCls} value={draft.tournament.prizePool} onChange={(e) => mutate((d) => void (d.tournament.prizePool = e.target.value))} />
                </Field>
                <Field label="Время">
                  <input className={inputCls} value={draft.tournament.time} onChange={(e) => mutate((d) => void (d.tournament.time = e.target.value))} />
                </Field>
                <Field label="Место">
                  <input className={inputCls} value={draft.tournament.location} onChange={(e) => mutate((d) => void (d.tournament.location = e.target.value))} />
                </Field>
                <Field label="Формат">
                  <input className={inputCls} value={draft.tournament.format} onChange={(e) => mutate((d) => void (d.tournament.format = e.target.value))} />
                </Field>
                <Field label="Слотов всего">
                  <input type="number" className={inputCls} value={draft.tournament.slotsTotal} onChange={(e) => mutate((d) => void (d.tournament.slotsTotal = parseInt(e.target.value) || 0))} />
                </Field>
                <Field label="Слотов занято">
                  <input type="number" className={inputCls} value={draft.tournament.slotsRegistered} onChange={(e) => mutate((d) => void (d.tournament.slotsRegistered = parseInt(e.target.value) || 0))} />
                </Field>
                <Field label="Стартовый взнос">
                  <input className={inputCls} value={draft.tournament.entryFee} onChange={(e) => mutate((d) => void (d.tournament.entryFee = e.target.value))} />
                </Field>
                <label className="flex items-center gap-2.5 text-[12px] text-cyberx-muted cursor-pointer select-none self-end pb-2">
                  <input
                    type="checkbox"
                    checked={draft.tournament.registrationOpen}
                    onChange={(e) => mutate((d) => void (d.tournament.registrationOpen = e.target.checked))}
                    className="accent-[#E32124] h-4 w-4"
                  />
                  Регистрация открыта
                </label>
              </div>
              <Field label="Описание">
                <textarea rows={3} className={inputCls} value={draft.tournament.description} onChange={(e) => mutate((d) => void (d.tournament.description = e.target.value))} />
              </Field>
            </div>
          )}

          {/* ============ ВКЛАДКА: АКЦИИ ============ */}
          {activeTab === 'promos' && (
            <>
              {draft.promotions.map((promo, pi) => (
                <div key={promo.id} className="rounded-2xl border border-white/[0.08] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-cyberx-red">Акция {pi + 1}</span>
                    <span className="text-[10px] font-mono text-cyberx-faint">код: {promo.code}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Заголовок">
                      <input className={inputCls} value={promo.title} onChange={(e) => mutate((d) => void (d.promotions[pi].title = e.target.value))} />
                    </Field>
                    <Field label="Метка">
                      <input className={inputCls} value={promo.tag} onChange={(e) => mutate((d) => void (d.promotions[pi].tag = e.target.value))} />
                    </Field>
                    <Field label="Скидка / оффер">
                      <input className={inputCls} value={promo.discount} onChange={(e) => mutate((d) => void (d.promotions[pi].discount = e.target.value))} />
                    </Field>
                    <Field label="Период">
                      <input className={inputCls} value={promo.period} onChange={(e) => mutate((d) => void (d.promotions[pi].period = e.target.value))} />
                    </Field>
                  </div>
                  <Field label="Описание">
                    <input className={inputCls} value={promo.description} onChange={(e) => mutate((d) => void (d.promotions[pi].description = e.target.value))} />
                  </Field>
                  <Field label="Промокод (копируется гостями)">
                    <input className={inputCls} value={promo.code} onChange={(e) => mutate((d) => void (d.promotions[pi].code = e.target.value))} />
                  </Field>
                </div>
              ))}
            </>
          )}

          {/* ============ ВКЛАДКА: СИСТЕМА ============ */}
          {activeTab === 'system' && (
            <>
              {/* Статус бэкенда */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Globe size={15} className={apiConnected ? 'text-emerald-400' : 'text-cyberx-faint'} />
                  <span className="eyebrow text-white">{apiConnected ? 'Бэкенд CMS подключён' : 'Бэкенд CMS не подключён'}</span>
                </div>
                {apiConnected ? (
                  <p className="text-[12px] text-cyberx-muted leading-relaxed">
                    Адрес: <span className="font-mono text-white/85">{cms.apiBase()}</span>
                    {lastPublishedAt && (
                      <>
                        {' · '}последняя публикация: <span className="font-mono text-white/85">{new Date(lastPublishedAt).toLocaleString('ru-RU')}</span>
                      </>
                    )}
                  </p>
                ) : (
                  <p className="text-[12px] text-cyberx-muted leading-relaxed">
                    Сейчас изменения по кнопке «Опубликовать» видны только в вашем браузере.
                    Чтобы они обновлялись для всех посетителей без перезаливки сайта:
                    разверните сервер CMS из папки <span className="font-mono text-white/85">server/</span>
                    (инструкция — <span className="font-mono text-white/85">server/README.md</span>: Render / Railway / свой VPS, всё за 10 минут)
                    и укажите его адрес в <span className="font-mono text-white/85">src/config.ts</span> (CMS_API_BASE).
                  </p>
                )}
              </div>

              {/* Секретная ссылка */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-3">
                <span className="eyebrow text-white block">Секретная ссылка владельца</span>
                <p className="text-[12px] text-cyberx-muted">Сохраните в закладки — по ней открывается вход в кабинет (PIN).</p>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={`${window.location.origin}/#admin?key=${MASTER_SECRET_KEY}`} className={inputCls} />
                  <button
                    onClick={copySecretLink}
                    className="shrink-0 h-9 px-4 rounded-xl bg-cyberx-red hover:bg-[#FF2A2E] text-white text-[11px] font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    {copiedLink ? <CheckCheck size={13} /> : <Copy size={13} />}
                    {copiedLink ? 'Готово' : 'Копировать'}
                  </button>
                </div>
              </div>

              {/* PIN */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-3">
                <span className="eyebrow text-white block">PIN-код</span>
                <div className="flex items-center gap-2.5">
                  <input type="password" maxLength={8} placeholder="Новый PIN (мин. 4)" value={newPin} onChange={(e) => setNewPin(e.target.value)} className={`${inputCls} !w-52`} />
                  <button onClick={handleUpdatePin} className="h-9 px-4 rounded-xl border border-white/[0.15] text-[11px] font-mono uppercase tracking-wider text-white hover:border-white/35 transition-all">
                    Сменить
                  </button>
                </div>
                <p className="text-[11px] text-cyberx-faint">PIN хранится в браузере этого устройства. По умолчанию: 5500.</p>
              </div>

              {/* Экспорт / импорт / сброс */}
              <div className="rounded-2xl border border-white/[0.08] p-5 space-y-3">
                <span className="eyebrow text-white block">Резервные копии</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button onClick={handleExport} className="h-9 px-4 rounded-xl border border-white/[0.15] text-[11px] font-mono uppercase tracking-wider text-white hover:border-white/35 transition-all flex items-center gap-1.5">
                    <Download size={13} className="text-cyberx-red" /> Экспорт JSON
                  </button>
                  <input
                    ref={importRef}
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                      handleImport(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                  <button
                    onClick={() => importRef.current?.click()}
                    className="h-9 px-4 rounded-xl border border-white/[0.15] text-[11px] font-mono uppercase tracking-wider text-white hover:border-white/35 transition-all flex items-center gap-1.5"
                  >
                    <Upload size={13} className="text-cyberx-red" /> Импорт JSON
                  </button>
                  <button
                    onClick={handleReset}
                    className="h-9 px-4 rounded-xl border border-cyberx-red/40 text-[11px] font-mono uppercase tracking-wider text-cyberx-red hover:bg-cyberx-red/10 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 size={13} /> Сбросить локальный черновик
                  </button>
                </div>
              </div>

              {/* Выход */}
              <div className="pt-1">
                <button
                  onClick={onLogout}
                  className="px-5 py-3 rounded-xl border border-white/[0.12] text-cyberx-muted hover:text-white hover:border-white/30 text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <LogOut size={14} /> Завершить сессию владельца
                </button>
              </div>
            </>
          )}
        </div>

        {/* Футер: действия */}
        <div className="shrink-0 border-t border-white/[0.08] px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-cyberx-faint min-h-[16px]">
            {status ? (
              <span className={status.tone === 'ok' ? 'text-emerald-300' : status.tone === 'err' ? 'text-red-400' : 'text-white/70'}>
                {status.text}
              </span>
            ) : (
              <span>
                {apiConnected
                  ? 'Публикация обновляет сайт для всех посетителей мгновенно'
                  : 'Локальный режим: изменения видны только в этом браузере'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            {status?.tone === 'ok' && <CheckCircle2 size={15} className="text-emerald-300" />}
            <button
              onClick={handleDraft}
              className="btn-ghost !py-2.5"
              disabled={saving}
            >
              <Save size={13} /> Черновик
            </button>
            <button
              onClick={handlePublish}
              className="btn-primary !py-2.5"
              disabled={saving}
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Globe size={13} />}
              {saving ? 'Публикация…' : 'Опубликовать'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- редактор галереи ---------- */
const GalleryEditor: React.FC<{
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="eyebrow text-cyberx-faint flex items-center gap-1.5">
          <ImageIcon size={13} className="text-cyberx-red" />
          {label} ({value.length})
        </label>
        <button
          type="button"
          onClick={() => onChange([...value, ''])}
          className="text-[10px] font-mono uppercase tracking-wider text-cyberx-muted hover:text-white flex items-center gap-1 transition-colors"
        >
          <Plus size={12} /> Добавить
        </button>
      </div>
      <div className="space-y-2">
        {value.map((url, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-12 h-9 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              {url ? <img src={url} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={13} className="text-cyberx-faint" />}
            </div>
            <input type="text" value={url} placeholder="URL или /images/…" className={inputCls}
              onChange={(e) => {
                const copy = [...value];
                copy[i] = e.target.value;
                onChange(copy);
              }}
            />
            {cms.connected() && <ImageUploadButton onLoaded={(u) => { const copy = [...value]; copy[i] = u; onChange(copy); }} />}
            <button
              type="button"
              onClick={() => {
                const copy = [...value];
                copy.splice(i, 1);
                onChange(copy);
              }}
              className="p-1.5 rounded-lg text-cyberx-faint hover:text-cyberx-red transition-colors"
              title="Удалить"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {value.length === 0 && (
          <div className="text-[11px] font-mono text-cyberx-faint py-2">Галерея пуста — сайт будет показывать главное фото.</div>
        )}
      </div>
    </div>
  );
};

const ImageUploadButton: React.FC<{ onLoaded: (url: string) => void }> = ({ onLoaded }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (!f) return;
          setBusy(true);
          const url = await cms.uploadImage(f);
          setBusy(false);
          if (url) onLoaded(url);
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        className="shrink-0 p-2 rounded-lg border border-white/[0.12] text-cyberx-muted hover:text-white hover:border-white/30 transition-all disabled:opacity-40"
        title="Загрузить файл на сервер CMS"
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
      </button>
    </>
  );
};
