import { 
    addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from './firebase-config.js';
import { auth } from './firebase-config.js'
import { signOut } from 'firebase/auth';

document.addEventListener("DOMContentLoaded", () => {
    // Code for writing and reading from the db
    // get the button by its ID
    const button = document.getElementById("connect"); 
    const logOut = document.getElementById("logOut");
    
    button.addEventListener("click", async () => {
        
        let username = document.getElementById("username").value;
        let userAge = document.getElementById("userAge").value;
        let email = document.getElementById("email").value;
        
     try {
            // setDoc method was deleted so that new docs could be added on every click
            // addDoc creates a new document with auto-generated ID
            // const docRef =   await addDoc(collection(db, 'users'), {
            //     name: username,
            //     age: parseInt(userAge),
            //     email: email,
            //     timestamp: new Date().toISOString(),
            // });
    
            //  console.log('Data written to Firestore!');
    
            // // Read from Firestore
            // // const docRef = doc(db, 'users');
            // const docSnap = await getDoc(docRef);
    
            // if(docSnap.exists()) {
       
            //     const userData = docSnap.data();
            //     console.log('Name:', userData.name);
            //     console.log('Age:', userData.age);
            //     console.log('Email:', userData.email);
            //     console.log('Timestamp:', userData.timestamp);
    
            // } else {
            //     console.log('No document found!');
            // }   

            const user = auth.currentUser; // Get currently logged-in user

            const docRef = await addDoc(collection(db, 'users', user.uid, 'posts'), {
                name: username,
                age: parseInt(userAge),
                email: email,
                timestamp: new Date().toISOString(),
            })

            // Clear form
            username = "";
            userAge = "";
            email = "";

            showSubmittedData({
                name: username,
                age: userAge,
                email: email,
                id: docRef.id,
            });

        } catch (error) {
            console.error('Firestore error:', error);
            
        }
   

        function showSubmittedData(data) {
            const displayDiv = document.createElement("div");
            displayDiv.style.cssText = `
            background-color: #e8f5e8;
            border: 1px solid #4CAF50;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            `;

             displayDiv.innerHTML = `
                <h4>✅ Successfully Saved:</h4>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Document ID:</strong> ${data.id}</p>
            `;

            // Add to page
            const form = document.getElementById("userForm");
            form.parentNode.insertBefore(displayDiv, form.nextSibling);
        }
    });

    // Logout functionality
    logOut.addEventListener("click", async (e) => {
        e.preventDefault();

    try {
        await signOut(auth);
        console.log("user logged out");
        window.location.href = 'login.html';
    } catch (error) {
        console.log("An error occured with logout")
    }

    });
});