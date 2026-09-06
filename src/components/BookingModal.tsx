import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  ExternalLink, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  MapPin,
  Flame
} from 'lucide-react';
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
    title: 'CyberX Arena // Флагман',
    shortTitle: 'Ленина, 19',
    address: 'ул. Ленина, 19',
    langameUrl: 'https://langame.ru/club/799452760',
    qrImage: '/qr/qr-lenina.png',
    description: '86 ПК • 2 Sim-Racing кокпита • 2 Premium зала • 150" Экран',
    badge: 'Центр // Флагман',
  },
  {
    id: 'cyberx-evropa',
    title: 'CyberX Европа // Нефтяники',
    shortTitle: 'Мира, 42к1',
    address: 'просп. Мира, 42, корп. 1',
    langameUrl: 'https://langame.ru/club/799457743',
    qrImage: '/qr/qr-evropa.png',
    description: '46 ПК • Solo Room Ryzen 7800X3D + 600Hz • 3 PS5 зала',
    badge: 'Студгородок',
  },
  {
    id: 'cyberx-oktyabr',
    title: 'CyberX Октябрь // Ленинский',
    shortTitle: 'Серова, 19А',
    address: 'ул. Серова, 19А',
    langameUrl: 'https://langame.ru/club/799456444',
    qrImage: '/qr/qr-oktyabr.png',
    description: '50 ПК • Solo 600Hz • Trio & Duo Rooms • Удобная парковка',
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
  const [selectedClubId, setSelectedClubId] = useState<string>(
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
    // Detect mobile browser environment
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent) || window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const currentClub = CLUBS_BOOKING.find((c) => c.id === selectedClubId) || CLUBS_BOOKING[0];

  const handleOpenExternal = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#0A0A10] border border-white/10 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#E32124]/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="mb-6 font-mono text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E32124]/15 border border-[#E32124]/30 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>ОНЛАЙН БРОНИРОВАНИЕ В 1 КЛИК // 24/7</span>
          </div>
          <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            МОБИЛЬНОЕ <span className="text-[#E32124] drop-shadow-[0_0_15px_rgba(227,33,36,0.6)]">ПРИЛОЖЕНИЕ</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Выбирайте нужный клуб CyberX в Омске и бронируйте желаемый ПК или зал в официальном приложении CyberX Community.
          </p>
        </div>

        {/* Zone indicator if directed from a specific zone card */}
        {defaultZoneId && (
          <div className="mb-4 p-3 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-between font-mono text-xs text-white">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E32124] animate-pulse" />
              <span>Выбрана зона: <strong className="text-white uppercase">{defaultZoneId}</strong></span>
            </div>
            <span className="text-[10px] text-zinc-400">Переход в приложение →</span>
          </div>
        )}

        {/* 1. Club Selector Tabs */}
        <div className="mb-6">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
            <span>1. Выберите клуб для брони:</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {CLUBS_BOOKING.map((club) => {
              const isSelected = selectedClubId === club.id && !showAppStoreQR;
              return (
                <button
                  key={club.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedClubId(club.id);
                    setShowAppStoreQR(false);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181216] border-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.4)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="font-mono font-bold text-xs uppercase text-white truncate">
                    {club.shortTitle}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 truncate mt-1">
                    {club.badge || club.address}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Action Card (Mobile Direct vs Desktop QR) */}
        {isMobileDevice ? (
          /* MOBILE VIEW: Direct 1-Tap Action Buttons */
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#161218] to-[#0D0B12] border border-[#E32124]/40 shadow-xl space-y-4 font-mono text-center">
            
            <div className="w-14 h-14 rounded-2xl bg-[#E32124]/20 border border-[#E32124]/50 flex items-center justify-center mx-auto text-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.4)]">
              <Smartphone className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-sans font-black text-xl text-white uppercase">
                {currentClub.title}
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                {currentClub.address}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                {currentClub.description}
              </p>
            </div>

            {/* Primary Action Button: Open in Langame / CyberX App */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => handleOpenExternal(currentClub.langameUrl)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E32124] to-[#FF2A2E] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(227,33,36,0.7)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/20"
              >
                <span>ЗАБРОНИРОВАТЬ В CYBERX APP</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Secondary Button: Download App in App Store */}
              <button
                onClick={() => handleOpenExternal(APP_STORE_URL)}
                className="w-full py-3 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/10 text-zinc-200 hover:text-white border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>СКАЧАТЬ В APP STORE</span>
              </button>
            </div>

          </div>
        ) : (
          /* DESKTOP VIEW: High-Resolution Scannable QR Code */
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#141016] to-[#0A0A10] border border-[#E32124]/40 shadow-2xl flex flex-col sm:flex-row items-center gap-6 font-mono">
            
            {/* Left: QR Code Box */}
            <div className="relative shrink-0 p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(227,33,36,0.3)] border-2 border-[#E32124]">
              <img
                src={showAppStoreQR ? '/qr/qr-appstore.png' : currentClub.qrImage}
                alt={`QR code for ${showAppStoreQR ? 'App Store' : currentClub.title}`}
                className="w-40 h-40 object-contain rounded-lg"
              />
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#E32124]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#E32124]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#E32124]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#E32124]" />
            </div>

            {/* Right: Info & Steps */}
            <div className="space-y-3 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#E32124] tracking-widest block">
                  {showAppStoreQR ? 'ОФИЦИАЛЬНОЕ ПРИЛОЖЕНИЕ' : currentClub.badge}
                </span>
                <h4 className="font-sans font-black text-lg text-white uppercase">
                  {showAppStoreQR ? 'CYBERX COMMUNITY APP' : currentClub.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {showAppStoreQR ? 'Доступно в App Store для iOS' : currentClub.address}
                </p>
              </div>

              {/* 3 Step Guide */}
              <div className="space-y-1.5 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Наведите камеру смартфона на QR-код</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>Откроется страница {showAppStoreQR ? 'приложения' : 'клуба'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>Выберите свободный ПК или зону</span>
                </div>
              </div>

              {/* Direct Link Button */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleOpenExternal(showAppStoreQR ? APP_STORE_URL : currentClub.langameUrl)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
                >
                  <span>Открыть в браузере</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 3. Bottom App Store Quick Switch Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          
          <button
            onClick={() => {
              sound.playClick();
              setShowAppStoreQR(!showAppStoreQR);
            }}
            className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E32124]" />
            <span>{showAppStoreQR ? '← Вернуться к выбору клубов' : 'Показать QR для скачивания в App Store'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Официальный сервис бронирования Langame</span>
          </div>

        </div>

      </div>
    </div>
  );
};
