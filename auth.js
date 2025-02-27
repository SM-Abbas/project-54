import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI4a2N54sk8KezV6Pd1ekFvBjFbJOSQFA",
    authDomain: "legalmind-57478.firebaseapp.com",
    projectId: "legalmind-57478",
    storageBucket: "legalmind-57478.firebasestorage.app",
    messagingSenderId: "16031728897",
    appId: "1:16031728897:web:148ed8cc946ce56f47c700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

// Google Sign-In
document.getElementById("google-login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL
            });
            console.log("User signed in:", user);
            window.location.href = "temp2.html";
        })
        .catch((error) => {
            console.error(error);
        });
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User signed out.");
    }).catch((error) => {
        console.error(error);
    });
});

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("open-loginpopup").style.display = "none";
        document.getElementById("logout").style.display = "block";
    } else {
        document.getElementById("open-loginpopup").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
});