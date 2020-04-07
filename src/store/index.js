import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMediaShown: true,
    isSidebarOpen: false,
    isBasketEmpty: true,
    isBlurSet: false,
    userData: null,
    basket: [],
    userLogged: false,
    collectData: {
      user: null,
      email: null,
      uid: null,
    },
  },

  mutations: {
    CHECKINT_STATE: (state, payload) => {
      state.userLogged = payload;
      localStorage.setItem("userLogged", payload);
      console.log(state.userLogged, "USER");
      console.log(localStorage.getItem("userLogged"), "LOCAL");
    },
    COLLECT_DATA: (state, data) => {
      let payloadObjet = {
        email: data.email,
        user: data.displayName,
        uid: data.uid,
      };

      state.collectData = Object.assign({}, state.collectData, payloadObjet);
    },
  },
  actions: {
    closeBasket({ state }) {
      setTimeout(() => {
        state.isBasketEmpty = true;
      }, 4000);
    },
    setBlur({ state }) {
      if (localStorage.userLogged == "false") {
        setTimeout(() => {
          state.isBlurSet = true;
        }, 7000);
      } else {
        console.log(!localStorage.userLogged, "??");
        console.log(!state.userLogged, "");
        console.log("CHECKING IF MERGED");
      }
    },

    checkingState({ commit }, user) {
      commit("CHECKINT_STATE", user !== null);
    },
  },
});
