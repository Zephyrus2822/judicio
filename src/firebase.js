// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdfGTl2VgbQA0XjjgP1gqhKqZm7Gox5YM",
  authDomain: "judicio-messaging.firebaseapp.com",
  projectId: "judicio-messaging",
  storageBucket: "judicio-messaging.firebasestorage.app",
  messagingSenderId: "375197565213",
  appId: "1:375197565213:web:cd58b95e00fc6015c2e1f4",
  measurementId: "G-FNHQR2Z8Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const auth=getAuth()

export const generateToken=async()=>{
    const requestPermission=await Notification.requestPermission()
    console.log(requestPermission)
}
