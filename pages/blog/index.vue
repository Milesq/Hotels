<template>
  <section class="container">
    <Breadcrumb :crumbs="['Blog']" />
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
import Breadcrumb from '@/components/Breadcrumb.vue';
import Post from '@/components/Post.vue';
import { API } from '@/assets/config.json';

export default {
  async asyncData({ $axios }) {
    let { data } = await $axios.get(`${API}/posts`);
    data = data.map(({
      id,
      title,
      content,
      image
    }) => ({
      id,
      title,
      description: content,
      img: API + image.url
    }));

    return { posts: data };
  },
  components: {
    Post,
    Breadcrumb
  },
  layout: 'static'
};
</script>

<style scoped lang="scss">
.container {
  margin: 20px 0;
}
</style>
