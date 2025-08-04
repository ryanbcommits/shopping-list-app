import { 
    addDoc, collection, getDoc, deleteDoc, getDocs, doc  } from 'firebase/firestore';
import { db } from './firebase-config.js';
import { auth, onAuthStateChanged } from './firebase-config.js'
import { signOut } from 'firebase/auth';

    // Moved addtoList function to top because  it was defined inside the button click event, so loadUserData can't see it.
    // Success functions:
    function addToList(data) {
        //get the list container
        const myList = document.getElementById("myList");
        
        //create a new list item
        const listItem = document.createElement("li");
        
        // Add content to the list item
        listItem.innerHTML = `
        <strong>${data.name}</strong> - Age: ${data.age}, Email: ${data.email}
        <small> (ID: ${data.id})</small>
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

    // Function to load existing user data
    async function loadUserData(){
        try {
            const user = auth.currentUser;
            // if there is no user exit the function immediately
            if (!user) return;

            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'posts'));

            // Clear the list first
            const myList = document.getElementById("myList");
            myList.innerHTML = "";

            console.log("Found", querySnapshot.size, 'documents');

            // Use regular for loop as you wanted to practice to write all data written to the db to the window.
            const docs = querySnapshot.docs;
        
            for (let i = 0; i < docs.length; i++) {
                const doc = docs[i];
                const data = doc.data();

                addToList({
                    name: data.name, // From DB
                    age: data.age, // From DB
                    email: data.email, // From DB
                    id: doc.id // From DB
                });
            }

            console.log('Loaded', querySnapshot.size, 'items from database');
            
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // Code for writing and reading from the db
        // get the button by its ID
        const button = document.getElementById("connect"); 
        const logOut = document.getElementById("logOut");

        // Check authentication and load data
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "index.html"
            } else {
                console.log("User is logged in:", user.email);

                const welcomeHeading = document.getElementById("greeting");
                if (welcomeHeading) {
                    welcomeHeading.textContent = `Welcome back, ${user.email}!`;
                }

                // load their existing data
                loadUserData();
            }
        });
            
        button.addEventListener("click", async () => {
            
            let username = document.getElementById("username").value;
            let userAge = document.getElementById("userAge").value;
            let email = document.getElementById("email").value;
            


        try {
                // Get currently logged-in user
                const user = auth.currentUser; 
                

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