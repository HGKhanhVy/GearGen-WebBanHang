// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbN5xPjSPrVPcjsaexXhkhCwx6xjOYpdg",
    authDomain: "goods-1fb52.firebaseapp.com",
    projectId: "goods-1fb52",
    storageBucket: "goods-1fb52.firebasestorage.app",
    messagingSenderId: "114724287899",
    appId: "1:114724287899:web:b1c0b7b09bfb1667859d3e"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };


