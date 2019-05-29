<template>
  <div class="breadcrumb">
    <nuxt-link to="/">Strona główna</nuxt-link>
    {{ crumbs }}
    <!-- <span v-for="(el, i) in breadcrumbs" :key="i">
      / <nuxt-link :to="el.link">{{ el.name }}</nuxt-link>
    </span> -->
    <!-- <span>
      {{ dict[$route.path.split('/').slice(-1)[0]] }}
    </span> -->
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

</style>
