import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfsuvqhadXbbbiO5kH9EhkCMJM48X9zc4",
  authDomain: "e-commerce-audio.firebaseapp.com",
  projectId: "e-commerce-audio",
  storageBucket: "e-commerce-audio.appspot.com",
  messagingSenderId: "822446339349",
  appId: "1:822446339349:web:7df4fb8e3e4479101aa51c",
  measurementId: "G-03FN569F9T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
