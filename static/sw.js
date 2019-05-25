// /* eslint-disable */

// const currentCache = {
//   offline: 'offline-cache-site'
// };

// const offlinePage = '/offline';

// const assets = [
//   offlinePage
// ];

// self.addEventListener('install', event => {
//   event.waitUntil(
//       caches.open(currentCache.offline).then(cache => {
//           cache.addAll(assets);
//       })
//   );
// });

// self.addEventListener('fetch', event => {
//   if (event.request.mode === 'navigate'
//       || (event.request.method === 'GET'
//       && event.request.headers.get('accept').includes('text/html'))) {
//       event.respondWith(
//           fetch(event.request.url).catch(() => {
//               return caches.match(offlinePage);
//           })
//       );
//   } else {
//       event.respondWith(caches.match(event.request)
//           .then(resp => {
//               return resp || fetch(event.request);
//           })
//       );
//   }
// });
