<template>
  <div class="dashboard d-flex justify-content-center align-items-center">
    <div class="inner">
      <div class="go-back d-flex">
        <router-link tag="p" to="/home/menSection">
          <i class="fas fa-chevron-left"></i>
          Back to store
        </router-link>
      </div>
      <form class="d-flex flex-column align-items-center" @submit="submitChanges">
        <h3>Info:</h3>

        <div class="d-flex flex-column user-info">
          <div class="d-flex justify-content-between">
            <div class="input-holder">
              <label for="firstNameEdit">First name</label>
              <input
                type="text"
                id="firstNameEdit"
                v-model.lazy="$v.form.firstName.$model"
                @blur="$v.form.lastName.$touch"
              />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.firstName.firstName">Name not correct</p>
              </div>
              <span>
                <label for="firstNameEdit">
                  <i class="far fa-edit"></i>
                </label>
              </span>
            </div>
            <div class="input-holder">
              <label for="lastNameEdit">Last name</label>
              <input type="text" id="lastNameEdit" v-model.lazy="$v.form.lastName.$model" />
              <div v-if="$v.form.$error">
                <p class="err" v-if="!$v.form.lastName.lastName">Name not correct</p>
              </div>
              <span>
                <label for="lastNameEdit">
                  <i class="far fa-edit"></i>
                </label>
              </span>
            </div>
          </div>
          <div class="input-holder">
            <label for="phoneEdit">Phone</label>
            <input type="text" id="phoneEdit" v-model.lazy="$v.form.phone.$model" />
            <div v-if="$v.form.$error">
              <p class="err" v-if="!$v.form.phone.phone">Name not correct</p>
            </div>
            <span>
              <label for="phoneEdit">
                <i class="far fa-edit"></i>
              </label>
            </span>
          </div>

          <div class="input-holder">
            <label for="emailEdit">Email</label>
            <input type="text" id="emailEdit" v-model.lazy="$v.form.email.$model" />
            <div v-if="$v.form.$error">
              <p class="err" v-if="!$v.form.email.email">E-male not correct</p>
            </div>
            <span>
              <label for="emailEdit">
                <i class="far fa-edit"></i>
              </label>
            </span>
          </div>

          <div class="input-holder">
            <label for="addressEdit">Address</label>
            <input type="text" id="addressEdit" v-model="form.address" />
            <span>
              <label for="addressEdit">
                <i class="far fa-edit"></i>
              </label>
            </span>
          </div>
        </div>
        <hr />
        <h3>Card details:</h3>
        <div class="d-flex flex-column card-details">
          <div class="input-holder">
            <label for="cardNumber">Card number</label>
            <input type="text" id="cardNumber" disabled />
            <span>
              <label for="cardNumber">
                <i class="far fa-edit"></i>
              </label>
            </span>
          </div>

          <div class="d-flex">
            <div class="input-holder">
              <label for="expireDate">Expire Date</label>
              <input type="text" id="expireDate" disabled />
              <span>
                <label for="expireDate">
                  <i class="far fa-edit"></i>
                </label>
              </span>
            </div>

            <div class="input-holder">
              <label for="cvv">CVV</label>
              <input type="text" id="cvv" disabled />
              <span>
                <label for="cvv">
                  <i class="far fa-edit"></i>
                </label>
              </span>
            </div>
          </div>
        </div>
        <div class="submit-holder d-flex justify-content-center">
          <button class="btn btn-dark basic-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import firebase from "../firebaseInit";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
      }
    };
  },
  computed: {
    ...mapState(["collectData", "uid"])
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
        email
      },
      phone: {
        phone(value) {
          return /0[0-9]{9}/.test(value);
        }
      }
    }
  },
  methods: {
    userInfoCall() {
      firebase.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .then(doc => {
          this.form = Object.assign({}, this.form, doc.data());
        });
    },
    submitChanges() {
      firebase.firestore
        .collection("users")
        .doc(this.uid)
        .update(this.form)
        .then(() => {});
    }
  },
  mounted() {
    this.userInfoCall();
  }
};
</script>

<style scoped>
.btn {
  margin-top: 3rem;
}
</style>