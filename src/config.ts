// CMS-бэкенд (см. server/).
// Пустая строка = кабинет работает в локальном режиме:
// изменения сохраняются только в браузере владельца (localStorage).
// После деплоя сервера укажите адрес, например:
//   export const CMS_API_BASE = 'https://cms.cyberx-omsk.ru';
// — тогда «Опубликовать» в кабинете станет виден всем посетителям сайта.
export const CMS_API_BASE = '';

// CARTO Basemaps (raster) — публичный ключ аккаунта VIN7L.
// Ключ предназначен для встраивания в URL тайлов (без него CARTO показывает
// водяной знак «API key required»). Смены не требует, новый — из mail@carto.com.
export const CARTO_API_KEY = 'cb1_3jxw_1_c62d5d0a5e3ec199c4d3cdb7';
