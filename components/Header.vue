<template>
  <header>
    <nuxt-link to="/">
      <img src="https://placeimg.com/200/50/any" alt="Logo strony">
    </nuxt-link>
    <div>
      <nuxt-link class="link" to="objects">obiekty</nuxt-link>
      <nuxt-link class="link" to="articles">artykuły</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import '../static/variables.scss';

header {
  display: flex;
  justify-content: space-between;

  position: sticky;
  top: 0px;

  height: $header-height;
  width: 100vw;

  padding: 1.5% 10vw;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 0;
    box-shadow: 0 0 $shadow-height ($shadow-height * .4) #000;
  }
}

.link {
  text-transform: capitalize;
  color: white;
  font-weight: 800;
  height: auto;
  margin: 0 5px;
  text-decoration: none;
  font-size: 1.2em;
}
</style>
