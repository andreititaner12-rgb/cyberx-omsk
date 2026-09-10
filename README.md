# CYBERX OMSK — флагманская киберспортивная экосистема

> Официальная веб-платформа сети **3 киберарен CyberX в Омске**.
> Стек: **React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis, Vite, Lucide, Leaflet (тёмные моно-тайлы), Web Audio API, Three.js (3D-модель, лениво)**, QR-Hub.

---

## 🏢 Клубы сети

1. **CyberX Arena** — `ул. Ленина, 19` · центральный флагман
   86 ПК (i5-14600KF / RTX 5070 Ti & 4080 / BenQ 600Hz, ASUS 480Hz), 2 автосимулятора Sim-Racing (Moza Direct Drive + Load Cell), 2 Premium Squad зала (5 ПК + PS5 + стол), кино-лаунж с проектором 150", 4 PS5 зала.
   Бронь: `https://langame.ru/club/799452760` (QR: `/qr/qr-lenina.png`)
2. **CyberX Европа** — `просп. Мира, 42к1` · Нефтяники / Студгородок
   46 ПК (Super VIP, VIP, Duo Room, Solo Room), Solo Стримерская на Ryzen 7 7800X3D + BenQ 600Hz, 3 PS5 зала.
   Бронь: `https://langame.ru/club/799457743` (QR: `/qr/qr-evropa.png`)
3. **CyberX Октябрь** — `ул. Серова, 19А` · Ленинский округ
   50 ПК (VIP 1–3, Trio/Duo/Solo Room), Solo 600Hz на Ryzen 7 7800X3D, 3 PS5 зала.
   Бронь: `https://langame.ru/club/799456444` (QR: `/qr/qr-oktyabr.png`)

---

## 🎨 Дизайн-система v2 — «Obsidian & Crimson»

Редизайн 2026: ушли от «нейросетевого» вида (плашки, бейджи, золотой shimmer,
пульсирующие live-точки, неоновые свечения) к **дорогой редакционной
типографике** с живым движением.

**Франшизные ограничения (не нарушать):**
- Алый `#E32124` (hover `#FF2A2E`) на тёмном обсидиане `#050507`.
- Шрифты: **Tactic Sans** (display, заголовки) + **Montserrat** (текст).
  Tactic Sans подключается через `@font-face` (local + `/fonts/tactic-sans.woff2`),
  файлы кладёт франшиза — см. `public/fonts/README.md`. До этого
  заголовки рендерятся на Montserrat 800/900.

**Принципы v2:**
- Плоские поверхности `#0A0A0F` с тонкими hairline-линиями вместо glass-карточек и свечений.
- Красный акцент — дозированно: подчёркивания, активные состояния, CTA, нить сверху карточки.
- Единая хореография: `MaskLine` (строки заголовков выезжают из-под маски), `Reveal` (подъём при скролле), `CountUp` (разгон цифр), Ken Burns на галереях, бегущая строка фактов.
- Параллакс hero-видео и контента при скролле (Framer Motion + Lenis).
- Пластичный скролл **Lenis**, все переходы между секциями через `scrollToSection()` (`src/utils/scroll.ts`).
- Плёночное зерно 3% (`grain`) для фактуры, уважение к `prefers-reduced-motion`.

### Компоненты

| Файл | Назначение |
|---|---|
| `src/App.tsx` | Shell: Lenis, живые данные владельца (localStorage), модалки, секретный `#admin` |
| `src/components/Hero.tsx` | Кинематографичный экран: видео 1080p/30fps, mask-reveal заголовок, нижняя навигация `Клубы / Прайс / Железо / Турниры / Акции` |
| `src/components/Header.tsx` | Фиксированная шапка (blur при скролле), телефон, CTA «Бронь», мобильный лист |
| `src/components/BrandManifesto.tsx` | Манифест + анимированная статистика (CountUp) |
| `src/components/ArenaEcosystem.tsx` | 3 клуба: карточки + deep-dive с автогалереей (Ken Burns) |
| `src/components/ZonesShowcase.tsx` | Bento-карта пространств, раскрывающееся окно спецификации |
| `src/components/SimRacingBanner.tsx` | 2 кокпита Moza, выбор из 6 дисциплин |
| `src/components/HardwareVisualizer.tsx` | Интерактивные тестеры (герцовка, свитчи, CPS, FPS, стерео, 3D-мышь) |
| `src/components/TournamentCard.tsx` | Главный LAN: таймер от датаISO, слоты, призовой фонд |
| `src/components/PriceSection.tsx` | Прайс 3 клубов: ПК-зоны / Lounge-симуляторы, фильтр времени |
| `src/components/PromoSection.tsx` | Акции с копируемыми промокодами |
| `src/components/LocationMapSection.tsx` + `Dynamic2GisMap.tsx` | Тёмная карта OSM, flyTo, маршрут в 2ГИС |
| `src/components/BookingModal.tsx` | QR-Hub / мобильные кнопки Langame + App Store |
| `src/components/TournamentModal.tsx` | Все турниры сезона + форма регистрации |
| `src/components/OwnerSecurityGate.tsx` + `OwnerAdminModal.tsx` | Терминал владельца (`#admin?key=CYBERX-OMSK-ROOT-2026`, PIN `5500`) и Mini-CRM |
| `src/components/ui/*` | Примитивы: `Reveal`, `MaskLine`, `SectionHeading`, `Marquee`, `CountUp`, тестеры |

### Перформанс
- Hero-видео перекодировано в `hero-bg-compact.mp4` (1080p/30fps, ~5.6 МБ против 19 МБ исходника).
- `Mouse3DViewer` (three.js) — ленивый chunk через `React.lazy`.
- Видео ставится на паузу вне вьюпорта (IntersectionObserver); canvas-тестеры не рендерятся офскрин.
- Голосовое приветствие — mp3 (12 КБ) вместо wav.

---

## 🛠️ Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production-сборка (tsc + vite)
```

## 🔐 Владелец
- Вход: `http://localhost:5173/#admin?key=CYBERX-OMSK-ROOT-2026`, PIN `5500`.
- CMS: турниры (Local LAN / Franchise League + Google Forms), акции, зоны, метрики.
