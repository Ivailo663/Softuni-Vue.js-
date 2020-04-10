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
              <input type="text" id="firstNameOrder" v-model="$v.form.firstName.$model" />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.firstName.firstName">Name not correct</p>
              </div>

              <label for="lastNameOrder">Last Name</label>
              <input type="text" id="lastNameOrder" v-model="$v.form.lastName.$model" />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.lastName.lastName">Name not correct</p>
              </div>

              <label for="phoneOrder">Phone number</label>
              <input type="text" id="phoneOrder" v-model="$v.form.phone.$model" />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.phone.phone">Name not correct</p>
              </div>

              <label for="e-mail">E-mail</label>
              <input type="text" id="e-mail" v-model="$v.form.email.$model" />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.email.email">E-male not correct</p>
                <p class="err" v-if="!$v.form.email.required">E-male not correct</p>
              </div>

              <label for="addresOrder">Addres</label>
              <input type="text" id="addresOrder" v-model="form.address" />

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
                <span class=", price">{{totalPrice}} $</span>
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
import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { mapState } from "vuex";
import Success from "../components/Success";
import firebase from "../firebaseInit";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
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
  validations: {
    form: {
      firstName: {
        firstName(value) {
          const valueArray = value.trim().split("");
          if (!value) {
            return false;
          }
          if (valueArray[0].toUpperCase() == valueArray[0]) {
            return true;
          } else {
            return false;
          }
        }
      },
      lastName: {
        lastName(value) {
          const valArr = value.trim().split("");
          if (!value) {
            return false;
          }
          if (valArr[0].toUpperCase() == valArr[0]) {
            return true;
          } else {
            return false;
          }
        },
        required
      },
      email: {
        email,
        required
      },
      phone: {
        phone(value) {
          return /0[0-9]{9}/.test(value);
        }
      }
    }
  },
  computed: {
    ...mapState(["basket", "collectDataLogged", "uid"]),
    totalPrice() {
      let arr = [];
      let sum;
      this.basket.forEach(element => {
        arr.push(parseInt(element.price, 10));
      });
      return (sum = arr.reduce((total, amount) => total + amount));
    }
  },
  methods: {
    userInfoCall() {
      firebase.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .then(doc => {
          this.form = doc.data();
        });
    },

    submitOrder() {
      this.$v.$touch();
      if (!this.$v.form.$error) {
        if (!this.$v.form.$error) {
          console.log("ERROR");
          return;
        } else {
          setTimeout(() => {
            this.orderSubmitted = true;
            this.$store.state.basket = [];
          }, 2000);
        }
      } else {
        console.log("ERROR");
      }
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