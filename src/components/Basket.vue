<template>
  <div>
    <perfect-scrollbar>
      <div class="basket-inner">
        <div v-for="(item,index) in basket" :key="index">
          <div class="row">
            <span class="discard-item" @click="discardItem(index)">
              <i class="fas fa-trash-alt"></i>
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
      </div>
    </perfect-scrollbar>
    <div class="d-flex justify-content-between checkout">
      <router-link to="/checkout">
        <button class="btn btn-dark basic-btn" @click="protectRoute">Checkout</button>
      </router-link>

      <p class="total">
        Total:
        <span class="price">123$</span>
      </p>
    </div>
  </div>
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
    },
    discardItem(index) {
      this.basket.splice(index, 1);
    }
  }
};
</script>

<style scoped>
</style>