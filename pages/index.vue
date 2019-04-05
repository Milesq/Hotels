<template>
  <section>
    <nav class="search-bar">
      <Header />
    </nav>
  </section>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);

section {
  min-height: 500vh;
  background-color: #345;
  display: flex;
  justify-content: center;
}

.search-bar {
  background: url(https://placeimg.com/1000/800/any/grayscale);
  height: 60vh;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
