let CACHE_NAME = 'pwa-site-cache-v1';
let urlsToCache = [
    '/',
    '/css/index.css',
    '/js/jquery.min.js',
    '/js/main.js',
    '/images/pwa-logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(async function() {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
    }());
});