<template>
  <article :style="{ backgroundImage: `url(${img})` }">
    <slot></slot>
  </article>
</template>

<script>
export default {
  props: {
    img: {
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
article {
  height: 230px;
  width: 380px;
  border-radius: 3px;

  box-shadow: 0 1px 6px -2px #000;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;

  color: white;
  background-color: #777;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  // background-size: cover;

  font-size: 1.8em;
  font-weight: 700;
  transition: .5s ease-in-out all;

  cursor: pointer;

  &:hover {
    background-size: 140%;
  }
}
</style>
