<template>
  <perfect-scrollbar>
    <div class="basket-inner">
      <div v-for="(item,index) in basket" :key="index">
        <div class="row">
          <span class="discard-item">
            <i class="fa fa-times-circle"></i>
          </span>
          <figure class="basket-image-holder">
            <img :src="item.src" :alt="item.brand" />
          </figure>

          <div class="info-wrapper">
            <h3>{{item.brand}}</h3>
            <p>size {{item.sizes}}</p>
            <p class="price">{{item.price}} $</p>
          </div>
        </div>
        <hr />
      </div>

      <div class="d-flex justify-content-between">
        <router-link to="/checkout">
          <button class="btn btn-dark basic-btn" @click="protectRoute">Checkout</button>
        </router-link>

        <p class="total price">Total: 123$</p>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hideBtn: false
    };
  },

  name: "Basket",
  computed: {
    ...mapState(["basket", "userLogged"])
  },
  methods: {
    protectRoute() {
      !this.userLogged ? (this.$store.state.isBlurSet = true) : null;
    }
  }
};
</script>

<style scoped>
</style>