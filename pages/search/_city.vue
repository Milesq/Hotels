<template>
  <section class="container">
    <nav>
      <label>
        Rodzaj obiektu
        <select v-model="category">
          <option value="aquapark">Aquapark</option>
          <option value="basen">Basen</option>
          <option value="sauna">Sauna</option>
        </select>
      </label>
      <span>
        Atrakcje
        <label
          v-for="attraction in possibilityAttractions"
          :key="attraction[1]"
          style="display: block">
            {{ attraction[0] }}
          <input type="checkbox" :value="attraction[1]" v-model="attractions">
        </label>
      </span>
      <label>
        Odległość od miasta
        <input
          type="range"
          min="0"
          max="200"
          v-model="r">
        {{ r }}km
      </label>
      <label>
        Minimalna ocena
        <Stars v-model="rating" />
      </label>
      <label>
        Godziny otwarcia
        <span>
          Od: <input type="number" min="0" max="24" v-model="openHours.open">
          Do: <input type="number" min="0" max="24" v-model="openHours.closed">
        </span>
      </label>
    </nav>
    <section class="results">
      <h1>Baseny - {{ $route.params.city }}</h1>
      <ObjectInfo />
    </section>
  </section>
</template>

<script>
import ObjectInfo from '~/components/ObjectInfo.vue';
import Stars from '~/components/Stars.vue';

export default {
  data() {
    return {
      category: 'aquapark',
      attractions: [],
      r: 100,
      rating: 0,
      openHours: {
        open: 8,
        closed: 22
      },
      possibilityAttractions: [
        ['Basen sportowy', 'sports-swimming-pool'],
        ['Basen rekreacyjny', 'recreational-pool'],
        ['Sauna sucha', 'dry-sauna'],
        ['Brodzik dla dzieci', 'paddling']
      ]
    };
  },
  components: {
    ObjectInfo,
    Stars
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 2fr 7fr;

  padding: 0 10vw;
}

.results {
  margin-left: 50px;
}
</style>
