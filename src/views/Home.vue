<template>
  <transition name="fade" mode="out-in" appear>
    <div class="home-wrapper">
      <main id="home">

        <h1>{{ company }}</h1>

        <div class="cards">
          <router-link to="/application" class="card">
            <img src="../assets/img/image 1.png" alt="1">
            <p>Application<br>Form</p>
          </router-link>
          <a href="https://www.linxup.com/login.html" target="_blank" class="card">
            <img src="../assets/img/image 2.png" alt="2">
            <p>Freight<br>tracking</p>
          </a>
          <router-link to="/upload" class="card">
            <img src="../assets/img/upload.png" alt="upload">
            <p>Upload Documents</p>
          </router-link>
          <router-link to="/contacts" class="card">
            <img src="../assets/img/image 3.png" alt="3">
            <p>Truck repair<br>Contacts</p>
          </router-link>
        </div>

        <footer>
          &copy; {{ new Date().getFullYear() }} {{ company }}
        </footer>

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
    };
  }
};
</script>
