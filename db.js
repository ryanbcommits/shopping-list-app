// I asked Claude to assist im my efforst to connect to the firebase database to see if it could.
// this was it's suggested code:

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js';

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
const db = getFirestore(app);  // Note: getFirestore instead of getDatabase

// get the button by its ID
const button = document.getElementById("connect"); // remember the element id has to mathch the one in the HTML with the same name.
//add an event listener to the button
button.addEventListener("click", async () => {
 try {
        // I'm hardcoding what I want Firestore to do
        await setDoc(doc(db, 'people', 'person1'), {
            name: "Ryan G",
            age: 25,
            email: "ryanb@gmail.com",
            timestamp: Date.now(),
        });

        console.log('Data written to Firestore!');

        // Read from Firestore
        const docRef = doc(db, 'people', 'person1');
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            // this prints an array of the doc I hardcoded in the setDoc method
            // console.log('Data from Firestore:', docSnap.data());
            // I was stumpted at this point and asked claude how to print the data to the console.
            // it suggested the following:
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

// the following was a button test to make sure that the <script> tag in index.html was working.

// get the button by its ID
// const otherButton = document.getElementById("test"); // remember the element id has to mathch the one in the HTML with the same name.

//add an event listener to the button
// otherButton.addEventListener('click', function() {
//     console.log('HTML talking to db.js');
// });
