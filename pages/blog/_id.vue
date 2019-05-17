<template>
  <section class="wrapper">
    <article class="post" v-html="dataHtml"></article>
    <no-ssr>
      <Comments :data="data.comments" />
    </no-ssr>
  </section>
</template>

<script>
import Comments from '@/components/Comments.vue';
import { API } from '@/assets/config.json';
import showdown from 'showdown';


export default {
  async validate({ params, $axios }) {
    let flag = true;
    flag = flag && /^\d+$/.test(params.id);

    const { data } = await $axios.get(`${API}/posts/count`);

    flag = flag && params.id > 0;
    flag = flag && params.id <= data;

    return flag;
  },
  async asyncData({ params: { id }, $axios }) {
    const { data } = await $axios.get(`${API}/posts/${id}`);

    return { data };
  },
  computed: {
    dataHtml() {
      const converter = new showdown.Converter();
      return converter.makeHtml(this.data.content);
    }
  },
  layout: 'static',
  components: {
    Comments
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 70px;
  background-color: #fff;

  @media (max-width: 880px) {
    padding: 20px;
  }
}

.post {
  text-align: center;
  max-width: 100%;
  overflow: hidden;
}
</style>
