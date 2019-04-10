<template>
  <section class="container">
    <h2 class="subtitle">Polecane obiekty</h2>
    <article class="tiles">
      <Tile
        alt=""
        href="/search/all"
        title="Aquapark Delfin Warszawa"
        class="tile"
      />
      <Tile
        alt=""
        href="/search/all"
        title="Aquapark Delfin Warszawa"
        class="tile"
        :active="true"
      />
      <Tile
        alt=""
        href="/search/all"
        title="Aquapark Delfin Warszawa"
        class="tile"
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
.subtitle {
  margin-top: 0;
}
</style>
