import React, { useState } from 'react';
import { PROMOTIONS } from '../data/arenaData';
import { Promotion } from '../types';
import { Check, Copy, CheckCheck, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';

interface PromoSectionProps {
  onOpenBooking: () => void;
  promotionsList?: Promotion[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onOpenBooking, promotionsList }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const promos = promotionsList || PROMOTIONS;

  const copyCode = (code: string) => {
    sound.playClick();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
    } catch {
      /* clipboard недоступен — молча игнорируем */
    }
    setCopied(code);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="promotions" className="relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28">
        <SectionHeading
          index="07"
          label="Привилегии"
          title="Акции и бонусы"
          lead="Постоянные и сезонные предложения: приветственные пакеты для новых гостей, комбо с кальяном и бонусная программа «приведи друга». Промокоды копируются в один клик."
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {promos.map((promo, idx) => (
            <Reveal key={promo.id} delay={idx * 0.08} y={30} className="h-full">
              <article className="group flex flex-col h-full rounded-2xl border border-white/[0.08] bg-cyberx-surface p-6 sm:p-7 transition-all duration-500 hover:border-white/[0.18] hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <span className="eyebrow text-cyberx-faint">{promo.tag}</span>
                  <span className="font-display font-extrabold text-cyberx-red text-lg text-right leading-tight">
                    {promo.discount}
                  </span>
                </div>

                <h3 className="mt-4 font-display font-extrabold uppercase text-xl text-white tracking-tight leading-tight">
                  {promo.title}
                </h3>
                <div className="mt-1.5 text-[11px] font-mono text-cyberx-faint">{promo.period}</div>

                <p className="mt-4 text-[13px] text-white/70 leading-relaxed">
                  {promo.description}
                </p>

                <ul className="mt-5 pt-4 hairline-t space-y-2">
                  {promo.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/75">
                      <Check size={13} className="text-cyberx-red shrink-0 mt-0.5" />
                      <span className="leading-snug">{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Промокод-билет */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/[0.18] px-4 py-3">
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-cyberx-faint font-mono">
                        Промокод
                      </div>
                      <div className="mt-0.5 font-mono text-xs sm:text-[13px] font-semibold text-white tracking-[0.12em] truncate">
                        {promo.code}
                      </div>
                    </div>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className="flex items-center gap-1.5 eyebrow text-cyberx-muted hover:text-white transition-colors shrink-0"
                      aria-label={`Скопировать промокод ${promo.code}`}
                    >
                      {copied === promo.code ? (
                        <>
                          <CheckCheck size={14} className="text-emerald-400" />
                          <span className="text-emerald-400">Готово</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      sound.playTrigger();
                      onOpenBooking();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="mt-3 w-full btn-ghost !py-3"
                  >
                    Активировать
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
