<template>
  <div class="title">
    <div class="search">
      <h1>Zrelaksuj się nad wodą blisko siebie!</h1>
      <input v-model="city" class="search__input" type="text" placeholder="Podaj nazwę miasta"><!--
      this comment must be there!
      --><button
        @click="$router.push(`objects/${city}`)"
        class="search__button">
          <i class="fas fa-search"></i>Szukaj
        </button>
    </div>
    <div class="categories">
      <div
        @click="$router.push('objects/?type=aquapark')"
        class="categories__breadcrumb">
        <i class="fas fa-swimming-pool category-icon"></i>
        <span>aquapark</span>
      </div>
      <div
        @click="$router.push('objects/?type=swimming-pool')"
        class="categories__breadcrumb">
        <i class="fas fa-water category-icon"></i>
        <span>basen</span>
      </div>
      <div
        @click="$router.push('objects/?type=sauna')"
        class="categories__breadcrumb">
        <i class="fas fa-hot-tub category-icon"></i>
        <span>sauna</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ''
    };
  }
};
</script>

<style scoped lang="scss">
.title {
  margin-top: 4%;
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 1.4em;

  display: flex;
  flex-direction: column;
}

.categories {
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: -2px 3px 10px -5px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin: 10% auto;
  padding: 5px;

  @media (max-width: 678px) {
    flex-direction: column;
    width: 80%;
  }

  &__breadcrumb {
    cursor: pointer;
    display: flex;
    flex-direction: column;

    color: #000;

    padding: 10px 57px;

    text-transform: capitalize;

    i {
      transition: .2s ease-in transform;
    }

    &:hover i {
      transform: translateY(-5px) scale(1.1);
    }

    span {
      font-size: .75em;
    }

    &:not(:nth-child(1)) {
      border-left: 2px #626262 solid;
      @media (max-width: 678px) {
        border-left: 0;
        border-top: 2px #626262 solid;
      }
    }
  }
}

.category-icon {
  color: #5bb5f6;
  font-size: 60px;
}

.search {
  &__input,
  &__button {
    padding: 15px;
    color: white;
    font-size: .8em;
    font-weight: 500;
    border: none;
    margin: 0;
  }

  $radius: 10px;

  &__input {
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
    color: #959595;
    width: 40vmax;

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

h1 {
  @media (max-width: 678px) {
    font-size: 1.2em;
  }
}
</style>
