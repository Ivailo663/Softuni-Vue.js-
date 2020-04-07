import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

import config from "./firebaseConfig";
import store from "./store/index";

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("checkingState", user);
  //   console.log("changed");
});

const firestore = firebase.firestore();
const storage = firebase.storage();
const authtentication = firebase.auth();

export default { firestore, storage, authtentication };
