// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "testapp-f71be.firebaseapp.com",
  databaseURL: "https://testapp-f71be.firebaseio.com",
  projectId: "testapp-f71be",
  storageBucket: "testapp-f71be.appspot.com",
  messagingSenderId: "809356149959",
  appId: "1:809356149959:web:c76ac0c721af23efefeae2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);