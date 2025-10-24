// By incrementing the version, we force the service worker to update,
// clear the old cache, and re-fetch all assets.
const CACHE_NAME = 'feel-better-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/icon.svg',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/',
  'https://aistudiocdn.com/react@^19.1.1/'
];

// On install, cache the core assets.
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching core assets.');
        return Promise.all(
            URLS_TO_CACHE.map(url => {
                // Use 'reload' to bypass HTTP cache on install
                return cache.add(new Request(url, {cache: 'reload'})).catch(err => console.log(`Failed to cache ${url}`, err));
            })
        );
      })
  );
});

// On activation, clean up old caches.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of open clients
  );
});

// On fetch, implement caching strategies.
self.addEventListener('fetch', (event) => {
  // For navigation requests (HTML pages), use Network First, falling back to Cache.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If the fetch is successful, clone the response and cache it.
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If the fetch fails (e.g., offline), try to serve from the cache.
          return caches.match(event.request)
            .then(response => response || caches.match('/')); // Fallback to root page if specific page not cached
        })
    );
    return;
  }

  // For all other requests (assets), use Cache First, falling back to Network.
  // This provides a fast, offline-first experience for assets.
  // Asset updates are handled by versioning the cache.
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
