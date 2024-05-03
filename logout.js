import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyARPNEBqhRS1zTlM_mTEUT4e2ifqnPBAoo",
    authDomain: "watereng-login-page.firebaseapp.com",
    databaseURL: "https://watereng-login-page-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "watereng-login-page",
    storageBucket: "watereng-login-page.appspot.com",
    messagingSenderId: "172632501893",
    appId: "1:172632501893:web:adbfb8001c97ac616743ec",
    measurementId: "G-D5NFHRWBG8"
  };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is authenticated
auth.onAuthStateChanged(user => {
  if (!user) {
      // User is not authenticated, redirect to login page
      window.location.href = 'login.html';
  } else {
      // User is authenticated, hide or remove sensitive information
      document.getElementById('user-info').style.display = 'none';
  }
});

// Define the logout function
function logout() {
    signOut(auth).then(() => {
        console.log('User signed out');
        // Redirect to login page
        window.location.href = 'login.html';
        // Clear session history to prevent navigation back to dashboard
        window.history.replaceState(null, '', 'login.html');
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
}

// Add event listener to the logout button
document.getElementById('logout').addEventListener('click', logout);