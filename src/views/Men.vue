<template>
  <div class="sneakers d-flex flex-column align-items-center">
    <div
      class="container sneakers-inner"
      v-for="(category) in sneakersCollection"
      :key="category.model_id"
    >
      <div class="row">
        <div class="sneakers-image-holder col-lg-4">
          <img :src="category.src" :alt="category.brand" />
        </div>
        <div class="info-wrapper col-lg-8">
          <h3>{{category.brand}}</h3>
          <h5>{{category.model}}</h5>
          <div class="description d-flex align-items-center">
            <p>{{category.description}}</p>
          </div>
          <ul class="d-flex sizes">
            <li v-for="(size,index) in category.sizes" :key="index">{{size}}</li>
          </ul>
          <div class="sneakers-buttons-wrapper">
            <p class="price">{{category.price}} $</p>
            <button class="btn btn-dark basic-btn">Order</button>
          </div>
        </div>
      </div>
    </div>
    <Loading :active.sync="isLoading"></Loading>
  </div>
</template>

<script>
import firebase from "../firebaseInit";

//Loading component + stylesheet
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      testImg: "",
      sneakersCollection: [],
      isLoading: true
    };
  },
  components: {
    Loading
  },
  methods: {
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