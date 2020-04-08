<template>
  <div class="sidebar" :class="{offsetRight:isSidebarOpen}">
    <span class="discard-item" @click="closeModal">
      <i class="fa fa-times-circle"></i>
    </span>

    <v-app id="inspire">
      <v-carousel height="400" show-arrows-on-hover persistent="false ">
        <v-carousel-item v-for="(slide, i) in item.gallery" :key="i">
          <v-sheet height="100%">
            <img :src="slide" alt />
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div class="description-section">
        <div>
          <h3>{{item.brand}}</h3>
          <h5>{{item.model}}</h5>
        </div>
        <div class="sneakers-buttons-wrapper">
          <p v-if="isSizePicked" class="sizePicked">Please pick a size.</p>
          <div class="d-flex sizes">
            <div v-for="(size,index) in item.sizes" :key="index" class="radio-input">
              <input :id="index" type="radio" name="size" :value="index" />
              <label @click="pickSize(size)" :for="index">{{size}}</label>
            </div>
          </div>
          <p class="price">{{item.price}} $</p>
          <button class="btn btn-dark" @click="addToBasket(item)">Add to basket</button>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  props: ["item"],
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      basket: this.$store.state.basket,
      isSizePicked: false,
      pickedSize: {
        sizes: null
      },
      resultOfBothObj: null
    };
  },
  computed: {
    ...mapState(["isMediaShown", "isSidebarOpen", "isBasketEmpty"])
  },
  methods: {
    closeModal() {
      this.$store.state.isSidebarOpen = false;
      this.pickedSize = null;
      // this.$emit("clearItem");
    },
    addToBasket(item) {
      if (!this.pickedSize.sizes) {
        this.isSizePicked = true;
      } else {
        this.isSizePicked = false;
        this.resultOfBothObj = { ...item, ...this.pickedSize };
        this.basket.push(this.resultOfBothObj);
        this.$store.state.isSidebarOpen = false;
        this.openBasket();
      }
    },
    openBasket() {
      if (this.basket) {
        this.$store.state.isBasketEmpty = false;
      }
    },
    pickSize(size) {
      this.pickedSize.sizes = size;
      this.isSizePicked = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>