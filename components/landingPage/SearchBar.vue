<template>
  <div class="title">
    <div class="search">
      <h1>Zrelaksuj się nad wodą blisko siebie!</h1>
      <div class="search__wrapper">
        <input
          @keydown.enter="send"
          v-model="city"
          class="search__input"
          type="text"
          placeholder="Podaj nazwę miasta"><!--
        this comment must be there!
        --><button
            @click="send"
            class="search__button">
            <i class="fas fa-search"></i>Szukaj
          </button>
      </div>
    </div>
    <div class="categories">
      <div
        @click="$router.push('/search/all/?type=aquapark')"
        class="categories__breadcrumb">
        <i class="fas fa-swimming-pool category-icon"></i>
        <span>aquapark</span>
      </div>
      <div
        @click="$router.push('/search/all/?type=swimming-pool')"
        class="categories__breadcrumb">
        <i class="fas fa-water category-icon"></i>
        <span>basen</span>
      </div>
      <div
        @click="$router.push('/search/all/?type=sauna')"
        class="categories__breadcrumb">
        <i class="fas fa-hot-tub category-icon"></i>
        <span>sauna</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ''
    };
  },
  methods: {
    send() {
      this.$router.push(`search/${this.city}`);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.title {
  margin-top: 4%;
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 1.4em;

  display: flex;
  flex-direction: column;
}

.categories {
  display: flex;
  justify-content: center;
  margin: 10% auto;
  padding: 5px;

  @media (max-width: 678px) {
    flex-direction: column;
    width: 80%;
  }

  &__breadcrumb {
    cursor: pointer;
    display: flex;
    flex-direction: column;

    margin: 10px;
    border-radius: 5px;
    box-shadow: -2px 3px 10px -5px rgba(0,0,0,0.75);
    background-color: #fff;

    color: #000;

    padding: 15px 57px;

    text-transform: capitalize;

    i {
      transition: .2s ease-in transform;
    }

    &:hover i {
      transform: translateY(-5px) scale(1.1);
    }

    span {
      font-size: .75em;
    }
  }
}

.category-icon {
  color: $primary-color;
  font-size: 60px;
}

.search {
  &__wrapper {
    @media (max-width: 380px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  $radius: 10px;

  &__input,
  &__button {
    padding: 15px;
    color: white;
    font-size: .8em;
    font-weight: 500;
    border: none;
    margin: 0;

    @media (max-width: 380px) {
      border-radius: $radius;
    }
  }

  &__input {
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
    color: #959595;
    width: 40vmax;

    &::placeholder {
      color: #959595;
    }
  }

  &__button {
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
    min-width: 10vw;
    cursor: pointer;
    background-color: #ff9801;
    border: none;
  }
}

h1 {
  @media (max-width: 678px) {
    font-size: 1.2em;
  }
}
</style>
