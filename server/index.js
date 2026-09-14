/**
 * CMS-бэкенд CyberX Omsk.
 *
 * Хранит весь редактируемый контент сайта (один JSON-файл) и принимает
 * загрузку фото из кабинета владельца.
 *
 * Запуск:  npm install && npm start
 * Переменные окружения:
 *   PORT            — порт (по умолчанию 8787, на Render/Railway задаётся сам)
 *   CMS_KEY         — секрет ключ владельца (по умолчанию CYBERX-OMSK-ROOT-2026,
 *                    ОБЯЗАТЕЛЬНО смените в продакшене)
 *   ALLOWED_ORIGIN  — через запятую: какие домены могут писать (GET открыт для всех).
 *                     Пример: "https://cyberx-omsk.ru,https://www.cyberx-omsk.ru"
 *
 * После деплоя укажите адрес сервера в src/config.ts (CMS_API_BASE).
 */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8787;
const CMS_KEY = process.env.CMS_KEY || 'CYBERX-OMSK-ROOT-2026';
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();

// CORS: GET-контент открыт (сайт должен читать контент с любого домена),
// запись — только из ALLOWED_ORIGIN (и при верном ключе).
const allowed = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean)
  : true;
app.use(cors({ origin: allowed, credentials: false }));
app.use(express.json({ limit: '8mb' }));
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', immutable: true }));

function requireKey(req, res, next) {
  if (req.get('x-cyberx-key') === CMS_KEY) return next();
  res.status(401).json({ error: 'unauthorized' });
}

/** GET /api/content — опубликованный контент (404, если ещё не публиковался) */
app.get('/api/content', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(404).json({ error: 'no content yet' });
  }
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch {
    res.status(500).json({ error: 'data file corrupted' });
  }
});

/** PUT /api/content — полная замена контента (из кабинета владельца) */
app.put('/api/content', requireKey, (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'invalid body' });
  }
  const content = { ...body, updatedAt: new Date().toISOString() };
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(content, null, 2), 'utf8');
  fs.renameSync(tmp, DATA_FILE);
  res.json({ ok: true, updatedAt: content.updatedAt });
});

/** POST /api/upload — загрузка фото (multipart, поле "file") */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^\w.\-]/g, '_').slice(-60);
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/\.(jpe?g|png|webp|gif|svg)$/i.test(file.originalname)) cb(null, true);
    else cb(new Error('unsupported file type'));
  },
});

app.post('/api/upload', requireKey, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'upload failed' });
    if (!req.file) return res.status(400).json({ error: 'no file (multipart field: file)' });
    const proto = req.get('x-forwarded-proto') || req.protocol;
    const url = `${proto}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url });
  });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[cyberx-cms] listening on :${PORT}`);
  console.log(`[cyberx-cms] data: ${DATA_FILE}`);
});
