import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADcTV7jsa0NaD9aZMUvKnAf6Vq5fCOwE8",
  authDomain: "cognify-4e5d0.firebaseapp.com",
  projectId: "cognify-4e5d0",
  storageBucket: "cognify-4e5d0.firebasestorage.app",
  messagingSenderId: "50555010299",
  appId: "1:50555010299:web:dafac1bbe1df11c215845e",
  measurementId: "G-8LN5HPG3W1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
export { auth};
