<template>
  <div id="map-wrap" style="height: 100%">
    <no-ssr>
      <l-map :zoom="zoom" :center="averageCoords">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker v-for="(ll, i) in latlng" :key="i" :lat-lng="ll"></l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
/* global isNaN */
export default {
  computed: {
    averageCoords() {
      function average(tab) {
        return tab.reduce((a, b) => a + b) / tab.length;
      }

      const avg = this.latlng.map(coords => coords.map(parseFloat));
      const lat = average(avg.map(x => x[0]));
      const lon = average(avg.map(x => x[1]));

      return [lat, lon];
    }
  },
  props: {
    zoom: {
      type: Number,
      default: 8
    },
    latlng: {
      type: Array,
      required: true,
      validator(val) {
        return val.every(el => el.length === 2 && el.every(x => !isNaN(x)));
      }
    }
  }
};
</script>
