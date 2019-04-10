<template>
  <section>
    post
  </section>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  layout: 'static'
};
</script>

<style>

</style>
