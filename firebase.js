import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDH7zDghvc_eXhOk7MAFE4FGoqxINIIeGs",
  authDomain: "mittiso.firebaseapp.com",
  projectId: "mittiso",
  storageBucket: "mittiso.firebasestorage.app",
  messagingSenderId: "718184341510",
  appId: "1:718184341510:web:89e7bf129e63eb9abe6387",
  measurementId: "G-1HDM5LM8LN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
