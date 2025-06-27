import {
 signInWithEmailAndPassword, createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from './firebase-config.js';


// DOMContentLoaded ensures DOM elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    //const loginForm = document.getElementById('loginForm');

    // Modal setup with AI assistance..
    // sign up code (works if above the login code?)
    // Get the modal
    const modal = document.getElementById("myModal"); 
    const btn = document.getElementById("signUp");  
    const regBtn = document.getElementById("register"); 
    
    console.log("modal:", modal);
    console.log("signUp btn:", btn);
    console.log("register btn:", regBtn);

    if (regBtn) {
        console.log("Register button found!");
        regBtn.onclick = () => {
            console.log("Register button clicked!");
        }
    } else {
        console.log("Register button Not Found!"); //  register btn not found - hidden in modal
    }


    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = () => {
        modal.style.display = "block";
    }
    
    //When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
    // Log in form logic 
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById("userEmail").value;
        const password = document.getElementById("password").value;
    try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
            console.log("login successful!", userCredential.user.email);
            
    
            alert("Login Successful!");

            // redirects user to index.html after sucessful login
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error("login error:", error.code, error.message);
            alert('Login Failed');
        }    
    });    

});
