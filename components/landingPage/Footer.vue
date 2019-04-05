<template>
  <footer>
    <section class="for-users">
      <div>
        <h3>Szybkie linki:</h3>
        <ul>
          <li>Wszystkie obiekty</li>
          <li>Artykuły</li>
        </ul>
      </div>
      <div>
        <h3>Kategorie:</h3>
        <ul>
          <li>Aquapark</li>
          <li>Basen kryty</li>
          <li>Basen odkryty</li>
          <li>Basen termalny</li>
          <li>Sauna</li>
        </ul>
      </div>
      <div>
        <h3>Znajdź nas na:</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Youtube</li>
        </ul>
      </div>
    </section>
    <section class="for-law">
      <nuxt-link class="link" to="reg">Regulamin</nuxt-link>
      <nuxt-link class="link" to="contact">Kontakt</nuxt-link>
      <nuxt-link class="link" to="privacy">Polityka prywatności</nuxt-link>
    </section>
  </footer>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
  footer {
    background-color: #fff;
    width: 100%;
    padding: 0 50px;
  }

  .for-users {
    display: flex;
    justify-content: space-around;
    padding: 35px;
    border-top: .8px solid#626262;

    ul {
      padding: 0px;
      list-style-type: none;

      & > li {
        margin-top: 15px;
      }
    }
  }

  .for-law {
    display: flex;
    justify-content: center;
    border-top: .5px solid#626262;
    padding: 25px;
  }

  .link {
    font-weight: 500;
    color: #000;
    text-decoration: none;
    margin: 0 40px;
  }
</style>
