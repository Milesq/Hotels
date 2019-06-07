<template>
  <section class="container">
    <h2 class="subtitle">Polecane obiekty</h2>
    <article class="tiles">
      <div v-for="object in data" :key="object.id">
        <Tile
          alt=""
          :href="`/object/${customize(slugify(object.name))}`"
          :title="object.name"
          :src="API + object.gallery[0].url"
          :description="object.description"
          class="tile"
        />
      </div>
    </article>
  </section>
</template>

<script>
import slugify from 'slugify';
import { API } from '@/assets/config.json';
import Tile from '../Tile.vue';

export default {
  props: ['data'],
  data() {
    return {
      API
    };
  },
  methods: {
    slugify,
    customize(addr) {
      let customized = addr[0].toUpperCase();
      customized += addr.substr(1);
      return customized
        .split('')
        .reduce((acc, el, i, arr) =>
          acc
          + (/-/.test(el)
            ? arr[i + 1].toUpperCase()
            : (arr[i - 1] === '-' ? '' : el)));
    }
  },
  components: {
    Tile
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/tiles.scss';
.subtitle {
  margin-top: 0;
}

.subtitle {
  text-align: center;
}
</style>
