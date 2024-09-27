// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM2rehh4sZqlViNdPCMlIp5PO81WtwNcQ",
  authDomain: "vacci-time-4de62.firebaseapp.com",
  projectId: "vacci-time-4de62",
  storageBucket: "vacci-time-4de62.appspot.com",
  messagingSenderId: "835645239449",
  appId: "1:835645239449:web:8eb9fc697db5caea310808",
  measurementId: "G-P2C5JC4FQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, googleProvider };