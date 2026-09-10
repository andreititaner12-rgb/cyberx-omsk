import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ARENAS } from '../data/arenaData';
import { ExternalLink, Layers, Navigation, Minus, Plus } from 'lucide-react';
import { sound } from '../utils/sound';

interface Dynamic2GisMapProps {
  selectedArenaId: string;
  onSelectArena: (arenaId: string) => void;
}

const PIN_SVG =
  '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

const markerHtml = (name: string, isSelected: boolean) => `
  <div class="relative group cursor-pointer select-none">
    <div class="relative flex items-center justify-center w-9 h-9 rounded-full ${
      isSelected
        ? 'bg-[#E32124] text-white ring-2 ring-[#E32124]/35 ring-offset-2 ring-offset-transparent'
        : 'bg-[#101017] text-zinc-300 border border-white/25'
    }">
      ${PIN_SVG}
    </div>
    <div class="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-black/90 border ${
      isSelected ? 'border-[#E32124]/60 text-white' : 'border-white/15 text-zinc-400'
    } text-[10px] font-mono font-semibold backdrop-blur-sm pointer-events-none">
      ${name}
    </div>
  </div>
`;

export const Dynamic2GisMap: React.FC<Dynamic2GisMapProps> = ({
  selectedArenaId,
  onSelectArena,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const onSelectRef = useRef(onSelectArena);
  onSelectRef.current = onSelectArena;

  const activeArena = ARENAS.find((a) => a.id === selectedArenaId) || ARENAS[0];

  // Инициализация карты один раз
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [activeArena.coordinates.x, activeArena.coordinates.y],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19,
      minZoom: 10,
      className: 'dark-monochrome-tiles',
    }).addTo(map);

    mapRef.current = map;

    ARENAS.forEach((arena) => {
      const marker = L.marker([arena.coordinates.x, arena.coordinates.y], {
        icon: L.divIcon({
          html: markerHtml(arena.name.split('//')[0].trim(), arena.id === selectedArenaId),
          className: 'custom-cyberx-pin',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(map);

      marker.on('click', () => {
        sound.playClick();
        onSelectRef.current(arena.id);
      });

      markersRef.current[arena.id] = marker;
    });

    // Перерасчёт размеров, когда контейнер получил высоту
    const t = setTimeout(() => map.invalidateSize(), 250);

    return () => {
      clearTimeout(t);
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Плавный перелёт и обновление меток
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo([activeArena.coordinates.x, activeArena.coordinates.y], 15, {
      duration: 1.4,
      easeLinearity: 0.25,
    });

    ARENAS.forEach((arena) => {
      const marker = markersRef.current[arena.id];
      if (marker) {
        marker.setIcon(
          L.divIcon({
            html: markerHtml(arena.name.split('//')[0].trim(), arena.id === selectedArenaId),
            className: 'custom-cyberx-pin',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          })
        );
      }
    });
  }, [selectedArenaId, activeArena.coordinates.x, activeArena.coordinates.y]);

  const open2Gis = () => {
    sound.playClick();
    const gisUrl =
      selectedArenaId === 'cyberx-arena'
        ? 'https://2gis.ru/omsk/search/CyberX%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0%2019'
        : selectedArenaId === 'cyberx-evropa'
        ? 'https://2gis.ru/omsk/firm/70000001105204416'
        : 'https://2gis.ru/omsk/firm/70000001102629279';
    window.open(gisUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full h-full min-h-[440px] overflow-hidden bg-[#0a0a0f] select-none">
      <div ref={containerRef} className="absolute inset-0 z-10" />

      {/* Мягкая виньетка */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 50%, transparent 60%, rgba(5,5,7,0.5) 100%)',
        }}
      />

      {/* Метка карты */}
      <div className="absolute top-4 left-4 z-30">
        <div className="flex items-center gap-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyberx-red" aria-hidden />
          <span className="eyebrow text-white/85">Карта Омска</span>
          <span className="text-white/20 text-xs">|</span>
          <span className="eyebrow text-white/40">{activeArena.address}</span>
        </div>
      </div>

      {/* Управление зумом */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
        <button
          onClick={() => {
            sound.playClick();
            mapRef.current?.zoomIn();
          }}
          className="h-9 w-9 rounded-lg bg-black/80 hover:bg-white/10 border border-white/15 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          title="Приблизить"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => {
            sound.playClick();
            mapRef.current?.zoomOut();
          }}
          className="h-9 w-9 rounded-lg bg-black/80 hover:bg-white/10 border border-white/15 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          title="Отдалить"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={() => {
            sound.playClick();
            const map = mapRef.current;
            if (!map) return;
            const bounds = L.latLngBounds(ARENAS.map((a) => [a.coordinates.x, a.coordinates.y]));
            map.flyToBounds(bounds, { padding: [60, 60], duration: 1.2 });
          }}
          className="h-9 w-9 rounded-lg bg-black/80 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          title="Показать все клубы"
        >
          <Layers size={14} />
        </button>
      </div>

      {/* Нижняя карточка клуба */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 p-4 sm:p-5">
        <div className="min-w-0">
          <div className="eyebrow text-cyberx-red">Метка клуба</div>
          <div className="mt-1 font-display font-extrabold uppercase text-sm sm:text-base text-white">
            {activeArena.name.split('//')[0].trim()}
          </div>
          <div className="mt-0.5 text-[11px] font-mono text-white/50">
            {activeArena.coordinates.x.toFixed(4)}, {activeArena.coordinates.y.toFixed(4)} · {activeArena.address}
          </div>
        </div>
        <button
          onClick={open2Gis}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] font-mono font-semibold uppercase tracking-wider px-5 py-2.5 transition-all active:scale-95 shrink-0"
        >
          <Navigation size={13} />
          Маршрут в 2ГИС
          <ExternalLink size={12} className="opacity-70" />
        </button>
      </div>
    </div>
  );
};
