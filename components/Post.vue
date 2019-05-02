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
      consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
      Aliquam eleifend mi in nulla posuere sollicitudin aliquam.
      Mollis nunc sed id semper risus in hendrerit.
      Leo integer malesuada nunc vel risus commodo viverra maecenas.
      Lectus urna duis convallis convallis tellus id interdum
      velit laoreet. Vestibulum lorem sed risus ultricies. Faucibus a pellentesque
      sit amet porttitor eget. Nisi scelerisque eu ultrices
      vitae auctor eu. A pellentesque sit amet porttitor
      eget dolor morbi non. Bibendum ut tristique et egestas quis
      ipsum suspendisse. Sit amet justo donec enim diam vulputate.
      Magna sit amet purus gravida quis blandit turpis
      cursus in. Ipsum a arcu cursus vitae.
      Cursus in hac habitasse platea dictumst quisque sagittis
      purus sit. Viverra vitae congue eu consequat ac felis.
      Nunc pulvinar sapien et ligula. Lobortis scelerisque fermentum dui faucibus
      in ornare. Justo eget magna fermentum iaculis eu
      Adipiscing vitae proin sagittis nisl rhoncus
      mattis. Dolor purus non enim praesent elementum
      facilisis leo vel fringilla. Dui accumsan sit amet nulla
      facilisi morbi tempus iaculis. Facilisis sed odio
      morbi quis. Eros in cursus turpis massa. Commodo
      sed egestas egestas fringilla. Auctor urna nunc id cursus
      metus aliquam eleifend mi. Nibh praesent tristique magna sit
      amet purus gravida quis. Nisl nunc mi ipsum faucibus vitae
      Gravida quis blandit turpis cursus in hac
      habitasse platea dictumst. Lorem ipsum dolor
      sit amet. Urna cursus eget nunc scelerisque
      viverra mauris in. Eleifend donec pretium vulputate sapien nec
      sagittis aliquam malesuada. Ipsum dolor sit amet consectetur adipiscing.`
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
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(this.$nuxt.$loading.finish, 1500);
    });
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
