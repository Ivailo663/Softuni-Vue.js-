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
          </li>
          <li class="login" @click="openForm" v-if="!userLogged">
            <i class="fa fa-sign-in-alt"></i>
          </li>
          <li
            class="login"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-if="userLogged"
          >
            <i class="fa fa-user"></i>

            <div class="dropdown-menu">
              <!-- Dropdown menu links -->
              <button class="dropdown-item" type="button">Profile</button>
              <button class="dropdown-item" type="button" @click="signOut">Log out</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="basket" v-if="!isBasketEmpty">
        <Basket />
      </div>
    </div>
    <nav class="navbar d-flex justify-content-center">
      <ul class="d-flex justify-content-center" v-for="category in categories" :key="category.key">
        <router-link tag="li" :to="`/home${category.route}`">{{category.name}}</router-link>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import firebase from "../firebaseInit";
import Basket from "./Basket";
export default {
  name: "Navbar",
  data() {
    return {
      categories: [
        { id: 0, name: "men", route: "/menSection" },
        { id: 1, name: "women", route: "/womenSection" },
        { id: 2, name: "outlet", route: "/outlet" }
      ],
      timeOut: null
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
      this.$store.state.isBasketEmpty = !this.$store.state.isBasketEmpty;
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
          console.log("SIGNED OUT!");
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  watch: {
    isBasketEmpty: {
      handler: function(oldVal, newVal) {
        console.log(`isBasketEmpty changed from ${newVal} to ${oldVal}`);
        this.closingBasket();
      }
    }
  }
};
</script>
<style >
</style>