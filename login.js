import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
import {
    getAuth, connectAuthEmulator, signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js';

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

// Initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

