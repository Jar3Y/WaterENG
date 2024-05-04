import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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


const signup = document.getElementById('signup');
signup.addEventListener("click",function(event){
event.preventDefault()
//inputs
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

createUserWithEmailAndPassword(auth, email, password)
  .then(async(credentials) => {
    // Signed up 

    var ref = doc(db, "UserAuthList", credentials.user.uid);
    await setDoc(ref, {
        Name: name ,
        Email: email ,
        Password: password
    })
    alert("Created Account!")
    window.location.href ="login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})
