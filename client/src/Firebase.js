// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real--estate-f489f.firebaseapp.com",
  projectId: "real--estate-f489f",
  storageBucket: "real--estate-f489f.appspot.com",
  messagingSenderId: "742468358100",
  appId: "1:742468358100:web:b1447605828a3c9cd85041"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);