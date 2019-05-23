<template>
  <footer>
    <section class="for-users">
      <div>
        <h3>Szybkie linki:</h3>
        <ul>
          <li><nuxt-link to="/search/all">Wszystkie obiekty</nuxt-link></li>
          <li><nuxt-link to="/blog">Blog</nuxt-link></li>
        </ul>
      </div>
      <div>
        <h3>Kategorie:</h3>
        <ul>
          <li><NLink to="/search/all?type=aquapark">Aquapark</NLink></li>
          <li><NLink to="/search/all?type=swimming-pool-indoor">Basen Otwarty</NLink></li>
          <li><NLink to="/search/all?type=swimming-pool-outdoor">Basen Kryty</NLink></li>
          <li><NLink to="/search/all?type=swimming-pool-thermal">Basen Termalny </NLink></li>
          <li><NLink to="/search/all?type=sauna">Sauna</NLink></li>
        </ul>
      </div>
      <div>
        <h3>Znajdź nas na:</h3>
        <ul>
          <li><a target="blank" href="https://www.facebook.com">Facebook</a></li>
          <li><a target="blank" href="https://www.instagram.com">Instagram</a></li>
          <li><a target="blank" href="https://www.youtube.com">Youtube</a></li>
        </ul>
      </div>
    </section>
    <section class="for-law">
      <nuxt-link class="link" to="/reg">Regulamin</nuxt-link>
      <nuxt-link class="link" to="/contact">Kontakt</nuxt-link>
      <nuxt-link class="link" to="/privacy">Polityka prywatności</nuxt-link>
    </section>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    background-color: #fff;
    width: 100%;
    padding: 0 50px;
  }

  .for-users {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 35px;
    border-top: .8px solid#626262;

    div {
      @media(max-width: 585px) {
        margin: 5%;
      }
    }

    ul {
      padding: 0px;
      list-style-type: none;

      & > li {
        margin-top: 15px;
      }

      a {
        color: black;
        text-decoration: none;
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
    margin: 0 10px;
    text-decoration: none;

    @media(min-width: 585px) {
      margin: 0 40px;
    }
  }
</style>
