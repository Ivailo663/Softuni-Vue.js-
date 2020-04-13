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
    date: new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/"),
  },

  mutations: {
    CHECKINT_STATE: (state, payload) => {
      state.userLogged = payload;
      localStorage.setItem("userLogged", payload);
    },
    SETTING_UID: (state, payload) => {
      state.isBlurSet = false;
      localStorage.setItem("uid", payload.user.uid);
      state.uid = localStorage.uid;
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
    signOut(state) {
      firebase.authtentication
        .signOut()
        .then(() => {
          state.userLogged = false;
          localStorage.removeItem("userLogged");
          localStorage.removeItem("uid");
        })
        .catch((error) => {});
    },
    submitOrder({ state }) {
      firebase.firestore
        .collection("Orders")
        .doc(state.uid)
        .set({ order: "submitted", date: state.date });
    },
  },
});
