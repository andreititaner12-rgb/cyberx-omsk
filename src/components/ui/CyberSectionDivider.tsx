import React from 'react';

interface CyberSectionDividerProps {
  tag?: string;
}

/**
 * Минималистичный разделитель: тонкая линия и номер.
 * Без плашек и бейджей.
 */
export const CyberSectionDivider: React.FC<CyberSectionDividerProps> = ({ tag }) => {
  return (
    <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 my-2 sm:my-4 select-none">
      <div className="flex items-center gap-4">
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.16))',
          }}
        />
        {tag && (
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
            {tag}
          </span>
        )}
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(to left, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.16))',
          }}
        />
      </div>
    </div>
  );
};
