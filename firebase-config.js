import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, addDoc, getDocs  } from 'firebase/firestore'
import {
    getAuth, onAuthStateChanged 
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7U-ghzlo2_AZN_MZKTS8HNQkh5Vxqv10",
  authDomain: "vscode-2025.firebaseapp.com",
  databaseURL: "https://vscode-2025-default-rtdb.firebaseio.com",
  projectId: "vscode-2025",
  storageBucket: "vscode-2025.firebasestorage.app",
  messagingSenderId: "565826875429",
  appId: "1:565826875429:web:cc2d539e7ba4484fa8cfcc",
  measurementId: "G-XXWEQL8VN1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Note: getFirestore instead of getDatabase
export { onAuthStateChanged };



