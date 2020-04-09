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
              <label for="firstNameOrder">First Name</label>
              <input type="text" id="firstNameOrder" v-model="info.firstName" />

              <label for="lastNameOrder">Last Name</label>
              <input type="text" id="lastNameOrder" v-model="info.lastName" />

              <label for="phoneOrder">Phone number</label>
              <input type="text" id="phoneOrder" v-model="info.phone" />

              <label for="e-mail">E-mail</label>
              <input type="text" id="e-mail" v-model="info.email" />

              <label for="addresOrder">Addres</label>
              <input type="text" id="addresOrder" v-model="info.address" />

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
              <button class="btn btn-dark button-basic" type="submit">
                Submit
                <!-- <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>-->
              </button>
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
      info: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: ""
      },
      orderSubmitted: false
    };
  },
  components: {
    Success
  },
  computed: {
    ...mapState(["basket", "collectDataLogged", "uid"])
  },
  methods: {
    userInfoCall() {
      firebase.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .then(doc => {
          this.info = doc.data();
        });
    },
    async submitOrder() {
      await setTimeout(() => {
        this.orderSubmitted = true;
        this.$store.state.basket = [];
      }, 2000);
    },
    discardItem(index) {
      this.basket.splice(index, 1);
    }
  },

  mounted() {
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