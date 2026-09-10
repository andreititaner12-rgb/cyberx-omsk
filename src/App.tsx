import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
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
import { UPCOMING_TOURNAMENT, PROMOTIONS, ZONES } from './data/arenaData';
import { ZoneType } from './types';
import { sound } from './utils/sound';
import { Shield } from 'lucide-react';

export function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioPlayedRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingArenaId, setBookingArenaId] = useState<string | undefined>(undefined);
  const [bookingZoneId, setBookingZoneId] = useState<string | undefined>(undefined);

  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [targetTournamentId, setTargetTournamentId] = useState<string | undefined>(undefined);

  // Security Gate & Owner Dashboard State
  const [gateOpen, setGateOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isOwnerAuth, setIsOwnerAuth] = useState(false);

  // Selected arena in the ecosystem (Default to CyberX Arena - Flagship)
  const [selectedArenaId] = useState<string>('cyberx-arena');

  // Dynamic state for live editing by owner with localStorage persistence
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

  // Scroll parallax for content curtain elevation
  const { scrollY } = useScroll();
  const curtainScale = useTransform(scrollY, [0, 600], [0.97, 1]);
  const curtainBorderRadius = useTransform(scrollY, [0, 600], ['44px', '32px']);

  // Voice Intro Welcome audio (Single-trigger guarantee)
  const playWelcomeVoice = () => {
    if (audioPlayedRef.current || isMuted || sound.hasVoiceStarted()) return;
    audioPlayedRef.current = true;
    sound.playVoiceGreeting().catch(() => {});
  };

  // Check URL hash & session for secret admin access
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

  // Smooth scroll using Lenis
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  // Pause / Resume Lenis when any modal is opened / closed
  useEffect(() => {
    const isAnyModalOpen = tournamentsOpen || bookingOpen || adminOpen || gateOpen;
    if (isAnyModalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
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
    if (!audioPlayedRef.current && !sound.hasVoiceStarted()) {
      playWelcomeVoice();
    }
  };

  return (
    <div 
      onClick={() => {
        // Enable Web-Audio UI sounds on user gesture
        sound.setEnabled(!isMuted);
        if (!audioPlayedRef.current && !loading && !sound.hasVoiceStarted()) {
          playWelcomeVoice();
        }
      }}
      className="relative min-h-screen bg-[#020204] text-[#FEFEFE] selection:bg-[#E32124] selection:text-white cursor-default overflow-x-hidden"
    >
      
      {/* 1. CyberX CS2 Tactical Crosshair Reticle Cursor */}
      <CustomCrosshairCursor />

      {/* 2. CyberX Sleek Loading Screen */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* 3. Top Header with macOS Blurry Mask & Retractable Navigation */}
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

      {/* Fixed Ambient Breathing Side-Glows to eliminate black voids on wide screens */}
      <div className="pointer-events-none fixed top-1/4 -left-48 w-[400px] sm:w-[550px] h-[700px] bg-[#E32124]/[0.035] rounded-full blur-[140px] z-0 will-change-transform" />
      <div className="pointer-events-none fixed top-1/2 -right-48 w-[400px] sm:w-[550px] h-[700px] bg-[#E32124]/[0.03] rounded-full blur-[140px] z-0 will-change-transform" />

      {/* 4. Full-Screen Cinematic Hero */}
      <Hero isReady={!loading} />

      {/* 5. Parallax Scrolling Content Curtain Over Hero */}
      <motion.div 
        id="content-curtain"
        style={{
          scale: curtainScale,
          borderTopLeftRadius: curtainBorderRadius,
          borderTopRightRadius: curtainBorderRadius,
        }}
        className="relative z-20 border-t border-white/[0.12] shadow-[0_-30px_90px_rgba(0,0,0,0.98)] overflow-hidden bg-[#040407] transform-gpu origin-top"
      >
        
        {/* Ambient Shimmering Crimson Nebula Glow Accents */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E32124]/[0.06] rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#930E10]/[0.04] rounded-full blur-[180px]" />
        <div className="pointer-events-none absolute top-2/3 left-0 w-[600px] h-[600px] bg-[#E32124]/[0.035] rounded-full blur-[180px]" />

        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#E32124]/70 to-transparent z-10" />

        <main className="relative z-10 space-y-6 sm:space-y-10">
          
          {/* A. Brand Manifesto & Core Pillars (CYBERX // АРЕНЫ ОМСКА) */}
          <BrandManifesto />

          {/* Section Divider 01 */}
          <CyberSectionDivider tag="01" />

          {/* B. Three Arenas Ecosystem (Европа, CyberX Arena [в центре], Октябрь) */}
          <ArenaEcosystem
            onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
            selectedArenaId={selectedArenaId}
          />

          {/* Section Divider 02 */}
          <CyberSectionDivider tag="02" />

          {/* C. Spaces & Rooms Bento Showcase with In-Card Photos & Dynamic Expansion */}
          <ZonesShowcase
            onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
            zonesList={liveZones}
          />

          {/* Section Divider 03 */}
          <CyberSectionDivider tag="03" />

          {/* D. Dedicated Sim-Racing Banner (2 Кокпита на Ленина) */}
          <div id="sim-racing">
            <SimRacingBanner
              onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
            />
          </div>

          {/* Section Divider 04 */}
          <CyberSectionDivider tag="04" />

          {/* E. Interactive Hardware & Peripherals Visualizer (BenQ 600Hz, Ryzen 7800X3D, RTX 5070 Ti) */}
          <HardwareVisualizer />

          {/* Section Divider 05 */}
          <CyberSectionDivider tag="05" />

          {/* F. Standalone Upcoming Tournament Spotlight Card */}
          <TournamentCard
            onOpenRegister={(tId) => handleOpenTournaments(tId)}
            onOpenAllTournaments={() => handleOpenTournaments()}
            tournamentData={liveTournament}
          />

          {/* Section Divider 06 */}
          <CyberSectionDivider tag="06" />

          {/* G. Interactive Price List Section */}
          <PriceSection
            onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
          />

          {/* Section Divider 07 */}
          <CyberSectionDivider tag="07" />

          {/* H. Exclusive Offers & Promos */}
          <PromoSection
            onOpenBooking={() => handleOpenBooking()}
            promotionsList={livePromos}
          />

          {/* Section Divider 08 */}
          <CyberSectionDivider tag="08" />

          {/* I. Interactive 2GIS Navigation Map Section ("Как добраться?") */}
          <LocationMapSection
            onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
          />
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenTournaments={() => handleOpenTournaments()}
        />

      </motion.div>

      {/* Floating Owner Badge (Only visible when authenticated as owner) */}
      {isOwnerAuth && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setAdminOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#E32124] hover:bg-[#FF2A2E] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(227,33,36,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <Shield className="w-4 h-4" />
            <span>⚡ РЕЖИМ ВЛАДЕЛЬЦА // CMS</span>
          </button>
        </div>
      )}

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultArenaId={bookingArenaId}
        defaultZoneId={bookingZoneId}
      />

      {/* Tournament Hub Modal */}
      <TournamentModal
        isOpen={tournamentsOpen}
        onClose={() => setTournamentsOpen(false)}
        targetTournamentId={targetTournamentId}
      />

      {/* Owner Security Gate Terminal (Triggered by Secret URL) */}
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

      {/* Owner Management Live CMS Panel */}
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
