import {
 signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';
import { auth } from './firebase-config.js';

// DOMContentLoaded ensures DOM elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();


        const loginEmail = document.getElementById("userEmail").value;
        const password = document.getElementById("password").value;
    try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
            console.log("login successful!", userCredential.loginEmail);
    
            alert("Login Successful!");

            // redirects user to index.html after sucessful login
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error("login error:", error.code, error.message);
            alert('Login Failed');
        }    s
    });    

});
