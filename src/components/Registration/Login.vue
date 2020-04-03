<template>
  <div>
    <div class="form">
      <h3>Sign in</h3>
      <div class="input-fields-wrapper">
        <form class="d-flex flex-column" @submit.prevent="submit">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="form.email" />

          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" />

          <button type="submit" class="btn btn-dark">Log in</button>
        </form>
        <div class="switch-form">
          <router-link to="register" class="nav-link">Create an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../../firebaseInit";
export default {
  // mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      firebase.authtentication
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Main" });
          console.log("Successful login!");
        })
        .catch(function(error) {
          // Handle Errors here.
          // this.fberror = error.message;
          // console.log(error.message);
          // ...
        });
    }
  }
};
</script>