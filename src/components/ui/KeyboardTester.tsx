import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/sound';
import { Keyboard, RefreshCw, Cpu } from 'lucide-react';

interface KeyDef {
  code: string;
  label: string;
  width?: string;
}

const KEYBOARD_ROWS: KeyDef[][] = [
  [
    { code: 'Escape', label: 'ESC', width: 'w-10' },
    { code: 'Digit1', label: '1' },
    { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' },
    { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' },
    { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' },
    { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' },
    { code: 'Equal', label: '=' },
    { code: 'Backspace', label: 'BACK', width: 'w-14' },
  ],
  [
    { code: 'Tab', label: 'TAB', width: 'w-12' },
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' },
    { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[' },
    { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', width: 'w-12' },
  ],
  [
    { code: 'CapsLock', label: 'CAPS', width: 'w-14' },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: 'ENTER', width: 'w-16' },
  ],
  [
    { code: 'ShiftLeft', label: 'SHIFT', width: 'w-18' },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' },
    { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'SHIFT', width: 'w-16' },
    { code: 'ArrowUp', label: '▲', width: 'w-8' },
  ],
  [
    { code: 'ControlLeft', label: 'CTRL', width: 'w-12' },
    { code: 'MetaLeft', label: 'WIN', width: 'w-10' },
    { code: 'AltLeft', label: 'ALT', width: 'w-10' },
    { code: 'Space', label: 'SPACE (G3ms Mechanical)', width: 'flex-1' },
    { code: 'AltRight', label: 'ALT', width: 'w-10' },
    { code: 'ControlRight', label: 'CTRL', width: 'w-12' },
    { code: 'ArrowLeft', label: '◄', width: 'w-8' },
    { code: 'ArrowDown', label: '▼', width: 'w-8' },
    { code: 'ArrowRight', label: '►', width: 'w-8' },
  ],
];

export const KeyboardTester: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space']));
  const [pressCount, setPressCount] = useState<number>(0);
  const [detectedKeyboard, setDetectedKeyboard] = useState<string>('Ardor / Dark Project Mechanical');
  const [isInside, setIsInside] = useState<boolean>(false);

  const isInsideRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if USB HID devices are available
    if (typeof navigator !== 'undefined' && 'hid' in navigator) {
      (navigator as unknown as { hid: { getDevices: () => Promise<Array<{ productName?: string }>> } }).hid
        .getDevices()
        .then((devices) => {
          if (devices && devices.length > 0 && devices[0].productName) {
            setDetectedKeyboard(devices[0].productName);
          }
        })
        .catch(() => {});
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // ONLY register keypresses when cursor is hovering inside the keyboard block
      if (!isInsideRef.current) return;

      // Ignore key repeats when held down so count only increments once per real press
      if (e.repeat) return;

      // Prevent page scrolling on Space / Tab when actively typing inside the tester
      if (['Space', 'Tab'].includes(e.code)) {
        e.preventDefault();
      }

      setActiveKeys((prev) => new Set(prev).add(e.code));
      setTestedKeys((prev) => new Set(prev).add(e.code));
      setPressCount((c) => c + 1);

      sound.playClick();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isInsideRef.current) return;

      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleMouseEnter = () => {
    isInsideRef.current = true;
    setIsInside(true);
  };

  const handleMouseLeave = () => {
    isInsideRef.current = false;
    setIsInside(false);
    setActiveKeys(new Set());
  };

  // WebHID USB Device Recognition Trigger
  const handleDetectDevice = async () => {
    sound.playClick();
    if (typeof navigator !== 'undefined' && 'hid' in navigator) {
      try {
        const devices = await (navigator as unknown as { hid: { requestDevice: (opt: { filters: unknown[] }) => Promise<Array<{ productName?: string }>> } }).hid.requestDevice({ filters: [] });
        if (devices && devices.length > 0 && devices[0].productName) {
          setDetectedKeyboard(`✓ ${devices[0].productName}`);
        }
      } catch {
        // Dialog cancelled
      }
    } else {
      setDetectedKeyboard('Ardor Gaming Blade Pro (1000Hz USB)');
    }
  };

  const resetTested = () => {
    sound.playClick();
    setTestedKeys(new Set());
    setPressCount(0);
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="space-y-4 font-mono select-none"
    >
      
      {/* Top Telemetry & Detected Keyboard Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Tested Keys Counter + Activity Beacon */}
        <div className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
          isInside 
            ? 'bg-[#0e0e18] border-[#E32124]/50 shadow-[0_0_15px_rgba(227,33,36,0.15)]' 
            : 'bg-[#0a0a10] border-white/[0.08]'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-zinc-500 block">Проверено клавиш</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 ${
                isInside 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-zinc-800 border-white/10 text-zinc-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isInside ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
                <span>{isInside ? 'ТЕСТЕР АКТИВЕН' : 'НАВЕДИТЕ КУРСОР'}</span>
              </span>
            </div>

            <div className="text-base font-bold text-white mt-0.5">
              {testedKeys.size} / 68 <span className="text-xs text-zinc-400">({pressCount} нажатий)</span>
            </div>
          </div>

          <button
            onClick={resetTested}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Сбросить счетчик"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#E32124]" />
            <span>Сброс</span>
          </button>
        </div>

        {/* Detected Hardware & WebHID scan button */}
        <div className="p-3 rounded-2xl bg-[#0a0a10] border border-white/[0.08] flex items-center justify-between">
          <div className="truncate pr-2">
            <span className="text-[10px] uppercase text-zinc-500 block">Определённая клавиатура</span>
            <div className="text-xs font-bold text-zinc-200 truncate mt-0.5">
              {detectedKeyboard}
            </div>
          </div>
          
          <button
            onClick={handleDetectDevice}
            className="px-2.5 py-1.5 rounded-xl bg-[#E32124]/20 hover:bg-[#E32124] text-[#E32124] hover:text-white border border-[#E32124]/40 text-[10px] font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Определить через WebHID API"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>USB Scan</span>
          </button>
        </div>

      </div>

      {/* Interactive Visual 65% Keyboard Layout */}
      <div className={`p-3.5 sm:p-4 rounded-3xl border transition-all duration-300 shadow-2xl relative overflow-x-auto ${
        isInside 
          ? 'bg-[#08080f] border-[#E32124]/40 shadow-[0_0_25px_rgba(227,33,36,0.15)]' 
          : 'bg-[#06060a] border-white/10 opacity-90'
      }`}>
        
        <div className="min-w-[560px] space-y-1.5">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1 sm:gap-1.5 justify-center">
              {row.map((k) => {
                const isActive = activeKeys.has(k.code);
                const isTested = testedKeys.has(k.code);
                const isWsad = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(k.code);

                return (
                  <button
                    key={k.code}
                    onClick={() => {
                      sound.playClick();
                      setActiveKeys((p) => new Set(p).add(k.code));
                      setTestedKeys((p) => new Set(p).add(k.code));
                      setPressCount((c) => c + 1);
                      setTimeout(() => {
                        setActiveKeys((p) => {
                          const next = new Set(p);
                          next.delete(k.code);
                          return next;
                        });
                      }, 180);
                    }}
                    className={`h-9 sm:h-10 text-[10px] sm:text-[11px] font-bold rounded-lg border transition-all duration-100 flex items-center justify-center cursor-pointer ${
                      k.width || 'w-8 sm:w-9'
                    } ${
                      isActive
                        ? 'bg-[#E32124] text-white border-[#E32124] shadow-[0_0_15px_#E32124] scale-95 translate-y-0.5'
                        : isTested
                        ? 'bg-[#E32124]/20 text-white border-[#E32124]/60 shadow-[0_0_8px_rgba(227,33,36,0.3)]'
                        : isWsad
                        ? 'bg-[#181822] text-zinc-200 border-[#E32124]/40 hover:border-[#E32124]'
                        : 'bg-[#101018] text-zinc-400 border-white/[0.06] hover:bg-[#161622] hover:text-white'
                    }`}
                  >
                    <span>{k.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Live Helper Hint */}
        <div className="mt-3 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-2">
          <Keyboard className="w-3.5 h-3.5 text-[#E32124]" />
          <span>{isInside ? 'Клавиши регистрируются: нажимайте любые кнопки на клавиатуре!' : 'Наведите курсор на блок клавиатуры, чтобы начать тест нажатий!'}</span>
        </div>

      </div>

    </div>
  );
};
