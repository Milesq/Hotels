<template>
  <div class="container">
    <div class="gallery"></div>
    <h1>Aquapark warszawa</h1>

    <section style="margin-top: 15px" class="object-info">
      <section style="margin-right: 20px" class="tile">
        <h3 class="tile__header">Atrakcje</h3>
        <div class="tile__content tile__content--attractions">
          <span v-for="element in attractions" :key="'attraction_' + element[0]">
            <i class="fas fa-check"></i>
            {{ element }}
          </span>
        </div>
      </section>
      <section style="margin-left: 20px" class="tile">
        <h3 class="tile__header">Programy partnerskie</h3>
        <div class="tile__content tile__content--partners">
          <img
            v-for="partner in partners"
            :key="partner + 'logo'"
            :src="partner">
            <span class="partners-none" v-if="!partners || !partners.length">
              Brak programów partnerskich w tym obiekcie
            </span>
        </div>
      </section>
    </section>
    <section style="width: 100%" class="tile">
      <h3 class="tile__header">Opis obiektu</h3>
      <div
        class="tile__content tile__content--description">
        <span v-html="desc"></span>

        <button
          @click="fullLengthDescription = !fullLengthDescription"
          class="descriptionToggle">
          {{
            fullLengthDescription ? 'Zwiń' : 'Rozwiń'
          }}
          opis
        </button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  validate({ redirect, params: { name } }) {
    if (name[0] === name[0].toUpperCase()) {
      redirect(`/object/${name[0].toLowerCase() + name.substr(1)}`);
    }

    if (!/[a-z]/.test(name[0])) {
      return false;
    }

    return true;
  },
  asyncData() {
    return {
      attractions: ['Basen sportowy', 'Basen rekreacyjny', 'Jacuzzi', 'Łaźnia parowa'],
      partners: [
        'https://placeimg.com/120/50/any',
        'https://placeimg.com/120/50/tech',
        'https://placeimg.com/120/50/any/grayscale',
        'https://placeimg.com/120/50/any/sepia'
      ],
      description: `
      <b>Super!!</b>,
              Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi esse
        corrupti accusantium voluptas eveniet reiciendis autem quo
        impedit aut atque incidunt alias doloribus
        odit consectetur officiis id, itaque laboriosam! A!
                Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi esse
        corrupti accusantium voluptas eveniet reiciendis autem quo
        impedit aut atque incidunt alias doloribus
        odit consectetur officiis id, itaque laboriosam! A!
                Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi esse
        corrupti accusantium voluptas eveniet reiciendis autem quo
        impedit aut atque incidunt alias doloribus
        odit consectetur officiis id, itaque laboriosam! A!
                Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi esse
        corrupti accusantium voluptas eveniet reiciendis autem quo
        impedit aut atque incidunt alias doloribus
        odit consectetur officiis id, itaque laboriosam! A!
      `
    };
  },
  data() {
    return {
      fullLengthDescription: false
    };
  },
  layout: 'static',
  computed: {
    desc() {
      if (this.fullLengthDescription) {
        return this.description;
      }

      return this.description.substr(0, 100);
    }
  }
};
</script>

<style scoped lang="scss">
$image-height: 600;

.tile__content {
  &--attractions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: 400;

    span {
      margin: 2.5px 0;
    }
  }

  &--partners {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    * {
      margin: 7px;
    }
  }

  &--description {
    display: flex;
    justify-content: center;
  }
}

.descriptionToggle {
  position: absolute;
  bottom: 10px;

  color: #2196f3;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  outline: none;
}

.tile {
  $padding-x: 18px;
  $padding-y: 9px;

  box-shadow: 0 1px 9px -3px #000;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 25px;

  & > * {
    padding: $padding-y $padding-x;
  }

  &__header {
    color: #fff;
    background-color: #2196f3;
    z-index: 2;
  }

  &__content {
    background-color: #fff;
    position: relative;
    min-height: 90px;

    &::after {
      content: '';
      display: block;
      width: calc(100% + #{($padding-x * 2)});

      position: absolute;
      left: 0;
      top: 0;

      height: 5px;
      background-image: linear-gradient(#777, #fff);
    }
  }
}

.partners-none {
  font-weight: 600;
  font-size: 1.3em;
  margin: auto;
}

.fa-check {
  color: #2196f3;
}

.object-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.container {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gallery {
  height: $image-height * 1px;
  width: 100%;
  background-image: url(https://placeimg.com/1000/#{$image-height}/any);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  box-shadow: 0 0 5px -2px #000;

  border-radius: 4px;
}

</style>
