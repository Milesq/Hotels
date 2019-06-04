<template>
  <section class="container">
    <nav class="search-bar">
      <Header />
      <SearchBar />
    </nav>
    <Recommended :data="swimmingpools" />
    <PopularArticles :data="posts" />
  </section>
</template>

<script>
/* eslint-disable */
import Header from '../components/landingPage/Header.vue';
import SearchBar from '../components/landingPage/SearchBar.vue';
import Recommended from '../components/landingPage/Recommended.vue';
import PopularArticles from '../components/landingPage/PopularArticles.vue';

export default {
  async asyncData({ getRandomObjects }) {
    return {
      posts: await getRandomObjects('post'),
      swimmingpools: await getRandomObjects('swimmingpool')
    };
  },
  middleware: 'getRandomObjects',
  components: {
    Header,
    SearchBar,
    Recommended,
    PopularArticles
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.search-bar {
  background: url("/background.jpg");

  @media (max-width: 678px) {
    background-size: cover;
  }
  margin-bottom: 50px;

  width: 100vw;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% 530px;
  background-attachment: fixed;
}
</style>
