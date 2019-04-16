/* eslint-disable */

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request.url)
      .catch(() => caches.match('offline'))
  );
});
