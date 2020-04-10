<template>
  <div class="main">
    <div :class="{blur:isBlurSet}">
      <Navbar />
      <vue-page-transition name="fade">
        <router-view />
      </vue-page-transition>
      <div class="social-media-fixed d-flex flex-column" v-if="this.isMediaShown">
        <div class="social-media-container">
          <ul class="d-flex justify-content-center flex-column">
            <li>
              <a>
                <i class="fab media fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a>
                <i class="fab media fa-pinterest-p"></i>
              </a>
            </li>
            <li>
              <a>
                <i class="fab media fa-snapchat-ghost"></i>
              </a>
            </li>
            <li>
              <a>
                <i class="fab media fa-instagram"></i>
              </a>
            </li>
            <li>
              <a>
                <i class="fab media fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
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
  },
  mounted() {
    this.blur();
  }
};
</script>

<style scoped>
.social-media-fixed {
  position: fixed;
  top: 40%;
  left: 2%;
}
</style>