<template>
  <section class="container">
    <h2 class="subtitle">Popularne artykuły</h2>
    <article class="tiles">
      <Tile
        alt=""
        href="/blog/0"
        title="Aquapark Delfin Warszawa"
        class="tile"
        light
      />
    </article>
  </section>
</template>

<script>
import Tile from '../Tile.vue';

export default {
  props: ['data'],
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
</style>
