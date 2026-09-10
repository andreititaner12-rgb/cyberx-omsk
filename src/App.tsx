import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandManifesto } from './components/BrandManifesto';
import { ArenaEcosystem } from './components/ArenaEcosystem';
import { ZonesShowcase } from './components/ZonesShowcase';
import { SimRacingBanner } from './components/SimRacingBanner';
import { HardwareVisualizer } from './components/HardwareVisualizer';
import { TournamentCard } from './components/TournamentCard';
import { PriceSection } from './components/PriceSection';
import { PromoSection } from './components/PromoSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TournamentModal } from './components/TournamentModal';
import { OwnerAdminModal } from './components/OwnerAdminModal';
import { OwnerSecurityGate, MASTER_SECRET_KEY } from './components/OwnerSecurityGate';
import { CustomCrosshairCursor } from './components/CustomCrosshairCursor';
import { Preloader } from './components/Preloader';
import { CyberSectionDivider } from './components/ui/CyberSectionDivider';
import { Marquee } from './components/ui/Marquee';
import { Shield } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { UPCOMING_TOURNAMENT, PROMOTIONS, ZONES } from './data/arenaData';
import { ZoneType } from './types';
import { sound } from './utils/sound';
import { registerLenis } from './utils/scroll';

const MARQUEE_ITEMS = [
  '182 игровых ПК',
  'мониторы до 600Hz',
  '3 клуба в Омске',
  'Sim-Racing · Moza Direct Drive',
  'Premium-комнаты',
  'PS5 Deluxe залы',
  'LAN-турниры',
  'открыты 24/7',
];

export function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioPlayedRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Модалки
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingArenaId, setBookingArenaId] = useState<string | undefined>(undefined);
  const [bookingZoneId, setBookingZoneId] = useState<string | undefined>(undefined);

  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [targetTournamentId, setTargetTournamentId] = useState<string | undefined>(undefined);

  // Терминал владельца
  const [gateOpen, setGateOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isOwnerAuth, setIsOwnerAuth] = useState(false);

  const [selectedArenaId] = useState('cyberx-arena');

  // Живые данные владельца (localStorage)
  const [liveTournament, setLiveTournament] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberx_live_tournament');
      return saved ? JSON.parse(saved) : UPCOMING_TOURNAMENT;
    } catch {
      return UPCOMING_TOURNAMENT;
    }
  });

  const [livePromos, setLivePromos] = useState(() => {
    try {
      const saved = localStorage.getItem('cyberx_live_promos');
      return saved ? JSON.parse(saved) : PROMOTIONS;
    } catch {
      return PROMOTIONS;
    }
  });

  const [liveZones, setLiveZones] = useState<ZoneType[]>(() => {
    try {
      const saved = localStorage.getItem('cyberx_live_zones');
      return saved ? JSON.parse(saved) : ZONES;
    } catch {
      return ZONES;
    }
  });

  // Голосовое приветствие (один раз, по первому жесту)
  const playWelcomeVoice = () => {
    if (audioPlayedRef.current || isMuted || sound.hasVoiceStarted()) return;
    audioPlayedRef.current = true;
    sound.playVoiceGreeting().catch(() => {});
  };

  // Секретный вход владельца
  useEffect(() => {
    const isAuthed = localStorage.getItem('cyberx_owner_session') === 'authenticated';
    setIsOwnerAuth(isAuthed);

    const checkSecretUrl = () => {
      const hash = window.location.hash || '';
      const search = window.location.search || '';

      if (hash.includes('admin') || search.includes(MASTER_SECRET_KEY) || hash.includes(MASTER_SECRET_KEY)) {
        if (isAuthed) {
          setAdminOpen(true);
        } else {
          setGateOpen(true);
        }
      }
    };

    checkSecretUrl();
    window.addEventListener('hashchange', checkSecretUrl);
    return () => window.removeEventListener('hashchange', checkSecretUrl);
  }, []);

  // Плавный скролл Lenis
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    registerLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      registerLenis(null);
    };
  }, [loading]);

  // Останавливаем Lenis под открытыми модалками
  useEffect(() => {
    const anyOpen = tournamentsOpen || bookingOpen || adminOpen || gateOpen;
    if (anyOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [tournamentsOpen, bookingOpen, adminOpen, gateOpen]);

  const handleOpenBooking = (arenaId?: string, zoneId?: string) => {
    setBookingArenaId(arenaId);
    setBookingZoneId(zoneId);
    setBookingOpen(true);
  };

  const handleOpenTournaments = (tournamentId?: string) => {
    setTargetTournamentId(tournamentId);
    setTournamentsOpen(true);
  };

  const handleOwnerLogout = () => {
    localStorage.removeItem('cyberx_owner_session');
    setIsOwnerAuth(false);
    setAdminOpen(false);
    setGateOpen(false);
    window.location.hash = '';
  };

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <div
      onClick={() => {
        // Первый жест: отпирание Web Audio + голосовое приветствие
        sound.setEnabled(!isMuted);
        if (!audioPlayedRef.current && !loading && !sound.hasVoiceStarted()) {
          playWelcomeVoice();
        }
      }}
      className="grain relative min-h-screen bg-cyberx-ink text-cyberx-text selection:bg-[#E32124] selection:text-white overflow-x-hidden"
    >
      {/* Тактический курсор */}
      <CustomCrosshairCursor />

      {/* Прелоадер */}
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Шапка */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
        isMuted={isMuted}
        onToggleMute={() => {
          const next = !isMuted;
          setIsMuted(next);
          sound.setEnabled(!next);
        }}
      />

      {/* Hero */}
      <Hero isReady={!loading} />

      {/* Контент */}
      <main className="relative z-10">
        {/* Лента фактов */}
        <Marquee items={MARQUEE_ITEMS} />

        {/* Манифест */}
        <BrandManifesto />

        <CyberSectionDivider />

        {/* 01. Клубы */}
        <ArenaEcosystem
          onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
          selectedArenaId={selectedArenaId}
        />

        <CyberSectionDivider />

        {/* 02. Зоны */}
        <ZonesShowcase
          onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
          zonesList={liveZones}
        />

        <CyberSectionDivider />

        {/* 03. Sim-Racing */}
        <SimRacingBanner
          onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
        />

        <CyberSectionDivider />

        {/* 04. Железо */}
        <HardwareVisualizer />

        <CyberSectionDivider />

        {/* 05. Турнир */}
        <TournamentCard
          onOpenRegister={(tId) => handleOpenTournaments(tId)}
          onOpenAllTournaments={() => handleOpenTournaments()}
          tournamentData={liveTournament}
        />

        <CyberSectionDivider />

        {/* 06. Прайс */}
        <PriceSection
          onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
        />

        <CyberSectionDivider />

        {/* 07. Акции */}
        <PromoSection
          onOpenBooking={() => handleOpenBooking()}
          promotionsList={livePromos}
        />

        <CyberSectionDivider />

        {/* 08. География */}
        <LocationMapSection
          onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
        />
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
      />

      {/* Плавающий бейдж владельца */}
      {isOwnerAuth && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setAdminOpen(true)}
            className="px-4 py-2.5 rounded-full bg-cyberx-red hover:bg-[#FF2A2E] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Shield className="w-4 h-4" />
            <span>Режим владельца</span>
          </button>
        </div>
      )}

      {/* Модалки */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultArenaId={bookingArenaId}
        defaultZoneId={bookingZoneId}
      />

      <TournamentModal
        isOpen={tournamentsOpen}
        onClose={() => setTournamentsOpen(false)}
        targetTournamentId={targetTournamentId}
      />

      {gateOpen && (
        <OwnerSecurityGate
          onSuccessAuth={() => {
            setIsOwnerAuth(true);
            setGateOpen(false);
            setAdminOpen(true);
          }}
          onCancel={() => {
            setGateOpen(false);
            window.location.hash = '';
          }}
        />
      )}

      <OwnerAdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onSaveLiveTournament={(updated) => setLiveTournament(updated)}
        onSaveLivePromos={(updated) => setLivePromos(updated)}
        onSaveLiveZones={(updated) => setLiveZones(updated)}
        currentZones={liveZones}
        onLogout={handleOwnerLogout}
      />
    </div>
  );
}
export default App;
