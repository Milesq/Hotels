<template>
  <section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Dodaj komentarz</h3>
      <div class="tile__content">
        <div v-if="user" class="new-comment">
          <div class="new-comment__header">
            Zalogowano jako {{ user.name }}.
            <nuxt-link class="link" to="/">Wyloguj się</nuxt-link>
          </div>
          <textarea
            placeholder="Dodaj komentarz"
            v-model="comment"
            class="new-comment__area"></textarea>
          <button class="new-comment__send-button">
            Dodaj komentarz
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ['for'],
  computed: {
    forProps() {
      return this['for'];
    }
  },
  data() {
    return {
      comment: '',
      user: {
        name: 'Anna Kowalska'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/BlueTile.scss';

.link {
  color: $secondary-color;
  text-decoration: none;
}

.new-comment {
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__header {
    width: 100%;
    text-align: left;
  }

  &,
  &__area {
    margin-top: 15px;
  }

  &__area {
    width: 100%;
    min-height: 200px;
    resize: none;
    border-radius: 3px;
  }

  &__send-button {
    margin: 25px;
    padding: 13px 17px;
    font-weight: 600;
    background-color: #4caf50;
    color: white;
    border: none;
    box-shadow: 0 0 4px -1.5px #222;
    cursor: pointer;
    transition: .2s ease-in-out all;

    &:active {
      transform: translateY(-2px);
    }
  }
}
</style>
