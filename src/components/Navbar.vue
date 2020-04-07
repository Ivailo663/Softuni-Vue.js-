<template>
  <div class="navigation">
    <div class="banner">
      <div class="landing-msg d-flex flex-column align-items-center">
        <h1>
          Welcome to
          <strong>Sneakers</strong>
          <router-link to="/checkout">CHECKOUT</router-link>
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
    <nav class="navbar navbar-expand-lg d-flex justify-content-end">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample08"
        aria-controls="navbarsExample08"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav" v-for="category in categories" :key="category.id">
          <router-link :to="`/home${category.route}`">
            <li class="nav-item">
              <p>{{category.name}}</p>
            </li>
          </router-link>
        </ul>
      </div>
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