<template>
  <section class="container">
    <h2 class="subtitle">Popularne artykuły</h2>
    <article class="tiles">
      <Tile
        alt=""
        href="objects"
        title="Aquapark Delfin Warszawa"
        class="tile"
        light
      />
      <Tile
        alt=""
        href="objects"
        title="Aquapark Delfin Warszawa"
        class="tile"
        light
      />
      <Tile
        alt=""
        href="objects"
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
