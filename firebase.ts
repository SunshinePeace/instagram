// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRAyE9KJ4Lzt9v7D6DibUlFhfhAztQvtA",
  authDomain: "instagram-database-7c03d.firebaseapp.com",
  projectId: "instagram-database-7c03d",
  storageBucket: "instagram-database-7c03d.appspot.com",
  messagingSenderId: "1048983383570",
  appId: "1:1048983383570:web:15a1f574d18c330dc5f2cb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore();
const storage = getStorage();

export { app, database , storage };