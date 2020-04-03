<template>
  <div class="navigation">
    <div class="banner"></div>
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
import { mapGetters } from "vuex";
import firebase from "../firebaseConfig";
export default {
  name: "Navbar",
  data() {
    return {
      categories: [
        { id: 0, name: "men", route: "/men" },
        { id: 1, name: "women", route: "/women" },
        { id: 2, name: "outlet", route: "/outlet" }
      ]
    };
  },
  methods: {}
};
</script>