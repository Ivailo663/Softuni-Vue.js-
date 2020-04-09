<template>
  <div class="navigation">
    <div class="banner">
      <div class="landing-msg d-flex flex-column align-items-center">
        <h1>
          Welcome to
          <strong>Sneakers</strong>
        </h1>
      </div>
      <div class="user-controller">
        <ul class="d-flex">
          <li @click="openBasket" class="shoping-bag">
            <i class="fa fa-shopping-bag"></i>
            <div class="items-counter" v-if="!isBasketEmpty">{{basket.length}}</div>
          </li>
          <li class="login" @click="openForm" v-if="!userLogged">
            <i class="fa fa-sign-in-alt"></i>
          </li>
          <li class="login" @click="dropDownToggle" v-else>
            <i class="fa fa-user"></i>

            <div v-if="dropDownOpen" class="dropdownMenu" v-on-clickaway="dropDownToggle">
              <!-- Dropdown menu links -->

              <router-link to="/userProfile">
                <button>
                  <p>Profile</p>
                </button>
              </router-link>
              <hr />
              <button type="button" class="logout" @click="signOut">
                <p>Log out</p>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="basket" v-if="open" v-on-clickaway="closeBasket">
        <Basket />
      </div>
    </div>
    <nav class="navbar d-flex justify-content-center">
      <ul class="d-flex justify-content-center">
        <li
          v-for="(category,index) in categories"
          :key="category.key"
          @click="selectedCategory(index)"
        >
          <router-link
            :to="`/home${category.route}`"
            :class="{active: index===selected}"
          >{{category.name}}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import firebase from "../firebaseInit";
import Basket from "./Basket";
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  name: "Navbar",
  data() {
    return {
      categories: [
        { id: 0, name: "men", route: "/menSection" },
        { id: 1, name: "women", route: "/womenSection" }
      ],
      timeOut: null,
      open: false,
      dropDownOpen: false,
      selected: 0
    };
  },
  computed: {
    ...mapState(["basket", "isBasketEmpty", "isSidebarOpen", "userLogged"])
  },
  components: {
    Basket
  },
  methods: {
    ...mapActions(["closeBasket"]),
    closingBasket() {
      this.closeBasket();
    },
    openBasket() {
      if (this.isBasketEmpty || this.basket.length == 0) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    openForm() {
      this.$store.state.isBlurSet = true;
    },
    signOut() {
      firebase.authtentication
        .signOut()
        .then(() => {
          this.$store.state.userLogged = false;
          localStorage.removeItem("userLogged");
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    closeBasket() {
      this.open = false;
    },
    dropDownToggle() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    selectedCategory(index) {
      this.selected = index;
    }
  },
  watch: {}
};
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>