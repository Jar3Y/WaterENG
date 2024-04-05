import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyARPNEBqhRS1zTlM_mTEUT4e2ifqnPBAoo",
  authDomain: "watereng-login-page.firebaseapp.com",
  projectId: "watereng-login-page",
  storageBucket: "watereng-login-page.appspot.com",
  messagingSenderId: "172632501893",
  appId: "1:172632501893:web:adbfb8001c97ac616743ec",
  measurementId: "G-D5NFHRWBG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Sign Up and Sign In Switching
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const signin = document.getElementById('signin');
signin.addEventListener("click",function(event){
event.preventDefault()
//inputs
const email = document.getElementById('email2').value;
const password = document.getElementById('password2').value;
signInWithEmailAndPassword(auth, email, password)
  .then(async(credentials) => {
    // Signed up 
    var ref = doc(db, "UserAuthList", credentials.user.uid);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
        sessionStorage.setItem("user-info", JSON.stringify({
            Name: docSnap.data().Name
        }))
        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user))
        alert("Login Successful!")
        window.location.href = "home.html";
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})
