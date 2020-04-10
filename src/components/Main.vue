<template>
  <div class="main">
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
    // getUserData() {
    //   firebase.firestore
    //     .collection("users")
    //     .doc(this.uid)
    //     .get()
    //     .then(doc => {
    //       this.$store.state.welcomeUser = doc.data().firstName;
    //     });
    // }
  },
  mounted() {
    this.blur();
    // this.getUserData();
  }
};
</script>

<style scoped>
.social-media-fixed {
  position: fixed;
  top: 53%;
}
</style>