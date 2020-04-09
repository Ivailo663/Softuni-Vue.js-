<template>
  <div class="input-fields-wrapper">
    <h3>Sign up</h3>
    <form class="d-flex flex-column" @submit.prevent="submit">
      <label for="email">E-mail</label>
      <input :class="{}" type="text" id="email" v-model.lazy="$v.form.email.$model" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.email.email">E-male not correct</p>
      </div>
      <label for="firstName">First Name</label>
      <input type="text" id="fistName" v-model.lazy="$v.form.firstName.$model" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.firstName.firstName">Name not correct</p>
      </div>

      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model.lazy="form.lastName" @blur="$v.form.lastName.$touch" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.lastName.lastName">Name not correct</p>
      </div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model.lazy="$v.form.password.$model" />
      <div v-if="$v.form.$error">
        <p
          class="err"
          v-if="!$v.form.password.password"
        >Should contain uppercase,lowercase and min 8 digits</p>
      </div>
      <button type="submit" class="btn btn-dark">Submit</button>
      <div class="switch-form" @click="toLogin()">
        <a type="button">I have an account</a>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import firebase from "../../firebaseInit";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        password: "",
        email: ""
      },
      log: "Login"
    };
  },
  computed: {
    ...mapState(["collectData"])
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
        },
        required
        // maxLength: maxLength(8)
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
      password: {
        required,
        password(value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value);
        }
      }
    }
  },
  methods: {
    ...mapMutations(["COLLECT_DATA_REG"]),
    submit() {
      if (!this.$v.form.$error) {
        firebase.authtentication
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.$store.state.isBlurSet = false;

            localStorage.setItem("uid", user.user.uid);
            this.$store.state.uid = localStorage.uid;
            firebase.firestore
              .collection("users")
              .doc(this.$store.state.uid)
              .set({
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                email: this.form.email
              });
          })
          .catch(error => {
            this.asdf = error.message;
          });
      } else {
        console.log("ERROR");
      }
    },
    toLogin() {
      this.$emit("toLogin", this.log);
    }
  }
};
</script>
<style scoped>
</style>