<template>

  <div>
    <button @click="getZoom">get zoom</button>
    <GoogleMap api-key="AIzaSyA39z1GT9YkvGR-z7bFVf4_3bkgi-cbaxM" style="width: 100%; height: 500px" :center="center" :zoom="15">
      <Marker :options="markerOptions" />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: -39.429464, lng: 175.277836 };
    const markerOptions = { position: center, label: "L", title: "LADY LIBERTY" };
    return { center, markerOptions };
  },

  data() {
    return {
      markers: []
    }
  },

  methods: {
    getZoom() {
      const mapObject = new google.maps.Map(document.getElementById("map"));
      console.log(mapObject.getZoom());
    }
  }
});
</script>