import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { sound } from '../utils/sound';
import { scrollToSection, scrollToTop } from '../utils/scroll';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTournaments: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

const NAV_ITEMS = [
  { label: 'Клубы', target: 'arenas' },
  { label: 'Прайс', target: 'pricing' },
  { label: 'Железо', target: 'hardware' },
  { label: 'Турниры', target: 'tournaments' },
  { label: 'Акции', target: 'promotions' },
  { label: 'Как добраться', target: 'location' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  isMuted = false,
  onToggleMute,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Блокируем скролл под мобильным меню
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const go = (target: string) => {
    sound.playClick();
    setMenuOpen(false);
    if (target === 'top') {
      scrollToTop();
    } else {
      scrollToSection(target);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cyberx-ink/85 backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-500 ${
              scrolled ? 'h-16' : 'h-20 sm:h-24'
            }`}
          >
            {/* Логотип */}
            <button
              onClick={() => go('top')}
              className="flex items-center gap-3 group shrink-0"
              aria-label="Наверх"
            >
              <img
                src="/logo-omsk.png"
                alt="CyberX Omsk"
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? 'h-8' : 'h-9 sm:h-10'
                }`}
              />
              <span className="hidden lg:block eyebrow text-cyberx-faint border-l border-white/10 pl-3 group-hover:text-white transition-colors">
                Омск // 24/7
              </span>
            </button>

            {/* Десктоп-навигация */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => go(item.target)}
                  onMouseEnter={() => sound.playHover()}
                  className="group relative py-2 eyebrow text-cyberx-muted hover:text-white transition-colors duration-300"
                >
                  {item.label}
                  <span
                    className="absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-cyberx-red transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                </button>
              ))}
            </nav>

            {/* Правые действия */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="tel:+79081109777"
                onMouseEnter={() => sound.playHover()}
                className="hidden xl:flex items-center gap-2 eyebrow text-cyberx-muted hover:text-white transition-colors py-2"
                title="Позвонить в CyberX Arena"
              >
                <Phone className="w-3.5 h-3.5 text-cyberx-red" />
                +7 908 110-97-77
              </a>

              {onToggleMute && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleMute();
                  }}
                  className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cyberx-muted hover:text-white hover:border-white/25 transition-all"
                  aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                  title={isMuted ? 'Включить звук' : 'Выключить звук'}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    {isMuted ? (
                      <path d="m22 9-6 6M16 9l6 6" />
                    ) : (
                      <>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </>
                    )}
                  </svg>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playTrigger();
                  onOpenBooking();
                }}
                onMouseEnter={() => sound.playHover()}
                className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full bg-cyberx-red hover:bg-[#FF2A2E] text-white eyebrow font-semibold transition-all duration-300 hover:-translate-y-px active:scale-95"
              >
                Бронь
              </button>

              {/* Мобильный бургер */}
              <button
                onClick={() => {
                  sound.playClick();
                  setMenuOpen((v) => !v);
                }}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white"
                aria-label="Меню"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню: полноэкранный лист с крупными ссылками */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cyberx-ink/97 backdrop-blur-2xl flex flex-col"
          >
            <nav className="flex-1 flex flex-col justify-center px-6 sm:px-10 gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.target}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(item.target)}
                  className="group flex items-baseline gap-4 py-3.5 hairline-b text-left"
                >
                  <span className="eyebrow text-cyberx-faint w-8">0{i + 1}</span>
                  <span className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white group-hover:text-cyberx-red transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="px-6 sm:px-10 pb-10 pt-6 space-y-4"
            >
              <button
                onClick={() => {
                  sound.playTrigger();
                  setMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full btn-primary"
              >
                Забронировать стол
              </button>
              <div className="flex items-center justify-between text-cyberx-muted">
                <a href="tel:+79081109777" className="eyebrow hover:text-white transition-colors">
                  +7 908 110-97-77
                </a>
                <span className="eyebrow text-cyberx-faint">Омск // 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
