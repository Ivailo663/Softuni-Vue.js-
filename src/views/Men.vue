<template>
  <div class="sneakers container">
    <div class="row">
      <div v-for="(item) in sneakersCollection" :key="item.model_id" class="col-lg-6">
        <div class="sneakers-inner d-flex flex-column align-items-center">
          <div class="sneakers-image-holder">
            <img :src="item.src" :alt="item.brand" />
          </div>
          <div class="info-wrapper">
            <h3>{{item.brand}}</h3>
            <h5>{{item.model}}</h5>
            <!-- <div class="d-flex sizes">
              <div v-for="(size,index) in item.sizes" :key="index" class="radio-input">
                <input :id="index" type="radio" name="size" :value="index" />
                <label @click="pickSize(size)" :for="index">{{size}}</label>
              </div>
            </div>-->
            <div class="sneakers-buttons-wrapper">
              <p class="price">{{item.price}} $</p>
              <button class="btn btn-dark basic-btn" @click="addToBasket(item)">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Loading :active.sync="isLoading"></Loading>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
import { mapState } from "vuex";
//Loading component + stylesheet
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      testImg: "",
      sneakersCollection: [],
      basket: this.$store.state.basket,
      isLoading: true,
      chosenSize: "",
      isSizePicked: false,
      collectedItem: null,
      pickedSize: {
        sizes: null
      },
      resultOfBothObj: null
    };
  },
  components: {
    Loading
  },
  methods: {
    addToBasket(item) {
      if (!this.pickedSize.sizes) {
        console.log("its empty bro");

        this.isSizePicked = true;
      } else {
        this.isSizePicked = false;
        this.resultOfBothObj = { ...item, ...this.pickedSize };

        this.basket.push(this.resultOfBothObj);

        this.pickedSize.sizes = null;

        console.log(this.basket);
      }
    },
    pickSize(size, index) {
      this.pickedSize.sizes = size;
      this.isSizePicked = false;
      console.log(this.pickedSize.sizes, ":size");
    },

    async callImg() {
      let Men = await firebase.firestore.collection("Men").get();
      return Men.docs.forEach(doc => {
        this.isLoading = false;
        this.sneakersCollection.push(doc.data());
        // console.log(this.menCategory);
      });
    }
  },
  mounted() {
    this.callImg();
  }
};
</script>

<style lang="scss" scoped>
</style>