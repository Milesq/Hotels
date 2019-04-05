<template>
  <section class="container">
    <h2 class="subtitle">Polecane obiekty</h2>
    <article class="tiles">
      <Tile
        alt=""
        href="objects"
        title="Aquapark Delfin Warszawa"
        class="tile"
      />
      <Tile
        alt=""
        href="objects"
        title="Aquapark Delfin Warszawa"
        class="tile"
        :active="true"
      />
      <Tile
        alt=""
        href="objects"
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
@import '@/static/variables.scss';

.container {
  width: 100%;
}

.subtitle {
  margin-bottom: 5vmin;
}

.tiles {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.tile {
  width: 400px;
}
</style>
