import React from 'react';

interface CyberSectionDividerProps {
  tag?: string;
}

export const CyberSectionDivider: React.FC<CyberSectionDividerProps> = ({ 
  tag,
}) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10 select-none">
      <div className="relative flex items-center justify-center">
        
        {/* Left Gradient Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-[#E32124]/30" />

        {/* Center Minimal Telemetry Pill */}
        {tag ? (
          <div className="mx-4 px-3 py-0.5 rounded-full bg-[#090910] border border-white/[0.08] flex items-center shadow-sm">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
              {tag}
            </span>
          </div>
        ) : (
          <div className="mx-3 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E32124]/70" />
            <span className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        )}

        {/* Right Gradient Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/10 to-[#E32124]/30" />

      </div>
    </div>
  );
};
