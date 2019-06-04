<template>
  <header :class="{
    light: !shadow
  }">
    <nuxt-link to="/">
      <img src="/logo.png" alt="Logo strony" class="logo">
    </nuxt-link>
    <slot />
    <div class="center-y">
      <nuxt-link :class="['link', { light: !shadow }]" to="/search/all">obiekty</nuxt-link>
      <nuxt-link :class="['link', { light: !shadow }]" to="/blog">blog</nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    shadow: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.logo {
  height: 30px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 678px) {
    position: sticky;
    top: 0px;
  }

  min-height: $header-height;
  width: 100vw;

  padding: 10px 10vw;

  &:not(.light)::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 0;
    box-shadow: 0 0 $shadow-height ($shadow-height * .4) #000;
  }

  &.light {
    background-color: $secondary-color;
    box-shadow: 0 0 5px -1px #000;
  }
}

.link {
  color: white;
  text-transform: capitalize;
  font-weight: 800;
  height: auto;
  margin: 0 10px;
  text-decoration: none;
  font-size: 1.2em;

  &.light {
    font-weight: 500;
  }
}

.center-y {
  display: inline-flex;
  align-items: center;

  @media(max-width: 585px) {
    flex-direction: column;
    * {
      margin: 5px;
    }
  }
}
</style>
