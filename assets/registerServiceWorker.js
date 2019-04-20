/* eslint-disable */

export default () => {
  if (!navigator.serviceWorker)
    return;

  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service worker registered succesfull!'))
    .catch(err => console.log(`Something was wrong! ${err}`));
}
