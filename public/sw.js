const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  // "/",
  // "index.html",

  "/src/main.tsx",
  // "/src/app.tsx",
  // "/src/services/useFetch.ts",
];

self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    try {
      cache_obj = await caches.open(cache);
      cache_obj.addAll(urlsToCache);
    } catch {
      console.log("error occured while caching...");
    }
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
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
