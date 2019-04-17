<template>
  <div>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/landingPage/Footer.vue';
// eslint-disable-next-line
import registerServiceWorker from '@/assets/registerServiceWorker.js';

export default {
  components: {
    Footer
  },
  mounted: registerServiceWorker
};
</script>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);
@import '../assets/variables.scss';

html {
  font-family: Hind, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  padding: 0;
  margin: 0;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #c1c1c1;
}

body {
  padding: 0 $page-padding;
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.subtitle {
  font-size: 40px;
  font-family: 'Segoe UI';
}

.container {
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
