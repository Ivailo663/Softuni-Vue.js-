import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

import config from "./firebaseConfig";

firebase.initializeApp(config);

const firestore = firebase.firestore();
const storage = firebase.storage();
const authtentication = firebase.auth();

export default { firestore, storage, authtentication };
