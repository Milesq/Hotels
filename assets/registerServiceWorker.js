/* eslint-disable */

export default () => {
  caches.open('poolsOfflineCache')
    .then(cache => {
      cache.add('/offline');
    });

  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service worker registered succesfull!'))
    .catch(err => console.log(`Something was wrong! ${err}`));
};
