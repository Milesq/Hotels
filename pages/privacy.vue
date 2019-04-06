<template>
  <section class="container">
    <nav class="search-bar">
      <Header :shadow="false">
        <span class="search-container">
          <input
            class="search__input"
            type="text"
            placeholder="Podaj nazwę miasta"><!--
          this comment must be there!
          --><button
              @click="$router.push(`objects/${city}`)"
              class="search__button">
              <i class="fas fa-search"></i>Szukaj
            </button>
        </span>
      </Header>
    </nav>
    <main class="text">
      <h2>Regulamin</h2>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptatem maiores itaque provident minus quisquam voluptatum
        voluptates vero repellat a, voluptate voluptas ut ducimus
        iure nobis in nam commodi cum sunt?</span>

        <article>
          <h3 class="header">Postanowienia ogólne</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Voluptatem maiores itaque provident minus quisquam voluptatum
            voluptates vero repellat a, voluptate voluptas ut ducimus
            iure nobis in nam commodi cum sunt?
          </p>
        </article>
        <article>
          <h3 class="header">Wyrażanie opini oraz wprowadzanie danych</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Voluptatem maiores itaque provident minus quisquam voluptatum
            voluptates vero repellat a, voluptate voluptas ut ducimus
            iure nobis in nam commodi cum sunt?
          </p>
        </article>
        <article>
          <h3 class="header">Odpowiedzialność</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Voluptatem maiores itaque provident minus quisquam voluptatum
            voluptates vero repellat a, voluptate voluptas ut ducimus
            iure nobis in nam commodi cum sunt?
          </p>
        </article>
    </main>
  </section>
</template>

<script>
import Header from '../components/landingPage/Header.vue';

export default {
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
  .container {
    font-weight: 500;
  }

  .text {
    padding: 10vw;
    padding-top: 2vw;
  }

  .header {
    margin-top: 20px;
  }

  .search {
    &__input,
    &__button {
      padding: 15px;
      color: white;
      // font-size: .8em;
      font-weight: 500;
      border: none;
      margin: 0;
    }

    $radius: 2px;

    &__input {
      border-top-left-radius: $radius;
      border-bottom-left-radius: $radius;
      color: #959595;
      width: 30vmax;

      &::placeholder {
        color: #959595;
      }
    }

    &__button {
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
      min-width: 10vw;
      cursor: pointer;
      background-color: #ff9801;
      border: none;
    }
  }
</style>
