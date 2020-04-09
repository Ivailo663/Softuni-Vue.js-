<template>
  <div class="sneakers container">
    <div class="row">
      <div
        v-for="(item) in sneakersCollection"
        :key="item.model_id"
        class="col-lg-4 col-md-6 d-flex-justify-content-start"
      >
        <div class="sneakers-inner d-flex flex-column align-items-center">
          <figure class="sneakers-image-holder">
            <img :src="item.src" :alt="item.brand" />
            <p class="price">{{item.price}} $</p>
          </figure>
          <div class="info-wrapper">
            <h3>{{item.brand}}</h3>
            <div class="model-wrapper">
              <p>{{item.model}}</p>
            </div>

            <div class="sneakers-buttons-wrapper d-flex flex-column align-items-center">
              <button class="btn btn-dark basic-btn" @click="openModal(item)">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{layer:isSidebarOpen}"></div>
    <Sidebar :item="itemProp" @clearItem="clearingItem" v-if="isSidebarOpen" />
    <!-- <Loading :active.sync="isLoading"></Loading> -->
  </div>
</template>

<script>
import firebase from "../firebaseInit";
import { mapState } from "vuex";
//Loading component + stylesheet
import Loading from "vue-loading-overlay";
import Sidebar from "../components/Sidebar";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      testImg: "",
      sneakersCollection: [],
      isLoading: true,
      itemProp: ""
    };
  },
  computed: {
    ...mapState(["isSidebarOpen"])
  },
  components: {
    Loading,
    Sidebar
  },
  methods: {
    openModal(item) {
      this.$store.state.isSidebarOpen = true;
      this.itemProp = item;
    },
    async callImg() {
      let Men = await firebase.firestore.collection("Men").get();
      return Men.docs.forEach(doc => {
        this.isLoading = false;
        this.sneakersCollection.push(doc.data());
        // console.log(this.menCategory);
      });
    },
    clearingItem() {
      this.itemProp = null;
      console.log("Check", this.itemProp);
    }
  },
  mounted() {
    this.callImg();
  }
};
</script>

<style lang="scss" scoped>
</style>