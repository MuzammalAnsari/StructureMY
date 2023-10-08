
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcgdTrKCuQHIaha54xBb2fPc-ePtB_9QM",
    authDomain: "hackathon-wmad6-103520.firebaseapp.com",
    projectId: "hackathon-wmad6-103520",
    storageBucket: "hackathon-wmad6-103520.appspot.com",
    messagingSenderId: "142906410135",
    appId: "1:142906410135:web:79a6cc7ce15349009095d2",
    measurementId: "G-PQB91TH845"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore }
