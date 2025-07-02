import {
 signInWithEmailAndPassword, createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from './firebase-config.js';


// DOMContentLoaded ensures DOM elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Modal setup with AI assistance..
    // sign up code (works if above the login code?)
    // Get the modal
    const modal = document.getElementById("myModal"); 
    const btn = document.getElementById("signUp");  
    const regBtn = document.getElementById("register"); 

    // Debugging
    // console.log("modal:", modal);
    // console.log("signUp btn:", btn);
    // console.log("register btn:", regBtn);

    // The Register button works here, but isn't really necessary
    // because you can call the regBtn later in the code 
    // if (regBtn) {
    //    regBtn.addEventListener('click', () => {
    //     console.log("Register button clicked");
    //    })
    // } 

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // ***When the user clicks the button, open the modal***
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
    
    // ***Log in with user name and password logic*** 
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

    // *** Create users with email and password***
 
    // create variable for the registration form 
    const regForm = document.getElementById("sign-up-form");

    // add an event listener on click like i had for the login button
    regForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // define the variables for the modal fields.. 
        const newUser = document.getElementById("newUserEmail").value;
        const newPassword = document.getElementById("newPassword").value;
        // const newPasswordAgain = document.getElementById("verifyPassword").value; maybe I have to create a separate check for passwords?

    try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, newUser, newPassword);
        console.log("user successfully signed up", userCredential.user.email);
        const user = userCredential.user;
        console.log("User:" + userCredential.user.displayName);
    } catch (error) {
        console.error("sign up error:", error.code, error.message);
        alert("Login Failed 😟");
    }
        
    })



    // Register button works fine here without an if Statement
    // regBtn.addEventListener('click', ()=> {
    //     console.log("this button was clicked later in the code.")
    // })
});
