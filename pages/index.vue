<template>
  <section class="container">
    <nav class="search-bar">
      <Header />
      <SearchBar />
    </nav>
    <Recommended />
    <PopularArticles />

    <Footer />
  </section>
</template>

<script>
import Header from '../components/landingPage/Header.vue';
import SearchBar from '../components/landingPage/SearchBar.vue';
import Recommended from '../components/landingPage/Recommended.vue';
import PopularArticles from '../components/landingPage/PopularArticles.vue';
import Footer from '../components/landingPage/Footer.vue';

export default {
  components: {
    Header,
    SearchBar,
    Recommended,
    PopularArticles,
    Footer
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);
@import '@/static/variables.scss';

.container {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.search-bar {
  background: url(https://placeimg.com/1000/350/any/grayscale);

  width: 100vw;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
