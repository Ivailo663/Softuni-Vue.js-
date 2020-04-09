import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "../public/styles/style.less";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import VuePageTransition from "vue-page-transition";

Vue.use(VuePageTransition);

Vue.use(PerfectScrollbar);

Vue.use(Vuetify);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  VuePageTransition,
  render: (h) => h(App),
}).$mount("#app");
