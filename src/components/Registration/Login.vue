<template>
  <div>
    <div class="input-fields-wrapper">
      <form class="d-flex flex-column" @submit.prevent="submit">
        <h3 @click="check">Sign in</h3>
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="form.email" />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" />

        <button type="submit" class="btn btn-dark">Log in</button>
        <div class="switch-form" @click="toRegister">
          <a type="button">I don't have an account</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import firebase from "../../firebaseInit";
export default {
  // mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      reg: "Registration",
      user: {
        email: "",
        ID: ""
      }
    };
  },
  computed: {
    ...mapState(["userLogged"])
  },
  methods: {
    ...mapActions(["asdf"]),
    ...mapMutations(["CHECKING_STATE"]),
    submit() {
      firebase.authtentication
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          // this.COLLECT_USER(data);
          console.log(data.user.uid);
          this.$store.state.isBlurSet = false;
        })
        .catch(function(error) {});
    },
    toRegister() {
      this.$emit("toRegister", this.reg);
    },
    check() {
      console.log(this.userLogged);
    }
  }
};
</script>