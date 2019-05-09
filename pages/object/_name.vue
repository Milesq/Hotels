<template>
  <div class="container">
    <div class="gallery"></div>
    <h1>{{ $route.params.name | fromUrlToHuman }}</h1>
    <section style="margin-top: 15px" class="grid grid--smallscreen">
      <section style="margin-right: 20px" class="tile">
        <h3 class="tile__header">Atrakcje</h3>
        <div class="tile__content tile__content--attractions">
          <span v-for="element in attractions" :key="'attraction_' + element[0]">
            <i class="fas fa-check"></i>
            {{ element }}
          </span>
        </div>
      </section>
      <section style="margin-left: 20px" class="tile">
        <h3 class="tile__header">Programy partnerskie</h3>
        <div class="tile__content tile__content--partners">
          <img v-for="partner in partners" :key="partner + 'logo'" :src="partner">
          <span
            class="partners-none"
            v-if="!partners || !partners.length"
          >Brak programów partnerskich w tym obiekcie</span>
        </div>
      </section>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Opis obiektu</h3>
      <div class="tile__content tile__content--description">
        <span v-html="desc"></span>

        <button @click="fullLengthDescription = !fullLengthDescription" class="descriptionToggle">
          {{
          fullLengthDescription ? 'Zwiń' : 'Rozwiń'
          }}
          opis
        </button>
      </div>
    </section>
    <section class="ads">
      <Ad
        img="https://placeimg.com/400/250/any"
      >Co wziąść na basen? Pełna lista które musisz zabrać!</Ad>
      <Ad
        img="https://placeimg.com/400/500/any"
      >Higiena po basenie, czyli pamiętaj o wzięciu prysznica!</Ad>
      <Ad
        img="https://placeimg.com/300/350/any"
      >Najlepsze ćwiczenia odchudzające na basenie! Sprawdź naszą listę!</Ad>
    </section>
    <section class="grid grid--smallscreen">
      <section style="margin-right: 20px; background-color: white" class="tile">
        <h3 class="tile__header">Kontakt</h3>
        <div class="tile__content contact" style="margin: 0">
          <iframe
            class="map"
            :src="mapSrc"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
          <div class="contact__address" style="margin-bottom: 20px" v-text="address"></div>
          <div class="contact__wrapper contact--map">
            <i class="fas fa-map-marked-alt"></i>
            <a target="blank" :href="'https://www.google.com/maps/place/' + address">Otwórz mapę</a>

            <span>z trasą do obiektu</span>
          </div>
          <div class="contact" style="height: 100%;">
            <i class="fas fa-phone"></i>
            <span>{{ phone }}</span>
          </div>
          <div class="contact">
            <i class="fas fa-envelope"></i>
            <a target="blank" :href="'mailto:' + mail">{{ mail }}</a>
          </div>
          <div class="contact">
            <i class="fas fa-desktop"></i>
            <a target="blank" :href="'http://' + page">{{ page }}</a>
          </div>
        </div>
      </section>
      <section class="tile">
        <h3 class="tile__header">Godziny otwarcia</h3>
        <div class="tile__content" style="height: 100%; padding: 0 0;">
          <div class="subtitle open-hours">
            <span>Basen</span>
            <span></span>
            <span>Sauna</span>
            <span></span>
          </div>
          <div class="open-hours" :key="`day${day}`" v-for="day in 7">
            <span>{{day}}</span>
            <span>8-22</span>
            <span>{{day}}</span>
            <span>8-22</span>
          </div>
        </div>
      </section>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Cennik</h3>
      <div class="tile__content pricing">
        <span class="pricing__info">Sprawdź aktualne ceny na oficjalnej stronie basenu</span>
        <span>
          Bilet normalny od
          <b>10zł</b>
        </span>
        <span>
          Bilet ulgowy od
          <b>6zł</b>
        </span>
      </div>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Ocena</h3>
      <div class="tile__content ratings">
        <div class="ratings__main">
          <span>
            <span style="font-weight: 700">3.5</span>
            <i class="fas fa-star"></i>
          </span>
          <span class="ratings__numbers">
            Na podstawie
            <b>136 opini</b>
          </span>
        </div>
        <div class="details">
          <div class="details__unit">
            <span style="font-weight: 800">Obsługa:</span>
            <span>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star no-active"></i>
              <i class="fas fa-star no-active"></i>
              <i class="fas fa-star no-active"></i>
            </span>
            <span style="font-weight: 800">2.0</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Zatłoczenie:</span>
            <span>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star no-active"></i>
            </span>
            <span style="font-weight: 800">4.0</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Czystość:</span>
            <span>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </span>
            <span style="font-weight: 800">5.0</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Atrakcje:</span>
            <span>
              <i class="fas fa-star"></i>
              <i class="fas fa-star no-active"></i>
              <i class="fas fa-star no-active"></i>
              <i class="fas fa-star no-active"></i>
              <i class="fas fa-star no-active"></i>
            </span>
            <span style="font-weight: 800">1.0</span>
          </div>
        </div>
      </div>
    </section>
    <Comments :for="$route.params.name"/>
  </div>
</template>

<script>
import Comments from '@/components/Comments.vue';
import Ad from '@/components/ArticleAd.vue';
import { API } from '@/assets/config.json';

export default {
  validate({ redirect, params: { name } }) {
    if (name[0] === name[0].toUpperCase()) {
      redirect(`/object/${name[0].toLowerCase() + name.substr(1)}`);
    }

    if (!/[a-z]/.test(name[0])) {
      return false;
    }

    return true;
  },
  async asyncData({ $axios }) {
    const pool = (await $axios.get(`${API}/swimmingpools/1`)).data;

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

    const {
      description,
      address,
      mail,
      website: page,
      phone
    } = pool;

    return {
      attractions,
      partners: [
        'https://placeimg.com/120/50/any',
        'https://placeimg.com/120/50/tech',
        'https://placeimg.com/120/50/any/grayscale',
        'https://placeimg.com/120/50/any/sepia'
      ],
      description,
      address,
      phone,
      mail,
      page
    };
  },
  data() {
    return {
      fullLengthDescription: false
    };
  },
  layout: 'static',
  computed: {
    desc() {
      if (this.fullLengthDescription) {
        return this.description;
      }

      return this.description.substr(0, 1000);
    },
    mapSrc() {
      return `https://maps.google.com/maps?q=${
        this.address
      }&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
  },
  components: {
    Ad,
    Comments
  },
  filters: {
    fromUrlToHuman(notFriendly) {
      let friendly = notFriendly[0].toUpperCase();
      friendly += notFriendly.substr(1);
      return friendly
        .split('')
        .reduce((acc, el) => acc + (/[A-Z]/.test(el) ? ' ' : '') + el);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/BlueTile.scss";
$image-height: 600;

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media(max-width: 1300px) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  &__unit {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media(max-width: 350px) {
      grid-template-columns: 1fr;
      margin: 15px 0;
    }

    & > * {
      margin: auto 0;
    }
  }
}

.ratings {
  display: grid;
  padding: 40px;
  grid-template-columns: 1fr 2fr;
  @media(max-width: 1300px) {
    grid-template-columns: 1fr;
  }
  & > * {
    margin: auto 0;
  }

  &__numbers {
    font-size: 0.5em;
    display: block;
  }

  &__main {
    font-size: 2em;
  }
}

.pricing {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__info {
    font-size: 1.1em;
    font-weight: 600;
  }
}

.tile__content {
  &--attractions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: 400;

    span {
      margin: 2.5px 0;
    }
  }

  &--partners {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    * {
      margin: 7px;
    }
  }

  &--description {
    display: flex;
    justify-content: center;

    & > span {
      padding: 13px;
      padding-bottom: 30px;
    }
  }
}

.descriptionToggle {
  position: absolute;
  bottom: 10px;

  color: $secondary-color;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  outline: none;
}

.ads {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}

.map {
  width: 100%;
}

.partners-none {
  font-weight: 600;
  font-size: 1.3em;
  margin: auto;
}

.fas {
  color: $secondary-color;

  &.no-active {
    color: #e5e5e5;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  &--smallscreen {
    @media(max-width: 800px) {
      grid-template-columns: 1fr;
      & > * {
        margin-left: auto !important;
        margin-right: auto !important;
        width: 100%;
      }
    }
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px 0;

  @media(min-width: 800px) {
    padding: 50px;
  }
}

.gallery {
  height: $image-height * 1px;
  width: 100%;
  background-image: url(https://placeimg.com/1000/#{$image-height}/any);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  box-shadow: 0 0 5px -2px #000;

  border-radius: 4px;

  @media(max-width: 800px) {
    height: 40vw;
  }
}

.contact {
  margin: 20px 0;

  &__address {
    font-size: 1.3rem;
    font-weight: 600;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  & *:nth-child(2) {
    margin-left: 10px;
  }

  & *:not(i) {
    font-size: 1.1em;
  }

  a {
    color: $secondary-color;
    text-decoration: none;
  }

  .fas {
    font-size: 25px;
  }
}

.open-hours {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  font-size: 1.3em;

  &:nth-child(even) {
    background-color: #f5f5f5;
  }

  &.subtitle {
    font-size: 1.2em;
  }
}
</style>
