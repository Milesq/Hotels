<template>
  <div>
    Empty page
  </div>
</template>

<script>
export default {
  validate({ redirect }) {
    redirect('/');
    return true;
  }
};
</script>
