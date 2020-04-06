import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMediaShown: true,
    isSidebarOpen: false,
    isBasketEmpty: true,
    basket: [],
  },
  getters: {},
  mutations: {},
  actions: {
    closeBasket({ commit, state }) {
      setTimeout(() => {
        state.isBasketEmpty = true;
      }, 4000);
    },
  },
});
