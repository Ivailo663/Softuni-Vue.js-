<template>
  <div class="input-fields-wrapper">
    <h3>Sign up</h3>
    <form class="d-flex flex-column" @submit.prevent="submit">
      <label for="email">E-mail</label>
      <input :class="{}" type="text" id="email" v-model="$v.form.email.$model" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.email.email">E-male not correct</p>
        <p class="err" v-if="!$v.form.email.required">E-male not correct</p>
      </div>
      <label for="firstName">First Name</label>
      <input type="text" id="fistName" v-model="$v.form.firstName.$model" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.firstName.firstName">Name should start with a cappital letter</p>
      </div>

      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="$v.form.lastName.$model" />
      <div v-if="$v.form.$error">
        <p class="err" v-if="!$v.form.lastName.lastName">Name should start with a cappital letter</p>
      </div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model.lazy="$v.form.password.$model" />
      <div v-if="$v.form.$error">
        <p
          class="err"
          v-if="!$v.form.password.password"
        >Should contain uppercase,lowercase, number and min 8 digits</p>
      </div>
      <button type="submit" class="btn btn-dark" v-if="!loader">Submit</button>
      <div class="submit-holder d-flex justify-content-center" v-else>
        <div class="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="switch-form" @click="toLogin">
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
      log: "Login",
      loader: false
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
          return /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}/.test(value);
        }
      }
    }
  },
  methods: {
    ...mapMutations(["COLLECT_DATA_REG", "SETTING_UID"]),
    setWelcomeMsg() {
      localStorage.setItem("welcomeUser", this.form.firstName);
      this.$store.state.welcomeUser = localStorage.welcomeUser;
    },
    submit() {
      this.$v.$touch();
      this.loader = true;
      if (!this.$v.form.$error) {
        firebase.authtentication
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.loader = false;
            this.SETTING_UID(user);
            firebase.firestore
              .collection("users")
              .doc(user.user.uid)
              .set({
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                email: this.form.email,
                address: "",
                phone: ""
              });
            this.setWelcomeMsg();
          })
          .catch(error => {
            this.asdf = error.message;
          });
      } else {
        this.loader = false;
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