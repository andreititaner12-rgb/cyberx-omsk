import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  ExternalLink,
  Download,
  MapPin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArenaId?: string;
  defaultZoneId?: string;
}

interface ClubBookingInfo {
  id: string;
  title: string;
  shortTitle: string;
  address: string;
  langameUrl: string;
  qrImage: string;
  description: string;
  badge?: string;
}

const CLUBS_BOOKING: ClubBookingInfo[] = [
  {
    id: 'cyberx-arena',
    title: 'CyberX Arena · Флагман',
    shortTitle: 'Ленина, 19',
    address: 'ул. Ленина, 19',
    langameUrl: 'https://langame.ru/club/799452760',
    qrImage: '/qr/qr-lenina.png',
    description: '86 ПК · 2 Sim-Racing кокпита · 2 Premium зала · 150" экран',
    badge: 'Центр · Флагман',
  },
  {
    id: 'cyberx-evropa',
    title: 'CyberX Европа · Нефтяники',
    shortTitle: 'Мира, 42к1',
    address: 'просп. Мира, 42, корп. 1',
    langameUrl: 'https://langame.ru/club/799457743',
    qrImage: '/qr/qr-evropa.png',
    description: '46 ПК · Solo Room Ryzen 7800X3D + 600Hz · 3 PS5 зала',
    badge: 'Студгородок',
  },
  {
    id: 'cyberx-oktyabr',
    title: 'CyberX Октябрь · Ленинский',
    shortTitle: 'Серова, 19А',
    address: 'ул. Серова, 19А',
    langameUrl: 'https://langame.ru/club/799456444',
    qrImage: '/qr/qr-oktyabr.png',
    description: '50 ПК · Solo 600Hz · Trio & Duo Rooms · удобная парковка',
    badge: 'Приватные залы',
  },
];

const APP_STORE_URL = 'https://apps.apple.com/ru/app/cyberx/id6504088566';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultArenaId,
  defaultZoneId,
}) => {
  const [selectedClubId, setSelectedClubId] = useState(
    defaultArenaId || 'cyberx-arena'
  );
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showAppStoreQR, setShowAppStoreQR] = useState(false);

  useEffect(() => {
    if (defaultArenaId) {
      const match = CLUBS_BOOKING.find((c) => c.id === defaultArenaId);
      if (match) setSelectedClubId(match.id);
    }
  }, [defaultArenaId]);

  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || '';
      const mobile = /android|iphone|ipad|ipod|windows phone/i.test(ua) || window.innerWidth < 768;
      setIsMobileDevice(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Блокировка скролла и Escape
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

  if (!isOpen) return null;

  const club = CLUBS_BOOKING.find((c) => c.id === selectedClubId) || CLUBS_BOOKING[0];

  const openExternal = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none overscroll-contain"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto overscroll-contain bg-cyberx-surface border border-white/[0.1] rounded-3xl shadow-modal p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 h-9 w-9 rounded-full border border-white/[0.1] text-cyberx-muted hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
          aria-label="Закрыть"
        >
          <X size={16} />
        </button>

        <div className="eyebrow text-cyberx-red">Бронирование 24/7</div>
        <h3 className="mt-2 font-display font-black uppercase text-2xl sm:text-3xl tracking-tight text-white leading-tight">
          Бронь стола в приложении
        </h3>
        <p className="mt-1.5 text-xs sm:text-[13px] text-cyberx-muted leading-relaxed">
          Выбери клуб CyberX в Омске и забронируй ПК или зал в официальном
          приложении CyberX Community.
        </p>

        {/* Подсветка выбранной зоны */}
        {defaultZoneId && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[11px] font-mono">
            <span className="text-white/85 truncate">
              Зона: <span className="uppercase text-white">{defaultZoneId}</span>
            </span>
            <span className="text-cyberx-faint shrink-0">переход в приложение →</span>
          </div>
        )}

        {/* 1. Клубы */}
        <div className="mt-6">
          <div className="eyebrow text-cyberx-faint mb-3 flex items-center gap-2">
            <MapPin size={13} className="text-cyberx-red" />
            1 · Выбери клуб
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CLUBS_BOOKING.map((c) => {
              const selected = selectedClubId === c.id && !showAppStoreQR;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedClubId(c.id);
                    setShowAppStoreQR(false);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                    selected
                      ? 'border-cyberx-red bg-cyberx-red/[0.07]'
                      : 'border-white/[0.08] hover:border-white/25'
                  }`}
                >
                  <div className="font-mono font-bold text-xs uppercase text-white truncate">
                    {c.shortTitle}
                  </div>
                  <div className="mt-1 text-[10px] text-cyberx-faint truncate">
                    {c.badge || c.address}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Действие: мобильные — кнопки, десктоп — QR */}
        {isMobileDevice ? (
          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 text-center font-mono">
            <div className="mx-auto h-12 w-12 rounded-2xl border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-cyberx-red">
              <Smartphone size={20} />
            </div>
            <h4 className="mt-4 font-sans font-black text-lg text-white uppercase tracking-wide">
              {club.title}
            </h4>
            <p className="text-xs text-white/70 mt-1">{club.address}</p>
            <p className="text-[11px] text-cyberx-faint mt-1">{club.description}</p>

            <div className="mt-5 space-y-2.5">
              <button
                onClick={() => openExternal(club.langameUrl)}
                className="w-full btn-primary"
              >
                Забронировать
                <ExternalLink size={13} />
              </button>
              <button
                onClick={() => openExternal(APP_STORE_URL)}
                className="w-full btn-ghost"
              >
                <Download size={13} />
                Скачать в App Store
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6 font-mono">
            <div className="relative shrink-0 p-2.5 bg-white rounded-2xl">
              <img
                src={showAppStoreQR ? '/qr/qr-appstore.png' : club.qrImage}
                alt={`QR: ${showAppStoreQR ? 'App Store' : club.title}`}
                className="w-40 h-40 object-contain rounded-lg"
              />
            </div>

            <div className="space-y-3 text-left min-w-0">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyberx-red">
                  {showAppStoreQR ? 'Официальное приложение' : club.badge}
                </div>
                <h4 className="font-sans font-black text-lg text-white uppercase tracking-wide">
                  {showAppStoreQR ? 'CyberX Community App' : club.title}
                </h4>
                <p className="text-xs text-cyberx-faint mt-0.5">
                  {showAppStoreQR ? 'Доступно в App Store для iOS' : club.address}
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-white/75">
                {[
                  'Наведи камеру смартфона на QR-код',
                  showAppStoreQR ? 'Откроется страница приложения' : 'Откроется страница клуба',
                  'Выбери свободный ПК или зону',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="h-4 w-4 rounded-full border border-white/20 text-[9px] font-bold text-white/70 flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>

              <button
                onClick={() => openExternal(showAppStoreQR ? APP_STORE_URL : club.langameUrl)}
                className="inline-flex items-center gap-1.5 eyebrow text-cyberx-muted hover:text-white transition-colors"
              >
                Открыть в браузере
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}

        {/* 3. App Store переключатель */}
        <div className="mt-6 pt-4 hairline-t flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
          <button
            onClick={() => {
              sound.playClick();
              setShowAppStoreQR((v) => !v);
            }}
            className="text-cyberx-muted hover:text-white transition-colors flex items-center gap-2"
          >
            <Download size={13} className="text-cyberx-red" />
            {showAppStoreQR ? '← Вернуться к клубам' : 'Показать QR для App Store'}
          </button>
          <span className="text-cyberx-faint">Официальный сервис: Langame</span>
        </div>
      </motion.div>
    </div>
  );
};
