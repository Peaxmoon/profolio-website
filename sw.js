const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/projects.html',
  '/stylesheet.css',
  '/script.js',
  '/favicon.ico',
  '/site.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  // Network-first for HTML, cache-first for others
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return resp;
      }).catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return resp;
      }))
    );
  }
});


