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
    // COLLECT_DATA_REG: (state, data) => {
    //   let payloadObjet = {
    //     email: data.email,
    //     user: data.displayName,
    //     uid: data.uid,
    //   };

    //   state.collectData = Object.assign({}, state.collectData, payloadObjet);
    //   console.log(state.collectData);
    // },
    // COLLECT_DATA_LOG: (state, data) => {
    //   let payloadObject = {
    //     email: data.email,
    //     name: data.name,
    //     phone: data.phone,
    //     address: data.address,
    //   };
    //   state.collectDataLogged = Object.assign(
    //     {},
    //     state.collectDataLogged,
    //     payloadObject
    //   );
    //   console.log(state.collectDataLogged, "collected when logged!");
    // },
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
        }, 3000);
      } else {
      }
    },

    checkingState({ commit }, user) {
      commit("CHECKINT_STATE", user !== null);
    },
  },
});
