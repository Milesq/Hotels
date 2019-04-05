<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '../static/variables.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
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
  min-height: 400vh;
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
</style>
