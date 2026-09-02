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
    if (targetTournamentId) {
      const found = ALL_TOURNAMENTS.find((t) => t.id === targetTournamentId);
      if (found) {
        setActiveTournament(found);
        setIsRegistering(true);
      }
    }
  }, [targetTournamentId]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d14] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {registeredSuccess ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              Команда {teamName || '«Stack»'} зарегистрирована!
            </h3>

            <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
              Вы успешно заявлены на <span className="text-[#FF1E27] font-semibold">{activeTournament.title}</span>. 
              Главный судья турнира свяжется с капитаном в Telegram: <span className="text-white font-mono">{telegramHandle || '@captain'}</span> для подтверждения сетки.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto text-left text-xs font-mono space-y-2">
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
                <span className="text-[#FF1E27] font-bold">{activeTournament.prizePool}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setRegisteredSuccess(false);
                  setIsRegistering(false);
                }}
                className="px-8 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#FF2E36] transition-all shadow-lg shadow-red-600/30"
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
              className="text-xs font-mono text-zinc-400 hover:text-white mb-4 flex items-center gap-1"
            >
              ← Назад к списку турниров
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-[#FF1E27] uppercase tracking-wider block mb-1">
                РЕГИСТРАЦИЯ КОМАНДЫ
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                {activeTournament.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {activeTournament.date} • {activeTournament.location} • Призовой фонд: {activeTournament.prizePool}
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Название команды / Клана *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: NAVI Junior / Cybersharks"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Никнейм & ФИО капитана *</label>
                  <input
                    type="text"
                    required
                    placeholder="s1mple / Александр Костылев"
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Telegram капитана для связи *</label>
                  <input
                    type="text"
                    required
                    placeholder="@captain_tg"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Телефон капитана *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={captainPhone}
                    onChange={(e) => setCaptainPhone(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF1E27]"
                  />
                </div>
              </div>

              {/* Tournament rules & fee summary */}
              <div className="p-4 rounded-2xl bg-[#08080c] border border-white/[0.06] space-y-2 text-xs">
                <div className="font-mono text-white font-bold uppercase flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF1E27]" />
                  Условия участия:
                </div>
                <div className="text-zinc-400">
                  • Взнос: <span className="text-white font-semibold">{activeTournament.entryFee}</span> (100% идет на депозитный баланс команды).
                </div>
                <div className="text-zinc-400">
                  • Игра на LAN-серверах арен с мониторами 540Hz OLED.
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#C4001B] hover:from-[#FF2E36] hover:to-[#FF1E27] shadow-lg shadow-red-600/30 transition-all"
                >
                  Завершить регистрацию
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FF1E27]/15 text-[#FF1E27] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3 h-3" />
                Турнирный календарь NEXUS ARENA
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Сезонные LAN-Турниры <span className="text-[#FF1E27]">//</span> 2026
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Регулярные чемпионаты с гарантированными денежными призами, профессиональной судейской коллегией и трансляциями.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
              {['ALL', 'CS2', 'DOTA 2', 'VALORANT', 'EA FC 25'].map((game) => (
                <button
                  key={game}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGameFilter(game);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    selectedGameFilter === game
                      ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                      : 'bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white'
                  }`}
                >
                  {game === 'ALL' ? 'Все дисциплины' : game}
                </button>
              ))}
            </div>

            {/* Tournaments List */}
            <div className="space-y-4">
              {filteredTournaments.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-gradient-to-r from-[#12121c] to-[#0a0a0f] border border-white/[0.08] hover:border-[#FF1E27]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/30">
                        {t.game}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {t.date} // {t.time}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">
                      {t.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF1E27]" />
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
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Призовой фонд</span>
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
                      className="py-2.5 px-5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#FF2E36] transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5"
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
