import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../../utils/sound';
import { Play, Square, Headphones, Volume2, Flame } from 'lucide-react';

export const AudioSpatialTester: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>('Нажмите PLAY для 3D теста');
  const [activePan, setActivePan] = useState<number>(0); // -1 = Left, 0 = Center, 1 = Right
  const [audioProfile, setAudioProfile] = useState<'footsteps' | 'flat' | 'bass'>('footsteps');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Pre-load CS2 mp3 audio buffer
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const res = await fetch('/audio/cs2-footsteps.mp3');
        const arrayBuf = await res.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        audioBufferRef.current = decoded;
      } catch {
        // Fallback
      }
    };

    loadAudio();

    return () => {
      isPlayingRef.current = false;
      sequenceTimersRef.current.forEach((t) => clearTimeout(t));
      if (currentSourceRef.current) {
        try { currentSourceRef.current.stop(); } catch {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playSpatialChunk = (panValue: number, startTime: number, duration: number) => {
    const ctx = audioCtxRef.current;
    const buffer = audioBufferRef.current;
    if (!ctx || !buffer) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Stereo Panner
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(panValue, ctx.currentTime);
      }

      // Chain of EQ Biquad Filters for realistic distinguishable acoustics
      const mainFilter = ctx.createBiquadFilter();
      const secondaryFilter = ctx.createBiquadFilter();

      if (audioProfile === 'footsteps') {
        // ★ CS2 Esports Clarity Profile (Sharp, crisp, isolated footsteps)
        mainFilter.type = 'peaking';
        mainFilter.frequency.setValueAtTime(3400, ctx.currentTime);
        mainFilter.gain.setValueAtTime(8.5, ctx.currentTime); // +8.5dB boost on footstep click
        mainFilter.Q.setValueAtTime(2.2, ctx.currentTime);

        secondaryFilter.type = 'highpass';
        secondaryFilter.frequency.setValueAtTime(140, ctx.currentTime); // Clear low mud
      } else if (audioProfile === 'bass') {
        // Deep Immersion Bass Rumble Profile
        mainFilter.type = 'lowshelf';
        mainFilter.frequency.setValueAtTime(150, ctx.currentTime);
        mainFilter.gain.setValueAtTime(10.0, ctx.currentTime); // +10dB heavy bass

        secondaryFilter.type = 'highshelf';
        secondaryFilter.frequency.setValueAtTime(4800, ctx.currentTime);
        secondaryFilter.gain.setValueAtTime(-4.0, ctx.currentTime); // Warm high rolloff
      } else {
        // Flat Studio Classic Response
        mainFilter.type = 'allpass';
        secondaryFilter.type = 'allpass';
      }

      source.connect(mainFilter);
      mainFilter.connect(secondaryFilter);

      if (panner) {
        secondaryFilter.connect(panner);
        panner.connect(ctx.destination);
      } else {
        secondaryFilter.connect(ctx.destination);
      }

      const offset = startTime % (buffer.duration || 1);
      source.start(0, offset, duration);
      currentSourceRef.current = source;
    } catch {
      // Handled
    }
  };

  const stopSpatialTest = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentStep('Тест остановлен');
    setActivePan(0);
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];
    if (currentSourceRef.current) {
      try { currentSourceRef.current.stop(); } catch {}
      currentSourceRef.current = null;
    }
  };

  const startSpatialTest = () => {
    sound.playClick();
    if (isPlaying) {
      stopSpatialTest();
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];

    // Phase 1: Left Ear (1.6s)
    setCurrentStep('👣 1. Шаги CS2: СЛЕВА (Левое ухо)');
    setActivePan(-0.95);
    playSpatialChunk(-0.95, 0.2, 1.6);

    // Phase 2: Center Channel (1.6s)
    const t1 = setTimeout(() => {
      if (!isPlayingRef.current) return;
      setCurrentStep('🎯 2. Звуки CS2: ПО ЦЕНТРУ');
      setActivePan(0);
      playSpatialChunk(0, 1.8, 1.6);

      // Phase 3: Right Ear (1.6s)
      const t2 = setTimeout(() => {
        if (!isPlayingRef.current) return;
        setCurrentStep('👣 3. Шаги CS2: СПРАВА (Правое ухо)');
        setActivePan(0.95);
        playSpatialChunk(0.95, 3.4, 1.6);

        // Phase 4: Stereo 3D Surround Stage (1.8s)
        const t3 = setTimeout(() => {
          if (!isPlayingRef.current) return;
          setCurrentStep('💣 4. Объёмная 3D сцена (Оба наушника)');
          setActivePan(0);
          playSpatialChunk(0, 5.0, 1.8);

          const t4 = setTimeout(() => {
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCurrentStep('✓ Тест завершён: чёткое позиционирование HyperX Cloud');
          }, 2000);
          sequenceTimersRef.current.push(t4);
        }, 1700);
        sequenceTimersRef.current.push(t3);
      }, 1700);
      sequenceTimersRef.current.push(t2);
    }, 1700);
    sequenceTimersRef.current.push(t1);
  };

  return (
    <div className="space-y-4 font-mono select-none">
      
      {/* Top Profile Selection Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span className="text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2 font-bold">
          <Headphones className="w-4 h-4 text-[#E32124]" />
          Профиль звука HyperX Cloud:
        </span>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setAudioProfile('footsteps');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all border cursor-pointer flex items-center gap-1.5 ${
              audioProfile === 'footsteps'
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/40 scale-105 ring-1 ring-[#FF3B3F]'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>★ Шаги CS2 (+8dB)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setAudioProfile('flat');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
              audioProfile === 'flat'
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/30'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            Баланс (Классика)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setAudioProfile('bass');
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
              audioProfile === 'bass'
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-md shadow-red-600/30'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            Басс (Immersion +10dB)
          </button>
        </div>
      </div>

      {/* Interactive Soundstage Radar Box */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#08080e] border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Stereo Channel Visualizer & Radar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          
          {/* Left Ear Indicator */}
          <div className={`flex-1 p-3 rounded-2xl border text-center transition-all ${
            activePan < -0.3 
              ? 'bg-[#E32124]/20 border-[#E32124] text-white  scale-105' 
              : 'bg-[#0f0f18] border-white/5 text-zinc-500'
          }`}>
            <span className="text-[10px] uppercase font-bold block">Левый канал</span>
            <div className="text-xs font-bold mt-0.5">
              {activePan < -0.3 ? '● ЗВУК СЛЕВА' : 'L'}
            </div>
          </div>

          {/* Center Radar Icon */}
          <div className="p-3 rounded-2xl bg-black/60 border border-white/10 shrink-0 text-center">
            <Headphones className={`w-6 h-6 mx-auto transition-colors ${isPlaying ? 'text-[#E32124] animate-bounce' : 'text-zinc-500'}`} />
          </div>

          {/* Right Ear Indicator */}
          <div className={`flex-1 p-3 rounded-2xl border text-center transition-all ${
            activePan > 0.3 
              ? 'bg-[#E32124]/20 border-[#E32124] text-white  scale-105' 
              : 'bg-[#0f0f18] border-white/5 text-zinc-500'
          }`}>
            <span className="text-[10px] uppercase font-bold block">Правый канал</span>
            <div className="text-xs font-bold mt-0.5">
              {activePan > 0.3 ? '● ЗВУК СПРАВА' : 'R'}
            </div>
          </div>

        </div>

        {/* Dynamic Equalizer Wave Bars */}
        <div className="h-16 bg-[#0c0c14] rounded-2xl border border-white/5 flex items-end justify-between px-6 py-2.5 gap-1 mb-4">
          {[35, 60, 85, 95, 90, 85, 70, 55, 65, 90, 80, 50, 75, 95, 60, 40].map((h, idx) => {
            const isBoostedZone = audioProfile === 'footsteps' 
              ? (idx >= 6 && idx <= 12) 
              : audioProfile === 'bass' 
              ? (idx <= 5) 
              : false;

            const currentHeight = isPlaying 
              ? (isBoostedZone ? h : h * 0.65) 
              : 15;

            return (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-[#930E10] to-[#E32124] rounded-t transition-all duration-200"
                style={{
                  height: `${currentHeight}%`,
                  opacity: isPlaying ? 1 : 0.25,
                  boxShadow: isPlaying && isBoostedZone ? '0 0 10px #E32124' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Live Step Status Readout & Play Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/10">
          <div className="text-xs text-zinc-200 font-semibold truncate flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#E32124] shrink-0" />
            <span className="truncate">{currentStep}</span>
          </div>

          <button
            onClick={startSpatialTest}
            className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shrink-0 ${
              isPlaying
                ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                : 'bg-[#E32124] hover:bg-[#FF2A2E] text-white shadow-red-600/40 hover:scale-105 active:scale-95'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Стоп</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>▶ Запустить 3D тест CS2</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
