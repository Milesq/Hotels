<template>
  <div class="breadcrumb">
    <nuxt-link class="breadcrumb__link" to="/">Strona główna</nuxt-link>
    <span v-for="(el, i) in crumbs.slice(0, -1)" :key="i">
      / <nuxt-link class="breadcrumb__link" :to="el[1]">{{ el[0] }}</nuxt-link>
    </span>
    <span class="breadcrumb__link breadcrumb__link--last">
    / {{ crumbs[crumbs.length - 1] }}
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
.breadcrumb {
  margin: 20px;
  display: inline;

  &__link {
    color: #1976d3 + #111;
    font: Hind;
    text-decoration: none;

    &--last {
      color: black;
    }
  }
}
</style>
