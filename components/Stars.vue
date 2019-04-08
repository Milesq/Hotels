<template>
  <span class="stars">
    <template v-for="i in 5">
      <input @click="send(i)" :key="i" type="radio" :id="'star' + i" name="star">
      <label :key="i" :for="'star' + i"></label>
    </template>
  </span>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    send(i) {
      this.$emit('input', 6 - i);
    }
  }
};
</script>

<style scoped lang="scss">
.stars {
  height: 30px;
  width: 200px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;

  input {
    position: absolute;
    left: -99999px;
  }
}

label {
  width: 30px;
  height: 30px;
  padding: 5px;
  color: transparent;

  &::before {
    content: '★';
    color: #c0c0c0;
    font-size: 30px;
    line-height: 30px;
    margin-right: -100%;
  }
}

label:hover::before,
label:hover ~ label::before,
.stars input:checked ~ label::before {
  color: #1976d3;
}
</style>
