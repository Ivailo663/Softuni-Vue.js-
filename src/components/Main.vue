<template>
  <div class="main" :class="{marginRight:isSidebarOpen}">
    <div :class="{blur:isBlurSet}">
      <Navbar />
      <vue-page-transition name="fade">
        <router-view />
      </vue-page-transition>
      <div class="social-media-fixed d-flex flex-column" v-if="this.isMediaShown">
        <div class="media facebook"></div>
        <div class="media pinterest"></div>
        <div class="media snapchat"></div>
        <div class="media instagram"></div>
        <div class="media twitter"></div>
      </div>
      <Footer />
    </div>
    <v-snackbar
      v-model="userLogged"
      class="snackbar"
      :timeout="1500"
      center
      top
      color="#85c688"
    >You're in!</v-snackbar>
    <v-snackbar
      v-model="itemAddedPop"
      class="snackbar"
      :timeout="1500"
      right
      top
      color="#51a2d8"
    >Basket updated</v-snackbar>
    <FormsContainer v-if="isBlurSet" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FormsContainer from "./Registration/FormsContainer";
import firebase from "../firebaseInit";

export default {
  data() {
    return {
      itemAddedProp: null,
      asdf: true
    };
  },
  components: {
    Navbar,
    Footer,
    FormsContainer
  },
  computed: {
    ...mapState(["isMediaShown", "isSidebarOpen", "isBlurSet", "userLogged"]),
    itemAddedPop() {
      return !this.$store.state.isBasketEmpty;
    }
  },
  methods: {
    ...mapActions(["setBlur"]),
    blur() {
      this.setBlur();
    }
  },
  mounted() {
    this.blur();
  }
};
</script>

<style scoped>
.social-media-fixed {
  position: fixed;
  top: 53%;
}
</style>