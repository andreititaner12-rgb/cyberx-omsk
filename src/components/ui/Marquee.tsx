import React from 'react';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Бегущая строка — «живая» лента фактов между секциями.
 * Чистый CSS-аниматed track (двойной набор контента, сдвиг на -50%).
 */
export const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const row = (key: string, ariaHidden = false) => (
    <div
      key={key}
      aria-hidden={ariaHidden || undefined}
      className="marquee-anim flex shrink-0 items-center"
      style={{ animation: 'marquee 46s linear infinite' }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="px-6 sm:px-10 font-display font-extrabold uppercase tracking-[0.02em] text-lg sm:text-2xl whitespace-nowrap text-white/85">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyberx-red shrink-0" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-mask marquee-track relative overflow-hidden py-5 sm:py-6 hairline-b hairline-t bg-cyberx-ink select-none ${className}`}
      role="marquee"
      aria-label={items.join(' • ')}
    >
      <div className="flex w-max">
        {row('a')}
        {row('b', true)}
      </div>
    </div>
  );
};
