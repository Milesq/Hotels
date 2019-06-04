<template>
  <section class="container">
    <h2 class="subtitle">Popularne artykuły</h2>
    <article class="tiles">
      <div v-for="object in data" :key="object.id">
        <Tile
          alt=""
          :href="`/blog/${object.id}`"
          :title="object.title"
          :src="API + object.image.url"
          :description="object.content"
          class="tile"
          light
        />
      </div>
    </article>
  </section>
</template>

<script>
import { API } from '@/assets/config.json';
import Tile from '../Tile.vue';

export default {
  props: ['data'],
  data() {
    return {
      API
    };
  },
  components: {
    Tile
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/tiles.scss';
.container {
  margin-bottom: 5vmin;
}

.subtitle {
  text-align: center;
}
</style>
