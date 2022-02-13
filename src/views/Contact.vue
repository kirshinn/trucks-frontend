<template>
  <transition name="slide" mode="out-in" appear>
    <div class="page-wrapper">
      <main id="contacts">

        <h1>
          Contacts
          <router-link to="/"></router-link>
        </h1>

        <div class="info">
          <div class="left">
            <p class="address">Preventive Maintenance<br>Parts & Service<br>Tires</p>
            <p class="address">
              15 Morgan Hill
              <br>
              Easton, PA
              <br>
              18042
            </p>
            <p class="address">
              <a href="tel:+14844846666">(484) 484-6666</a>
            </p>
          </div>
          <div class="right">
            <GmapMap
              class="map"
              :center="coords"
              :zoom="17"
              map-type-id="terrain"
            >
              <GmapMarker
                :position="coords"
                :clickable="true"
                :draggable="true"
              />
            </GmapMap>
          </div>
        </div>

      </main>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      company: this.$store.state.company,
      coords: { lat: 40.6740533, lng: -75.2147958 },
    };
  },
};
</script>
