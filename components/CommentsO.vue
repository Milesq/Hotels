<template>
  <section style="width: 100%">
    <no-ssr>
      <facebook-login class="button"
        appId="535371283657873"
        @login="getUserData"
        @logout="onLogout"
        @get-initial-status="getUserData">
      </facebook-login>
      <!-- <section class="tile">
        <h3 class="tile__header">Dodaj komentarz</h3>
        <div class="tile__content">
          <div v-if="user.name" class="new-comment">
            <div class="new-comment__header">
              Zalogowano jako {{ user.name }}.
              <span class="link" @click="logout">Wyloguj się</span>
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
        v-for="(comment, i) in data"
        :key="'comment' + forProps + i"
        class="comment">
        <span class="comment__header">
          <span class="comment__header__author">{{ comment.author }}</span>
          <span class="comment__header__date">{{ comment.created_at | fromUnix }}</span>
        </span>
        <div class="comment__content">
          {{ comment.content }}
        </div>
      </article> -->
    </no-ssr>
  </section>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';

export default {
  props: ['data'],
  data() {
    return {
      newComment: '',
      user: {
        name: 'Ania Kowalska'
      }
    };
  },
  methods: {
    addComment() {
      this.newComment = '';
    },
    logout() {
      this.user.name = null;
    },
    onLogout: (...args) => console.log('logout', ...args),
    getUserData: (...args) => {
      console.log('getUserData', ...args);
      return true;
    }
  },
  filters: {
    fromUnix(unixDate) {
      const date = new Date(unixDate);
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
  },
  components: {
    facebookLogin
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
  cursor: pointer;
}
</style>
