// // I asked Claude to assist im my efforst to connect to the firebase database to see if it could.
// // this was it's suggested code:

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js';
// import { getFirestore, doc, getDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js';
// import {
//     getAuth, signInWithEmailAndPassword
// } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD7U-ghzlo2_AZN_MZKTS8HNQkh5Vxqv10",
//   authDomain: "vscode-2025.firebaseapp.com",
//   databaseURL: "https://vscode-2025-default-rtdb.firebaseio.com",
//   projectId: "vscode-2025",
//   storageBucket: "vscode-2025.firebasestorage.app",
//   messagingSenderId: "565826875429",
//   appId: "1:565826875429:web:cc2d539e7ba4484fa8cfcc",
//   measurementId: "G-XXWEQL8VN1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);  // Note: getFirestore instead of getDatabase

// // create a button variable
// const loginButton = document.getElementById("submit");

// // create an event listener for the button
// loginButton.addEventListener("click", async () => {

//     const loginEmail = document.getElementById("userEmail").value;
//     const password = document.getElementById("password").value;

//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
//         console.log("login successful!", userCredential.loginEmail);

//         alert("Login Successful!");
//     } catch (error) {
//         console.error("login error:", error.code, error.message);
//         alert('Login Failed');
//     }

// });


// // Code for writing and reading from the db
// // get the button by its ID
// const button = document.getElementById("connect"); 

// button.addEventListener("click", async () => {

//     const username = document.getElementById("username").value;
//     const userAge = document.getElementById("userAge").value;
//     const email = document.getElementById("email").value;

    
//  try {
//         // setDoc method was deleted so taht new docs could be added on every click
//         // addDoc creates a new document with auto-generated ID
//         const docRef =   await addDoc(collection(db, 'people'), {
//             name: username,
//             age: parseInt(userAge),
//             email: email,
//             timestamp: new Date().toISOString(),
//         });

//          console.log('Data written to Firestore!');

//         // Read from Firestore
//         // const docRef = doc(db, 'people');
//         const docSnap = await getDoc(docRef);

//         if(docSnap.exists()) {
   
//             const userData = docSnap.data();
//             console.log('Name:', userData.name);
//             console.log('Age:', userData.age);
//             console.log('Email:', userData.email);
//             console.log('Timestamp:', userData.timestamp);

//         } else {
//             console.log('No document found!');
//         }   

//     } catch (error) {
//         console.error('Firestore error:', error);
        
//     }
// });

