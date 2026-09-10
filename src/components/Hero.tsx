import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { scrollToSection } from '../utils/scroll';
import { EASE_OUT } from './ui/Reveal';

interface HeroProps {
  isReady?: boolean;
}

const HERO_NAV = [
  { label: 'Клубы', target: 'arenas' },
  { label: 'Прайс', target: 'pricing' },
  { label: 'Железо', target: 'hardware' },
  { label: 'Турниры', target: 'tournaments' },
  { label: 'Акции', target: 'promotions' },
];

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Параллакс и затухание видео при прокрутке
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 900], [0, 220]);
  const videoScale = useTransform(scrollY, [0, 900], [1, 1.08]);
  const contentY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 620], [1, 0]);

  // Видео ставится на паузу вне экрана (разгрузка GPU)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: isReady ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-cyberx-ink"
    >
      {/* Фоновое видео (1920x1080, 30fps, web-оптимизированное) */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
        aria-hidden
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          className="w-full h-full object-cover brightness-[0.62] contrast-[1.06] saturate-[0.92]"
          src="/hero-bg-compact.mp4"
        />
        {/* Читабельность: градиенты сверху/снизу и мягкая виньетка */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyberx-ink/80 via-transparent to-cyberx-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyberx-ink/70 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(5,5,7,0.55) 100%)',
          }}
        />
        {/* Тёплый красный источник света внизу слева — глубина без неона */}
        <div
          className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(closest-side, rgba(227,33,36,0.22), transparent 70%)',
          }}
        />
      </motion.div>

      {/* Контент */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 flex flex-col justify-end pb-40 sm:pb-44"
      >
        {/* Эпиграф */}
        <motion.div {...fadeUp(0.15)} className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 sm:w-16 bg-cyberx-red" aria-hidden />
            <span className="eyebrow text-white/70">
              Сеть киберспортивных арен — Омск
            </span>
          </div>
        </motion.div>

        {/* Заголовок: строки выезжают из-под маски */}
        <h1 className="font-display font-black uppercase leading-[0.88] tracking-[-0.015em] select-none">
          <span className="mask-line">
            <motion.span
              initial={{ y: '110%' }}
              animate={isReady ? { y: '0%' } : undefined}
              transition={{ duration: 1.05, delay: 0.2, ease: EASE_OUT }}
              className="block text-[17.5vw] sm:text-[15vw] lg:text-[11.5rem] text-white"
            >
              CyberX
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span
              initial={{ y: '110%' }}
              animate={isReady ? { y: '0%' } : undefined}
              transition={{ duration: 1.05, delay: 0.32, ease: EASE_OUT }}
              className="block text-[17.5vw] sm:text-[15vw] lg:text-[11.5rem] text-outline"
            >
              Арены Омска
            </motion.span>
          </span>
        </h1>

        {/* Описание + CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">
          <motion.p
            {...fadeUp(0.6)}
            className="max-w-md text-sm sm:text-base leading-relaxed text-white/65"
          >
            182 ПК на мониторах до 600Hz, Premium-комнаты, автосимуляторы
            Sim-Racing и LAN-сцена. Три клуба в центре Омска и в округах —
            открыты круглосуточно.
          </motion.p>

          <motion.div
            {...fadeUp(0.72)}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => {
                sound.playTrigger();
                scrollToSection('arenas');
              }}
              onMouseEnter={() => sound.playHover()}
              className="btn-primary"
            >
              Забронировать стол
              <ArrowUpRight size={14} />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                scrollToSection('manifesto');
              }}
              onMouseEnter={() => sound.playHover()}
              className="btn-ghost"
            >
              Познакомиться
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Нижняя навигационная полоса: строгий порядок КЛУБЫ / ПРАЙС / ЖЕЛЕЗО / ТУРНИРЫ / АКЦИИ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.08] bg-cyberx-ink/40 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex items-center gap-4 sm:gap-8 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {HERO_NAV.map((item, i) => (
                <button
                  key={item.target}
                  onClick={() => {
                    sound.playClick();
                    scrollToSection(item.target);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="group flex items-baseline gap-2 shrink-0 py-1"
                >
                  <span className="eyebrow text-cyberx-faint group-hover:text-cyberx-red transition-colors">
                    0{i + 1}
                  </span>
                  <span className="eyebrow text-white/70 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-3 shrink-0 py-4">
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="eyebrow text-cyberx-faint"
                aria-hidden
              >
                Листайте
              </motion.span>
              <span className="h-8 w-px bg-white/15" aria-hidden />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
