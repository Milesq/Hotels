/* eslint-disable no-param-reassign */
import { API } from '@/assets/config.json';

function required(message = '') {
  // eslint-disable-next-line
  throw 'Missing required argument! ' + message;
}

export default function (ctx) {
  const { $axios } = ctx;

  ctx.getRandomObjects = async function getRandomObjects(type = required(), howMuch = 3) {
    const { data: max } = await $axios.get(`${API}/${type}s/count`);
    let randomObjects = new Set;

    // eslint-disable-next-line
    for (let i=0;i<howMuch;++i) {
      randomObjects.add(Math.floor(Math.random() * max + 1));
    }

    randomObjects = [...randomObjects];
    while (randomObjects.length < howMuch) {
      randomObjects.push(Math.floor(Math.random() * max + 1));
    }
    randomObjects = randomObjects.map(postNumber => $axios.get(`${API}/${type}s/${postNumber}`));
    randomObjects = await Promise.all(randomObjects);
    return randomObjects.map(x => x.data);
  };
}
