// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV7YGp2UXibgX-b8qF19jeZzBHEa9ES_w",
  authDomain: "challenge-2a102.firebaseapp.com",
  databaseURL: "https://challenge-2a102-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "challenge-2a102",
  storageBucket: "challenge-2a102.firebasestorage.app",
  messagingSenderId: "476537069781",
  appId: "1:476537069781:web:05f9677527245bc1d1425c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseStorage = getStorage(app);
const db = getFirestore();

export { app, auth, firebaseStorage, db };