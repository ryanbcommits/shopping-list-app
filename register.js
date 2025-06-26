import {auth} from  './firebase-config';

import { createUserWithEmailAndPassword } from 'firebas/auth'

/*
Source of methods are from Firebase documentation to create a user 
and also set something called a state observer and get user data...
see:  https://firebase.google.com/docs/auth/web/start#web_2
*/
// Sign up new users

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  // Set an authentication state observer and get user Data