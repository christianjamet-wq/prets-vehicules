var CACHE = 'prets-v3';
var FILES = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
});

self.addEventListener('fetch', function(e) {
  // Ne pas mettre en cache les appels GAS
  if (e.request.url.indexOf('script.google.com') > -1) return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
