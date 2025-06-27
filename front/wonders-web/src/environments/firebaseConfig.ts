
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFPmNMPGhHnkeig6wWJMKZGro",
  authDomain: "wonders-1eb9e.firebaseapp.com",
  projectId: "wonders-1eb9e",
  storageBucket: "wonders-1eb9e.firebasestorage.app",
  messagingSenderId: "729121972164",
  appId: "1:729972164:web:8c504e91",
  measurementId: "G-1YWGZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);