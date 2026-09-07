import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Trophy, ShieldCheck, Flame } from 'lucide-react';

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
    <section id="manifesto" className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden scroll-mt-24">
      
      {/* Background Ambient Gradient Accents */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E32124]/[0.06] rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Title & Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E32124]/10 border border-[#E32124]/30 text-[#E32124] text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm shadow-red-950/40"
          >
            <span>ЭКОСИСТЕМА CYBERX COMMUNITY OMSK</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white leading-tight"
          >
            CYBERX <span className="text-[#E32124]">//</span> АРЕНЫ ОМСКА
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Премиальные киберспортивные арены в Омске. Соревновательное железо, VIP комнаты и круглосуточный сервис 24/7.
          </motion.p>
        </motion.div>

        {/* 4 Key Pillars Grid with Staggered Deliberate Revealing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.12 * i + 0.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="glass-card p-6 rounded-3xl border border-white/[0.08] hover:border-[#E32124]/40 transition-all duration-300 group relative overflow-hidden"
              >
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

                <div className="text-[11px] text-zinc-500 mt-1.5 font-mono leading-tight">
                  {stat.detail}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
