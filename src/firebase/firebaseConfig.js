import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCRaBAKhTuyKr2KWXLdY42fjMgo9zeDM0",
  authDomain: "fir-app-364d9.firebaseapp.com",
  projectId: "fir-app-364d9",
  storageBucket: "fir-app-364d9.appspot.com",
  messagingSenderId: "560291731846",
  appId: "1:560291731846:web:95105086df1478eb6a3407",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
