<template>
  <div class="sneakers d-flex flex-column align-items-center">
    <div
      class="container sneakers-inner"
      v-for="(category) in menCategory"
      :key="category.model_id"
    >
      <div class="row">
        <div class="sneakers-image-holder col-lg-4">
          <img :src="category.src" :alt="category.brand" />
        </div>
        <div class="info-wrapper col-lg-8">
          <h3>{{category.brand}}</h3>
          <h5>{{category.model}}</h5>
          <p>{{category.description}}</p>
          <ul class="d-flex sizes">
            <li v-for="(size,index) in category.sizes" :key="index">{{size}}</li>
          </ul>
          <p class="price">{{category.price}} $</p>
          <button class="btn btn-dark basic-btn">Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit";

export default {
  data() {
    return {
      testImg: "",
      menCategory: [],
      bottomRow: []
    };
  },
  computed: {
    collectionOfThree() {}
  },
  methods: {
    async callImg() {
      let Men = await firebase.firestore.collection("Men").get();
      return Men.docs.forEach(doc => {
        this.menCategory.push(doc.data());
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