<template>
  <section>
    <Breadcrumb
      :crumbs="[$route.params.city === 'all'? 'Baseny W Polsce' : $route.params.city]"
      class="breadcrumbs" />
    <section class="container" style="background-color: #eee">
      <nav class="filters">
        <h3 class="title">
          <span>Filtry</span>
          <i @click="reset" title="Resetuj filtry" class="fas fa-filter"></i>
        </h3>
        <label class="filter filter__object-type">
          Rodzaj obiektu
          <v-select
            :options=" [
              { code: 'aquapark', label: 'Aquapark'},
              { code: 'swimmingpoolIndoor', label: 'Basen Wewnętrzny'},
              { code: 'swimmingpoolOutdoor', label: 'Basen Zewnętrzny'},
              { code: 'swimmingpoolThermal', label: 'Basen Termalny'},
              { code: 'sauna', label: 'Sauna'}
            ]"
            :reduce="({ code }) => code"
            v-model="category"></v-select>
        </label>
        <span class="filter filter__attractions">
          Atrakcje
          <div class="filter__wrapper">
            <v-select
              v-model="attractions"
              multiple
              :closeOnSelect="false"
              :options="possibilityAttractions"></v-select>
          </div>
        </span>
        <label v-if="$route.params.city !== 'all'" class="filter filter__range">
          Odległość od miasta
          <span>
            <input
              type="range"
              min="0"
              max="200"
              v-model="r">
              <!-- Witchout next line, range input is too long when r <= 100 -->
              <span v-if="r < 100" style="color: transparent; user-select: none">0</span>
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
        <section class="meta">
          <h1 class="header">
            Baseny - {{ $route.params.city == 'all'? 'Polska' : $route.params.city }}
          </h1>
          <div @click="showmap = !showmap" class="show-map">
            <i class="icon fas fa-map-marked-alt"></i>
            <button>{{
                showmap? 'Ukryj' : 'Pokaż'
              }} mapę</button>
          </div>
        </section>
        <transition name="map">
          <section class="map" :class="{
            'map--show': showmap
          }">
            <!-- <Map :latlng="swimmingPoolsCoords" /> -->
          </section>
        </transition>
        <section v-if="filteredSwimmingPools.length">
          <ObjectInfo
            v-for="object in filteredSwimmingPools"
            :key="object.name + 'searchResult'"
            :data="object" />
        </section>
        <section v-else class="not-found">
          <h2 class="not-found__info">Niestety nic nie znaleźliśmy w
            <span class="city-name">{{ $route.params.city }}</span>
          </h2>
          <h3 class="help-msg">Poniżej lista obiektów w odległości {{ r = 120 }}km</h3>
          <span class="light-font">
            Możesz również ręcznie zwiększyć promień wyszukiwania w filtrze
          </span>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
import ObjectInfo from '~/components/ObjectInfo.vue';
import Map from '~/components/Map.vue';
import debounce from 'lodash.debounce';
import VSelect from 'vue-select';
import { API } from '@/assets/config.json';

const maps = place => `https://nominatim.openstreetmap.org/search?q=${place}&format=json`;

function geo([x1, y1], [x2, y2]) {
  const { sqrt, cos, PI } = Math;
  const a = ((x2 - x1) ** 2) + ((cos(x1 * PI / 180) * (y2 - y1)) ** 2);
  return sqrt(a) * 111.3214;
}

let debouncedWatchHandler = async function (self) {
  let filtered = self.swimmingPools.filter(el => self.openHoursBeg >= el.open[0]);
  filtered = filtered.filter(el => self.openHoursEnd <= el.open[1]);

  if (self.category !== null) filtered = filtered.filter(el => el.type[self.category]);

  /* eslint-disable */
  const mustHave = self.attractions.map(_ => _.toLowerCase());
  filtered = filtered.filter(
    ({ attractions }) =>
      mustHave.every(
        item =>
          attractions.map(
            _ =>
              _.toLowerCase()).includes(item))
    );
  /* eslin-enable */

  if (self.$route.params.city !== 'all') {
    let tips = filtered.map(async (item) => {
      const { data } = await self.$axios.get(maps(item.address));
      if (data.length === 0) {
        console.log(`${item.name} was ommited! ${item.address}`);
        return true;
      }

      const [{ lat, lon }] = data;
      const place = [lat, lon].map(x => x * 1);
      return geo(self.cityCoords, place) <= self.r;
    });

    tips = await Promise.all(tips);

    filtered = filtered.filter((item, i) => tips[i]);
  }

  self.filteredSwimmingPools = filtered;
};

debouncedWatchHandler = debounce(debouncedWatchHandler, 75);

async function watchHandler() {
  debouncedWatchHandler(this);
}

const watchers = {};

// eslint-disable-next-line
for (const el of [
  'category',
  'attractions',
  'r',
  'openHoursBeg',
  'openHoursEnd',
  'possibilityAttractions'
]) {
  watchers[el] = watchHandler;
}

export default {
  async asyncData({ $axios, params }) {
    // eslint-disable-next-line
    let url = `${API}/swimmingpools`;
    const city = encodeURIComponent(params.city);
    if (city !== 'all') url += `/?city_contains=${city}`;

    let swimmingPools = (await $axios.get(url)).data;
    swimmingPools = swimmingPools.map(async (pool) => {
      let {
        name,
        gallery,
        open,
        address,
        swimmingpoolThermal,
        swimmingpoolOutdoor,
        swimmingpoolIndoor,
        sauna,
        aquapark,
        city
      } = pool;

      address = `${city} ${address}`;

      if (open.length !== 7 || open.some(x => x.length != 2)) {
        open = new Array(7).fill([1, 24]);
      }

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

      let { data } = await $axios.get(maps(encodeURI(address)));
      if (data.length === 0) {
        console.log(`${name} was ommited! ${address}`);
        data = [{
          lat: null,
          lon: null
        }];
      }

      const [{ lat, lon }] = data;

      return {
        name,
        img: gallery.map(img => API + img.url),
        address,
        attractions,
        open: open[((new Date().getDay() + 6) % 7)],
        ratings: {
          average: 4.7,
          numbers: 120
        },
        type: {
          swimmingpoolThermal,
          swimmingpoolIndoor,
          swimmingpoolOutdoor,
          sauna,
          aquapark
        },
        coords: {
          lat,
          lon
        }
      };
    }); // TODO: ratings

    swimmingPools = await Promise.all(swimmingPools);

    let [cityCoords] = (await $axios.get(maps(city))).data;
    cityCoords = [cityCoords.lat, cityCoords.lon];

    let swimmingPoolsCoords = swimmingPools.map(x => x.coords).filter(x => x.lat !== null);
    if(swimmingPoolsCoords.length) {
      swimmingPoolsCoords = swimmingPoolsCoords.map(el => [el.lat, el.lon]);
    }

    return {
      swimmingPools,
      filteredSwimmingPools: swimmingPools,
      cityCoords,
      swimmingPoolsCoords
    };
  },
  data() {
    return {
      swimmingPools: [],
      filteredSwimmingPools: [],

      category: null,
      attractions: [],
      r: 50,
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
      ],

      showmap: false
    };
  },
  methods: {
    reset() {
      this.category = null;
      this.attractions = [];
      this.r = 50;
      this.openHoursBeg = '8.30';
      this.openHoursEnd = '14';
    }
  },
  mounted() {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    let { type } = this.$route.query;
    if(type) {
      if(/[a-z]-[a-z]+-[a-z]/i.test(type)) {
        type = type.toLowerCase().split('-');
        type.push(capitalize(type.pop()));
        this.category = type.join('');
      } else {
        this.category = type;
      }
    }
  },
  watch: watchers,
  components: {
    ObjectInfo,
    Breadcrumb,
    Map,
    VSelect
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
$default-shadow: 0 0 10px -5px #000;

.map {
  background-color: #0f0;
  overflow: hidden;
  height: 0;
  box-shadow: $default-shadow;

  transition: height .33s ease;

  &--show {
    height: 250px;
  }
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .show-map {
    cursor: pointer;
    font-weight: 500;

    border-radius: 4px;
    box-shadow: 0 3px 5px -3px #000;
    padding: 6px;
    height: 30.4px;
    background-color: #fff;

    display: inline-flex;
    justify-content: space-between;
  }

  .icon {
    margin-right: 5px;
  }

  button {
    cursor: inherit;
    background: transparent;
    border: none;
  }
}

.container {
  position: relative;
  display: grid;
  @media(min-width: 1100px) {
    grid-template-columns: 1fr 3fr;
  }

  padding: 0 10%;

  @media(max-width: 1300px) {
    padding: 25px;
  }

  @media (max-width: 550px) {
    padding: 5px;
  }
}

.filters {
  padding: 20px;
  background-color: #fff;
  margin: 10% 0;
  margin-top: 12.5%;
  box-shadow: $default-shadow;

  @media(min-width: 1100px) {
    position: fixed;
    top: 40px;
  }
}

.results {
  @media(min-width: 1100px) {
    margin-left: 50px;
  }

  min-height: 100%;
  margin-bottom: 20px;
}

.header {
  @media(max-width: 1100px) {
    position: absolute;
    top: 0;
  }
}

.not-found {
  box-shadow: $default-shadow;

  background-color: #fff;
  height: 250px;
  padding: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__info {
    font-weight: 400;
    font-size: 1.3rem;
  }

  & > * {
    margin: 15px auto;
  }

  .city-name {
    text-transform: capitalize;
  }

  .light-font {
    font-weight: 300;
  }

  .help-msg {
    font-size: 2rem;
  }
}

.breadcrumbs {
  --size: 160px;
  margin-left: var(--size);
  transform: translateY(calc(var(--size) / 12.3));
  display: block;

  @media(max-width: 1100px) {
    --size: 10px;
    margin-top: 20px;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-bottom: 10%;

  .fas {
    font-size: 20px;
    cursor: pointer;
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
</style>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

.filter__wrapper .vs__selected-options {
  flex-direction: column;
}
</style>
