
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFPmNMPGhHnkeivSQ99Uz5g6wWJMKZGro",
  authDomain: "wonders-1eb9e.firebaseapp.com",
  projectId: "wonders-1eb9e",
  storageBucket: "wonders-1eb9e.firebasestorage.app",
  messagingSenderId: "729121972164",
  appId: "1:729121972164:web:8c5e4836f1b6b5dc104e91",
  measurementId: "G-1KZM5YWGZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);