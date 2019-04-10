<template>
  <section class="container">
    <nav class="search-bar">
      <Header />
      <SearchBar />
    </nav>
    <Recommended />
    <PopularArticles />
  </section>
</template>

<script>
import Header from '../components/landingPage/Header.vue';
import SearchBar from '../components/landingPage/SearchBar.vue';
import Recommended from '../components/landingPage/Recommended.vue';
import PopularArticles from '../components/landingPage/PopularArticles.vue';

export default {
  components: {
    Header,
    SearchBar,
    Recommended,
    PopularArticles
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);
@import '@/assets/variables.scss';

.search-bar {
  background: url(https://placeimg.com/1000/350/any);

  @media (max-width: 678px) {
    background-size: cover;
  }

  width: 100vw;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}
</style>
