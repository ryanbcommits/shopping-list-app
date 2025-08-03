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
            });

            // Clear form
            document.getElementById("username").value = "";
            document.getElementById("userAge").value = "";
            document.getElementById("email").value = "";


            addToList({
                name: username,
                age: userAge,
                email: email,
                id: docRef.id
            });

        } catch (error) {
            console.error('Firestore error:', error);
            
        }
        
        // Success functions:
        
        function addToList(data) {
            //get the list container
            const myList = document.getElementById("myList");
            
            //create a new list item
            const listItem = document.createElement("li");
         
            // Add content to the list item
            listItem.innerHTML = `
            <strong>${data.name}</stong> - Age: ${data.age}, Email: ${data.email}
            <small> (ID; ${data.id})</small>
            `;

            listItem.style.cssText = `
                padding: 10px;
                margin: 5px 0;
                background-color: #f0f8ff;
                border-left: 4px solid #4CAF50;
                border-radius: 4px;
            `;

            myList.appendChild(listItem);
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