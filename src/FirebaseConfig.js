import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";
/*import { getAnalytics } from "firebase/analytics";*/
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import {USERS_COLLECTION} from "./consts.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQTb18iX4ig1avpJsJpZhQVU4R2MCdGNU",
    authDomain: "aigenerator-36956.firebaseapp.com",
    projectId: "aigenerator-36956",
    storageBucket: "aigenerator-36956.appspot.com",
    messagingSenderId: "314027462804",
    appId: "1:314027462804:web:f453a089ae01d3d143e481"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const usersCollection = collection(db, USERS_COLLECTION);

export { auth, db, usersCollection };