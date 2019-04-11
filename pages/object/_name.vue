<template>
  <div class="container">
    <div class="gallery"></div>
    <h1>{{ $route.params.name | fromUrlToHuman }}</h1>

    <section style="margin-top: 15px" class="object-info">
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
          <img
            v-for="partner in partners"
            :key="partner + 'logo'"
            :src="partner">
            <span class="partners-none" v-if="!partners || !partners.length">
              Brak programów partnerskich w tym obiekcie
            </span>
        </div>
      </section>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Opis obiektu</h3>
      <div
        class="tile__content tile__content--description">
        <span v-html="desc"></span>

        <button
          @click="fullLengthDescription = !fullLengthDescription"
          class="descriptionToggle">
          {{
            fullLengthDescription ? 'Zwiń' : 'Rozwiń'
          }}
          opis
        </button>
        </div>
    </section>
    <section class="ads">
      <Ad img="https://placeimg.com/400/250/any">Co wziąść na basen? Pełna lista które musisz zabrać!</Ad>
      <Ad img="https://placeimg.com/400/500/any">Higiena po basenie, czyli pamiętaj o wzięciu prysznica!</Ad>
      <Ad img="https://placeimg.com/300/350/any">Najlepsze ćwiczenia odchudzające na basenie! Sprawdź naszą listę!</Ad>
    </section>
  </div>
</template>

<script>
import Ad from '@/components/ArticleAd.vue';

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
    const ret = {
      attractions: ['Basen sportowy', 'Basen rekreacyjny', 'Jacuzzi', 'Łaźnia parowa'],
      partners: [
        'https://placeimg.com/120/50/any',
        'https://placeimg.com/120/50/tech',
        'https://placeimg.com/120/50/any/grayscale',
        'https://placeimg.com/120/50/any/sepia'
      ],
      description: ''
    };

    ret.description = (await $axios.get('/desc.txt')).data;

    return ret;
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
    }
  },
  components: {
    Ad
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
$image-height: 600;

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

  color: #2196f3;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  outline: none;
}

.tile {
  $padding-x: 18px;
  $padding-y: 9px;

  box-shadow: 0 1px 9px -3px #000;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 25px;

  & > * {
    padding: $padding-y $padding-x;
  }

  &__header {
    color: #fff;
    background-color: #2196f3;
    z-index: 2;
  }

  &__content {
    background-color: #fff;
    position: relative;
    min-height: 90px;

    &::after {
      content: '';
      display: block;
      width: calc(100% + #{($padding-x * 2)});

      position: absolute;
      left: 0;
      top: 0;

      height: 5px;
      background-image: linear-gradient(#777, #fff);
    }
  }
}

.ads {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.partners-none {
  font-weight: 600;
  font-size: 1.3em;
  margin: auto;
}

.fa-check {
  color: #2196f3;
}

.object-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.container {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
}

</style>
