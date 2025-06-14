// Service Worker für Caching von statischen Assets
const CACHE_NAME = 'kira-marie-v1.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/KMClogo.webp',
  '/images/KMClogoweiss.webp',
  '/fonts/optimized/Kingdom-Regular.woff2',
  '/fonts/optimized/Kingdom-Regular.woff'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  
  if (event.request.method !== 'GET') {
    return;
  }
  
  if (requestURL.hostname === 'www.kiramaricremer.de' || 
      requestURL.hostname === 'kiramaricremer.de') {
    
    if (requestURL.pathname.startsWith('/admin') ||
        requestURL.pathname.includes('api') ||
        requestURL.pathname.includes('auth')) {
      return;
    }

    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
