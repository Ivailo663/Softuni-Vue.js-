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
            <ul class="d-flex sizes">
              <li v-for="(size,index) in item.sizes" :key="index" @click="pickSize(size)">
                <!-- <label :for="size" >{{size}}</label> -->
                <p>{{size}}</p>
                <!-- <input type="radio" name="size" :value="size" v-model="chosenSize" /> -->
              </li>
            </ul>
            <div class="sneakers-buttons-wrapper">
              <p class="price">{{item.price}} $</p>
              <button class="btn btn-dark basic-btn">Add to Basket</button>
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
      let Men = await firebase.firestore.collection("Women").get();
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