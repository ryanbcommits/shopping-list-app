# Connecting the Frontend to a Database

Building off of the code I created that establishes a connection to a Firestore database on a button click, I plan to build off of the foundation and make this more complex. I was successful at hard coding data into the async method in the db.js file to get the data to be written and later read by the console.

## Development Setup

**To get the project running in dev mode:**
```bash
npx vite
```


Then open your browser to the localhost URL that Vite provides (usually `http://localhost:5173`).

**To close project in dev mode:**
```bash
Ctrl + c
```


## AI Disclosure

As AI is being used more and more with coding, my goal is to leverage LLMs - in this case Claude - to provide me with supplemental knowledge if I run into roadblocks.

**Method:** Code first and attempt to accomplish my goal without AI. If I run into a roadblock where I would typically have used Google or Stack Overflow, I am using Claude to help me work through the problem. The overall purpose of this exercise is to leverage AI to speed up my learning, not to use it as a shortcut.

## Development Notes

Some Firebase authentication logic was developed with assistance from Claude AI.

**6/9/25** - After attempting to have two HTML pages utilize a shared .js file, I ran into a problem. I suspected that there was an issue with having two HTML pages calling the same JavaScript file. I consulted Claude and it said that my JS was running before the HTML elements are loaded, so when my script runs, the DOM elements don't exist yet (`document.getElementById("connect")` returns null). The quick fix was to wrap the code in `DOMContentLoaded`.

**7/1/25**
- Register button must be inside the form for submit events (unless you create a variable for the button itself)
- Modal elements are accessible via getElementById even when hidden
- Firebase auth errors are clearer with proper error.code logging
- Deleted register.js since the code was used in login.js instead

**7/8/25**
- Fixed the user experience after registration, the app takes them to index.html
- Found a small bug in the code that allowed the user to click outside the modal which is not desireable for registration purposes, so I commented out code which was allowing the user to hide the modal on click events outside the modal.

**7/26/25**
- Added password validation at registration

**7/30/25**
- Successfully implemented user-specific data storage using Firebase UID
- Added visual feedback system - submitted data now populates in a dynamic list
- Improved user experience with form clearing after successful submission
- Learned the difference between setDoc() and addDoc() for document creation
- Implemented proper data structure organization (users collection with individual user documents)

**8/3/25**
- Successfully implemented dynamic list display with real-time database loading using getDocs()
- Added authentication state management with onAuthStateChanged() - users now see their existing data when logging back in
- Implemented user-specific data persistence - list items now survive page reloads and logout/login cycles
- Added personalized welcome message using template literals with user.email
- Learned difference between getDoc() (single) vs getDocs() (multiple documents)
- Fixed function scope issues by moving reusable functions outside event listeners
- TODO: Add delete functionality for list items and transition to shopping list format


## Accomplishments

- ✅ Achieved multiple document additions to my database by switching from the `setDoc` method to `addDoc` method
- ✅ Successfully implemented Firebase authentication with registration/login
- ✅ Converted from CDN imports to npm imports for better development experience
- ✅ Set up Vite for modern development workflow
- ✅ Added password validation at registration
- ✅ Implemented user-specific data storage using Firebase user authentication
- ✅ Added dynamic list display for submitted data with visual feedback
- ✅ Organized database structure with proper user document hierarchy
- ✅ Successfully separated JavaScript into modular files (login.js, index.js, firebase-config.js)



## Known Issues
- [x] ~~List items don't persist on page reload~~ - RESOLVED: Now loads from database
- [ ] UI needs improving
- [ ] Security rules need to be properly configured for production
- [ ] Form validation for other fields besides password

## TODO
- [x] ~~Load and display user's existing data when they log in~~ - COMPLETED
- [ ] Add ability to edit/delete list items (IN PROGRESS)
- [ ] Set a timeout while logged in
- [ ] Work on transitioning to shopping list functionality
- [ ] Add form validation for name and email fields
- [ ] Improve UI/UX design

**Priority Ranking:**
- **Rank 3:** Complete the registration process with Sign Up button.
- **Rank 7:** Have the user's data written to the DOM (display on page)
- **Rank 12:** Adjust the authorization standards to meet Firestore's guidelines
- [ ] Finish creating the registration page with Claude
- [ ] Have the info from the database print to the window
- [ ] Improve authentication state management
- [ ] Add form validation
- [ ] Improve UI/UX design

## Project Structure

```
├── index.html          # Login/registration page (renamed from login.html)
├── home.html           # Main app page (renamed from index.html)
├── login.js            # Authentication logic
├── index.js            # Main app logic (serves home.html)
├── firebase-config.js  # Firebase configuration
├── style.css           # Styling
└── package.json        # Dependencies

