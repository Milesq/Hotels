<template>
  <section class="container">
    <nav class="filters">
      <h3 class="title">
        <span>Filtry</span> <i class="fas fa-filter"></i>
      </h3>
      <label class="filter filter__object-type">
        Rodzaj obiektu
        <select v-model="category">
          <option value="aquapark">Aquapark</option>
          <option value="basen">Basen</option>
          <option value="sauna">Sauna</option>
        </select>
      </label>
      <span class="filter filter__attractions">
        Atrakcje
        <label
          v-for="attraction in possibilityAttractions"
          :key="attraction[1]"
          style="display: block">
            <div class="pretty p-default p-round p-thick p-smooth">
                <input type="checkbox" :value="attraction[1]" v-model="attractions">
                <div class="state p-primary-o">
                    <label>{{ attraction[0] }}</label>
                </div>
            </div>
        </label>
      </span>
      <label class="filter filter__range">
        Odległość od miasta
        <span>
          <input
            type="range"
            min="0"
            max="200"
            v-model="r">
            <!-- Witchout next line, range input is too long when r <= 100 -->
            <span v-if="r < 100" style="color: transparent">0</span>
            {{ r }}km
        </span>
      </label>
      <span class="filter">
        Minimalna ocena
        <Stars v-model="rating" style="width: 100%" />
      </span>
      <span class="filter">
        <span style="display: block">Godziny otwarcia</span>
        <span>
          <label>Do: <input type="number" min="0" max="24" v-model="openHours.open"></label>
          <label>Od: <input type="number" min="0" max="24" v-model="openHours.closed"></label>
        </span>
      </span>
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
  grid-template-columns: 3fr 9fr;

  padding: 0 10vw;
}

.results {
  margin-left: 50px;
  min-height: 100%;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-bottom: 10%;

  .fas {
    font-size: 20px;
  }
}

.filter {
  display: block;
  margin: 18px 0;
  font-weight: 700;
  font-size: 1.1em;

  &__attractions * {
    font-weight: 400;
  }

  &__object-type select {
    font-family: Arial;
    width: 100%;
    padding: 7px;
    appearance: none;
    background-repeat: no-repeat;
    background-position: right;
    background-image: url(../../assets/dropdown.svg);
  }

  &__range {
    & > span {
      display: flex;
      justify-content: space-between;
      align-content: center;
    }

    input {
      width: 70%;
    }
  }

  & > *:nth-child(1) {
    margin-top: 15px;
  }
}

.filters {
  padding: 20px;
  background-color: #fff;
  margin: 10% 0;
  box-shadow: 0 2px 5px -3px #000;
}

@import '@/assets/rangeInput.scss';
@import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
