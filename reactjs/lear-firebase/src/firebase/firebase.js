// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDudbbE7LaIHQhZbYqLyci1tK5SWRImjNY",
    authDomain: "share-image-app.firebaseapp.com",
    projectId: "share-image-app",
    storageBucket: "share-image-app.appspot.com",
    messagingSenderId: "1041937020623",
    appId: "1:1041937020623:web:0113aad943e4978e8129ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
