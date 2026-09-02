import React, { useState, useEffect } from 'react';
import { ARENAS, ZONES } from '../data/arenaData';
import { X, Check, Building2, Sparkles, Zap, Phone, User } from 'lucide-react';
import { sound } from '../utils/sound';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArenaId?: string;
  defaultZoneId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultArenaId,
  defaultZoneId,
}) => {
  const [selectedArena, setSelectedArena] = useState<string>(defaultArenaId || ARENAS[0].id);
  const [selectedZone, setSelectedZone] = useState<string>(defaultZoneId || ZONES[0].id);
  const [date, setDate] = useState<string>('2026-09-03');
  const [time, setTime] = useState<string>('19:00');
  const [duration, setDuration] = useState<number>(3);
  const [isNightPackage, setIsNightPackage] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (defaultArenaId) setSelectedArena(defaultArenaId);
    if (defaultZoneId) setSelectedZone(defaultZoneId);
  }, [defaultArenaId, defaultZoneId]);

  if (!isOpen) return null;

  const currentZoneObj = ZONES.find((z) => z.id === selectedZone) || ZONES[0];
  const currentArenaObj = ARENAS.find((a) => a.id === selectedArena) || ARENAS[0];

  const calculateTotal = () => {
    if (isNightPackage) {
      return currentZoneObj.priceNight;
    }
    return currentZoneObj.pricePerHour * duration;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTrigger();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0A0A0E] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8"
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

        {isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              Бронь в CyberX Омск создана!
            </h3>
            
            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              Мы зарезервировали <span className="text-[#E32124] font-semibold">{currentZoneObj.name}</span> в клубе <span className="text-white font-semibold">{currentArenaObj.name.split('//')[0]}</span> ({currentArenaObj.address}) на {date} в {time}.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Гость:</span>
                <span className="text-white">{name || 'Гость'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Телефон:</span>
                <span className="text-white">{phone || '+7 (908) 110-97-77'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Сумма к оплате:</span>
                <span className="text-[#E32124] font-bold">{calculateTotal().toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#E32124] hover:bg-[#FF2A2E] transition-all shadow-lg shadow-red-600/30"
              >
                Отлично, закрыть
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E32124]/15 text-[#E32124] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3 h-3" />
                Мгновенное бронирование в Омске
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Забронировать <span className="text-[#E32124]">Место</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Выберите клуб CyberX (Ленина, Мира или Серова), формат пространства и удобное время.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Step 1: Arena Choice */}
              <div>
                <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E32124]" />
                  1. Выберите клуб в Омске:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ARENAS.map((a) => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedArena(a.id);
                      }}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        selectedArena === a.id
                          ? 'bg-[#181824] border-[#E32124] text-white shadow-sm shadow-red-900/40'
                          : 'bg-white/[0.02] border-white/[0.07] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold truncate">{a.name.split('//')[0].trim()}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5 truncate">{a.address}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Zone Choice */}
              <div>
                <label className="text-xs font-mono font-bold uppercase text-zinc-300 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E32124]" />
                  2. Выберите тип зоны / зал:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ZONES.map((z) => {
                    const isLeninaOnly = z.id.includes('premium') || z.id.includes('sim-racing') || z.id.includes('projector');
                    const isAvailableHere = !isLeninaOnly || selectedArena === 'cyberx-lenina';
                    return (
                      <button
                        type="button"
                        key={z.id}
                        disabled={!isAvailableHere}
                        onClick={() => {
                          sound.playClick();
                          setSelectedZone(z.id);
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          !isAvailableHere ? 'opacity-35 cursor-not-allowed bg-transparent border-white/5' :
                          selectedZone === z.id
                            ? 'bg-[#181824] border-[#E32124] text-white'
                            : 'bg-white/[0.02] border-white/[0.07] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs truncate">{z.name}</span>
                          <span className="text-[10px] font-mono text-[#E32124]">{z.pricePerHour} ₽/ч</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1 truncate">
                          {isLeninaOnly && selectedArena !== 'cyberx-lenina' ? 'Доступно только на Ленина' : z.tagline}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Date, Time & Package */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Дата</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E32124]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Время начала</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E32124]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Длительность</label>
                  <select
                    disabled={isNightPackage}
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full bg-[#121218] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E32124] disabled:opacity-40"
                  >
                    <option value={1}>1 час</option>
                    <option value={2}>2 часа</option>
                    <option value={3}>3 часа (Популярно)</option>
                    <option value={5}>5 часов</option>
                    <option value={8}>8 часов</option>
                  </select>
                </div>
              </div>

              {/* Night Package Toggle */}
              <div 
                onClick={() => setIsNightPackage(!isNightPackage)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isNightPackage
                    ? 'bg-[#E32124]/10 border-[#E32124] text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isNightPackage ? 'bg-[#E32124] border-[#E32124] text-white' : 'border-white/20'}`}>
                    {isNightPackage && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Включить ночной пакет (22:00 — 08:00)</div>
                    <div className="text-[10px] text-zinc-400">Фиксированная выгодная цена на 10 часов игры</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#E32124]">
                  {currentZoneObj.priceNight.toLocaleString()} ₽
                </span>
              </div>

              {/* Step 4: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Ваше имя</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Александр"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#121218] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">Номер телефона</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+7 (908) 110-97-77"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121218] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E32124]"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Summary & Submit */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">К оплате при визите</span>
                  <div className="font-display font-black text-2xl text-white">
                    {calculateTotal().toLocaleString()} ₽
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#E32124] to-[#B30E11] hover:from-[#FF2A2E] hover:to-[#E32124] shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Подтвердить бронь
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
