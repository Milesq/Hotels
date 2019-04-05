<template>
  <section>
    <Header />
  </section>
</template>

<script>
import Header from '../components/landingPage/Header.vue';

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);

section {
  display: flex;
  justify-content: center;
}
</style>
