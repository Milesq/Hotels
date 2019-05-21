<template>
  <section style="width: 100%">
      <section class="tile">
        <h3 class="tile__header">Dodaj komentarz</h3>
        <div class="tile__content">
          <div v-if="user.name" class="new-comment">
            <div class="new-comment__header">
              Zalogowano jako {{ user.name }}.
              <span class="link" @click="logout">Wyloguj się</span>
            </div>
            <div class="stars">
              <div v-for="el in 4" :key="'_' + el">
                <span>{{ userStarsDesc[el - 1][0] }}</span>
                <span>
                  <i
                    v-for="rating in 5"
                    :key="userStarsDesc[el - 1][1] + 'star' + rating"
                    @click="userStars[userStarsDesc[el - 1][1]] = rating"
                    :class="['fas', 'fa-star', {
                      'no-active': rating > userStars[userStarsDesc[el - 1][1]]
                    }]"></i>
                </span>
              </div>
            </div>
            <div
              :data-text-counter="newComment.length"
              data-text-counter-max="180"
              style="width: 100%">
              <textarea
                placeholder="Dodaj komentarz"
                v-model="newComment"
                :class="['new-comment__area', {
                  'new-comment__area--error animated shake': newComment.length > 180
                }]"></textarea>
            </div>
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
        :key="'comment' + i"
        class="comment">
        <span class="comment__header">
          <span class="comment__header__author">{{ comment.author }}</span>
          <span class="comment__header__date">{{ comment.created_at | fromUnix }}</span>
        </span>
        <div class="comment__content">
          <!-- {{ json(comment.content).comment }} -->
        </div>
      </article>
  </section>
</template>

<script>
// import 'animate.css';

export default {
  props: ['data', 'stars'],
  data() {
    return {
      newComment: '',
      commentCommited: false,
      user: {
        name: 'Ania Kowalska'
      },
      userStars: {
        staff: 0,
        clutter: 0,
        cleanliness: 0,
        attractions: 0
      },
      userStarsDesc: [
        ['Obsługa', 'staff'],
        ['Zatłoczenie', 'clutter'],
        ['Czystość', 'cleanliness'],
        ['Atrakcje', 'attractions']
      ]
    };
  },
  methods: {
    addComment() {
      this.commentCommited = true;
      if (!/\S/.test(this.newComment) || this.newComment.length > 180) {
        return;
      }

      this.$emit('send', {
        user: this.user,
        content: JSON.stringify({
          comment: this.newComment,
          stars: {
            ...this.userStars
          }
        })
      });
      this.newComment = '';
    },
    logout() {
      this.user.name = null;
    },
    onLogout: (...args) => console.log('logout', ...args),
    getUserData: (...args) => {
      console.log('getUserData', ...args);
      return true;
    },
    json: JSON.parse
  },
  filters: {
    fromUnix(unixDate) {
      const date = new Date(unixDate);
      return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/BlueTile.scss';

.stars {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 7px;
  font-weight: 400;

  & > * {
    display: flex;
    justify-content: space-between;
    width: 15%;
    margin: 9px;
  }
}

*[data-text-counter] {
  position: relative;

  &::after {
    font-size: 12px;
    content: attr(data-text-counter)"/"attr(data-text-counter-max);
    position: absolute;
    right: 5px;
    bottom: 15px;
    color: #cacaca;
  }
}

.fas {
  color: $secondary-color;
  cursor: pointer;

  &.no-active {
    color: #e5e5e5;
  }
}

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

    &--error {
      box-shadow: 0 0 5px 1px red;
      outline: red;
      color: red;
    }
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
