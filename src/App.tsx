import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandManifesto } from './components/BrandManifesto';
import { ArenaEcosystem } from './components/ArenaEcosystem';
import { ZonesShowcase } from './components/ZonesShowcase';
import { SimRacingBanner } from './components/SimRacingBanner';
import { HardwareVisualizer } from './components/HardwareVisualizer';
import { TournamentCard } from './components/TournamentCard';
import { PromoSection } from './components/PromoSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TournamentModal } from './components/TournamentModal';
import { OwnerAdminModal } from './components/OwnerAdminModal';
import { OwnerSecurityGate, MASTER_SECRET_KEY } from './components/OwnerSecurityGate';
import { Preloader } from './components/Preloader';
import { UPCOMING_TOURNAMENT, PROMOTIONS } from './data/arenaData';
import { Shield } from 'lucide-react';

export function App() {
  const [loading, setLoading] = useState(true);

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

  // Dynamic state for live editing by owner
  const [liveTournament, setLiveTournament] = useState(UPCOMING_TOURNAMENT);
  const [livePromos, setLivePromos] = useState(PROMOTIONS);

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // Mouse spotlight coordinates
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#FEFEFE] selection:bg-[#E32124] selection:text-white">
      
      {/* 1. CyberX Sleek Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Global Fluid Mouse Glow Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(227, 33, 36, 0.045), transparent 75%)`,
        }}
      />

      {/* 3. Top Header with Retractable Navigation Drawer */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
      />

      {/* 4. Full-Screen Sticky Hero Canvas */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#020204]">
        <Hero />
      </div>

      {/* 5. Smooth Layered Content Container that rolls smoothly OVER the Hero */}
      <div 
        id="content-curtain"
        className="relative z-10 rounded-t-[36px] sm:rounded-t-[50px] border-t border-white/[0.1] shadow-[0_-30px_90px_rgba(0,0,0,0.98)] overflow-hidden bg-gradient-to-b from-[#07070B] via-[#050508] via-30% via-[#0A0507] via-65% to-[#030305]"
      >
        
        {/* Ambient Crimson Nebula Glow Accents */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#E32124]/[0.08] rounded-full blur-[180px]" />
        <div className="pointer-events-none absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#930E10]/[0.05] rounded-full blur-[200px]" />
        <div className="pointer-events-none absolute top-2/3 left-0 w-[800px] h-[800px] bg-[#E32124]/[0.04] rounded-full blur-[220px]" />

        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#E32124]/70 to-transparent z-10" />

        <main className="relative z-10 space-y-12 sm:space-y-16">
          
          {/* A. Brand Manifesto & Core Pillars (CYBERX // АРЕНЫ ОМСКА) */}
          <BrandManifesto />

          {/* B. Three Arenas Ecosystem (Европа, CyberX Arena [в центре], Октябрь) */}
          <ArenaEcosystem
            onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
            selectedArenaId={selectedArenaId}
          />

          {/* C. Spaces & Rooms Bento Showcase with In-Card Photos & Dynamic Expansion */}
          <ZonesShowcase
            onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
          />

          {/* D. Dedicated Sim-Racing Banner (2 Кокпита на Ленина) */}
          <div id="sim-racing">
            <SimRacingBanner
              onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
            />
          </div>

          {/* E. Interactive Hardware & Peripherals Visualizer (BenQ 600Hz, Ryzen 7800X3D, RTX 5070 Ti) */}
          <HardwareVisualizer />

          {/* F. Standalone Upcoming Tournament Spotlight Card */}
          <TournamentCard
            onOpenRegister={(tId) => handleOpenTournaments(tId)}
            onOpenAllTournaments={() => handleOpenTournaments()}
            tournamentData={liveTournament}
          />

          {/* G. Exclusive Offers & Promos */}
          <PromoSection
            onOpenBooking={() => handleOpenBooking()}
            promotionsList={livePromos}
          />

          {/* H. Interactive 2GIS Navigation Map Section ("Как до нас добраться?") */}
          <LocationMapSection
            onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
          />
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenTournaments={() => handleOpenTournaments()}
        />

      </div>

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
        onLogout={handleOwnerLogout}
      />

    </div>
  );
}
export default App;
