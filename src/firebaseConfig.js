import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUFsaMryOKWxTPTGbTpOqKYzG45iO5Qw0",
  authDomain: "travel-journal-5528e.firebaseapp.com",
  projectId: "travel-journal-5528e",
  storageBucket: "travel-journal-5528e.appspot.com",
  messagingSenderId: "982248856509",
  appId: "1:982248856509:web:49fb058f46225a663290d4",
  measurementId: "G-4QXT7CGZQL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const imgDB = getStorage(app)
export const auth = getAuth()