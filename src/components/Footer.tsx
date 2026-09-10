import React from 'react';
import { ARENAS } from '../data/arenaData';
import { MapPin, Phone, ArrowUpRight, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';
import { scrollToTop, scrollToSection } from '../utils/scroll';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenTournaments }) => {
  return (
    <footer className="relative border-t border-white/[0.08] bg-cyberx-ink overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-10">
        {/* Крупный вордмарк */}
        <div className="pb-14 sm:pb-16 hairline-b">
          <div className="font-display font-black uppercase leading-[0.9] tracking-[-0.015em] text-white select-none">
            <span className="block text-[13vw] sm:text-8xl lg:text-9xl">
              CyberX<span className="text-cyberx-red">.</span>
            </span>
            <span className="block text-[13vw] sm:text-8xl lg:text-9xl text-outline">
              Omsk
            </span>
          </div>
          <p className="mt-6 max-w-lg text-sm text-cyberx-muted leading-relaxed">
            Официальная сеть киберспортивных клубов CyberX Community в Омске.
            Мониторы до 600Hz, Premium-комнаты, два автосимулятора и LAN-сцена
            — в трёх клубах, круглый год и круглые сутки.
          </p>
        </div>

        {/* Колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          {/* Клубы */}
          <div className="lg:col-span-5">
            <div className="eyebrow text-cyberx-faint mb-5">Клубы сети</div>
            <div className="space-y-5">
              {ARENAS.map((arena) => (
                <button
                  key={arena.id}
                  onClick={() => scrollToSection('arenas')}
                  className="group text-left"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display font-bold uppercase text-base text-white group-hover:text-cyberx-red transition-colors">
                      {arena.name.split('//')[0].trim()}
                    </span>
                    <span className="text-[11px] font-mono text-cyberx-faint">{arena.rigsCount} ПК</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-cyberx-muted font-mono">
                    <MapPin size={12} className="text-cyberx-red shrink-0" />
                    {arena.address} · {arena.metro}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div className="lg:col-span-3">
            <div className="eyebrow text-cyberx-faint mb-5">Навигация</div>
            <ul className="space-y-2.5">
              {[
                { label: 'Клубы и пространства', id: 'arenas' },
                { label: 'Прайс-лист', id: 'pricing' },
                { label: 'Тех-арсенал', id: 'hardware' },
                { label: 'Sim-Racing', id: 'sim-racing' },
                { label: 'Турниры и призовой фонд', id: 'tournaments' },
                { label: 'Акции', id: 'promotions' },
                { label: 'Как добраться', id: 'location' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      scrollToSection(item.id);
                    }}
                    className="text-[13px] text-cyberx-muted hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowUpRight size={12} className="text-cyberx-red shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className="lg:col-span-4">
            <div className="eyebrow text-cyberx-faint mb-5">Контакты</div>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenBooking();
                  }}
                  className="text-white hover:text-cyberx-red transition-colors font-medium"
                >
                  Онлайн-бронирование 24/7 →
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTournaments();
                  }}
                  className="text-cyberx-muted hover:text-white transition-colors"
                >
                  Регистрация на турниры
                </button>
              </li>
              <li>
                <a
                  href="https://vk.com/omsklenina"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyberx-muted hover:text-white transition-colors"
                >
                  ВКонтакте — vk.com/omsklenina
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/cyberxcommunityomsklenina"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyberx-muted hover:text-white transition-colors"
                >
                  Telegram — @cyberxcommunityomsklenina
                </a>
              </li>
              <li>
                <a
                  href="tel:+79081109777"
                  className="text-cyberx-muted hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone size={13} className="text-cyberx-red shrink-0" />
                  +7 (908) 110-97-77 — CyberX Arena
                </a>
              </li>
              <li>
                <a
                  href="mailto:cyberx55@yandex.ru"
                  className="text-cyberx-muted hover:text-white transition-colors"
                >
                  cyberx55@yandex.ru — бронь и партнёрство
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-cyberx-faint">
          <span>© 2026 CyberX Community Omsk. Все права защищены.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-cyberx-muted transition-colors cursor-pointer">
              Политика конфиденциальности
            </span>
            <span className="hidden sm:inline hover:text-cyberx-muted transition-colors cursor-pointer">
              Правила посещения
            </span>
            <button
              onClick={() => {
                sound.playClick();
                scrollToTop();
              }}
              className="flex items-center gap-1.5 text-cyberx-red hover:text-white transition-colors uppercase tracking-wider"
            >
              Наверх
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
