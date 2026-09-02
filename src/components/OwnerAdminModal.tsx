import React, { useState } from 'react';
import { UPCOMING_TOURNAMENT, PROMOTIONS, ARENAS } from '../data/arenaData';
import { X, Save, Download, Sliders, CheckCircle2, Tag, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLiveTournament: (updated: typeof UPCOMING_TOURNAMENT) => void;
  onSaveLivePromos: (updated: typeof PROMOTIONS) => void;
}

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
  onSaveLiveTournament,
  onSaveLivePromos,
}) => {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'promos'>('tournaments');
  
  // Local editable copies
  const [tournamentState, setTournamentState] = useState({ ...UPCOMING_TOURNAMENT });
  const [promosState, setPromosState] = useState([...PROMOTIONS]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playTrigger();
    onSaveLiveTournament(tournamentState);
    onSaveLivePromos(promosState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleExportJSON = () => {
    sound.playClick();
    const exportData = {
      tournament: tournamentState,
      promotions: promosState,
      arenas: ARENAS,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'nexus_arena_cms_data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0f0f17] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FF1E27]/15 text-[#FF1E27] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3 h-3" />
            Панель управления владельца (Owner CMS)
          </div>
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
            Управление контентом и акциями
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Здесь владелец может менять даты турниров, призовые фонды, тексты акций и скидки без правки исходного кода.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'tournaments' ? 'bg-[#FF1E27] text-white' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Ближайший турнир
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'promos' ? 'bg-[#FF1E27] text-white' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            Акции и спецпакеты
          </button>
        </div>

        {/* Tournaments tab */}
        {activeTab === 'tournaments' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Название турнира</label>
                <input
                  type="text"
                  value={tournamentState.title}
                  onChange={(e) => setTournamentState({ ...tournamentState, title: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Призовой фонд</label>
                <input
                  type="text"
                  value={tournamentState.prizePool}
                  onChange={(e) => setTournamentState({ ...tournamentState, prizePool: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Дата проведения</label>
                <input
                  type="text"
                  value={tournamentState.date}
                  onChange={(e) => setTournamentState({ ...tournamentState, date: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Занято слотов (из 16)</label>
                <input
                  type="number"
                  min="0"
                  max="16"
                  value={tournamentState.slotsRegistered}
                  onChange={(e) => setTournamentState({ ...tournamentState, slotsRegistered: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1">Краткое описание турнира</label>
              <textarea
                rows={3}
                value={tournamentState.description}
                onChange={(e) => setTournamentState({ ...tournamentState, description: e.target.value })}
                className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]"
              />
            </div>
          </div>
        )}

        {/* Promos tab */}
        {activeTab === 'promos' && (
          <div className="space-y-4">
            {promosState.map((promo, idx) => (
              <div key={promo.id} className="p-4 rounded-2xl bg-[#14141e] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF1E27]">АКЦИЯ #{idx + 1}</span>
                  <span className="text-[10px] font-mono text-zinc-500">Код: {promo.code}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Заголовок</label>
                    <input
                      type="text"
                      value={promo.title}
                      onChange={(e) => {
                        const newPromos = [...promosState];
                        newPromos[idx].title = e.target.value;
                        setPromosState(newPromos);
                      }}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Скидка / Бейдж</label>
                    <input
                      type="text"
                      value={promo.discount}
                      onChange={(e) => {
                        const newPromos = [...promosState];
                        newPromos[idx].discount = e.target.value;
                        setPromosState(newPromos);
                      }}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Описание</label>
                  <input
                    type="text"
                    value={promo.description}
                    onChange={(e) => {
                      const newPromos = [...promosState];
                      newPromos[idx].description = e.target.value;
                      setPromosState(newPromos);
                    }}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#FF1E27]" />
            <span>Скачать JSON конфигурацию</span>
          </button>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Сохранено в реальном времени!
              </span>
            )}
            <button
              onClick={handleSave}
              className="py-2.5 px-6 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF1E27] hover:bg-[#FF2E36] transition-all shadow-lg shadow-red-600/30 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Применить изменения</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
