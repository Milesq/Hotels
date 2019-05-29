<template>
  <div class="breadcrumb">
    <nuxt-link to="/">Strona główna</nuxt-link>
    <!-- <nuxt-link v-for="(el, i) in $route.path.split('/')" :key="i">
      {{ el }}
    </nuxt-link> -->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.path.split('/'));
  }
};
</script>

<style scoped lang="scss">

</style>
