<template>
  <div class="basket-inner">
    <div v-for="(item,index) in basket" :key="index">
      <div class="row">
        <span class="discard-item">
          <i class="fa fa-times-circle"></i>
        </span>
        <div class="basket-image-holder">
          <img :src="item.src" :alt="item.brand" />
        </div>

        <div class="info-wrapper">
          <h3>{{item.brand}}</h3>

          <p>{{item.sizes}}</p>
          <p class="price">{{item.price}} $</p>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Basket",
  computed: {
    ...mapState(["basket"])
  }
};
</script>

<style scoped>
</style>