<template>
  <div class="checkout">
    <div class="container">
      <div class="go-back d-flex">
        <router-link tag="p" to="/home/menSection">
          <i class="fas fa-chevron-left"></i>
          Back to store
        </router-link>
      </div>
      <div class="row" v-if="!orderSubmitted">
        <div class="col-lg-6">
          <div class="order-info">
            <form class="d-flex flex-column" @submit.prevent="submitOrder">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="info.firstName" />

              <label for="phone">Phone number</label>
              <input type="text" id="phone" v-model="info.phone" />

              <label for="e-mail">E-mail</label>
              <input type="text" id="e-mail" v-model="info.email" />

              <label for="addres">Addres</label>
              <input type="text" id="addres" v-model="info.address" />

              <div class="payment-method d-flex">
                <div>
                  <label for="cash">
                    Cash
                    <img src="../assets/icons/cash.png" alt="cash" />
                  </label>
                  <input type="radio" name="pay" />
                </div>
                <div>
                  <label for="card">
                    Visa/MasterCard
                    <img src="../assets/icons/mastercard.png" alt="cash" />
                    <input type="radio" name="pay" />
                  </label>
                </div>
              </div>
              <button class="btn btn-dark button-basic" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div class="col-lg-6 d-flex align-items-center">
          <div class="order-list d-flex flex-column">
            <perfect-scrollbar>
              <h4>Your items:</h4>
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
              </div>
            </perfect-scrollbar>

            <div class="number-total-container d-flex justify-content-center">
              <p class="number">number of items: {{basket.length}}</p>
              <div class="devider"></div>
              <p class="total">
                Total:
                <span class=", price">123$</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Success v-else />
    </div>
  </div>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { mapState } from "vuex";
import Success from "../components/Success";
import firebase from "../firebaseInit";

export default {
  data() {
    return {
      info: {},
      orderSubmitted: false
    };
  },
  components: {
    Success
  },
  computed: {
    ...mapState(["basket", "collectDataLogged", "uid"])
    // info() {
    //   return this.collectDataLogged;
    // },
  },
  methods: {
    userInfoCall() {
      firebase.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .then(doc => {
          // this.COLLECT_DATA_LOG(doc.data());
          this.info = doc.data();
          console.log(this.info, "and here?");
        });
    },
    async submitOrder() {
      await setTimeout(() => {
        this.orderSubmitted = true;
      }, 2000);
    }
  },
  mounted() {
    // console.log(this.collectDataLogged, "is that true?");
    this.userInfoCall();
  }
};
</script>

<style scoped>
#break-point {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.number-total-container p {
  font-size: 1.2rem;
  color: #151313;
}
.number-total-container {
  margin-top: 1rem;
}
.devider {
  height: 35px;
  width: 1px;
  background-color: #898989;
  margin: 0 1rem;
}
</style>