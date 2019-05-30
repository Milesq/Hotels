<template>
  <div>
    <div class="container" :style="{
      backgroundColor: ['blog',
                        'contact',
                        'search-city'].indexOf($route.name) !== -1 ? '#eee' : '#fff'
    }">
      <nav class="search-bar">
        <Header :shadow="false">
          <span class="search-container">
            <input
              @keydown.enter="search"
              class="search__input"
              type="text"
              v-model="city"
              placeholder="Podaj nazwę miasta"><!--
              --><span @click="search" style="padding-top: 12px" class="search__button">
                <i class="fas fa-map-marker-alt"></i>
              </span>
          </span>
        </Header>
      </nav>
      <main style="width: 100%">
        <nuxt />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/landingPage/Header.vue';
import Footer from '../components/landingPage/Footer.vue';

export default {
  data() {
    return {
      city: ''
    };
  },
  components: {
    Header,
    Footer
  },
  middleware: 'https',
  methods: {
    search() {
      this.$router.push(`/search/${this.city}`);
    }
  }
};
</script>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);
@import '../assets/variables.scss';

html {
  font-family: Hind, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding: 0;
  margin: 0;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* background-color: #c1c1c1; */
}

body {
  padding: 0;
  @media(max-width: 800px) {
    padding: 0;
    font-size: .8em;
  }
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.subtitle {
  font-size: 40px;
  font-family: 'Segoe UI';
}

.container {
  background-color: #fff;
  display: flex;
  align-items: center;
  font-weight: 500;
  flex-direction: column;
}

.text {
  padding: 5vmax;
  padding-top: 2vw;
}

.header {
  margin-top: 25px;
}

@import '@/assets/search.scss';

$shadow: 0 1px 4px -1px #000;

.search__input,
.search__button {
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #fff;

  &:focus {
    box-shadow: $shadow;
  }
}

.search__button {
  border-left: 0;
  border: none;
  padding-bottom: 13px;
  /*  !important; */
  color: $secondary-color;
}

.search__input {
  border-right: 0;
  outline: none;

  &:focus ~ .search__button {
    box-shadow: $shadow;
  }
}

@media (max-width: 805px) {
  .search-container {
    display: none;
  }
}
</style>
