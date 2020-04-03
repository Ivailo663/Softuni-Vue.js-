<template>
  <div class="main">
    <!-- NAVIGATION -->
    <Navbar />
    <router-view></router-view>
    <div class="social-media-fixed d-flex flex-column">
      <div class="media facebook"></div>
      <div class="media pinterest"></div>
      <div class="media snapchat"></div>
      <div class="media instagram"></div>
      <div class="media twitter"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style scoped>
.social-media-fixed {
  position: fixed;
  top: 37%;
}
</style>