<template>
  <div id="map-wrap" style="height: 100%">
    <no-ssr>
      <l-map :zoom=13 :center="latlng">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="latlng"></l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    latlng: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>

</style>
