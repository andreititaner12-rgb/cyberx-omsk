import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
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
import { UPCOMING_TOURNAMENT, PROMOTIONS } from './data/arenaData';

export function App() {
  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingArenaId, setBookingArenaId] = useState<string | undefined>(undefined);
  const [bookingZoneId, setBookingZoneId] = useState<string | undefined>(undefined);

  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [targetTournamentId, setTargetTournamentId] = useState<string | undefined>(undefined);

  const [adminOpen, setAdminOpen] = useState(false);

  // Selected arena in the ecosystem (Default to CyberX Arena - Flagship)
  const [selectedArenaId, setSelectedArenaId] = useState<string>('cyberx-arena');

  // Dynamic state for live editing by owner
  const [liveTournament, setLiveTournament] = useState(UPCOMING_TOURNAMENT);
  const [livePromos, setLivePromos] = useState(PROMOTIONS);

  // Smooth scroll using Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
  }, []);

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

  const handleSelectArena = (arenaId: string) => {
    setSelectedArenaId(arenaId);
    const el = document.getElementById('arenas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#FEFEFE] selection:bg-[#E32124] selection:text-white">
      
      {/* Global Fluid Mouse Glow Spotlight */}
      <div
        className="pointer-events-none fixed z-30 w-[450px] h-[450px] rounded-full bg-[#E32124]/[0.035] blur-[100px] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Top Header with Retractable Navigation Drawer */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenTournaments={() => handleOpenTournaments()}
          onSelectArena={handleSelectArena}
          tournamentData={liveTournament}
        />

        {/* 2. Three Arenas Ecosystem (Европа, CyberX Arena [в центре], Октябрь) */}
        <ArenaEcosystem
          onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
          selectedArenaId={selectedArenaId}
        />

        {/* 3. Spaces & Rooms Bento Showcase with In-Card Photos & Dynamic Expansion */}
        <ZonesShowcase
          onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
        />

        {/* 4. Dedicated Sim-Racing Banner (2 Кокпита на Ленина) */}
        <div id="sim-racing">
          <SimRacingBanner
            onOpenBooking={(arenaId, zoneId) => handleOpenBooking(arenaId, zoneId)}
          />
        </div>

        {/* 5. Interactive Hardware & Peripherals Visualizer (BenQ 600Hz, Ryzen 7800X3D, RTX 5070 Ti) */}
        <HardwareVisualizer />

        {/* 6. Standalone Upcoming Tournament Spotlight Card */}
        <TournamentCard
          onOpenRegister={(tId) => handleOpenTournaments(tId)}
          onOpenAllTournaments={() => handleOpenTournaments()}
          tournamentData={liveTournament}
        />

        {/* 7. Exclusive Offers & Promos */}
        <PromoSection
          onOpenBooking={() => handleOpenBooking()}
          promotionsList={livePromos}
        />

        {/* 8. Interactive 2GIS Navigation Map Section ("Как до нас добраться?") */}
        <LocationMapSection
          onOpenBooking={(arenaId) => handleOpenBooking(arenaId)}
        />
      </main>

      {/* Footer with subtle CMS link */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

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

      {/* Owner Management Live CMS Panel */}
      <OwnerAdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onSaveLiveTournament={(updated) => setLiveTournament(updated)}
        onSaveLivePromos={(updated) => setLivePromos(updated)}
      />

    </div>
  );
}
export default App;
