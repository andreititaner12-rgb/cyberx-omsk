import React, { useState, useEffect } from 'react';
import { ALL_TOURNAMENTS } from '../data/arenaData';
import { Tournament } from '../types';
import { 
  X, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTournamentId?: string;
}

export const TournamentModal: React.FC<TournamentModalProps> = ({
  isOpen,
  onClose,
  targetTournamentId,
}) => {
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('ALL');
  const [activeTournament, setActiveTournament] = useState<Tournament>(
    ALL_TOURNAMENTS.find((t) => t.id === targetTournamentId) || ALL_TOURNAMENTS[0]
  );
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>('');
  const [captainName, setCaptainName] = useState<string>('');
  const [captainPhone, setCaptainPhone] = useState<string>('');
  const [telegramHandle, setTelegramHandle] = useState<string>('');
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setRegisteredSuccess(false);
      if (targetTournamentId) {
        const found = ALL_TOURNAMENTS.find((t) => t.id === targetTournamentId);
        if (found) {
          setActiveTournament(found);
          setIsRegistering(true);
        }
      } else {
        setIsRegistering(false);
      }
    }
  }, [isOpen, targetTournamentId]);

  // Lock background scroll & close on Escape while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTournaments = selectedGameFilter === 'ALL'
    ? ALL_TOURNAMENTS
    : ALL_TOURNAMENTS.filter((t) => t.game === selectedGameFilter);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTrigger();
    setRegisteredSuccess(true);
  };

  const handleClose = () => {
    sound.playClick();
    setRegisteredSuccess(false);
    setIsRegistering(false);
    onClose();
  };

  return (
    <div 
      onClick={handleClose} 
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn select-none overscroll-contain"
    >
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#0d0d14] border border-white/10 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {registeredSuccess ? (
          <div className="text-center py-12 space-y-4 font-mono">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              Команда {teamName || '«Stack»'} зарегистрирована!
            </h3>

            <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
              Вы успешно заявлены на <span className="text-[#E32124] font-semibold">{activeTournament.title}</span>. 
              Главный судья турнира свяжется с капитаном в Telegram: <span className="text-white font-mono">{telegramHandle || '@captain'}</span> для подтверждения сетки.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Турнир:</span>
                <span className="text-white">{activeTournament.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Дата и время:</span>
                <span className="text-white">{activeTournament.date} // {activeTournament.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Призовой фонд:</span>
                <span className="text-[#E32124] font-bold">{activeTournament.prizePool}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setRegisteredSuccess(false);
                  setIsRegistering(false);
                }}
                className="px-8 py-3 rounded-2xl font-mono font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] transition-all shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Вернуться к турнирному списку
              </button>
            </div>
          </div>
        ) : isRegistering ? (
          <div>
            {/* Back Button */}
            <button
              onClick={() => setIsRegistering(false)}
              className="text-xs font-mono text-zinc-400 hover:text-white mb-4 flex items-center gap-1 cursor-pointer"
            >
              ← Назад к списку турниров
            </button>

            <div className="mb-6 font-mono">
              <span className="text-xs font-bold text-[#E32124] uppercase tracking-wider block mb-1">
                РЕГИСТРАЦИЯ КОМАНДЫ
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                {activeTournament.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeTournament.date} • {activeTournament.location} • Призовой фонд: {activeTournament.prizePool}
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Название команды / Клана *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: CyberSquad 55"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Никнейм & ФИО капитана *</label>
                  <input
                    type="text"
                    required
                    placeholder="s1mple / Александр"
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Telegram капитана для связи *</label>
                  <input
                    type="text"
                    required
                    placeholder="@captain_tg"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1">Телефон капитана *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (908) 110-97-77"
                    value={captainPhone}
                    onChange={(e) => setCaptainPhone(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                  />
                </div>
              </div>

              {/* Tournament rules & fee summary */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-white/[0.06] space-y-2 text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E32124]" />
                  Условия участия:
                </div>
                <div className="text-zinc-400">
                  • Взнос: <span className="text-white font-semibold">{activeTournament.entryFee}</span>.
                </div>
                <div className="text-zinc-400">
                  • Игра на LAN-серверах CyberX с мониторами BenQ 600Hz / ASUS 480Hz.
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="px-5 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="py-3 px-8 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  Завершить регистрацию
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 font-mono">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E32124]/15 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3 h-3" />
                Турнирный календарь CyberX Омск
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Сезонные LAN-Турниры <span className="text-[#E32124]">//</span> 2026
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Регулярные чемпионаты в CyberX Arena, Европе и Октябре с денежными призами и трансляциями.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none font-mono">
              {['ALL', 'CS2', 'DOTA 2', 'VALORANT', 'EA FC 25'].map((game) => (
                <button
                  key={game}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGameFilter(game);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedGameFilter === game
                      ? 'bg-[#E32124] text-white border-[#E32124]'
                      : 'bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white'
                  }`}
                >
                  {game === 'ALL' ? 'Все дисциплины' : game}
                </button>
              ))}
            </div>

            {/* Tournaments List */}
            <div className="space-y-4 font-mono">
              {filteredTournaments.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-gradient-to-r from-[#12121c] to-[#0a0a0f] border border-white/[0.08] hover:border-[#E32124]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#E32124]/20 text-[#E32124] border border-[#E32124]/30">
                        {t.game}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {t.date} // {t.time}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-white uppercase">
                      {t.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
                        {t.location}
                      </span>
                      <span>•</span>
                      <span>{t.format}</span>
                      <span>•</span>
                      <span>Слоты: {t.slotsRegistered}/{t.slotsTotal}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-zinc-500 uppercase block">Призовой фонд</span>
                      <div className="font-display font-black text-xl text-white">
                        {t.prizePool}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playTrigger();
                        setActiveTournament(t);
                        setIsRegistering(true);
                      }}
                      className="py-2.5 px-5 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>Регистрация</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
