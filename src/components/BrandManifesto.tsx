import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Trophy, ShieldCheck, Flame } from 'lucide-react';
import { AnimatedGroup } from './ui/AnimatedGroup';
import { ElegantDarkPattern } from './ui/ElegantDarkPattern';

export const BrandManifesto: React.FC = () => {
  const stats = [
    {
      icon: Flame,
      value: '3 АРЕНЫ',
      label: 'Флагманские клубы в Омске',
      detail: 'Ленина 19 • Мира 42к1 • Серова 19А',
    },
    {
      icon: Monitor,
      value: '182 ПК',
      label: 'Дисплеи BenQ 600Hz & ASUS 480Hz',
      detail: 'RTX 5070 Ti & Ryzen 7 7800X3D',
    },
    {
      icon: Trophy,
      value: '10 PS5 ЗАЛОВ',
      label: 'VIP & Lounge пространства',
      detail: '2 Premium Squad сьюта + Кинозал 150"',
    },
    {
      icon: ShieldCheck,
      value: '24/7 ONLINE',
      label: 'Круглосуточный сервис',
      detail: 'Прямой оптический канал >1 Гбит/с',
    },
  ];

  return (
    <ElegantDarkPattern variant="crimson" className="pt-20 pb-12 sm:pt-28 sm:pb-16 scroll-mt-24">
      <div id="manifesto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Title & Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm shadow-red-950/40">
            <span>ЭКОСИСТЕМА CYBERX COMMUNITY OMSK</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight">
            CYBERX <span className="text-[#E32124]">//</span> АРЕНЫ ОМСКА
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Премиальные киберспортивные арены в Омске. Соревновательное железо, VIP комнаты и круглосуточный сервис 24/7.
          </p>
        </motion.div>

        {/* 4 Key Pillars with AnimatedGroup staggered blur-slide reveal */}
        <AnimatedGroup preset="blur-slide" staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl border border-white/[0.08] hover:border-[#E32124]/40 bg-gradient-to-b from-[#111118] to-[#09090d] shadow-xl hover:shadow-[0_0_25px_rgba(227,33,36,0.15)] transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#E32124] group-hover:scale-105 group-hover:bg-[#E32124] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                      0{i + 1} //
                    </span>
                  </div>

                  <div className="font-display font-black text-2xl text-white group-hover:text-[#E32124] transition-colors uppercase">
                    {stat.value}
                  </div>
                  
                  <div className="text-xs font-mono font-bold text-zinc-300 mt-1">
                    {stat.label}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 mt-3 font-mono leading-tight">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </AnimatedGroup>

      </div>
    </ElegantDarkPattern>
  );
};
