<template>
  <div>
    <div class="input-fields-wrapper">
      <form class="d-flex flex-column" @submit.prevent="submit">
        <h3>Sign in</h3>
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="$v.form.email.$model" />
        <div v-if="$v.form.$error">
          <p class="err" v-if="!$v.form.email.required">E-male not correct</p>
        </div>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="$v.form.password.$model" />
        <div v-if="$v.form.$error">
          <p class="err" v-if="!$v.form.password.required">E-male not correct</p>
        </div>

        <div class="submit-holder d-flex justify-content-center" v-if="loader">
          <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <button type="submit" class="btn btn-dark" v-if="!loader">Log in</button>
        <div class="switch-form" @click="toRegister">
          <a type="button">I don't have an account</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations, mapActions, mapState } from "vuex";
import firebase from "../../firebaseInit";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      reg: "Registration",
      loader: false
    };
  },
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapState(["userLogged", "collectData", "uid"])
  },
  methods: {
    ...mapActions(["asdf"]),
    ...mapMutations(["COLLECT_DATA_LOG", "SETTING_UID"]),

    submit() {
      this.loader = true;
      this.$v.$touch();

      if (!this.$v.form.$error) {
        firebase.authtentication
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(user => {
            this.SETTING_UID(user);
            firebase.firestore
              .collection("users")
              .doc(user.user.uid)
              .get()
              .then(doc => {
                this.setWelcomeMsg(doc.data());
              });
          })
          .catch(function(error) {});
      } else {
        this.loader = false;
        console.log(this.loader, "error");
      }
    },
    toRegister() {
      this.$emit("toRegister", this.reg);
    },
    setWelcomeMsg(name) {
      localStorage.setItem("welcomeUser", name.firstName);
      this.$store.state.welcomeUser = name.firstName;
    }
  }
};
</script>