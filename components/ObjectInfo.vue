<template>
  <div class="objectinfo__wrapper">
    <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
    <nuxt-link :to="url">
      <div :style="{
        backgroundImage: `url(${data.img[0]})`
      }" class="logo-img"></div>
    </nuxt-link>
    <div class="description">
      <nuxt-link :to="url">
        <h2>{{ data.name }}</h2>
      </nuxt-link>
      <h3 class="address">{{ data.address }}</h3>
      <div class="attractions">
        <span
          v-for="attraction in attractions"
          :key="attraction"
          class="attraction">
          <i class="fas fa-check"></i> {{ attraction }}
        </span>
      </div>
      <div class="summary">
        <span :class="['state', {
          'state--open': isOpen
        }]">
          {{ isOpen? 'Otwarte' : 'Zamknięte' }}
        </span>
        <div class="rating">
          <i class="fas fa-star"></i>
          <span class="rating__average">{{ data.ratings.average }}</span>
          <span class="rating__numbers">({{ data.ratings.numbers }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    attractions() {
      const MAX = 6;
      let ret = this.data.attractions;
      if (ret[0] === null) return [];

      if (ret.length >= MAX) {
        ret = ret.slice(0, MAX - 1);
        ret.push(`${this.data.attractions.length - MAX + 1} atrakcje więcej!`);
      }

      return ret;
    },
    isOpen() {
      if (
        (new Date()).getHours() > this.data.open[0]
        && (new Date()).getHours() < this.data.open[1]) {
        return true;
      }

      return false;
    },
    url() {
      let url = this.data.name;
      while (url.search(' ') !== -1) url = url.replace(' ', '');
      url = url.charAt(0).toLowerCase() + url.slice(1);
      return `/object/${url}`;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';
$green: #48a277;

.objectinfo__wrapper {
  display: grid;
  @media(min-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }

  background-color: #fff;
  box-shadow: 0 2px 5px -3px #000;
  margin: 30px 0;
  margin-top: 50px;
}

.logo-img {
  height: 250px;
  width: 100%;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
  transition: .2s linear all;
  background-blend-mode: darken;

  &:hover {
    background-color: #999;
  }
}

.attractions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
}

.attraction {
  margin: 5px 0;
}

.rating {
  &__average {
    font-weight: 600;
    font-size: 1.2em;
  }

  &__numbers {
    font-weight: 400;
    font-size: .9em;
    padding-right: 15px;
  }
}

.fas {
  color: $primary-dark;
  font-size: 1em;
}

.description {
  position: relative;
  padding: 12px;

  .summary {
    border-top: .8px solid #c8c8c8;
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 0;
    left: 0;

    @media (max-width: 650px) {
      background-color: #fff;
      padding: 20px 0;
      bottom: -25px;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;

    .state {
      color: #e25b5c;
      border: 1px currentColor solid;

      border-radius: 3px;
      padding: 4px;
      font-size: 12px;
      margin: 15px;

      &--open{
        color: $green;
      }
    }
  }
}

.address {
  font-size: .95em;
  font-weight: 600;
  color: #afafaf;
  margin-top: 5px;
}

a {
  color: black;
  text-decoration: none;
}
</style>
