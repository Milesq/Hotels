<template>
    <div class="flip-card gallery">
      <div class="flip-card-inner" ref="wrapper">
        <div class="flip-card-front">
          <div class="gallery__image" ref="flipCardFront"></div>
        </div>
        <div class="flip-card-back">
          <div class="gallery__image" ref="flipCardBack"></div>
        </div>
      </div>
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
      id: 0,
      isFlipped: false
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
      this.$refs[this.isFlipped ? 'flipCardFront' : 'flipCardBack'].style.backgroundImage = `url(${this.images[id]})`;
      this.$refs.wrapper.style.transform = this.isFlipped ? '' : 'rotateX(-180deg)';
      this.isFlipped = !this.isFlipped;
    }
  },
  mounted() {
    setInterval(this.change, this.interval);
  }
};
</script>

<style scoped lang="scss">
.flip-card {
  background-color: transparent;
  perspective: 10000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.2s;
  transform-style: preserve-3d;
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateX(180deg);
}

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
