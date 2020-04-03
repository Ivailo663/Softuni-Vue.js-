<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { database } from "./firebase";/
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
