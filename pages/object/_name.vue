<template>
  <div class="container" style="padding-top: 0;">
    <Breadcrumb
      class="breadcrumbs"
      :crumbs="[[city, '/search/' + city], fromUrlToHuman($route.params.name)]" />
    <Gallery :images="gallery.map(img => this.API + img.url)" />
    <h1>{{ $route.params.name | fromUrlToHuman }}</h1>
    <section style="margin-top: 15px" class="grid grid--smallscreen">
      <section style="margin-right: 20px" class="tile">
        <h3 class="tile__header">Atrakcje</h3>
        <div class="tile__content tile__content--attractions">
          <span v-for="(element, i) in attractions" :key="'attraction__' + i">
            <i class="fas fa-check"></i>
            {{ element }}
          </span>
        </div>
      </section>
      <section style="margin-left: 20px" class="tile">
        <h3 class="tile__header">Programy partnerskie</h3>
        <div class="tile__content tile__content--partners">
          <a
            v-for="partner in partners"
            :key="partner.name + 'logo'"
            :href="partner.link"
            target="blank">
            <img :src="partner.image">
          </a>
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
        v-for="(ad, i) in ads"
        :key="'ad' + i"
        :img="API + ad.image.url"
        @click.native="$router.push('/blog/' + ad.id)"
      >{{ ad.title }}</Ad>
    </section>
    <section class="grid grid--smallscreen">
      <section style="margin-right: 20px; background-color: white" class="tile">
        <h3 class="tile__header">Kontakt</h3>
        <div class="tile__content contact" style="margin: 0">
          <div class="map" v-if="latlng !== null">
            <Map :zoom="13" :latlng="[latlng]" />
          </div>
          <div v-else>
            <h3>Nie możemy znaleźć mapy dla tego basenu</h3>
          </div>
          <div class="contact__address" style="margin-bottom: 20px" v-text="address"></div>
          <div class="contact__wrapper contact--map">
            <i class="fas fa-map-marked-alt"></i>
            <a target="blank" :href="'https://www.google.com/maps/place/' + address">Otwórz mapę</a>
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
            <a target="blank" :href="'https://' + page">{{ page }}</a>
          </div>
        </div>
      </section>
      <section class="tile">
        <h3 class="tile__header">Godziny otwarcia</h3>
        <div class="tile__content" style="height: 100%; padding: 0 0;">
          <div class="subtitle open-hours">
            <span>Basen</span>
            <span></span>
          </div>
          <div class="open-hours" :key="`day${day}`" v-for="day in 7">
            <span>{{day | weekDay}}</span>
            <span class="open-hours__hours">
              <span>
                {{ Math.floor(openHours[day - 1][0]) }}
                <sup style="font-size: .6em">
                  {{ openHours[day - 1][0] | minutes }}
                </sup>
              </span>
              <span> - </span>
              <span>
                {{ Math.floor(openHours[day - 1][1]) }}
                <sup style="font-size: .6em">
                  {{ openHours[day - 1][1] | minutes }}
                </sup>
              </span>
            </span>
          </div>
        </div>
      </section>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Cennik</h3>
      <div class="tile__content pricing">
        <a
          :href="'https://' + page"
          target="blank"
          class="pricing__info link">Sprawdź aktualne ceny na oficjalnej stronie basenu</a>
        <span>
          Bilet normalny od
          <b>{{price.normal}}zł</b>
        </span>
        <span>
          Bilet ulgowy od
          <b>{{price.student}}zł</b>
        </span>
      </div>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Ocena</h3>
      <div class="tile__content ratings">
        <div class="ratings__main">
          <span>
            <span style="font-weight: 700">{{ average | oneDigitAfterComma }}</span>
            <i class="fas fa-star"></i>
          </span>
          <span class="ratings__numbers">
            Na podstawie
            <b>{{ comments.length }} opini</b>
          </span>
        </div>
        <div class="details">
          <div class="details__unit">
            <span style="font-weight: 800">Obsługa:</span>
            <span>
              <i v-for="i in 5" :key="i" :class="['fas fa-star', {
                'no-active': averageStars.staff < i
              }]"></i>
            </span>
            <span style="font-weight: 800">{{ averageStars.staff | oneDigitAfterComma }}</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Zatłoczenie:</span>
            <span>
              <i v-for="i in 5" :key="i" :class="['fas fa-star', {
                'no-active': averageStars.clutter < i
              }]"></i>
            </span>
            <span style="font-weight: 800">{{ averageStars.clutter | oneDigitAfterComma }}</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Czystość:</span>
            <span>
              <i v-for="i in 5" :key="i" :class="['fas fa-star', {
                'no-active': averageStars.cleanliness < i
              }]"></i>
            </span>
            <span style="font-weight: 800">{{ averageStars.cleanliness|oneDigitAfterComma }}</span>
          </div>
          <div class="details__unit">
            <span style="font-weight: 800">Atrakcje:</span>
            <span>
              <i v-for="i in 5" :key="i" :class="['fas fa-star', {
                'no-active': averageStars.attractions < i
              }]"></i>
            </span>
            <span style="font-weight: 800">{{ averageStars.attractions|oneDigitAfterComma }}</span>
          </div>
        </div>
      </div>
    </section>
    <Comments stars @send="send" :data="comments"/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
import Comments from '@/components/Comments.vue';
import Gallery from '@/components/Gallery.vue';
import Map from '@/components/Map.vue';
import Ad from '@/components/ArticleAd.vue';
import { API, auth } from '@/assets/config.json';

function fromUrlToHuman(notFriendly) {
  let friendly = notFriendly[0].toUpperCase();
  friendly += notFriendly.substr(1);
  return friendly
    .split('')
    .reduce((acc, el) => acc + (/[A-Z]|-/.test(el) ? ' ' : '') + el);
}

/* eslint-disable */
String.prototype.escapeDiacritics = function() {
  return this.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
};
/* eslint-enable */

export default {
  async asyncData({ $axios, getRandomObjects, params: { name } }) {
    const displayName = name.escapeDiacritics();
    const { data: [{ id }] } = await $axios.get(`${API}/swimmingpools?displayName_contains=${fromUrlToHuman(displayName)}`);
    const ads = await getRandomObjects('post');
    const pool = (await $axios.get(`${API}/swimmingpools/${id}`)).data;

    if (pool.open.length !== 7 || pool.open.some(x => x.length !== 2)) {
      pool.open = new Array(7).fill([1, 24]);
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

    let { data: [latlng] } = await $axios
      .get(`https://nominatim.openstreetmap.org/search?q=${
        encodeURI(pool.city + ' ' + pool.address)
      }&format=json`);

    if (latlng) {
      latlng = [latlng.lat, latlng.lon];
    } else {
      latlng = null;
    }

    return {
      id,
      attractions,
      partners: pool.partners,
      description: pool.description,
      address: pool.city + ' ' + pool.address,
      city: pool.city,
      phone: pool.phone,
      mail: pool.mail,
      gallery: pool.gallery,
      page: pool.website,
      openHours: pool.open,
      price: {
        student: pool.studentPrice,
        normal: pool.price
      },

      ads,
      comments: pool.comments,

      latlng
    };
  },
  data() {
    return {
      fullLengthDescription: false,
      galleryID: 0,
      API
    };
  },
  methods: {
    async send(comment) {
      try {
        const { data: { jwt } } = await this.$axios.post(`${API}/auth/local`, {
          identifier: auth.name,
          password: auth.pass
        });

        await this.$axios.post(`${API}/comments`, {
          swimmingpool: '' + this.id,
          author: comment.user.name,
          content: comment.content
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    fromUrlToHuman
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
    },
    averageStars() {
      let stars = this.comments.map(el => ({
        ...el,
        content: Buffer.from(el.content, 'base64').toString('ascii')
      }));
      stars = stars.map(el => JSON.parse(el.content).stars);
      stars = stars.reduce((acc, el) => ({
        staff: acc.staff + el.staff,
        attractions: acc.attractions + el.attractions,
        clutter: acc.clutter + el.clutter,
        cleanliness: acc.cleanliness + el.cleanliness
      }), {
        staff: 0,
        attractions: 0,
        clutter: 0,
        cleanliness: 0
      });

      // eslint-disable-next-line
      for (const x of ['staff', 'attractions', 'clutter', 'cleanliness']) {
        stars[x] /= this.comments.length;
      }

      return stars;
    },
    average() {
      const {
        staff, attractions, clutter, cleanliness
      } = this.averageStars;

      return Math.round(10 * (staff + attractions + clutter + cleanliness) / 4) / 10;
    }
  },
  components: {
    Ad,
    Comments,
    Gallery,
    Breadcrumb,
    Map
  },
  middleware: 'getRandomObjects',
  filters: {
    fromUrlToHuman,
    weekDay: day => ([
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
      'Niedziela'
    ])[day - 1],
    minutes(time) {
      const minutes = (time + '').split('.')[1];
      if (minutes === undefined) return '00';
      if (minutes.length === 2) return minutes;
      return minutes + '0';
    },
    oneDigitAfterComma(num) {
      return (Math.round(num * 10) / 10) || '-';
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/BlueTile.scss";

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

    @media (max-width: 1000px) {
      margin-bottom: 10px;
    }
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
  height: 250px;
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
  padding: 50px 5px;

  @media(min-width: 800px) {
    padding: 50px;
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
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  font-size: 1.3em;

  &:nth-child(even) {
    background-color: #f5f5f5;
  }

  &.subtitle {
    font-size: 1.2em;
  }

  &__hours {
    display: flex;
    justify-content: space-around;
  }
}

.link {
  color: black;
  text-decoration: none;
}

.breadcrumbs {
  margin: 15px;
}
</style>
