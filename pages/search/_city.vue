<template>
  <section class="container">
    <nav class="filters">
      <h3 class="title">
        <span>Filtry</span> <i class="fas fa-filter"></i>
      </h3>
      <label class="filter filter__object-type">
        Rodzaj obiektu
        <select v-model="category">
          <option value="---">Dowolny</option>
          <option value="aquapark">Aquapark</option>
          <option value="swimmingpool">Basen</option>
          <option value="sauna">Sauna</option>
        </select>
      </label>
      <span class="filter filter__attractions">
        Atrakcje
        <div class="filter__wrapper">
          <label
            v-for="attraction in possibilityAttractions"
            :key="attraction + '-attraction'"
            style="display: block">
              <div class="pretty p-default p-round p-thick p-smooth">
                  <input type="checkbox" :value="attraction" v-model="attractions">
                  <div class="state p-primary-o">
                      <label>{{ attraction }}</label>
                  </div>
              </div>
          </label>
        </div>
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
        <span style="display: block">Godziny otwarcia</span>
        <span>
          <label>Do: <input type="number" min="0" max="24" v-model="openHoursBeg"></label>
          <label>Od: <input type="number" min="0" max="24" v-model="openHoursEnd"></label>
        </span>
      </span>
    </nav>
    <span></span>
    <section class="results">
      <h1>Baseny - {{ $route.params.city == 'all'? 'Polska' : $route.params.city }}</h1>
      <!-- <section v-if="filteredSwimmingPools.length"> -->
      <ObjectInfo
        v-for="object in filteredSwimmingPools"
        :key="object.name + 'searchResult'"
        :data="object" />
      <!-- </section> -->
      <!-- <article v-else>
        Nic nie znaleziono!
        <section>
          <ObjectInfo
            v-for="object in swimmingPools"
            :key="object.name + 'searchResult'"
            :data="object" />
        </section>
      </article> -->
    </section>
  </section>
</template>

<script>
import ObjectInfo from '~/components/ObjectInfo.vue';
import { API } from '@/assets/config.json';

// TODO: add husky

function watchHandler() {
  let filtered = this.swimmingPools.filter(el => this.openHoursBeg >= el.open[0]);
  filtered = filtered.filter(el => this.openHoursEnd <= el.open[1]);

  if (this.category !== '---') filtered = filtered.filter(el => el.type[this.category]);

  /* eslint-disable */
  const mustHave = this.attractions.map(_ => _.toLowerCase());
  filtered = filtered.filter(
    ({ attractions }) =>
      mustHave.every(
        item =>
          attractions.map(
            _ =>
              _.toLowerCase()).includes(item))
    );
  /* eslint-enable */

  if (this.$route.params.city !== 'all') {
    filtered = filtered.filter((item) => {
      console.log(item.address);
      return true;
    });
  }

  this.filteredSwimmingPools = filtered;
}

const watchers = {};

// eslint-disable-next-line
for (const el of [
  'category',
  'attractions',
  'r',
  'rating',
  'openHoursBeg',
  'openHoursEnd',
  'possibilityAttractions'
]) {
  watchers[el] = watchHandler;
}

export default {
  async asyncData({ $axios, params: { city } }) {
    let url = `${API}/swimmingpools`;
    if (city !== 'all') url += `/?address_contains=${city}`;

    let swimmingPools = (await $axios.get(url)).data;
    swimmingPools = swimmingPools.map((pool) => {
      const {
        name,
        gallery,
        open,
        address,
        swimmingpool,
        sauna,
        aquapark
      } = pool;

      const possibilityAttractions = [
        'BasenSportowy25m',
        'BasenOlimpijski50m',
        'BasenRekreacyjny',
        'BrodzikDlaDzieci',
        'BasenZewnętrzny',
        'BasenSolankowy',
        'BasenTreningowy',
        'Zjeżdżalnia',
        'Jacuzzi',
        'GrotaSolna',
        'GrotaLodowa',
        'SaunaSucha',
        'SaunaParowa',
        'SaunaInfrared',
        'SaunaAromatyczna',
        'SaunaZiołowa',
        'Biosauna',
        'ŁaźniaTurecka',
        'RuskaBania',
        'Sanarium',
        'SłonecznaŁąka',
        'Tepidarium',
        'Laconium',
        'Caldarium'
      ];

      let attractions = [];

      // eslint-disable-next-line
      for (const x of possibilityAttractions) {
        if (pool[x] === 1) attractions.push(x);
      }

      attractions = attractions.map(
        attraction => attraction
          .split('')
          .reduce((acc, el) => acc
            + (/[0-9]/.test(el) || el.toLocaleUpperCase() === el ? ' ' : '')
            + el)
      ).map((el) => {
        let ret = el;
        while (/[0-9] [0-9]/.test(ret)) {
          ret = ret.replace(/([0-9]) ([0-9])/, '$1$2');
        }

        return ret;
      });

      return {
        name,
        img: gallery.map(img => API + img.url),
        address,
        attractions,
        open: open[new Date().getDay()],
        ratings: {
          average: 4.7,
          numbers: 120
        },
        type: {
          swimmingpool,
          sauna,
          aquapark
        }
      };
    });

    return {
      swimmingPools,
      filteredSwimmingPools: swimmingPools
    };
    // return {
    //   swimmingPools: [
    //     {
    //       name: 'Basen Warszawa',
    //       img: 'https://placeimg.com/400/250/any',
    //       address: 'Warszawa ul. Długa 64',
    //       ratings: {
    //         average: 4.7,
    //         numbers: 120
    //       },
    //       open: [8, 22],
    //       attractions: ['Basen sportowy', 'Basen olimpijski', 'Brodzik dla dzieci']
    //     }
    //   ]
    // };
  },
  data() {
    return {
      swimmingPools: [],
      filteredSwimmingPools: [],

      category: '---',
      attractions: [],
      r: 100,
      rating: 0,
      openHoursBeg: '8.30',
      openHoursEnd: '14',
      possibilityAttractions: [
        'Basen sportowy 25m',
        'Basen olimpijski 50m',
        'Basen Rekreacyjny',
        'Brodzik dla dzieci',
        'Basen zewnętrzny',
        'Basen solankowy',
        'Basen treningowy',
        'Zjeżdżalnia ',
        'Jacuzzi',
        'Grota solna',
        'Grota lodowa',
        'Sauna sucha',
        'Sauna parowa',
        'Sauna infrared',
        'Sauna aromatyczna',
        'Sauna ziołowa',
        'Biosauna',
        'Łaźnia turecka',
        'Ruska Bania',
        'Sanarium',
        'Słoneczna łąka',
        'Tepidarium',
        'Laconium',
        'Caldarium'
      ]
    };
  },
  watch: watchers,
  components: {
    ObjectInfo
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  @media(min-width: 950px) {
    grid-template-columns: 1fr 3fr;
  }

  padding: 0 10%;

  @media(max-width: 1150px) {
    padding: 25px;
  }
}

.results {
  @media(min-width: 950px) {
    margin-left: 50px;
  }

  min-height: 100%;
  margin-bottom: 20px;
}

.filters {
  padding: 20px;
  background-color: #fff;
  margin: 10% 0;
  box-shadow: 0 2px 5px -3px #000;

  @media(min-width: 950px) {
    position: fixed;
    top: -40px;
  }

  @media(max-width: 1150px) {
    top: 0;
  }
}

.filter__wrapper {
  height: 175px;
  overflow-y: scroll;
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
    background-color: #fff;
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

@import '@/assets/rangeInput.scss';
@import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
