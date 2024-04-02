// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDPRtWc90PUd9K-mlk4yKkczsiTOJcKb4",
  authDomain: "job-portal-68322.firebaseapp.com",
  projectId: "job-portal-68322",
  storageBucket: "job-portal-68322.appspot.com",
  messagingSenderId: "989499585312",
  appId: "1:989499585312:web:0e9716adc293123b905d45"
  // databaseURL : ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;