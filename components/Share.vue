<template>
  <div class="share-container">
    <i class="fas fa-share-alt"></i>
    <button @click="showModal = true">Udostępnij</button>
    <modal v-if="showModal" @close="showModal = false">
      <template #body>
        ok
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  props: {
    link: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  components: {
    Modal
  }
};
</script>

<style scoped lang="scss">
.share-container {
  cursor: pointer;
  font-weight: 500;

  border-radius: 4px;
  box-shadow: 0 3px 5px -3px #000;
  padding: 6px;
  height: 30.4px;

  display: inline-flex;
  justify-content: space-between;
}

.fas {
  margin-right: 5px;
}

button {
  cursor: inherit;
  background: transparent;
  border: none;
}
</style>
