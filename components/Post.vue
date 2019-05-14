<template>
  <div class="wrapper">
    <article class="container">
      <nuxt-link
        :to="`/blog/${id}`"
        class="img">
        <div class="post-logo" :style="{
          backgroundImage: `url(${url})`
        }"></div>
      </nuxt-link>
      <div class="description">
        <h2>
          <nuxt-link
            style="color: #000; text-decoration: none"
            :to="'/blog/' + id">{{ title }}</nuxt-link>
        </h2>
        <span class="desc">
          <section v-html="desc"></section>
          <nuxt-link class="link" :to="'/blog/' + id">Czytaj więcej</nuxt-link>
        </span>
      </div>
    </article>
  </div>
</template>

<script>
import showdown from 'showdown';

function a(obj) {
  return {
    required: true,
    ...obj
  };
}

export default {
  props: {
    id: a({
      type: Number
    }),
    title: a({
      type: String
    }),
    url: a({
      type: String
    }),
    description: {
      type: String,
      default: `
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor`
    }
  },
  computed: {
    desc() {
      const converter = new showdown.Converter();

      const MAX = 800;
      let ret = this.description;
      if (ret.length > MAX) {
        ret = ret.substr(0, MAX) + '...';
      }

      return converter.makeHtml(ret);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.wrapper {
  margin: 15px 0;
  padding: 0 70px;

  @media (max-width: 870px) {
    padding: 0 7px;
  }
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  box-shadow: 0 2px 5px -3px #000;
  background-color: #fff;

  @media (max-width: 870px) {
    grid-template-columns: 1fr;
  }
}

.description {
  padding: 20px;
  height: 100%;

  h2 {
    margin-bottom: 10px;
  }
}

.img {
  height: 250px;
  width: 400px;
  overflow: hidden;

  @media (max-width: 870px) {
    width: 100%;
  }

  div {
    background-position: 0 0;
    background-repeat: no-repeat;
    height: 100%;
    transition: ease-in-out .6s all;

    &:hover {
      transform: scale(.95);
    }
  }
}

.desc {
  font-weight: 400;
  font-size: .95em;
}

.link {
  color: $secondary-color;
}
</style>
