import { ArenaLocation, ZoneType, HardwareItem, Tournament, Promotion } from '../types';

export const ARENAS: ArenaLocation[] = [
  {
    id: 'cyberx-evropa',
    name: 'CYBERX ЕВРОПА // МИРА, 42К1',
    tagline: 'Киберспортивный хаб в Нефтяниках с Solo Room на Ryzen 7 7800X3D и 600Hz',
    address: 'просп. Мира, 42, корп. 1',
    metro: 'Ост. «Технический университет» / «Кристалл»',
    area: '480 м²',
    rigsCount: 46,
    vipRoomsCount: 0,
    ps5RoomsCount: 3,
    phone: '+7 (951) 400-77-77',
    telegram: '@cyberx_omsk_mira',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 1040,
    image: '/images/arena-evropa-card.jpg',
    gallery: [
      '/images/arena-evropa-card.jpg',
      'https://langame.ru/storage/clubs/2025/Dec/18/17660550716943dc9fa9702.webp',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '46 игровых ПК (Super VIP, VIP, Duo Room и Solo Room)',
      'Solo Стримерская на AMD Ryzen 7 7800X3D + BenQ 600Hz',
      'Мониторы BenQ 600Hz, ASUS 480Hz, ViewSonic 400Hz, BenQ 240Hz',
      '3 комфортных PS5 зала на компании до 6 человек',
      'Кальян, бар, гигабитный интернет >1 Гбит/с'
    ],
    status: 'ONLINE',
    coordinates: { x: 55.028412, y: 73.284310 },
  },
  {
    id: 'cyberx-arena',
    name: 'CYBERX ARENA // ЛЕНИНА, 19',
    tagline: 'Главный киберспортивный комплекс Омска со сценой, Premium залами и автосимуляторами',
    address: 'ул. Ленина, 19',
    metro: 'Ост. «Драмтеатр» / «КДЦ Маяковский»',
    area: '540 м²',
    rigsCount: 86,
    vipRoomsCount: 2,
    ps5RoomsCount: 4,
    phone: '+7 (908) 110-97-77',
    telegram: '@cyberxcommunityomsklenina',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 1280,
    image: '/images/arena-lenina-card.jpg',
    gallery: [
      '/images/arena-lenina-card.jpg',
      '/images/sim-racing-real.jpg',
      'https://langame.ru/storage/clubs/2023/Jul/05/168857344564a59605677bb.webp',
      'https://langame.ru/storage/clubs/2023/Dec/04/1701698312656ddb081b9d7.webp',
      'https://langame.ru/storage/clubs/2023/Dec/04/1701698369656ddb4188c28.webp',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '86 мощных игровых ПК (RTX 5070 Ti / i5-14600KF / BenQ 600Hz & 400Hz)',
      '2 эксклюзивных Premium зала (5 ПК + PS5 + Большой стол для команды)',
      '2 профессиональных автосимулятора Sim-Racing с рулями Direct Drive',
      'Большой кино-лаунж с проектором 150" для трансляций и турниров',
      '4 приватных PS5 зала с диванами, кальян и бар'
    ],
    status: 'ONLINE',
    coordinates: { x: 54.984185, y: 73.375841 },
  },
  {
    id: 'cyberx-oktyabr',
    name: 'CYBERX ОКТЯБРЬ // СЕРОВА, 19А',
    tagline: 'Приватная киберарена в Ленинском округе с Solo 600Hz, Trio и Duo залами',
    address: 'ул. Серова, 19А',
    metro: 'Ост. «Улица Серова» / «Ленинский рынок»',
    area: '430 м²',
    rigsCount: 50,
    vipRoomsCount: 0,
    ps5RoomsCount: 3,
    phone: '+7 (950) 950-33-33',
    telegram: '@cyberx_omsk_serova',
    workingHours: '24/7 Круглосуточно',
    rating: 5.0,
    reviewsCount: 890,
    image: '/images/arena-oktyabr-card.jpg',
    gallery: [
      '/images/arena-oktyabr-card.jpg',
      'https://langame.ru/storage/clubs/2025/Dec/18/17660551636943dcfbb97a9.webp',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '50 игровых ПК (Общий зал, VIP 1-3, Trio Rooms, Duo Room, Solo Room)',
      'Solo Room на AMD Ryzen 7 7800X3D + BenQ 600Hz',
      '3 уютных PS5 зала (FC 25, MK1, UFC 5, Tekken 8)',
      'Клавиатуры Dark Project & Logitech, гарнитуры HyperX',
      'Кальян, напитки, удобная парковка у входа'
    ],
    status: 'ONLINE',
    coordinates: { x: 54.945120, y: 73.385410 },
  },
];

export const ZONES: ZoneType[] = [
  {
    id: 'premium-squad',
    name: 'PREMIUM SQUAD SUITE',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: '5 Pro ПК (RTX 5070 Ti) + PS5 + Большой стол для команды & диван',
    description: 'Эксклюзив флагмана CyberX Arena на ул. Ленина, 19! Изолированная комната премиум-класса на 5–8 человек. 5 мощнейших ПК (i5-14600KF / RTX 5070 Ti / BenQ 600Hz), отдельная зона PlayStation 5 на 85" 4K экране, мягкий диван и большой переговорно-обеденный стол для тактики и перекуса.',
    capacity: '5–8 человек (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      '5x PC: RTX 5070 Ti / i5-14600KF / 32GB DDR5',
      '5x Мониторы: BenQ 600Hz / ASUS 480Hz / 400Hz',
      '1x Sony PlayStation 5 Slim + 4 геймпада DualSense',
      '85" 4K 120Hz HDR экран + саундбар',
      'Большой стол на 6–8 посадочных мест + кожаный диван'
    ],
    features: [
      'Доступно только в CyberX Arena (2 зала)',
      'Звукоизоляция 55dB (полная приватность)',
      'Большой стол для тактических разборов / еды',
      'Кальян и барное обслуживание',
      'Вызов администратора в 1 клик'
    ],
    pricePerHour: 1800,
    priceNight: 9000,
    image: 'https://langame.ru/storage/clubs/2023/Dec/04/1701698312656ddb081b9d7.webp',
    badge: '2 зала на Ленина',
    popular: true,
  },
  {
    id: 'sim-racing',
    name: 'SIM-RACING // 2 АВТОСИМУЛЯТОРА',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: '2 кокпита с рулями Direct Drive и педалями Load Cell',
    description: 'Эксклюзив CyberX Arena на Ленина, 19 с двумя профессиональными гоночными кокпитами. Прямой привод руля (Direct Drive Force Feedback), педали Load Cell с тензодатчиками, изогнутые экраны. Идеально для парных дуэлей в Assetto Corsa, Forza Horizon 5, F1 24 и City Car Driving.',
    capacity: '1–2 пилота (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      '2x Профессиональные базы руля Direct Drive (Force Feedback)',
      'Спортивные анатомические ковши с регулировкой посадки',
      'Педальные узлы Load Cell (реалистичное усилие торможения)',
      'Изогнутые UltraWide 165Hz дисплеи',
      'Парные дуэли в реальном времени'
    ],
    features: [
      'Доступно только в CyberX Arena (2 симулятора)',
      'Парные заезды друг против друга',
      'Все популярные автосимы и дрифт-трассы',
      'Секвентальный шифтер и лепестки переключения'
    ],
    pricePerHour: 400,
    priceNight: 2000,
    image: '/images/sim-racing-real.jpg',
    badge: '2 автосима на Ленина',
  },
  {
    id: 'projector-lounge',
    name: 'КИНО-ЛАУНЖ С ПРОЕКТОРОМ 150"',
    category: 'ЭКСКЛЮЗИВ В CYBERX ARENA',
    tagline: 'Огромный 150" экран, диваны, PS5 и трансляции мейджоров',
    description: 'Просторный лаунж в CyberX Arena со 150" проекционным экраном и сценой. Просмотр киберспортивных чемпионатов (The International, CS2 Major), спортивных матчей, фильмов и турниров по Mortal Kombat / EA FC 25.',
    capacity: 'до 15 человек (CyberX Arena // Ленина, 19)',
    hardwareBrief: [
      'Лазерный 4K проектор высокой яркости',
      'Экран 150" со световозвращающим полотном',
      'PlayStation 5 + каталог топ игр',
      'Концертный звук 5.1 Surround Sound'
    ],
    features: [
      'Доступно только в CyberX Arena на Ленина',
      'Мягкие диваны, кресла-мешки и столики',
      'Прямые трансляции турниров и кинопоказы',
      'Кальянная и барная карта'
    ],
    pricePerHour: 1000,
    priceNight: 5000,
    image: 'https://langame.ru/storage/clubs/2023/Dec/04/1701698369656ddb4188c28.webp',
    badge: '150" Экран на Ленина',
  },
  {
    id: 'solo-stream-room',
    name: 'SOLO ROOM // RYZEN 7 7800X3D + 600HZ',
    category: 'КИБЕРХАБЫ ЕВРОПА & ОКТЯБРЬ',
    tagline: 'Приватная стримерская на топовом процессоре и мониторе 600 Гц',
    description: 'Приватная изолированная комната в клубах CyberX Европа (Мира) и CyberX Октябрь (Серова). Ультимативный игровой процессор AMD Ryzen 7 7800X3D с 3D V-Cache, видеокарта RTX 5070 Ti, сверхбыстрый монитор BenQ 600Hz, клавиатура Dark Project и микрофон HyperX.',
    capacity: '1 человек (CyberX Европа & CyberX Октябрь)',
    hardwareBrief: [
      'PC: AMD Ryzen 7 7800X3D / RTX 5070 Ti / 32GB DDR5',
      'Монитор: BenQ 24.5" 600Hz / 400Hz Extreme Speed',
      'Клавиатура: Dark Project механическая',
      'Мышь: Logitech Pro / Dark Project',
      'Гарнитура: HyperX Cloud Pro'
    ],
    features: [
      'Доступно в CyberX Европа и CyberX Октябрь',
      'Абсолютная тишина и изоляция',
      'Максимальный соревновательный FPS (CS2: 750+ FPS)',
      'Идеально для стримов и турнирных квалификаций'
    ],
    pricePerHour: 220,
    priceNight: 1100,
    image: 'https://langame.ru/storage/clubs/2023/Dec/04/1701698424656ddb78af7b3.webp',
    badge: 'Ryzen 7800X3D + 600Hz',
  },
  {
    id: 'ps5-lounge',
    name: 'PS5 DELUXE ЗАЛЫ',
    category: 'ВО ВСЕХ 3 КЛУБАХ',
    tagline: '4 зала в CyberX Arena, по 3 зала в CyberX Европа и Октябрь',
    description: 'Уютные консольные залы с большими экранами 4K 120Hz, PlayStation 5, глубокими диванами и барным обслуживанием.',
    capacity: '2–6 человек (Во всех 3 клубах)',
    hardwareBrief: [
      'Sony PlayStation 5 + подписка PS Plus Deluxe',
      '75" / 85" 4K 120Hz VRR дисплеи',
      'Геймпады DualSense + гарнитуры Pulse 3D',
      'Премиальный объемный звук'
    ],
    features: [
      '4 зала в CyberX Arena, по 3 зала в Европе и Октябре',
      'Игры: EA FC 25, UFC 5, Mortal Kombat 1, Tekken 8, GTA V',
      'Напитки, кофе, энергетики, кальян и снеки',
      'Приватные шторы для изоляции от общего зала'
    ],
    pricePerHour: 400,
    priceNight: 2000,
    image: 'https://langame.ru/storage/clubs/2023/Dec/04/1701698373656ddb45f2330.webp',
    badge: 'Все 3 клуба (10 залов)',
  },
  {
    id: 'pro-stage',
    name: 'ОТКРЫТЫЙ ЗАЛ // SUPER VIP & STANDART',
    category: 'ОБЩИЙ ЗАЛ & VIP',
    tagline: '182 игровых ПК во всех трех клубах с мониторами до 600Hz',
    description: 'Главные игровые залы сети CyberX в Омске. Мониторы BenQ 600Hz / ASUS 480Hz / 400Hz / 240Hz, видеокарты RTX 5070 Ti / 3060 Ti, кресла Tesoro, гигабитный пинг >1 Гбит.',
    capacity: '182 игровых ПК суммарно',
    hardwareBrief: [
      'Super VIP: RTX 5070 Ti / i5-14600KF / 32GB DDR5 / BenQ 600Hz',
      'Standart: RTX 3060 Ti / i5-12400F / 16GB / BenQ 144Hz & 240Hz',
      'Девайсы: Dark Project, Logitech, Ajazz, HyperX',
      'Кресла: Анатомические Tesoro Zone / Master'
    ],
    features: [
      '86 ПК в CyberX Arena • 46 ПК в Европе • 50 ПК в Октябре',
      'Прямой оптический канал >1 Гбит/с (Ping 0.8ms)',
      'Широкие столы с профессиональными коврами',
      'Быстрый заказ напитков и кальяна к месту'
    ],
    pricePerHour: 130,
    priceNight: 700,
    image: '/images/arena-lenina-card.jpg',
    badge: 'от 70-130 ₽/час',
  }
];

export const HARDWARE_LIST: HardwareItem[] = [
  {
    id: 'monitors',
    category: 'monitors',
    categoryLabel: 'Дисплеи',
    name: 'BenQ Zowie 600Hz / ASUS 480Hz / 400Hz',
    model: '600Hz / 480Hz / 400Hz / 240Hz Fast-TN & OLED // 0.03ms Response',
    tagline: 'Абсолютная рекордная частота обновления 600 кадров в секунду',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Флагманская герцовка', value: '600 Hz', detail: 'Установлены в Super VIP и Solo Rooms' },
      { label: 'VIP мониторы', value: '480 / 400 Hz', detail: 'ASUS 27" 480Гц и ViewSonic 400Гц' },
      { label: 'Standart мониторы', value: '240 / 144 Hz', detail: 'BenQ 24.5" Zowie eSports' },
      { label: 'Латентность', value: '0.03 — 0.5 ms', detail: 'Zero-motion blur при резких фликах' },
    ],
    description: 'В клубах CyberX в Омске установлены самые быстрые мониторы в городе — вплоть до рекордных 600Hz и 480Hz. Никаких шлейфов и размытия.',
    proAdvantage: '600Hz дает идеальную плавность и физическое преимущество в регистрации первого выстрела при выходе из-за угла.',
    interactiveType: 'hertz',
  },
  {
    id: 'keyboards',
    category: 'keyboards',
    categoryLabel: 'Клавиатуры',
    name: 'Dark Project Mechanical & Logitech G',
    model: 'Смазанные механические свитчи // Gasket Mount шумоизоляция',
    tagline: 'Премиальная кастомная механика Dark Project с мягким акустическим тайпингом',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Бренды', value: 'Dark Project & Logitech', detail: 'Механические клавиатуры' },
      { label: 'Свитчи', value: 'Factory Lubed Pro', detail: 'Плавный ход без песка и люфтов' },
      { label: 'Частота опроса', value: '1000 Hz', detail: '<1ms латентность контроллера' },
      { label: 'Кейкапы', value: 'PBT Double-Shot', detail: 'Стойкие к истиранию символы' },
    ],
    description: 'Во всех залах Super VIP и VIP установлены механические клавиатуры Dark Project с заводской смазкой свитчей и стабилизаторов для идеального отклика.',
    proAdvantage: 'Тактильная четкость и мгновенная регистрация нажатий без мисскликов.',
    interactiveType: 'actuation',
  },
  {
    id: 'mice',
    category: 'mice',
    categoryLabel: 'Мыши & Ковры',
    name: 'Logitech G Pro, Ajazz & Dark Project',
    model: 'Оптические сенсоры Hero / PixArt 3395 // Сверхлегкий вес',
    tagline: 'Флагманские киберспортивные мыши с идеальным балансом и тефлоновыми глайдами',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Бренды', value: 'Logitech / Ajazz / Dark Project', detail: 'Топовые соревновательные мыши' },
      { label: 'Сенсоры', value: 'PixArt 3395 / Hero', detail: 'До 26 000 DPI без срывов' },
      { label: 'Ковры', value: 'CyberX Pro Large', detail: 'Текстура Speed/Control' },
      { label: 'Глайды', value: '100% PTFE', detail: 'Идеальное скольжение по ковру' },
    ],
    description: 'Мы регулярно обновляем тефлоновые глайды и коврики, обеспечивая чистый трекинг и точность микродоводок при любых резких движениях.',
    proAdvantage: 'Отсутствие срывов при максимальных ускорениях до 50G.',
    interactiveType: 'sensor',
  },
  {
    id: 'rigs',
    category: 'rigs',
    categoryLabel: 'Игровые ПК',
    name: 'NVIDIA RTX 5070 Ti & AMD Ryzen 7 7800X3D',
    model: 'RTX 5070 Ti / i5-14600KF / Ryzen 7 7800X3D // 32GB DDR5',
    tagline: 'Флагманские конфигурации Super VIP и Solo комнат со стабильными 600+ FPS',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Процессоры VIP', value: 'Ryzen 7 7800X3D / i5-14600KF', detail: 'Топовый игровой однопоток' },
      { label: 'Видеокарты VIP', value: 'NVIDIA RTX 5070 Ti', detail: 'DLSS 3.5 & Reflex' },
      { label: 'Оперативная память', value: '32GB DDR5', detail: 'Высокочастотная память' },
      { label: 'Система дисков', value: 'Бездисковая сеть >1 Гбит', detail: 'Мгновенный запуск всех игр' },
    ],
    description: 'Все компьютеры подключены к высокоскоростной бездисковой системе с серверами прямого доступа. Любая игра обновлена и запускается за секунды.',
    proAdvantage: 'CS2: 600-800 FPS, Valorant: 800+ FPS, Dota 2: 350+ FPS без просадок.',
    interactiveType: 'fps',
  },
  {
    id: 'audio',
    category: 'audio',
    categoryLabel: 'Звук & Гарнитуры',
    name: 'HyperX Cloud Pro Series',
    model: '53mm динамические излучатели с шумоподавлением микрофона',
    tagline: 'Золотой стандарт соревновательного киберспортивного звука',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Драйверы', value: '53mm с неодимовыми магнитами', detail: 'Закрытая акустическая конструкция' },
      { label: 'Амбушюры', value: 'Memory Foam с эффектом памяти', detail: 'Мягкая посадка без давления' },
      { label: 'Микрофон', value: 'Шумоподавление TeamSpeak/Discord', detail: 'Кристально чистый голос' },
      { label: 'Частотный диапазон', value: '15 — 25 000 Hz', detail: 'Точное позиционирование шагов' },
    ],
    description: 'Все игровые места оснащены проверенными гарнитурами HyperX Cloud. Плотная звукоизоляция амбушюров позволяет сосредоточиться только на звуках игры.',
    proAdvantage: 'Хирургически точное определение направления шагов и звуков перезарядки.',
    interactiveType: 'audioGraph',
  },
  {
    id: 'chairs',
    category: 'chairs',
    categoryLabel: 'Эргономика',
    name: 'Tesoro Zone & Master Pro',
    model: 'Стальной каркас + холодная формованная пена + 3D/4D подлокотники',
    tagline: 'Комфортная анатомическая посадка для длительных игровых сессий',
    image: 'https://images.unsplash.com/photo-1580481077195-c3a82da91883?auto=format&fit=crop&w=1000&q=80',
    keySpecs: [
      { label: 'Каркас', value: 'Усиленная стальная рама', detail: 'Надежность до 150 кг' },
      { label: 'Наполнитель', value: 'High Density Foam', detail: 'Не проминается со временем' },
      { label: 'Подлокотники', value: '3D/4D Регулировка', detail: 'Вровень со столешницей' },
      { label: 'Механизм качания', value: 'Top Gun / Multi-Block', detail: 'Откидывание спинки до 160°' },
    ],
    description: 'Каждое место оснащено креслами Tesoro с поясничными и шейными подушками для правильной осанки и снятия нагрузки со спины.',
    proAdvantage: 'Минимум усталости и максимальная концентрация на протяжении всей игровой ночи.',
    interactiveType: 'ergonomics',
  }
];

export const UPCOMING_TOURNAMENT: Tournament = {
  id: 'cyberx-omsk-cup-cs2',
  title: 'CYBERX OMSK MAJOR // AUTUMN 2026',
  game: 'CS2',
  gameTag: 'COUNTER-STRIKE 2 // 5v5 OMSK LAN BATTLE',
  prizePool: '150 000 ₽',
  prizePoolNumeric: 150000,
  date: '20 Сентября 2026',
  time: '12:00 Омск (09:00 МСК)',
  location: 'CYBERX ARENA (ул. Ленина, 19) + Стрим Twitch',
  format: 'Double Elimination // LAN Final 5x5',
  slotsTotal: 16,
  slotsRegistered: 14,
  registrationOpen: true,
  entryFee: '2 000 ₽ с команды (100% на баланс)',
  streamUrl: 'https://twitch.tv',
  description: 'Главный сезонный LAN-турнир по CS2 в Омске на сцене CyberX Arena. 16 команд сразятся за призовой фонд 150,000 ₽, чемпионский кубок CyberX и мерч. Финал комментируют профессиональные кастеры.',
  rules: [
    'Формат: 5х5 Competitive, MR12, Овертаймы MR3 $10,000',
    'Официальный маппул Active Duty CS2',
    'Античит: Внутриаренный LAN сервер 128 Tick Sub-Tick Pro',
    'Все участники играют на сетапах с мониторами BenQ 600Hz / 400Hz',
    'Напитки и снеки из бара CyberX включены для полуфиналистов'
  ],
  prizes: [
    { place: '🥇 1 МЕСТО', reward: '80 000 ₽ + Кубок CyberX Omsk + 50 часов в Premium' },
    { place: '🥈 2 МЕСТО', reward: '45 000 ₽ + Серебряные медали + 25 часов в VIP' },
    { place: '🥉 3 МЕСТО', reward: '25 000 ₽ + Бронзовые медали + Девайсы Dark Project' },
    { place: '🎖 MVP Турнира', reward: 'Именная мышь Logitech G Pro X' }
  ]
};

export const ALL_TOURNAMENTS: Tournament[] = [
  UPCOMING_TOURNAMENT,
  {
    id: 'cyberx-dota-2-omsk',
    title: 'CYBERX DOTA 2 IMMORTAL CLASH',
    game: 'DOTA 2',
    gameTag: 'DOTA 2 // 5v5 CAPTAINS MODE',
    prizePool: '100 000 ₽',
    prizePoolNumeric: 100000,
    date: '4 Октября 2026',
    time: '13:00 Омск',
    location: 'CYBERX ЕВРОПА (просп. Мира, 42к1)',
    format: 'Group Stage + Single Elim Playoff',
    slotsTotal: 16,
    slotsRegistered: 9,
    registrationOpen: true,
    entryFee: '1 500 ₽ с команды',
    description: 'Битва сильнейших дотеров Омска в киберхабе CyberX Европа. Трансляция на большом экране, призы и подарки от партнеров.',
    rules: [
      'Captains Mode, актуальный соревновательный патч',
      'LAN сервер с минимальным пингом'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '60 000 ₽ + Aegis CyberX' },
      { place: '🥈 2 МЕСТО', reward: '25 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '15 000 ₽' }
    ]
  },
  {
    id: 'cyberx-valorant-radiant',
    title: 'CYBERX VALORANT RADIANT CUP',
    game: 'VALORANT',
    gameTag: 'VALORANT // 5v5 TOURNAMENT',
    prizePool: '80 000 ₽',
    prizePoolNumeric: 80000,
    date: '18 Октября 2026',
    time: '14:00 Омск',
    location: 'CYBERX ОКТЯБРЬ (ул. Серова, 19А)',
    format: 'Swiss System 5 Rounds + Playoff',
    slotsTotal: 12,
    slotsRegistered: 7,
    registrationOpen: true,
    entryFee: 'Бесплатно по клубной карте CyberX',
    description: 'Швейцарская система для равной борьбы без вылета после одной случайной карты.',
    rules: [
      'Официальный регламент VCT',
      'Мониторы BenQ 600Hz / 400Hz'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '45 000 ₽ + Кубок' },
      { place: '🥈 2 МЕСТО', reward: '25 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '10 000 ₽' }
    ]
  },
  {
    id: 'cyberx-fc25-omsk',
    title: 'EA FC 25 CONSOLE CHAMPIONSHIP',
    game: 'EA FC 25',
    gameTag: 'PS5 // 1v1 DUEL',
    prizePool: '40 000 ₽',
    prizePoolNumeric: 40000,
    date: '25 Октября 2026',
    time: '16:00 Омск',
    location: 'CYBERX ARENA (PS5 Кино-Лаунж // Ленина, 19)',
    format: '1v1 Double Elim // Экран 150"',
    slotsTotal: 32,
    slotsRegistered: 22,
    registrationOpen: true,
    entryFee: '700 ₽ с участника',
    description: 'Консольный турнир на 150" проекционном экране лаунжа с напитками и кальянами.',
    rules: [
      'Тайм 6 минут, соревновательные составы 95 OVR',
      'Геймпады DualSense'
    ],
    prizes: [
      { place: '🥇 1 МЕСТО', reward: '25 000 ₽ + Кубок' },
      { place: '🥈 2 МЕСТО', reward: '10 000 ₽' },
      { place: '🥉 3 МЕСТО', reward: '5 000 ₽' }
    ]
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'free-hours-welcome',
    title: '2 ЧАСА В ПОДАРОК // НОВЫМ ГОСТЯМ',
    tag: 'АКЦИЯ LANGAME',
    discount: '2 ЧАСА БЕСПЛАТНО',
    period: 'При первой регистрации в CyberX Европа & Октябрь',
    description: 'Зарегистрируйте аккаунт в клубах CyberX Европа (Мира) или CyberX Октябрь (Серова) и получите 2 часа бесплатной игры на баланс сразу!',
    perks: [
      '2 часа бесплатного игрового времени',
      'Действует на любые игры и ПК',
      'Клубная карта CyberX Community в подарок'
    ],
    code: 'CYBERX_WELCOME_2H',
    colorScheme: 'red',
    featured: true,
  },
  {
    id: 'hookah-bonus',
    title: 'КАЛЬЯН + ЧАС ИГРЫ В ПОДАРОК',
    tag: 'ХИТ ЛАУНЖА',
    discount: '+1 ЧАС ИГРЫ',
    period: 'Ежедневно во всех 3 клубах',
    description: 'Закажите кальян у администратора в CyberX Arena, Европе или Октябре и получите 1 час игры на PlayStation 5 или ПК в подарок!',
    perks: [
      'Премиальный табак и авторская чаша',
      '1 час игры в PS5 или ПК бесплатно',
      'Подача прямо к игровому месту или дивану'
    ],
    code: 'HOOKAH_GAME',
    colorScheme: 'dark',
    featured: true,
  },
  {
    id: 'friend-bonus',
    title: 'ПРИВЕДИ ДРУГА // +200 РУБЛЕЙ',
    tag: 'БОНУСНАЯ ПРОГРАММА',
    discount: '+200 ₽ НА БАЛАНС',
    period: 'Постоянная акция в CyberX Arena (Ленина, 19)',
    description: 'Приведите друга, который еще не был в CyberX Arena — и вы оба получите по 200 рублей на игровой баланс при его первой сессии.',
    perks: [
      '200 рублей вам и 200 рублей другу',
      'Количество приглашенных друзей не ограничено',
      'Баллы можно тратить на любое время и пакеты'
    ],
    code: 'FRIEND_200',
    colorScheme: 'steel',
    featured: false,
  }
];
