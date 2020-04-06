<template>
  <div class="navigation">
    <div class="banner">
      <div class="landing-msg d-flex flex-column align-items-center">
        <h1 @click="closingBasket">
          Welcome to
          <strong>Sneakers</strong>
        </h1>
        <p>Chose the best model for you</p>
      </div>
      <div class="user-controller">
        <ul class="d-flex">
          <li @click="openBasket" class="shoping-bag">
            <i class="fa fa-shopping-bag"></i>
          </li>
          <li class="login">
            <i class="fa fa-user"></i>
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
          <router-link :to="`/main${category.route}`">
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
import firebase from "../firebaseConfig";
import Basket from "./Basket";
export default {
  name: "Navbar",
  data() {
    return {
      categories: [
        { id: 0, name: "men", route: "/men" },
        { id: 1, name: "women", route: "/women" },
        { id: 2, name: "outlet", route: "/outlet" }
      ],
      timeOut: null
    };
  },
  computed: {
    ...mapState(["basket", "isBasketEmpty", "isSidebarOpen"])
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