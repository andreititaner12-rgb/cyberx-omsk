import React from 'react';
import { Reveal, MaskLine } from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** опциональная метка в правом верхнем углу сетки заголовка */
  meta?: React.ReactNode;
  className?: string;
}

/**
 * Единый редакционный заголовок секции:
 * моно-индекс + строка-метка, крупный display-заголовок (Tactic Sans),
 * левый лид-абзац. Вместо «плашек и свечений» — воздух и типографика.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  lead,
  meta,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Индекс и метка */}
      <Reveal y={14}>
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="eyebrow text-cyberx-red font-semibold">{index}</span>
          <span className="h-px w-10 sm:w-14 bg-white/15" aria-hidden />
          <span className="eyebrow text-cyberx-muted">{label}</span>
        </div>
      </Reveal>

      {/* Заголовок + лид / мета */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
        <div className="lg:col-span-8">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-[-0.01em] text-4xl sm:text-5xl lg:text-6xl text-white">
            {typeof title === 'string' ? (
              <MaskLine delay={0.05}>{title}</MaskLine>
            ) : (
              <span>{title}</span>
            )}
          </h2>
          {lead && (
            <Reveal delay={0.12} className="mt-5 max-w-xl">
              <p className="text-sm sm:text-base text-cyberx-muted leading-relaxed">
                {lead}
              </p>
            </Reveal>
          )}
        </div>
        {meta && (
          <div className="lg:col-span-4 lg:justify-self-end">
            <Reveal delay={0.2} y={14}>
              <div className="text-left lg:text-right">{meta}</div>
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
};
