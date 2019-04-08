<template>
  <section class="container">
    <nav style="background-color: red">nav</nav>
    <section style="background-color: blue" class="results">
      <h1>Baseny - {{ $route.params.city }}</h1>
      <ObjectInfo />
    </section>
  </section>
</template>

<script>
import ObjectInfo from '~/components/ObjectInfo.vue';

export default {
  components: {
    ObjectInfo
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 2fr 7fr;

  padding: 0 10vw;
}

.results {
  margin-left: 50px;
}
</style>
