import React from 'react';
import { Reveal } from './ui/Reveal';
import { CountUp } from './ui/CountUp';

const STATS = [
  {
    value: 182,
    suffix: '',
    label: 'игровых ПК в сети',
    detail: 'RTX 5070 Ti · i5-14600KF · Ryzen 7 7800X3D',
  },
  {
    value: 600,
    suffix: ' Hz',
    label: 'максимальная герцовка',
    detail: 'BenQ 600Hz в Super VIP и Solo-комнатах',
  },
  {
    value: 10,
    suffix: '',
    label: 'PS5-залов во всех клубах',
    detail: '75–85" 4K 120Hz, DualSense, PS Plus',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'клубы открыты круглосуточно',
    detail: 'без окон и выходных, в любую погоду',
  },
];

export const BrandManifesto: React.FC = () => {
  return (
    <section
      id="manifesto"
      className="relative scroll-mt-24"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28 pb-14 sm:pb-20">
        {/* Редакционное заявление */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal y={14}>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-10 sm:w-14 bg-cyberx-red" aria-hidden />
                <span className="eyebrow text-cyberx-muted">Манифест сети</span>
              </div>
            </Reveal>

            <h2 className="font-display font-black uppercase leading-[0.95] tracking-[-0.01em] text-4xl sm:text-5xl lg:text-[3.9rem] text-white">
              <Reveal>
                <span className="block">Три клуба.</span>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="block text-cyberx-red">Один стандарт.</span>
              </Reveal>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end lg:self-end">
            <Reveal delay={0.15}>
              <p className="text-base sm:text-lg leading-relaxed text-cyberx-muted max-w-xl">
                Сеть CyberX в Омске построена вокруг соревновательного уровня:
                мониторы до 600 герц, бездисковая сеть и железо, на котором
                нельзя экономить.{' '}
                <span className="text-white">
                  Всё остальное — Premium-комнаты, сим-рейсинг, кино-лаунж и
                  сервис — работает на это.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Статистика: числа на тонких линиях, не карточки */}
        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-white/[0.08] divide-x divide-y lg:divide-y-0 divide-white/[0.08]">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="group px-5 sm:px-7 py-7 sm:py-9 transition-colors duration-500 hover:bg-white/[0.025]"
              >
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight tabular-nums">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-[13px] font-medium text-white/85">
                  {stat.label}
                </div>
                <div className="mt-1.5 text-[11px] leading-snug text-cyberx-faint font-mono">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
