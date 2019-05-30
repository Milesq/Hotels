<template>
  <div class="breadcrumb">
    <nuxt-link class="breadcrumb__link" to="/">Strona główna</nuxt-link>
    <span v-for="(el, i) in crumbs" :key="i">
      / <nuxt-link class="breadcrumb__link" :to="'/'">{{ el }}</nuxt-link>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      default: () => ['']
    }
  }
};
</script>

<style scoped lang="scss">
.breadcrumb__link {
  color: #1976d3 + #111;
  font: Hind;
  text-decoration: none;
}
</style>
