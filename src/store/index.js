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
      if (!state.userLogged) {
        setTimeout(() => {
          state.isBlurSet = true;
        }, 7000);
      }
    },

    checkingState({ commit }, user) {
      commit("CHECKINT_STATE", user !== null);
      // if (user) {
      //   commit("SET_USER", user);
      // }
    },
  },
});
