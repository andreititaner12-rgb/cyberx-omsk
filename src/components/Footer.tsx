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
    <footer className="relative bg-transparent border-t border-white/[0.08] pt-16 pb-12 overflow-hidden text-zinc-400">
      
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
                  <svg className="w-3.5 h-3.5 fill-[#0077FF] shrink-0" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C3.592 0 0 3.592 0 8.316v7.368C0 20.408 3.592 24 8.316 24h7.368C20.408 24 24 20.408 24 15.684V8.316C24 3.592 20.408 0 15.684 0zm3.692 17.141h-1.744c-.66 0-.863-.525-2.055-1.716-1.04-.997-1.503-1.127-1.763-1.127-.367 0-.472.105-.472.61v1.547c0 .42-.135.686-1.248.686-1.841 0-3.882-1.118-5.32-3.195-2.164-3.056-2.753-5.362-2.753-5.836 0-.262.105-.505.61-.505h1.744c.453 0 .62.21.795.702.873 2.518 2.33 4.726 2.934 4.726.227 0 .332-.105.332-.682V10.74c-.07-1.226-.717-1.332-.717-1.77 0-.21.175-.42.455-.42h2.74c.384 0 .524.21.524.665v3.585c0 .384.174.524.288.524.227 0 .42-.14.846-.568 1.328-1.488 2.273-3.766 2.273-3.766.122-.262.332-.465.786-.465h1.744c.524 0 .638.262.524.665-.218.997-2.316 3.96-2.42 4.135-.218.35-.306.507 0 .917.219.297.944.918 1.424 1.487.892 1.023 1.573 1.879 1.757 2.473.183.595-.105.88-.638.88z"/>
                  </svg>
                  <span>Группа ВКонтакте CyberX Омск</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/cyberxcommunityomsklenina"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Telegram: @cyberxcommunityomsklenina</span>
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
