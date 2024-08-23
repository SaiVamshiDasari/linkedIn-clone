// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApom84WPE7m4lN9pbQhxmA7WAwoIhssOc",
  authDomain: "linkden-clone-25e70.firebaseapp.com",
  projectId: "linkden-clone-25e70",
  storageBucket: "linkden-clone-25e70.appspot.com",
  messagingSenderId: "932139282985",
  appId: "1:932139282985:web:2ffbaa636c88ac6e86e238"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
