const cacheName = 'nd802-pta-static-v1';
const urlsToCache = [
    '/',
    'app.bundle.css',
    'app.bundle.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
