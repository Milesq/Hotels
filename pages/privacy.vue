<template>
  <main class="text">
    <Breadcrumb :crumbs="['Polityka Prywatności']" />
    <div style="padding: 0 20px">
      <h1>Regulamin</h1>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptatem maiores itaque provident minus quisquam voluptatum
        voluptates vero repellat a, voluptate voluptas ut ducimus
        iure nobis in nam commodi cum sunt?
      </span>

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
    </div>
  </main>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue';

export default {
  layout: 'static',
  components: {
    Breadcrumb
  }
};
</script>
