<template>
  <div class="form">
    <h3>Sign up</h3>
    <div class="input-fields-wrapper">
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
        <input
          type="text"
          id="lastName"
          v-model.lazy="form.lastName"
          @blur="$v.form.lastName.$touch"
        />
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
        <button type="submit" class="btn btn-dark shadow-none">Submit</button>
      </form>
      <div class="switch-form">
        <router-link to="login" class="nav-link">I have account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, helpers } from "vuelidate/lib/validators";

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
      }
      // empty: true,
      // $v.form.$error: false,
      // submitted: ""
    };
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
    submit() {
      try {
        if (!this.$v.form.$error) {
          firebase.authtentication
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(() => {
              this.$v.$error.$touch;
              this.$router.replace({ name: "Main" });
              console.log("Just cheking!");
            })
            .catch(error => {
              this.asdf = error.message;
            });
        } else {
          console.log("ERROR");
        }
      } catch (err) {
        console.log("something whent wrong with login", err);
      }
    }
  }
};
</script>
<style scoped>
.err {
  color: #f66c6c;
  font-size: 0.6rem;
  margin: 0;
}
</style>