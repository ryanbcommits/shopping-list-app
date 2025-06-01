##Connecting the frontend to a DB
The purpose of this app is the demonstrate that after a database was created, in this case Firestore, it is possible to connect to it successfully using a button along with an async await method with a try catch embedded to write and then read from the db.

In the end I was able to create a button that once clicked would write to the db and read the data from the db and write it to the console. Below are my project scratch notes...


I solely want to establish a connection to the vsCode-2025 db I created.
After that is successful I want to submit data to it after.


##Button works!
Now that the button is responsive to js in the console, let us see if I can get it to connect to my db. If so I can build from there!
created a separate db.js file to house the database logic.

##Success!
I successfully connected to the Realtime Database with read and write functionality. Turns out with js the Realtime DB is more compatable...

##Attempt to connect to the Firebase database rather than the Realtime database for readability
used claude 4.0 for assistance. The AI suggested I use the www.gstatic.com/firebasejs... rather than the app which I understand that to only work
if I install the Firebase JS SDK and init firebase.. I take it this gstatic is a light weight test?

#Firebase Alt Setup 
https://firebase.google.com/docs/web/alt-setup

##Success! the Firestore test worked! The button click communicated to my desired database.
The button only overwrites the document and replaces it with a new timestamp.


