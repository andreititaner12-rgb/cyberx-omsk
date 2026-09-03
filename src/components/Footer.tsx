import React from 'react';
import { ARENAS } from '../data/arenaData';
import { MapPin, Phone, Send, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenBooking, 
  onOpenTournaments,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#000000] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden text-zinc-400">
      
      {/* Glow highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E32124]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-omsk.png"
                alt="CyberX Omsk"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-display font-black text-xl tracking-tight text-white uppercase">
                CYBERX<span className="text-[#E32124]">.</span>OMSK
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Официальная сеть киберспортивных клубов CyberX Community в Омске. <strong className="text-white">CyberX Arena</strong> (Ленина), <strong className="text-white">CyberX Европа</strong> (Мира) и <strong className="text-white">CyberX Октябрь</strong> (Серова). Мониторы BenQ 600Hz, Premium сьюты, 2 автосимулятора Sim-Racing и круглосуточный сервис 24/7.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#E32124] pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Все 3 клуба в Омске работают 24/7</span>
            </div>
          </div>

          {/* 3 Arena Locations Quick Info (Rounded) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              3 Клуба в Омске (Arena, Европа, Октябрь)
            </span>

            <div className="space-y-3 text-xs font-mono">
              {ARENAS.map((arena) => (
                <div key={arena.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-colors">
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span>{arena.name.split('//')[0].trim()}</span>
                    <span className="text-[10px] text-[#E32124] px-2 py-0.5 rounded-md bg-[#E32124]/10">{arena.rigsCount} ПК</span>
                  </div>
                  <div className="text-zinc-400 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#E32124]" />
                    <span>{arena.address} ({arena.metro})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
              Быстрый доступ
            </span>

            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>Онлайн бронь в Омске 24/7</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTournaments}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>Турниры Омска & Призы</span>
                </button>
              </li>
              <li>
                <a
                  href="https://vk.com/omsklenina"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Группа ВКонтакте CyberX Омск</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+79081109777"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CyberX Arena: +7 (908) 110-97-77</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                Для бронирования и сотрудничества:
              </span>
              <a href="mailto:cyberx55@yandex.ru" className="text-xs font-mono text-white hover:text-[#E32124] transition-colors">
                cyberx55@yandex.ru
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© 2026 CYBERX COMMUNITY OMSK. Все права защищены.</span>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAdmin();
                }}
                className="hover:text-zinc-300 transition-colors flex items-center gap-1 text-[11px] opacity-60 hover:opacity-100"
                title="Панель владельца клубов"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Панель управления</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Политика конфиденциальности</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Правила посещения</span>
            <button
              onClick={scrollToTop}
              className="text-[#E32124] hover:text-white transition-colors uppercase"
            >
              Наверх ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
