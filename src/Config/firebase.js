import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAR9cCMhaKXqhBpbCPFsZtGIWYpKPui2zs",
    authDomain: "bookshelftreasures-8dba6.firebaseapp.com",
    projectId: "bookshelftreasures-8dba6",
    storageBucket: "bookshelftreasures-8dba6.appspot.com",
    messagingSenderId: "584249859717",
    appId: "1:584249859717:web:79f4816b3fe248613d13ec",
    measurementId: "G-T0TZEKYXMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);