<template>
  <section class="wrapper">
    <article class="post" v-html="data"></article>
    <Comments for="blog" />
  </section>
</template>

<script>
import Comments from '@/components/Comments.vue';

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  asyncData({ params }) {
    return {
      data: `
      post ${params.id} <img src="https://placeimg.com/800/500/any">`
    };
  },
  layout: 'static',
  components: {
    Comments
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 70px;
  background-color: #fff;
}

.post {
  text-align: center;
}
</style>
