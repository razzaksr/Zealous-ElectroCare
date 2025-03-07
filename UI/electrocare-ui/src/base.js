// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSQlkiCgGqnddNmVpMa1UNs_XtgA1K4-Y",
  authDomain: "zealous-electrocare.firebaseapp.com",
  projectId: "zealous-electrocare",
  storageBucket: "zealous-electrocare.firebasestorage.app",
  messagingSenderId: "416745079247",
  appId: "1:416745079247:web:ec70075538bd1188e752ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };