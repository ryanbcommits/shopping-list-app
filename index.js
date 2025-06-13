import { addDoc, collection, getDoc } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js';
import { db } from './firebase-config.js';
import { auth } from './firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';

document.addEventListener("DOMContentLoaded", () => {
    // Code for writing and reading from the db
    // get the button by its ID
    const button = document.getElementById("connect"); 
    const logOut = document.getElementById("logOut");
    
    button.addEventListener("submit", async () => {
    
        const username = document.getElementById("username").value;
        const userAge = document.getElementById("userAge").value;
        const email = document.getElementById("email").value;
        
     try {
            // setDoc method was deleted so taht new docs could be added on every click
            // addDoc creates a new document with auto-generated ID
            const docRef =   await addDoc(collection(db, 'people'), {
                name: username,
                age: parseInt(userAge),
                email: email,
                timestamp: new Date().toISOString(),
            });
    
             console.log('Data written to Firestore!');
    
            // Read from Firestore
            // const docRef = doc(db, 'people');
            const docSnap = await getDoc(docRef);
    
            if(docSnap.exists()) {
       
                const userData = docSnap.data();
                console.log('Name:', userData.name);
                console.log('Age:', userData.age);
                console.log('Email:', userData.email);
                console.log('Timestamp:', userData.timestamp);
    
            } else {
                console.log('No document found!');
            }   
    
        } catch (error) {
            console.error('Firestore error:', error);
            
        }
   
    });

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