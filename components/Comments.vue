<template>
  <section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Dodaj komentarz</h3>
      <div class="tile__content">
        </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ['for'],
  computed: {
    forProps() {
      return this['for'];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/BlueTile.scss';

</style>
