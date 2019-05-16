<template>
  <div class="wrapper">
    <article
    :style="{
      padding: light? '' : '10px'
    }"
    :class="['container', {
      'no-active': !active,
      dark: !active && (light === 'no')
    }]">
      <ImagePlaceholder
        :dark="true"
        class="img"
        @click.native="$router.push(href)"
        :src="src"
        :alt="alt" />
      <div class="content">
        <h2 @click="$router.push(href)">{{ title }}</h2>
        <br>
        <span class="description">
          {{ description | short }}
          <nuxt-link :to="href">Czytaj więcej</nuxt-link>
        </span>
      </div>
    </article>
  </div>
</template>

<script>
import ImagePlaceholder from '@/components/ImagePlaceholder.vue';

export default {
  props: {
    src: {
      type: String,
      default: 'https://placeimg.com/400/230/any'
    },
    href: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Random image from www.placeimg.com'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: `Lorem ipsum dolor sit, amet
      consectetur adipisicing elit.
      Repudiandae magnam nam quibusdam cumque exercitationem tempore,
      consequatur error veritatis harum, assumenda sed ducimus
      minima repellat asperiores non alias ab iure natus.`
    },
    active: {
      type: Boolean,
      default: false
    },
    light: {
      type: String,
      default: 'no'
    }
  },
  filters: {
    short: desc => `${desc.substr(0, 250)}...`
  },
  components: {
    ImagePlaceholder
  }
};
</script>

<style scoped lang="scss">
  .no-active {
    transform: scale(.9);
  }

  .dark {
    filter: grayscale(45%) opacity(70%);
    transition: ease-in .5s filter;

    &:hover {
      filter: none;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px -5px #000;
    border-radius: 3px;
    overflow: hidden;
  }

  .wrapper {
    transition: ease-in .5s all;
    box-shadow: 0 0 #000;

    &:hover {
      transform: translateY(-10px);
    }
  }

  .img {
    z-index: 0;
    transition: ease-in .5s transform;
    overflow: hidden;
    width: 400px;
    height: 230px;

    &:hover {
      transform: scale(1.2) rotate(2deg);
    }

    &,
    h2 {
      cursor: pointer;
    }

    @media (max-width: 960px) {
      width: 100%;
    }
  }

  .content {
    background-color: #fff;
    z-index: 1;
    padding: 20px 10px;
    width: 100%;

    h2 {
      font-size: 20px;
    }

    .description {
      font-family: 'Segoe UI';
    }
  }
</style>
