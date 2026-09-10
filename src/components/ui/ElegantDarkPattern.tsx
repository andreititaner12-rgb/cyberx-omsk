import React from 'react';

interface ElegantDarkPatternProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'crimson' | 'nebula' | 'grid';
}

export const ElegantDarkPattern: React.FC<ElegantDarkPatternProps> = ({
  children,
  className = '',
  variant = 'crimson',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#040407] pointer-events-none" />

      {/* 2. Living Shimmering Crimson & Obsidian Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {variant === 'crimson' && (
          <>
            {/* Top-Left Ambient Orb */}
            <div 
              className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#E32124]/[0.05] rounded-full blur-[140px] animate-pulse" 
              style={{ animationDuration: '8s' }} 
            />
            {/* Center-Right Crimson Core */}
            <div 
              className="absolute top-1/3 -right-24 w-[700px] h-[700px] bg-[#7A0D10]/[0.06] rounded-full blur-[160px] animate-pulse" 
              style={{ animationDuration: '11s', animationDelay: '2s' }} 
            />
            {/* Bottom-Center Obsidian Hue */}
            <div 
              className="absolute -bottom-24 left-1/3 w-[650px] h-[650px] bg-[#E32124]/[0.04] rounded-full blur-[150px] animate-pulse" 
              style={{ animationDuration: '9s', animationDelay: '4s' }} 
            />
          </>
        )}

        {variant === 'nebula' && (
          <>
            <div 
              className="absolute top-0 right-1/4 w-[800px] h-[500px] bg-[#5C0A0D]/[0.07] rounded-full blur-[160px] animate-pulse" 
              style={{ animationDuration: '10s' }} 
            />
            <div 
              className="absolute bottom-0 left-1/4 w-[750px] h-[450px] bg-[#141026]/[0.08] rounded-full blur-[150px] animate-pulse" 
              style={{ animationDuration: '12s', animationDelay: '3s' }} 
            />
          </>
        )}

        {variant === 'subtle' && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#E32124]/[0.035] rounded-full blur-[180px]" 
          />
        )}

        {/* 3. Subtle Cyber Dot Mesh Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.045] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* 4. Elegant Vignette Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,6,0.85)_100%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};
