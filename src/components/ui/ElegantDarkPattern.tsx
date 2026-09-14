import React from 'react';

interface ElegantDarkPatternProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'crimson' | 'nebula';
}

/**
 * Фоновая среда секции: глубокий обсидиан + два очень тихих
 * красных радиальных пятна (статичные, без пульсации).
 */
export const ElegantDarkPattern: React.FC<ElegantDarkPatternProps> = ({
  children,
  className = '',
  variant = 'crimson',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-cyberx-ink pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {variant === 'crimson' && (
          <>
            <div
              className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(227,33,36,0.07), transparent 70%)',
              }}
            />
            <div
              className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(138,15,18,0.1), transparent 70%)',
              }}
            />
          </>
        )}
        {variant === 'nebula' && (
          <div
            className="absolute top-0 right-1/4 w-[700px] h-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgba(89,5,7,0.12), transparent 70%)',
            }}
          />
        )}
        {variant === 'subtle' && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, rgba(227,33,36,0.05), transparent 70%)',
            }}
          />
        )}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
