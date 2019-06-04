<template>
  <main class="text">
    <Breadcrumb :crumbs="['Polityka Prywatności']" />
    <div style="padding: 0 20px">
      <h1>Regulamin</h1>

      <article v-html="privacy"></article>
    </div>
  </main>
</template>

<script>
import showdown from 'showdown';
import Breadcrumb from '../components/Breadcrumb.vue';

export default {
  async asyncData({ $axios }) {
    return {
      data: (await $axios.get('/law/privacy.md')).data
    };
  },
  layout: 'static',
  components: {
    Breadcrumb
  },
  computed: {
    privacy() {
      const converter = new showdown.Converter();
      return converter.makeHtml(this.data);
    }
  }
};
</script>

<style>
strong {
  margin: 15px 0;
  display: block;
}

a {
  color: #5d8fe4;
  text-decoration: none;
}
</style>
