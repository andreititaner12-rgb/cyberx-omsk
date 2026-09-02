import React, { useState } from 'react';
import { PROMOTIONS } from '../data/arenaData';
import { Promotion } from '../types';
import { Tag, Check, Copy, CheckCheck, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface PromoSectionProps {
  onOpenBooking: () => void;
  promotionsList?: Promotion[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onOpenBooking, promotionsList }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promos = promotionsList || PROMOTIONS;

  const copyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promotions" className="relative py-24 sm:py-32 bg-[#070709] overflow-hidden">
      
      {/* Glow background */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/25 text-[#FF1E27] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <Tag className="w-3.5 h-3.5" />
              Привилегии & Пакеты
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
              АКТУАЛЬНЫЕ <span className="text-[#FF1E27]">//</span> АКЦИИ
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              Специальные предложения для ночных сессий, командных тренировок и новых резидентов экосистемы.
            </p>
          </div>

          <div>
            <span className="text-xs font-mono text-zinc-400">
              Действует во всех трех аренах
            </span>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => {
            const isCopied = copiedCode === promo.code;
            return (
              <div
                key={promo.id}
                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 backdrop-blur-xl ${
                  promo.colorScheme === 'red'
                    ? 'bg-gradient-to-b from-[#1c1114] to-[#0e0a0c] border-[#FF1E27]/40 shadow-xl shadow-red-950/30'
                    : 'bg-gradient-to-b from-[#14141c] to-[#0a0a0e] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-white/[0.06] text-[#FF1E27] border border-white/[0.08]">
                      {promo.tag}
                    </span>
                    <span className="font-display font-black text-sm text-white px-3 py-1 rounded-full bg-[#FF1E27]/20 border border-[#FF1E27]/30">
                      {promo.discount}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#FF1E27] transition-colors">
                    {promo.title}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400 mt-1 mb-4">
                    {promo.period}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {promo.description}
                  </p>

                  {/* Perks list */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                    {promo.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-[#FF1E27] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Promo Code & Action */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#08080c] border border-white/[0.08]">
                    <div className="truncate pr-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Промокод</span>
                      <span className="text-xs font-mono font-bold text-white tracking-widest">{promo.code}</span>
                    </div>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1 shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Скопирован</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
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
                    className="w-full py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-white/[0.06] hover:bg-[#FF1E27] border border-white/[0.08] hover:border-[#FF1E27] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Активировать пакет</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
