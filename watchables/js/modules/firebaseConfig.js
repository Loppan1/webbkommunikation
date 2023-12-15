// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAihImBI0P9_vcY37xFjahY3MCYpiIhwL8",
    authDomain: "watchables-ad6ee.firebaseapp.com",
    projectId: "watchables-ad6ee",
    storageBucket: "watchables-ad6ee.appspot.com",
    messagingSenderId: "582605627886",
    appId: "1:582605627886:web:c2c3f00c717f638e17eeff"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }