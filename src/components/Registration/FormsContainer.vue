<template>
  <div class="form">
    <div class="form-inner">
      <span class="discard-item" @click="closeForm">
        <i class="fa fa-times-circle"></i>
      </span>
      <transition name="fade" mode="out-in">
        <component
          :is="currentComponent"
          @toRegister="toRegister($event)"
          @toLogin="toLogin($event)"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Registration from "./Registration";
export default {
  name: "FormsContainer",
  data() {
    return {
      currentComponent: "Login"
    };
  },
  components: {
    Login,
    Registration
  },
  methods: {
    toRegister(payload) {
      this.currentComponent = payload;
    },
    toLogin(payload) {
      this.currentComponent = payload;
    },
    closeForm() {
      this.$store.state.isBlurSet = false;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>