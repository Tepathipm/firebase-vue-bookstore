
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOGMXD8ztvPfLwvTN2I8-17dZiaGwb_nQ",
  authDomain: "asm-19d17.firebaseapp.com",
  projectId: "asm-19d17",
  storageBucket: "asm-19d17.appspot.com",
  messagingSenderId: "6520869934",
  appId: "1:6520869934:web:61cc5c0009443b9f88fbbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()

export default db 

