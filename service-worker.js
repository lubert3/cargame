const CACHE_NAME = "auto2d-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json"
];

// Durante l'installazione, salva i file nella cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Rimuove vecchie cache se presenti
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            )
        )
    );
});

// Risponde alle richieste con i file in cache o dalla rete
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});