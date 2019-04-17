/* eslint-disable */

self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.open('poolsOfflineCache')
        .then(cache => cache.match('/offline'))
    );
  }
});
