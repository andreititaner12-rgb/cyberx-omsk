import React, { useState } from 'react';
import { PROMOTIONS } from '../data/arenaData';
import { Promotion } from '../types';
import { Tag, Check, Copy, CheckCheck, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { AnimatePresence, motion } from 'framer-motion';

interface PromoSectionProps {
  onOpenBooking: () => void;
  promotionsList?: Promotion[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ onOpenBooking, promotionsList }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const promos = promotionsList || PROMOTIONS;

  const copyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promotions" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-3.5">
            <Tag className="w-3.5 h-3.5" />
            Привилегии & Пакеты CyberX Омск
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight uppercase text-white">
            АКЦИИ <span className="text-[#E32124]">//</span> И БОНУСЫ
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Специальные предложения для новых гостей, ночных пакетов и комбо с кальяном в CyberX Arena, Европе и Октябре.
          </p>
        </motion.div>

        {/* Dynamic Card Hover Effect Grid (Rounded) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {promos.map((promo, idx) => {
            const isCopied = copiedCode === promo.code;
            return (
              <div
                key={promo.id}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Fluid Glowing Hover Background (Rounded) */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#E32124]/[0.12] border border-[#E32124]/40 block rounded-3xl"
                      layoutId="promoHoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className={`h-full w-full p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative z-20 transition-all duration-300 border backdrop-blur-xl ${
                  promo.colorScheme === 'red'
                    ? 'bg-[#120a0c]/90 border-[#E32124]/40 shadow-xl shadow-red-950/40'
                    : 'bg-[#08080e]/90 border-white/[0.08] group-hover:border-[#E32124]/40'
                }`}>
                  <div>
                    {/* Badge & Discount (Rounded) */}
                    <div className="flex items-center justify-between gap-2 mb-4 font-mono">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg bg-white/[0.06] text-[#E32124] border border-white/[0.08]">
                        {promo.tag}
                      </span>
                      <span className="font-display font-black text-xs text-white px-3 py-1 rounded-full bg-[#E32124] shadow-md shadow-red-600/30">
                        {promo.discount}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl text-white group-hover:text-[#E32124] transition-colors uppercase">
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
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                          <Check className="w-3.5 h-3.5 text-[#E32124] shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code & Action (Rounded) */}
                  <div className="pt-4 border-t border-white/[0.06] space-y-3 font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#000000]/80 border border-white/[0.08]">
                      <div className="truncate pr-2">
                        <span className="text-[9px] text-zinc-500 uppercase block">Промокод акции</span>
                        <span className="text-xs font-bold text-white tracking-widest">{promo.code}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCode(promo.code);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1 shrink-0"
                      >
                        {isCopied ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Скопирован</span>
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
                      className="w-full py-2.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.15em] text-white bg-white/[0.06] hover:bg-[#E32124] border border-white/[0.08] hover:border-[#E32124] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <span>Активировать пакет</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
