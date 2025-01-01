// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Nb798y7WI1HojSMIINr8qJiOVOBJYmA",
  authDomain: "imblog-bfb6d.firebaseapp.com",
  projectId: "imblog-bfb6d",
  storageBucket: "imblog-bfb6d.firebasestorage.app",
  messagingSenderId: "871108677931",
  appId: "1:871108677931:web:e721865c92079d301eb56e",
  measurementId: "G-48RKH6HCMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };