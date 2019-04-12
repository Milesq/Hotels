<template>
  <section style="width: 100%">
    <section class="tile">
      <h3 class="tile__header">Dodaj komentarz</h3>
      <div class="tile__content">
        <div v-if="user.name" class="new-comment">
          <div class="new-comment__header">
            Zalogowano jako {{ user.name }}.
            <nuxt-link class="link" to="/">Wyloguj się</nuxt-link>
          </div>
          <textarea
            placeholder="Dodaj komentarz"
            v-model="newComment"
            class="new-comment__area"></textarea>
          <button @click="addComment" class="new-comment__send-button">
            Dodaj komentarz
          </button>
        </div>
        <div class="login" v-else>
          <div>Zaloguj się żeby dodać komentarz</div>
          <div>google</div>
          <div>facebook</div>
        </div>
      </div>
    </section>
    <article
      v-for="(comment, i) in comments"
      :key="'comment' + forProps + i"
      class="comment">
      <span class="comment__header">
        <span class="comment__header__author">{{ comment.author }}</span>
        <span class="comment__header__date">{{ comment.date }}</span>
      </span>
      <div class="comment__content">
        {{ comment.content }}
      </div>
    </article>
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
      newComment: '',
      comments: [
        {
          author: 'Milesq',
          date: '25.09.2018',
          content: 'lorem ipsum sit dolerum'
        }
      ],
      user: {
        name: 'Ania Kowalska'
      }
    };
  },
  methods: {
    addComment() {
      const now = new Date;
      this.comments.push({
        author: this.user.name,
        date: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`,
        content: this.newComment
      });

      this.newComment = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/BlueTile.scss';

.comment {
  background-color: #fff;
  box-shadow: 0 1px 5px -1px #000;
  margin: 20px 0;
  padding: 20px;

  &__header {
    margin: 10px 0;
    font-size: 1.1em;

    &__author {
      font-weight: 700;
    }

    &__date {
      font-weight: 400;
      font-size: .9em;
      margin-left: 10px;
    }
  }

  &__content {
    border-top: 1px solid #c1c1c1;
    padding: 10px 0;
    margin-top: 10px;
    font-weight: 300;
    font-size: .95em;
  }
}

.login {
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
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
    padding: 15px;
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

.link {
  color: $secondary-color;
  text-decoration: none;
}
</style>
