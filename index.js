import { 
    addDoc, collection, getDoc, deleteDoc, getDocs, doc,  
    updateDoc} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { auth, onAuthStateChanged } from './firebase-config.js'
import { multiFactor, signOut } from 'firebase/auth';

    // Adding a setTimout to my code:

    // setting a rate limiting variable
    let lastSubmitTime = 0;
    let warningTimer;
    let inactivityTimer;

    const TIMEOUT_DURATION = 1 * 60 * 1000; // 15 min in milliseconds
    const WARNING_DURATION = .5 * 60 * 1000; // Warning at 14 minutes

    function resetInactivityTimer(){
        // Clear existing timer with clearTimeout() method - see MDN webdocs
        clearTimeout(inactivityTimer); // clearTimeout 
        clearTimeout(warningTimer); // Clear warning too

        // Warning timer
        warningTimer = setTimeout(() => {
            if (confirm("You'll be logged out in 1 minute due to inactivity. Click OK to stay logged in.")) {
                resetInactivityTimer();
            }
        }, WARNING_DURATION);

        // Start a new timer
        inactivityTimer = setTimeout(() => {
            alert("You've been logged out due to inactivity");
            signOut(auth);
            window.location.href = "index.html";
        }, TIMEOUT_DURATION);
    }

    // Function to start monitoring activity
    function startInactivityMonitor() {
        // Listen for any user activity
        document.addEventListener('click', resetInactivityTimer);
        document.addEventListener('keypress', resetInactivityTimer);
        document.addEventListener('mousemove', resetInactivityTimer);
        document.addEventListener('scroll', resetInactivityTimer);

        // start timer
        resetInactivityTimer();
    }

    // Function to stop monitoring (for cleanup)
    function stopInactivityMonitor() {
        clearTimeout(inactivityTimer);
        document.removeEventListener('click', resetInactivityTimer);
        document.removeEventListener('keypress', resetInactivityTimer);
        document.removeEventListener('mousemove', resetInactivityTimer);
        document.removeEventListener('scroll', resetInactivityTimer);
    }


    // Moved addtoList function to top because  it was defined inside the button click event, so loadUserData can't see it.
    // Success functions:

    /**
     * @param {{item: string, id: string}} data
     */
    function addToList(data) {
        
        const myList = document.getElementById("myList"); //get the list container        
        const listItem = document.createElement("li"); //create a new list item
        const deleteButton = document.createElement("button");

        //Have the first letter be uppercase
        const capitalizedItem = data.item.charAt(0).toUpperCase() + data.item.slice(1);

        // Add content to the list item - the ${} you see below are template literals
        // listItem.innerHTML = `<strong>${capitalizedItem}</strong>`;
        
        // above code has a vulnerability. Claude flagged (input validation/sanitization) 
        // Safer approach - use textContent
        const strong = document.createElement("strong");
        strong.textContent = capitalizedItem;
        listItem.appendChild(strong);

        listItem.style.cssText = `
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f8ff;
            border-left: 4px solid #4CAF50;
            border-radius: 4px;
        `;

        // Simple click handler
        deleteButton.addEventListener('click', async () => {
            try {
                const user = auth.currentUser;
                await updateDoc(doc(db, 'users', user.uid, 'shoppingList', data.id), {
                    hidden: true
                });
                
                listItem.remove(); // still removes from view
                console.log("item hidden");
            } catch (error) {
                console.error("Delete failed:", error);
            }
        })
        

        // Set up the delete button
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.background = "";
        deleteButton.style.color = "black";

        listItem.appendChild(deleteButton);

        myList.appendChild(listItem);
    }

    // Function to load existing user data
    async function loadUserData(){
        try {
            const user = auth.currentUser;
            if (!user) return;   // if there is no user exit the function immediately

            //const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'posts'));
            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'shoppingList'));
            
            // Clear the list first
            const myList = document.getElementById("myList");
            myList.innerHTML = "";

            console.log("Found", querySnapshot.size, 'documents');

            // Use regular for loop as you wanted to practice to write all data written to the db to the window.
            const docs = querySnapshot.docs;
        
            for (let i = 0; i < docs.length; i++) {
                const doc = docs[i];
                const data = doc.data();

                // only show unhidden data
                if (!data.hidden) {
                    addToList({
                        // name: data.name, // From DB
                        // age: data.age, // From DB
                        // email: data.email, // From DB
                        // id: doc.id // From DB
                        item: data.item,
                        id: doc.id // From DB
                    });
                }
                
            }

            console.log('Loaded ShoppingList from DB', querySnapshot.size, 'items from database');
            
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        // Code for writing and reading from the db
        const button = document.getElementById("connect"); 
        const logOut = document.getElementById("logOut");
        const itemInput = document.getElementById("itemName");

        // Listen for when a user presses akey in the text field
        itemInput.addEventListener("keypress", function(event) {
                // check if the key they pressed was Enter
                if (event.key === "Enter") {
                    // stop the page from refreshing
                    event.preventDefault();

                    // Act as though they clicked the button instead
                    button.click();
                }
            })

        // get user profile 'first name' from Firestore
        async function getUserProfile(userId) {
            try {
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    return userDocSnap.data();
                } else {
                    console.log("No user profile found");
                    return null;
                } 
            } catch (error) {
                console.error("Error getting user profile:", error);
                return null;
            }
        }

        // Check authentication and load data (remember use async when querying a db)
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // User is not logged in
                stopInactivityMonitor();
                window.location.href = "index.html"
            } else {
                console.log("The User is logged in:", user.email);

                // Start inactivity timer
                startInactivityMonitor();

                // get the user's profile data from Firestore
                const userProfile = await getUserProfile(user.uid);

                // greet the user with their first name
                const greeting = document.getElementById("greeting");
                if (greeting && userProfile) {
                    greeting.textContent = `Welcome back, ${userProfile.firstName}!`;
                } else if (greeting) {
                    // Fallback to email if no profile found
                    greeting.textContent = `Welcome back, ${user.email}!`;
                }

                loadUserData();
            }
        });
        
        // The button even is the meat and potatoes of this app. 
        button.addEventListener("click", async () => {
            
            // Rate limiting code here
            const now = Date.now();
            if (now - lastSubmitTime < 1000) { // 1 second cooldown
                return; // Exit if clicked too fast 
            }
            lastSubmitTime = now;
            
            const itemName = document.getElementById("itemName").value;

            // validate items exist
            if(!itemName.trim()) {
                alert("please add an item to the shopping list");
                return;
            }

            if (itemName.length > 50) {
                alert("Item name is too long! Please keep it under 50 characters.");
                return;
            }

            button.disabled = true;
            button.textContent = "Adding...";

        try {
                // Get currently logged-in user
                const user = auth.currentUser; 
                

                const docRef = await addDoc(collection(db, 'users', user.uid, 'shoppingList'), {
                    item: itemName,
                    timestamp: new Date().toISOString(),
                    hidden: false
                });

                // Clear form
                // document.getElementById("username").value = "";
                // document.getElementById("userAge").value = "";
                // document.getElementById("email").value = "";
                document.getElementById("itemName").value = "";
                
                // add to list display
                addToList({
                    // name: username,
                    // age: userAge,
                    // email: email,
                    // id: docRef.id
                    item: itemName,
                    id: docRef.id,
                });

            } catch (error) {
                console.error('Firestore error:', error);
                alert("Failed to add an item. Please try again");
            } finally {
                button.disabled = false;
                button.textContent = "Add to List";
            }
        });



        // Logout functionality
        logOut.addEventListener("click", async (e) => {
            e.preventDefault();

        try {
            await signOut(auth);
            console.log("user logged out");
            window.location.href = 'index.html';
        } catch (error) {
            console.log("An error occured with logout");
            alert("Log out failed. Please try again");
        }

        });
    });