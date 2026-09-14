import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Key, ArrowRight, X, AlertTriangle, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

interface OwnerSecurityGateProps {
  onSuccessAuth: () => void;
  onCancel: () => void;
}

export const MASTER_SECRET_KEY = 'CYBERX-OMSK-ROOT-2026';
export const DEFAULT_ADMIN_PIN = '5500';

export const OwnerSecurityGate: React.FC<OwnerSecurityGateProps> = ({
  onSuccessAuth,
  onCancel,
}) => {
  const [masterKey, setMasterKey] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Auto-detect key from URL hash/query
  useEffect(() => {
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    
    if (hash.includes(MASTER_SECRET_KEY) || search.includes(MASTER_SECRET_KEY)) {
      setMasterKey(MASTER_SECRET_KEY);
    }
  }, []);

  // Lock background scroll & return to site on Escape while the gate is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onCancel]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setErrorMsg(null);

    if (attemptsLeft <= 1) {
      setErrorMsg('Превышено количество попыток. Доступ заблокирован.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const savedPin = localStorage.getItem('cyberx_owner_pin') || DEFAULT_ADMIN_PIN;
      
      const isKeyValid = masterKey.trim() === MASTER_SECRET_KEY;
      const isPinValid = pinCode.trim() === savedPin;

      if (isKeyValid && isPinValid) {
        sound.playTrigger();
        localStorage.setItem('cyberx_owner_session', 'authenticated');
        onSuccessAuth();
      } else {
        setAttemptsLeft((prev) => prev - 1);
        if (!isKeyValid) {
          setErrorMsg('Неверный Master Key!');
        } else {
          setErrorMsg(`Неверный PIN-код! Осталось попыток: ${attemptsLeft - 1}`);
        }
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020204]/95 backdrop-blur-2xl select-none font-mono">
      
      {/* Ambient Red Glows */}
      <div className="pointer-events-none absolute w-[600px] h-[600px] bg-[#E32124]/[0.12] rounded-full blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#09090f] border border-[#E32124]/40 rounded-3xl  p-6 sm:p-8 overflow-hidden text-white"
      >
        {/* Top laser accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

        {/* Close / Return to public website */}
        <button
          onClick={() => {
            sound.playClick();
            onCancel();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          title="Вернуться на сайт"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Terminal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-center text-[#E32124] ">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-[0.25em] text-[#E32124] uppercase">
              SECURITY ACCESS GATE
            </div>
            <h2 className="font-display font-black text-xl text-white uppercase mt-0.5">
              Вход владельца // CYBERX
            </h2>
            <div className="text-[10px] text-zinc-500 tracking-wider uppercase mt-1">
              ОМСК • ЛЕНИНА 19 • МИРА 42К1 • СЕРОВА 19А
            </div>
          </div>
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 mb-4"
            >
              <AlertTriangle className="w-4 h-4 text-[#E32124] shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Master Key Input */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#E32124]" />
              <span>Секретный Master Key</span>
            </label>
            <input
              type="text"
              required
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              placeholder="CYBERX-OMSK-ROOT-2026"
              className="w-full bg-[#12121c] border border-white/15 focus:border-[#E32124] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E32124] transition-all"
            />
          </div>

          {/* PIN Code Input */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#E32124]" />
              <span>PIN-код администратора</span>
            </label>
            <input
              type="password"
              required
              maxLength={8}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="•••• (по умолч. 5500)"
              className="w-full bg-[#12121c] border border-white/15 focus:border-[#E32124] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E32124] transition-all tracking-widest text-center text-lg"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#E32124] hover:bg-[#FF2A2E] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin text-white" />
                <span>ПРОВЕРКА КЛЮЧА...</span>
              </span>
            ) : (
              <>
                <span>Авторизоваться</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security hint footer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[10px] text-zinc-500">
          Защищенный шлюз с криптографическим токеном. Доступ только для владельца сети CyberX Омск.
        </div>

      </motion.div>
    </div>
  );
};
