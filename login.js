import {
 signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, signInWithPopup,GoogleAuthProvider
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase-config.js';



// DOMContentLoaded ensures DOM elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');


    // Modal setup with AI assistance..
    // sign up code (works if above the login code?)
    // Get the modal
    const modal = document.getElementById("myModal"); 
    const btn = document.getElementById("signUp");  
    const gBtn = document.getElementById("gmail"); 
    

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

    // [Log in with Gmail]
    // add an event lisener for the button id = gmail
    gBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        // console.log("button clicked!"); // btn works

        // create a new Google provider
        const provider = new GoogleAuthProvider();
        
        try {
            
            const result = await signInWithPopup(auth, provider);

            // Get the signed-in user
            const user = result.user;
            console.log("Signed in with Google:", user.email);

            // Check if the user exists in your database
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (!userDoc.exists()) {
                // user has never signed in before, so create their profile

                // get their full name from Google
                let fullName = user.displayName;
                let firstName = "Google"; // default value
                let lastName = "User";

                // Check if Google gave us a name
                if (fullName) {
                    // Split the name into two parts
                    let nameParts = fullName.split(' '); // ["Ryan", "Green"]

                    // Get first name (first part)
                    if (nameParts[0]) {
                        firstName  = nameParts[0]; // "Ryan"
                    }

                    // Get last name 
                    if (nameParts[1]) {
                        lastName = nameParts[1]; // "Green"
                    }
                }

                 await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    createdAt: new Date().toISOString(),
                });
                
                console.log("Created new user profile for Google user");
            }

            //alert("Login with Google successful!");
            window.location.href = 'home.html';

        } catch (error) {
            console.error("Google sign-in error:", error.code, error.message);
            alert("Google sign-in failed. Please try again.");
        }

    });


    // [Log in with fully authenticated with Email and Password]
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById("userEmail").value;
        const password = document.getElementById("password").value;

    try {

        // Adding session persistance
        await setPersistence(auth, browserSessionPersistence);

        // this sign up process only accepts email and passwords ( if you want to store names in db you have to add a new collection to the db)
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
        //console.log("login successful!", userCredential.user.email);
        
        if(userCredential.user.email === loginEmail) {
            //alert("Login Successful!");
            window.location.href = 'home.html';
        } else {
            alert("login failed!")
            window.location.hash = "index.html";
        }

        

        // redirects user to index.html after sucessful login
        //window.location.href = 'home.html';
            
        } catch (error) {
            console.error("login error:", error.code, error.message);
            alert('Login Failed');
        }    
    });    

    // Registreation code below
 
    // create variable for the registration form 
    const regForm = document.getElementById("sign-up-form");

    // add an event listener on click like i had for the login button
    regForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // define the variables for the modal fields.. 
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const newUser = document.getElementById("newUserEmail").value;
        const newPassword = document.getElementById("newPassword").value;
        const newPasswordAgain = document.getElementById("verifyPassword").value;

        // Password validation logic

        const validatePassword = () => {
            // displays any errors
            const errorDiv = document.getElementById("password-error");

            // Helper function to show error
            const showError = (message) => {
                errorDiv.textContent = message;
                errorDiv.style.display = "block";
                return false; // I don't have to write "return fails" after each if statement
            };
            
            // Helper function to clear error
            const clearError = () => {
                errorDiv.style.display = "none";
            };
            
            // Start fresh - clear any old errors
            clearError();

            // check the name
            if (!firstName.trim() || !lastName.trim()) {
            //alert("Please enter your first and last name"); // change this to an errordiv too
            return showError("Please enter your first and last name");
        }


            // Begin checking createUserWithEmailAndPassword
            // Step 1. Check if password is long enough
            if (newPassword.length < 6) { // including password requirements 
                return showError("Password must be at least 6 characters");
                //return false;
            }

            // Step 2. Check for uppercase
            let hasUpperCase = false;
            for( let i = 0; i < newPassword.length; i++) {
                if (newPassword[i] >= 'A' && newPassword[i] <= 'Z') {
                    hasUpperCase = true;
                    break;
                }
            }
            if (!hasUpperCase) {
                return showError("Password needs at least one UPPERCASE letter");
            }

            // Step 3. check for lowercase
            let hasLowerCase = false;
            for (let i = 0; i < newPassword.length; i++) {
                if (newPassword[i] >= 'a' && newPassword[i] <= 'z') {
                    hasLowerCase = true;
                    break; // found one, stop looking
                }
            }
            if (!hasLowerCase) {
                return showError("Password needs at least one lowercase letter");
            }
            
            // Step 4. look for a number
            let hasNumber = false;
            for (let i = 0; i < newPassword.length; i++) {
                if (newPassword[i] >= '0' && newPassword[i] <= '9') {
                    hasNumber = true;
                    break;  // Found one, stop looking
                }
            }
            if (!hasNumber) {
                return showError("Password needs at least one number");
            }
            
            if (newPassword === "" || newPasswordAgain === "") {
                return showError("Please fill in both password fields");
                //return false;
            }

            // Last Step: check if passwords match
            if (newPassword !== newPasswordAgain) {
                return showError("Passwords do not match!");
                //return false;
            }
            return true;

        };

        // CALL the validation function before proceeding
        if (!validatePassword()) {
            return; // Stop here if validation fails
        }

    try {
        

        const userCredential = await createUserWithEmailAndPassword(auth, newUser, newPassword);
        //console.log("user successfully signed up", userCredential.user.email);
        const user = userCredential.user;
        // console.log("User: " + user.email);
        // console.log("UserID:" + user.uid);

        // this creates a collection for each user in the db identified by their UID.
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            firstName: firstName, // from input
            lastName: lastName, // from input
            createdAt: new Date().toISOString(),
            // additional data later.
        });
        //console.log(user.uid);

        alert("Registration was a success!")
        window.location.href = 'home.html';

    } catch (error) {
        console.error("sign up error:", error.code, error.message);
        alert("Login Failed 😟");
    }
        
    })

});
