<template>
  <section class="blog-container" style="background-color: #eee">
    <Breadcrumb class="breadcrumb" :crumbs="['Blog']" />
    <h1 class="header">Blog</h1>
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
.blog-container {
  margin: 20px 0;
}

.header,
.breadcrumb {
  @media (max-width: 870px) {
    margin-left: 10px;
  }
  margin-left: 70px;
}
</style>
