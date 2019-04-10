<template>
  <div class="wrapper">
    <div :style="{
      backgroundImage: `url(${data.img})`
    }" class="logo-img"></div>
    <div class="description">
      <h2>{{ data.name }}</h2>
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
          <div>
            <span>Bardzo dobry</span>
            <span>{{ data.ratings.numbers }} opinie</span>
          </div>
          <div>{{ data.ratings.average }}</div>
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
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  box-shadow: 0 2px 5px -3px #000;
}

.logo-img {
  min-height: 250px;
  background-position: center;
  cursor: pointer;
  transition: .2s linear filter;

  &:hover {
    filter: contrast(120%);
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

.ratings {

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
        color: #48a277;
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
</style>
