<template>
  <section class="container">
    <div v-for="post in posts" :key="`post_${post.id}`">
      <Post
      :title="post.title"
      :description="post.description"
      :id="post.id"
      :url="post.img" />
    </div>
  </section>
</template>

<script>
import Post from '@/components/Post.vue';

export default {
  data() {
    return {
      posts: [
        {
          id: 0,
          title: 'Lorem ipsum sit dolerum',
          img: 'https://placeimg.com/400/250/nature'
        },
        {
          id: 1,
          title: 'Lorem ipsum sit amet',
          img: 'https://placeimg.com/400/250/tech'
        }
      ]
    };
  },
  components: {
    Post
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
.container {
  margin: 20px 0;
}
</style>
