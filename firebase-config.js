import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import {
    getAuth, onAuthStateChanged 
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD7U-ghzlo2_AZN_MZKTS8HNQkh5Vxqv10",
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vscode-2025.firebaseapp.com",
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vscode-2025",
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vscode-2025.firebasestorage.app",
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "565826875429",
  // appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:565826875429:web:cc2d539e7ba4484fa8cfcc",
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXWEQL8VN1"
  apiKey: "AIzaSyD8_2zhFDcdZcGQUnAhTrIbp8Eifh4eLQU",
  authDomain: "shopping-list-64bff.firebaseapp.com",
  projectId: "shopping-list-64bff",
  storageBucket: "shopping-list-64bff.firebasestorage.app",
  messagingSenderId: "15403534557",
  appId: "1:15403534557:web:1f80e4a318ce2e11e43334",
  measurementId: "G-KDYJB8CV6X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Note: getFirestore instead of getDatabase
export { onAuthStateChanged };



