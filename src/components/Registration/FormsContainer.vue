<template>
  <div class="form">
    <div class="form-inner">
      <span class="discard-item" @click="closeForm">
        <i class="fa fa-times-circle"></i>
      </span>
      <component
        :is="currentComponent"
        @toRegister="toRegister($event)"
        @toLogin="toLogin($event)"
      />
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

<style lang="scss" scoped>
</style>