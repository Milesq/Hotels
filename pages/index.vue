<template>
  <section>
    <nav class="search-bar">
      <Header />
      <SearchBar />
    </nav>
  </section>
</template>

<script>
import Header from '../components/Header.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  components: {
    Header,
    SearchBar
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);
@import '../static/variables.scss';

section {
  min-height: 500vh;
  background-color: #345;
  display: flex;
  justify-content: center;
}

.search-bar {
  background: url(https://placeimg.com/1000/800/any/grayscale);
  min-height: 60vh;
  // max-height: 80vh;
  /* witchout this property sticky menu
  is sticky all time,
  and div is too large because of background image */

  width: 100vw;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
