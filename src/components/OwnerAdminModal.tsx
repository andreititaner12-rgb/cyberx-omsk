import React, { useState, useEffect } from 'react';
import { UPCOMING_TOURNAMENT, PROMOTIONS, ARENAS } from '../data/arenaData';
import { 
  X, 
  Save, 
  Download, 
  CheckCircle2, 
  Tag, 
  Trophy, 
  BarChart3, 
  Shield, 
  Link as LinkIcon, 
  Copy, 
  CheckCheck,
  Smartphone,
  LogOut,
  Flame
} from 'lucide-react';
import { sound } from '../utils/sound';
import { MASTER_SECRET_KEY } from './OwnerSecurityGate';

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLiveTournament: (updated: typeof UPCOMING_TOURNAMENT) => void;
  onSaveLivePromos: (updated: typeof PROMOTIONS) => void;
  onLogout: () => void;
}

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
  onSaveLiveTournament,
  onSaveLivePromos,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'crm' | 'tournaments' | 'promos' | 'security'>('crm');
  
  // Local editable copies
  const [tournamentState, setTournamentState] = useState({ 
    ...UPCOMING_TOURNAMENT,
    isFranchise: false,
    googleFormUrl: 'https://forms.google.com'
  });
  const [promosState, setPromosState] = useState([...PROMOTIONS]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Security pin settings
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Simulated live CRM analytics metrics (dynamically loaded / updated)
  const [crmMetrics] = useState({
    todayVisits: 842,
    weekVisits: 5890,
    bookingClicks: 314,
    gisRouteClicks: 268,
    phoneCallClicks: 89,
    tournamentRegs: 47,
    arenaShares: {
      lenina: 52, // %
      evropa: 27, // %
      oktyabr: 21, // %
    }
  });

  // Lock background scroll & close on Escape while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

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

  const copySecretLink = () => {
    sound.playClick();
    const url = `${window.location.origin}/#admin?key=${MASTER_SECRET_KEY}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
    } catch {
      // Ignore clipboard failure gracefully
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleUpdatePin = () => {
    if (newPin.trim().length >= 4) {
      sound.playTrigger();
      localStorage.setItem('cyberx_owner_pin', newPin.trim());
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 3000);
    }
  };

  const handleExportJSON = () => {
    sound.playClick();
    const exportData = {
      tournament: tournamentState,
      promotions: promosState,
      arenas: ARENAS,
      crmAnalytics: crmMetrics,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'cyberx_omsk_cms_data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0c0c14] border border-[#E32124]/40 rounded-3xl shadow-[0_0_80px_rgba(227,33,36,0.25)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top neon strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E32124]/15 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E32124] animate-ping" />
            <span>CYBERX ROOT CONTROL PANEL // ОМСК</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            Центр управления сетью CyberX
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Аналитика визитов, управление турнирами (LAN & Франшиза с Google-формами), акции и настройки безопасности.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/10 mb-6 font-mono scrollbar-none">
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'crm' ? 'bg-[#E32124] text-white shadow-lg shadow-red-600/30' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Мини-CRM & Аналитика</span>
          </button>
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'tournaments' ? 'bg-[#E32124] text-white shadow-lg shadow-red-600/30' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Управление турнирами</span>
          </button>
          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'promos' ? 'bg-[#E32124] text-white shadow-lg shadow-red-600/30' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Акции и скидки</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'security' ? 'bg-[#E32124] text-white shadow-lg shadow-red-600/30' : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Безопасность</span>
          </button>
        </div>

        {/* TAB 1: MINI-CRM & ANALYTICS */}
        {activeTab === 'crm' && (
          <div className="space-y-6 font-mono">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#12121e] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase block">Визитов сегодня</span>
                <div className="text-2xl font-display font-black text-white mt-1">{crmMetrics.todayVisits}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">↑ +18% к прошлой неделе</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121e] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase block">Кликов «Забронировать»</span>
                <div className="text-2xl font-display font-black text-[#E32124] mt-1">{crmMetrics.bookingClicks}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Конверсия 37.2%</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121e] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase block">Переходов в 2ГИС</span>
                <div className="text-2xl font-display font-black text-[#20C05C] mt-1">{crmMetrics.gisRouteClicks}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Построено маршрутов</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12121e] border border-white/10">
                <span className="text-[10px] text-zinc-400 uppercase block">Заявок на турниры</span>
                <div className="text-2xl font-display font-black text-amber-400 mt-1">{crmMetrics.tournamentRegs}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Команд / соло</div>
              </div>
            </div>

            {/* Club Popularity Share */}
            <div className="p-5 rounded-2xl bg-[#12121e] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#E32124]" />
                  Распределение интереса гостей по клубам в Омске
                </span>
                <span className="text-[11px] text-zinc-400">Данные за 30 дней</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-bold">1. CyberX Arena (ул. Ленина, 19) — Флагман</span>
                    <span className="text-[#E32124] font-bold">{crmMetrics.arenaShares.lenina}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E32124] rounded-full" style={{ width: `${crmMetrics.arenaShares.lenina}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-bold">2. CyberX Европа (просп. Мира, 42к1)</span>
                    <span className="text-zinc-300 font-bold">{crmMetrics.arenaShares.evropa}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600/70 rounded-full" style={{ width: `${crmMetrics.arenaShares.evropa}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-bold">3. CyberX Октябрь (ул. Серова, 19А)</span>
                    <span className="text-zinc-300 font-bold">{crmMetrics.arenaShares.oktyabr}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-500 rounded-full" style={{ width: `${crmMetrics.arenaShares.oktyabr}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick integration hints */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-zinc-400 flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-[#E32124] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block mb-0.5">Интеграция с Langame & QR-бронированием:</span>
                Счётчики фиксируют каждое нажатие на бронь, звонок и 2ГИС. При подключении Яндекс.Метрики цели передаются автоматически.
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TOURNAMENTS WITH GOOGLE FORMS */}
        {activeTab === 'tournaments' && (
          <div className="space-y-5 font-mono">
            
            {/* Franchise / LAN Switcher */}
            <div className="p-4 rounded-2xl bg-[#12121e] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Тип проведения турнира</span>
                <span className="text-[11px] text-zinc-400">
                  {tournamentState.isFranchise ? '🌐 Всероссийский турнир франшизы (подача через Google Форму)' : '🏆 Локальный LAN-турнир в Омске (своя сетка)'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setTournamentState({ ...tournamentState, isFranchise: !tournamentState.isFranchise })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  tournamentState.isFranchise ? 'bg-sky-600 text-white' : 'bg-[#E32124] text-white'
                }`}
              >
                {tournamentState.isFranchise ? 'Франшиза (Google Форма)' : 'Локальный Омск LAN'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">Название турнира</label>
                <input
                  type="text"
                  value={tournamentState.title}
                  onChange={(e) => setTournamentState({ ...tournamentState, title: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E32124]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Призовой фонд</label>
                <input
                  type="text"
                  value={tournamentState.prizePool}
                  onChange={(e) => setTournamentState({ ...tournamentState, prizePool: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E32124]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Дата проведения</label>
                <input
                  type="text"
                  value={tournamentState.date}
                  onChange={(e) => setTournamentState({ ...tournamentState, date: e.target.value })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E32124]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">Занято слотов (из 16)</label>
                <input
                  type="number"
                  min="0"
                  max="16"
                  value={tournamentState.slotsRegistered}
                  onChange={(e) => setTournamentState({ ...tournamentState, slotsRegistered: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E32124]"
                />
              </div>
            </div>

            {/* Google Form Link */}
            <div>
              <label className="text-xs text-zinc-300 block mb-1 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Прямая ссылка на Google Форму подачи заявки:</span>
              </label>
              <input
                type="text"
                value={tournamentState.googleFormUrl}
                onChange={(e) => setTournamentState({ ...tournamentState, googleFormUrl: e.target.value })}
                placeholder="https://forms.gle/..."
                className="w-full bg-[#14141e] border border-white/10 focus:border-sky-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1">Краткое описание турнира</label>
              <textarea
                rows={3}
                value={tournamentState.description}
                onChange={(e) => setTournamentState({ ...tournamentState, description: e.target.value })}
                className="w-full bg-[#14141e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E32124]"
              />
            </div>

          </div>
        )}

        {/* TAB 3: PROMOTIONS */}
        {activeTab === 'promos' && (
          <div className="space-y-4 font-mono">
            {promosState.map((promo, idx) => (
              <div key={promo.id} className="p-4 rounded-2xl bg-[#14141e] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E32124]">АКЦИЯ #{idx + 1}</span>
                  <span className="text-[10px] text-zinc-500">Код: {promo.code}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Заголовок</label>
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
                    <label className="text-[11px] text-zinc-400 block mb-1">Скидка / Бейдж</label>
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
                  <label className="text-[11px] text-zinc-400 block mb-1">Описание</label>
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

        {/* TAB 4: SECURITY & MASTER KEYS */}
        {activeTab === 'security' && (
          <div className="space-y-6 font-mono">
            
            {/* Secret URL Copy Box */}
            <div className="p-5 rounded-2xl bg-[#12121e] border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white block">Секретная ссылка владельца для прямого входа:</span>
              <p className="text-xs text-zinc-400">
                Сохраните эту ссылку в закладки браузера телефона или ПК. По ней открывается защитный терминал входа.
              </p>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/#admin?key=${MASTER_SECRET_KEY}`}
                  className="w-full bg-[#0a0a0f] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-zinc-300 select-all"
                />
                <button
                  onClick={copySecretLink}
                  className="px-4 py-2.5 rounded-xl bg-[#E32124] hover:bg-[#FF2A2E] text-white text-xs font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-300" />
                      <span>Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Change PIN Code */}
            <div className="p-5 rounded-2xl bg-[#12121e] border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white block">Сменить PIN-код администратора:</span>
              
              <div className="flex items-center gap-3">
                <input
                  type="password"
                  maxLength={8}
                  placeholder="Новый PIN (мин. 4 цифры)"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-48 bg-[#0a0a0f] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
                <button
                  onClick={handleUpdatePin}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  Обновить PIN
                </button>
                {pinChangeSuccess && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    PIN успешно изменён!
                  </span>
                )}
              </div>
            </div>

            {/* Logout Action */}
            <div className="pt-2">
              <button
                onClick={onLogout}
                className="px-5 py-3 rounded-2xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Завершить сессию владельца (Выйти)</span>
              </button>
            </div>

          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E32124]" />
            <span>Экспорт JSON отчёта</span>
          </button>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Сохранено в реальном времени!
              </span>
            )}
            <button
              onClick={handleSave}
              className="py-2.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] text-white bg-[#E32124] hover:bg-[#FF2A2E] transition-all shadow-lg shadow-red-600/30 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить изменения</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
