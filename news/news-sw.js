const CACHE_NAME = "dagens-news-202610091228460200";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./news.js",
  "./news-sw.js",
  "./data.json",
  "./search-index.json",
  "../common/common.css",
  "../common/common.js",
  "../common/header.html",
  "../common/footer.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html")),
    );
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  // Network first so a new build (data.json, shared header/CSS) shows on the
  // next visit; the cache is only the offline fallback.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
