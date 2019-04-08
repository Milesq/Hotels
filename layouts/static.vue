<template>
  <div>
    <section class="container">
      <nav class="search-bar">
        <Header :shadow="false">
          <span class="search-container">
            <input
              class="search__input"
              type="text"
              placeholder="Podaj nazwę miasta"><!--
            this comment must be there!
            --><button
                @click="$router.push(`objects/${city}`)"
                class="search__button">
                <i class="fas fa-search"></i>Szukaj
              </button>
          </span>
        </Header>
      </nav>
      <main style="width: 100%">
        <nuxt />
      </main>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/landingPage/Header.vue';
import Footer from '../components/landingPage/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import '../assets/variables.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
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
  background-color: #c1c1c1;
}

body {
  padding: 0 $page-padding;
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
  background-color: #f5f5f5;
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

.search__input {
  box-sizing: content-box;
  border: 1px solid #959595;
  border-right: none;
}

.search__button {
  box-sizing: content-box;
  border: 1px solid #ff9801;
}
</style>
