<template>
  <section class="container">
    <h2 class="subtitle">Polecane obiekty</h2>
    <Tile
      alt=""
      href="objects"
      title="Aquapark Delfin Warszawa"
      class="tile"
    />
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
@import '@/static/variables.scss';

.subtitle {
  margin-bottom: 5vmin;
}

.container {
  width: 100%;
}

.tile {
  width: 400px;
}
</style>
