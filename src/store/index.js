import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMediaShown: true,
    isSidebarOpen: false,
    isBasketEmpty: true,
    isBlurSet: false,
    userData: null,
    welcomeUser: localStorage.getItem("welcomeUser") || "",
    basket: [],
    userLogged: false || localStorage.getItem("userLogged"),
    uid: localStorage.getItem("uid") || "",
  },

  mutations: {
    CHECKINT_STATE: (state, payload) => {
      state.userLogged = payload;
      localStorage.setItem("userLogged", payload);
    },
  },
  actions: {
    setBlur({ state }) {
      if (localStorage.userLogged == "false") {
        setTimeout(() => {
          state.isBlurSet = true;
        }, 3000);
      } else {
      }
    },

    checkingState({ commit }, user) {
      commit("CHECKINT_STATE", user !== null);
    },
  },
});
