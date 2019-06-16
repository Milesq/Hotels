<template>
  <div class="gallery">
    <div class="gallery__image" ref="image"></div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 2500
    }
  },
  data() {
    return {
      id: 0
    };
  },
  methods: {
    change() {
      if (this.id < this.images.length - 1) this.id++;
      else this.id = 0;
    }
  },
  watch: {
    id(id) {
      this.$refs.image.style.backgroundImage = `url(${this.images[id]})`;
    }
  },
  mounted() {
    this.$refs.image.style.backgroundImage = `url(${this.images[0]})`;
    setInterval(this.change, this.interval);
  }
};
</script>

<style scoped lang="scss">

.gallery {
  height: 600px;
  width: 100%;

  box-shadow: 0 0 5px -2px #000;

  border-radius: 4px;

  @media(max-width: 800px) {
    height: 40vw;
  }

  &__image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
}
</style>
