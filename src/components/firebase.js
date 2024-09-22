// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU0Hh4qr2puPa3nYT3bYnvpA9EAzSAeTI",
  authDomain: "judicionew.firebaseapp.com",
  projectId: "judicionew",
  storageBucket: "judicionew.appspot.com",
  messagingSenderId: "468608297576",
  appId: "1:468608297576:web:173b4752010b8aa0eaa9dd",
  measurementId: "G-BRYKE02SKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
const analytics = getAnalytics(app);