<template>
  <section class="container">
    <h2 class="subtitle">Polecane obiekty</h2>
    <article class="tiles">
      <div v-for="object in data" :key="object.id">
        <Tile
          alt=""
          :href="`/object/${slugify(object.name)}`"
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
    slugify
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
