// I asked Claude to assist im my efforst to connect to the firebase database to see if it could.
// this was it's suggested code:

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7U-ghzlo2_AZN_MZKTS8HNQkh5Vxqv10",
  authDomain: "vscode-2025.firebaseapp.com",
  projectId: "vscode-2025",
  storageBucket: "vscode-2025.firebasestorage.app",
  messagingSenderId: "565826875429",
  appId: "1:565826875429:web:cc2d539e7ba4484fa8cfcc",
  measurementId: "G-XXWEQL8VN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// get the button by its ID
const button = document.getElementById("connect"); // remember the element id has to mathch the one in the HTML with the same name.



// get the button by its ID
const otherButton = document.getElementById("test"); // remember the element id has to mathch the one in the HTML with the same name.

//add an event listener to the button
otherButton.addEventListener('click', function() {
    console.log('HTML talking to db.js');
});



//add an event listener to the button
button.addEventListener("click", async () => {
  

 try {
        // Write to database (awaits the Promise)
        await set(ref(database, 'test/connection'), {
            message: 'Connected successfully!',
            timestamp: Date.now()
        });
        
        console.log('Data written successfully!');
        
        // Read from database (awaits the Promise)
        const snapshot = await get(ref(database, 'test/connection'));
        if (snapshot.exists()) {
            console.log('Data retrieved:', snapshot.val());
        }
        
    } catch (error) {
        console.error('Firebase error:', error);
    }
});
  