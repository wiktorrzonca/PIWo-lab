// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8jX6FWhMaa3b3nxSCRVpLGxpKlkQgF8Y",
    authDomain: "property-site-7ec53.firebaseapp.com",
    projectId: "property-site-7ec53",
    storageBucket: "property-site-7ec53.appspot.com",
    messagingSenderId: "434204656754",
    appId: "1:434204656754:web:fd6b0676162eaede57eeeb",
    measurementId: "G-F60ZMBM88Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);