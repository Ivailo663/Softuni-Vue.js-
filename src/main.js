import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "../public/styles/style.less";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
