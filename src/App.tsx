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
import { Preloader } from './components/Preloader';
import { LivingBackground } from './components/LivingBackground';
import { UPCOMING_TOURNAMENT, PROMOTIONS } from './data/arenaData';

export function App() {
  const [loading, setLoading] = useState(true);

  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingArenaId, setBookingArenaId] = useState<string | undefined>(undefined);
  const [bookingZoneId, setBookingZoneId] = useState<string | undefined>(undefined);

  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [targetTournamentId, setTargetTournamentId] = useState<string | undefined>(undefined);

  const [adminOpen, setAdminOpen] = useState(false);

  // Selected arena in the ecosystem (Default to CyberX Arena - Flagship)
  const [selectedArenaId] = useState<string>('cyberx-arena');

  // Dynamic state for live editing by owner
  const [liveTournament, setLiveTournament] = useState(UPCOMING_TOURNAMENT);
  const [livePromos, setLivePromos] = useState(PROMOTIONS);

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

  return (
    <div className="relative min-h-screen bg-[#040407] text-[#FEFEFE] selection:bg-[#E32124] selection:text-white">
      
      {/* 1. CyberX Sleek Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Global Living Canvas: Animated Cyber Grid Beams & Glowing Orbs */}
      <LivingBackground />

      {/* 3. Global Fluid Mouse Glow Spotlight */}
      <div
        className="pointer-events-none fixed z-40 w-[500px] h-[500px] rounded-full bg-[#E32124]/[0.04] blur-[120px] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* 4. Top Header with Retractable Navigation Drawer (Always present & perfectly aligned) */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenTournaments={() => handleOpenTournaments()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* 5. Full-Screen Cinematic Hero */}
      <Hero />

      {/* 6. Smooth Layered Content Container that rolls smoothly over the Hero */}
      <div className="relative z-20 -mt-10 sm:-mt-14 rounded-t-[36px] sm:rounded-t-[54px] border-t border-white/[0.08] shadow-[0_-30px_70px_rgba(0,0,0,0.95)] overflow-hidden bg-gradient-to-b from-[#07070B] via-[#050508] via-35% via-[#090507] via-70% to-[#030305]">
        
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

        {/* Footer with subtle CMS link */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenTournaments={() => handleOpenTournaments()}
          onOpenAdmin={() => setAdminOpen(true)}
        />

      </div>

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
