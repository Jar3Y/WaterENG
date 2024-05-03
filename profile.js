import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
  
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const changePasswordForm = document.getElementById('changePasswordForm');
const messageDiv = document.getElementById('message');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

// Function to toggle password visibility
function togglePasswordVisibility(inputElement) {
    const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
    inputElement.setAttribute('type', type);
}

// Event listener to toggle password visibility
showPasswordCheckbox.addEventListener('change', function() {
    togglePasswordVisibility(currentPasswordInput);
    togglePasswordVisibility(newPasswordInput);
});

changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;

    if(currentPassword == newPassword){
        messageDiv.textContent = "Password is same!";
        messageDiv.style.color = "red";
    }
    else{
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            messageDiv.textContent = "Password updated successfully!";
            messageDiv.style.color = "green";
            // Clear form fields
            changePasswordForm.reset();
        } catch (error) {
            console.error(error);
            messageDiv.textContent = error.message;
            messageDiv.style.color = "red";
        } 
    }


});