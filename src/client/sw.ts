const CACHE_VERSION = 'REACT_APP_V1';
const APP_SHELL_FILES: string[] = [];

const contentToCache = [...APP_SHELL_FILES];

self.addEventListener('install', (e: any) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener('fetch', (e: any) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_VERSION);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

self.addEventListener('activate', (e: any) => {
  e.waitUntil(
    (async () => {
      const keyList: string[] = await caches.keys();
      await Promise.all(
        keyList.map((key) => {
          if (key === CACHE_VERSION) {
            return;
          }
          caches.delete(key);
        })
      );
    })()
  );
});
