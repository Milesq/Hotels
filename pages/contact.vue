<template>
  <section class="text">
    <h1>Skontaktuj się z nami</h1>
    <h2>Wypełnij formularz kontaktowy żeby się z nami skontaktować!</h2>
    <section class="forms">
      <form @submit.prevent="send">
        <label for="name">Imię i nazwisko</label>
        <input v-model="name" type="text" name="name">

        <label for="mail">Twój adres e-mail</label>
        <input v-model="mail" type="mail" name="mail">

        <label for="title">Tytuł wiadomości</label>
        <input v-model="title" type="text" name="title">

        <label for="content">Treść wiadomości</label>
        <textarea v-model="content" name="content"></textarea>

        <div class="
          pretty
          p-default
          p-curve">
          <input v-model="accepted" type="checkbox" />
          <div class="state p-primary">
            <label>Akcetpuję regulamin</label>
          </div>
        </div>

        <span style="font-size: .87em; cursor: pointer">
          Dane wpisane w formularzu kontaktowym będą udzielane
          w celu udzielenia odpowiedzi na przesłane zapytanie zgodnie z
          <nuxt-link to="/privacy">polityką prywatności</nuxt-link>
        </span>

        <input
          :class="{
            active: accepted
          }"
          type="submit"
          value="Wyślij wiadomość">
      </form>
      <div>
        <div @click="open('mailto:wspolpraca@znajdzbasen.pl')" class="tile">
          <i class="fas fa-ad"></i>
          <h3>Reklama i współpraca</h3>
          <span>
            wspolpraca@znajdzbasen.pl
          </span>
        </div>
        <div @click="open('mailto:administrator@znajdzbasen.pl')" class="tile">
          <i class="fas fa-tools"></i>
          <h3>Administrator</h3>
          <span>
            administrator@znajdzbasen.pl
          </span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'static',
  data() {
    return {
      accepted: false,
      name: '',
      mail: '',
      title: '',
      content: ''
    };
  },
  methods: {
    open(url) {
      window.open(url);
    },
    send() {
      console.log('sent!');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

input,
textarea {
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 0 5px -4px #000;
}

textarea {
  resize: none;
  height: 150px;
}

[type=submit] {
  $color: hsl(209, 67, 73);

  margin-top: 25px;
  background-color: $color;
  color: white;
  transition: background-color .4s ease-in;

  &.active {
    background-color: saturate(darken($color, 20), 100%);
    cursor: pointer;
  }
}

.pretty {
  margin-top: 20px;
  margin-bottom: 20px;
}

.text {
  width: 90%;
  margin: 0 auto;

  @media (max-width: 850px) {
    width: 100%;
  }
}

h1 {
  font-weight: 600;
  font-size: 1.6rem;
}

h2 {
  font-weight: 400;
  font-size: 1rem;
}

.fas {
  color: $primary-color;
  font-size: 60px;
}

form {
  display: flex;
  flex-direction: column;
}

.forms {
  display: grid;

  @media (min-width: 850px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10vw;
  }
}

.tile {
  background-color: #fff;
  cursor: pointer;
  border-radius: 2px;
  margin: 20px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 3px 5px -3px #000;
  will-change: box-shadow;
  transition: .5s ease-in box-shadow;

  &:hover {
    box-shadow: 0 3px 5px 0 #000;
  }

  a {
    color: black;
    text-decoration: none;
  }
}

@import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
