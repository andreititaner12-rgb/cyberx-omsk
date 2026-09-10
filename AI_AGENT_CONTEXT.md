# 🤖 ИНСТРУКЦИЯ ДЛЯ AI-АГЕНТА // CYBERX OMSK ARCHITECTURE CONTEXT

> **Этот документ предназначен для любого AI-ассистента / разработчика, который подключается к проекту после клонирования из GitHub репозитория.**

---

## 📌 Краткий контекст проекта
Проект — премиальный лендинг и платформа **3 клубов сети CyberX в Омске**:
1. **CyberX Arena** (ул. Ленина, 19) — центральный флагман (86 ПК, 2 Sim-Racing, 2 Premium Squad зала, кино-лаунж 150").
2. **CyberX Европа** (просп. Мира, 42к1) — Нефтяники (46 ПК, Solo 600Hz на Ryzen 7 7800X3D, 3 PS5 зала).
3. **CyberX Октябрь** (ул. Серова, 19А) — Ленинский округ (50 ПК, Solo 600Hz, Trio/Duo залы, 3 PS5 зала).

---

## 🎨 Дизайн-система v2 (Обязательно прочитать перед правками UI)
См. раздел «Дизайн-система v2» в `README.md`. Ключевое:
- **Франшиза (не нарушать):** алый `#E32124` (hover `#FF2A2E`), обсидиан `#050507`,
  шрифты **Tactic Sans** (display) + **Montserrat** (текст). Tactic Sans подключён:
  woff2-сабсеты Medium (400–699) и Bold (700–900) в `public/fonts/`, исходники TTF —
  `fonts-source/`, два `@font-face` с диапазонами весов в `src/index.css`.
- **Стиль:** плоские карточки `#0A0A0F` + hairline-линии, **без** неоновых свечений,
  пульсирующих «live»-точек, золотого shimmer, «плашек»-бейджей, emoji в UI,
  стеклянного glassmorphism и «X // Y»-заголовков. Красный — точечно: CTA,
  подчёркивания, активные состояния, нить сверху карточки (`.top-line`).
- **Хореография:** `Reveal` / `MaskLine` / `CountUp` из `src/components/ui/Reveal.tsx`,
  скролл — Lenis, переходы между секциями — только через `scrollToSection()`
  (`src/utils/scroll.ts`), параллакс — `useScroll/useTransform`.
- Уважать `prefers-reduced-motion` (уже обработано в `src/index.css`).

## 📂 Структура ключевых компонентов (`src/`)
| Путь | Назначение |
|---|---|
| `src/App.tsx` | Shell: Lenis, роутинг secret hash `#admin`, голосовое приветствие, модалки, живые данные владельца (localStorage) |
| `src/components/Hero.tsx` | Видео-фон (hero-bg-compact.mp4, авто-пауза вне вьюпорта), mask-reveal заголовок, нижняя навигация «КЛУБЫ / ПРАЙС / ЖЕЛЕЗО / ТУРНИРЫ / АКЦИИ» (порядок фиксированный) |
| `src/components/Header.tsx` | Шапка: blur при скролле, телефон, CTA «Бронь», mute-кнопка, мобильный лист |
| `src/components/Preloader.tsx` | Быстрый автотикающий прелоадер (~1.6 c), звук отпирается первым жестом в App |
| `src/components/BrandManifesto.tsx` | Манифест + статистика с CountUp |
| `src/components/ArenaEcosystem.tsx` | 3 клуба: карточки + deep-dive (автогалерея, Ken Burns) |
| `src/components/ZonesShowcase.tsx` | Bento пространств; симы перенаправляют в `#sim-racing`; раскрывающееся окно |
| `src/components/SimRacingBanner.tsx` | Моza-кокпиты, 6 дисциплин |
| `src/components/HardwareVisualizer.tsx` | 6 интерактивных модулей; `Mouse3DViewer` — `React.lazy` (three.js) |
| `src/components/TournamentCard.tsx` | Таймер из `Tournament.dateISO`, слоты, призовой фонд |
| `src/components/PriceSection.tsx` | Точные тарифы Ленина 19 и других клубов; ПК-зоны / Lounge; фильтр времени без emoji |
| `src/components/PromoSection.tsx` | Акции + копируемые промокоды |
| `src/components/LocationMapSection.tsx` / `Dynamic2GisMap.tsx` | Leaflet + тёмные моно-тайлы OSM, flyTo, 2ГИС-маршруты |
| `src/components/BookingModal.tsx` | Mobile: кнопки Langame/App Store; Desktop: QR-коды клубов |
| `src/components/TournamentModal.tsx` | Каталог турниров + форма регистрации |
| `src/components/OwnerSecurityGate.tsx` | Терминал владельца: `#admin?key=CYBERX-OMSK-ROOT-2026` + PIN `5500` |
| `src/components/OwnerAdminModal.tsx` | Mini-CRM: метрики, турниры (Google Forms), акции, зоны, промокоды |
| `src/data/arenaData.ts` | Все структурированные данные (клубы, зоны, железо, турниры, акции) |
| `src/types.ts` | Типы данных (Tournament.dateISO — опциональная ISO-дата для таймера) |
| `src/utils/sound.ts` | Web Audio UI-звуки + голосовое приветствие (mp3) |
| `src/utils/scroll.ts` | Singleton Lenis + `scrollToSection/scrollToTop` |

## 🚀 Запуск
```bash
npm install
npm run dev
npm run build
```
Медиа-база в `public/`: `hero-bg-compact.mp4` (используется), `hero-bg.mp4` (исходник),
постеры, QR, аудио, `models/mouse.glb`, фото клубов в `images/`.

## ⚠️ Правила работы
1. Не удалять и не переименовывать секции-якоря: `hero, manifesto, arenas, arena-deep-dive,
   zones, sim-racing, hardware, tournaments, pricing, promotions, location`.
2. Не ломать shape данных в `arenaData.ts` — их редактирует CMS владельца (`OwnerAdminModal`).
3. Не добавлять неоновые свечения/пульсации/эмодзи в публичный UI — см. стиль v2 выше.
4. Секретные ключи владельца в README (не публиковать в UI).
