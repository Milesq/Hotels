<template>
  <div class="share-container">
    <div @click="showModal = true">
      <i class="fas fa-share-alt"></i>
      <button>Udostępnij</button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <template #header>
        Udostępnij
      </template>
      <template #body>
        <div class="inner-modal__social-media">
          <a target="blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${page}${$route.path}`" class="share-social share-social--fb">
            <i class="fab fa-facebook-f icon"></i>
            <span>Facebook</span>
          </a>
          <a href="" class="share-social share-social--messenger">
            <i class="fab fa-facebook-messenger icon"></i>
            <span>Messenger</span>
          </a>
          <a target="blank" :href="`https://twitter.com/home?status=Koniecznie odwiedź! ${page + $route.path}`" class="share-social share-social--twitter">
            <i class="fab fa-twitter icon"></i>
            <span>Twitter</span>
          </a>
          <a :href="`whatsapp://send?text=${page}${$route.path}`" data-action="share/whatsapp/share" class="share-social share-social--whatsapp">
            <i class="fab fa-whatsapp icon"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import { page } from '@/assets/config.json';

export default {
  props: {
    link: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      page
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

.fa-share-alt {
  margin-right: 5px;
}

button {
  cursor: inherit;
  background: transparent;
  border: none;
}

.share-social {
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 5px 10px;
  border-radius: 3px;
  box-shadow: 0 1px 3px -1px #000;

  padding: 10px;
  color: white;

  @media (min-width: 610px) {
    justify-content: center;
  }

  .icon {
    font-size: 24px;
  }

  & > span {
    position: relative;
    top: 3px;
  }

  @each $social, $theme in (
    "fb": #3b5998,
    "messenger": #0084ff,
    "twitter": #00acee,
    "whatsapp": #55eb4c) {
    &--#{$social} {
      background-color: $theme;
    }
  }
}

.inner-modal__social-media {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
