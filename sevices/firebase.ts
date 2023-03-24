import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNLHGs-S5YijAlMlJwDZrMP9-UFqwtKzo",
  authDomain: "chatgpt-messenger-bb3d0.firebaseapp.com",
  projectId: "chatgpt-messenger-bb3d0",
  storageBucket: "chatgpt-messenger-bb3d0.appspot.com",
  messagingSenderId: "103106483682",
  appId: "1:103106483682:web:0978d260d878d5858415bb",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
