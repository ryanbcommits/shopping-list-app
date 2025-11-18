# Connecting the Frontend to a Database

Building off of the code I created that establishes a connection to a Firestore database on a button click, I plan to build off of the foundation and make this more complex. I was successful at hard coding data into the async method in the db.js file to get the data to be written and later read by the console.

## 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ryanbcommits/shopping-list-app.git
   cd shopping-list-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   
4. Run Development server


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

**How I Use AI:**
- As a tutor to explain concepts I don't understand
- To debug error messages when stuck
- To learn best practices and security improvements
- To understand differences between similar methods (like setDoc vs addDoc)

**What's My Own Work:**
- All initial code attempts and logic
- Project structure and design decisions  
- Problem-solving approach
- Implementation of learned concepts

## Development Notes

Some Firebase authentication logic was developed with assistance from Claude AI.

## Key Learnings

### JavaScript Concepts
- **Event Listeners**: Learned about DOMContentLoaded and why scripts need to wait for HTML
- **Async/Await**: Understanding asynchronous operations with Firebase
- **Scope**: Fixed function scope issues by moving reusable functions outside event listeners
- **Element Visibility**: Mastered using `style.display` to show/hide DOM elements
- **Attribute Manipulation**: Learned setAttribute/getAttribute work with strings
- **State Management**: Implemented local state tracking using data attributes

### Firebase Skills
- **Authentication**: User registration, login, and session management
- **Firestore**: Difference between setDoc() vs addDoc(), soft delete patterns
- **Data Structure**: Organizing user-specific data with proper hierarchy

## How The App Works

1. User registers/logs in (login.js handles authentication)
2. Redirects to home.html after successful login
3. Shopping list loads from Firestore (user-specific data)
4. User can add items (stores in Firestore with timestamp)
5. User can delete items (soft delete - marks as hidden)
6. Data persists across sessions

## Features
- Multiple authentication methods (Email/Password and Google Sign-In)
- Real-time data synchronization with Firestore
- Automatic session timeout for security
- Rate limiting to prevent spam
- Soft delete for data recovery
- Responsive error handling with visual feedback


**6/9/25** - After attempting to have two HTML pages utilize a shared .js file, I ran into a problem. I suspected that there was an issue with having two HTML pages calling the same JavaScript file. I consulted Claude and it said that my JS was running before the HTML elements are loaded, so when my script runs, the DOM elements don't exist yet (`document.getElementById("connect")` returns null). The quick fix was to wrap the code in `DOMContentLoaded`.

**7/1/25**
- Register button must be inside the form for submit events (unless you create a variable for the button itself)
- Modal elements are accessible via getElementById even when hidden
- Firebase auth errors are clearer with proper error.code logging
- Deleted register.js since the code was used in login.js instead

**7/8/25**
- Fixed the user experience after registration, the app takes them to index.html
- Found a small bug in the code that allowed the user to click outside the modal which is not desirable for registration purposes, so I commented out code which was allowing the user to hide the modal on click events outside the modal.

**7/26/25**
- Added password validation at registration

**7/30/25**
- Successfully implemented user-specific data storage using Firebase UID
- Added visual feedback system - submitted data now populates in a dynamic list
- Improved user experience with form clearing after successful submission
- Learned the difference between setDoc() and addDoc() for document creation
- Implemented proper data structure organization (users collection with individual user documents)

**8/3/25**
- Successfully implemented dynamic list display with a relational (NoSQL) database - Cloud Firestore -  loading using getDocs()
- Added authentication state management with onAuthStateChanged() - users now see their existing data when logging back in
- Implemented user-specific data persistence - list items now survive page reloads and logout/login cycles
- Added personalized welcome message using template literals with user.email
- Learned difference between getDoc() (single) vs getDocs() (multiple documents)
- Fixed function scope issues by moving reusable functions outside event listeners
- TODO: Add delete functionality for list items and transition to shopping list format

**8/12/25**
- Implemented soft delete functionality using updateDoc() instead of permanent deletion
- Added "hidden" field to database documents to preserve data while removing from user view
- Learned difference between hard delete (deleteDoc) vs soft delete (updateDoc with hidden flag)
- Successfully filtered hidden items from display using conditional logic in loadUserData()
- Chose DOM element creation approach (createElement) over complex template literal event handling
- Improved code readability by separating HTML creation from event listener attachment
- Database now preserves all user data while maintaining clean user interface experience

**8/17/25**
- Included first name and last name at point of registration
- Changed code to be more in line with a shopping list app
- Added Enter key support with preventDefault() to stop form refresh
- Learned about strict equality (===) vs loose equality (==)
- Understood difference between DOM, document, and window objects

**8/18/25**
- Implemented comprehensive security improvements with environment variables for Firebase config
- Added rate limiting to prevent spam (1 second cooldown between submissions)
- Fixed XSS vulnerability by replacing innerHTML with textContent for user input
- Added inactivity timeout with warning (logs out after 15 minutes, warns at 14 minutes)
- Implemented loading states for better UX when adding items
- Added input validation for item name length (50 character limit)
- Fixed Enter key support to prevent form submission page refresh
- Added user feedback for all error states
- Learned about JavaScript constants vs enums and naming conventions
- Understood TypeScript influences on JavaScript conventions (ALL_CAPS for constants)

**8/20/25**
- Created password policy in Firebase requiring uppercase, lowercase, and numeric characters
- Implemented frontend password validation using for loops to check each character
- Added visual error messages in modal instead of using alerts for better UX
- Learned about ASCII values and how character comparisons work in JavaScript
- Fixed syntax errors and improved error handling in registration flow

**8/21/25**
- Implemented Google Sign-In authentication using signInWithPopup
- Added user profile creation for first-time Google sign-ins  
- Learned about optional chaining operator (?) as shorthand for checking if properties exist
- Completed the setTimeout implementation for 15-minute inactivity logout
- Discovered difference between firebase-config.js (setup) vs importing Firestore functions where needed

**8/24/25**
- Updated package.json file and prepared for first production deployment
- Successfully deployed beta version to personal domain for testing
- Resolved build issues with Firebase environment variables in production
- Identified mobile compatibility issues on iOS Chrome - investigated solutions and likely resolved with resolving the build issue in the statement above.
- Released first MVP with core shopping list functionality! 🎉


**8/27/25**
- Got HTTPS working on Netlify. 🎉
- Added a favicon to my project.

**8/28/25**
- Implemented Google's official sign-in button following their branding guidelines for better UX consistency
- Experimented with flexbox containers for layout improvements - discovered conflicts with existing app layout
- TODO: Investigate CSS Grid as alternative to flexbox, or consider modular CSS approach before adding Bootstrap

**11/15/25**
- Successfully implemented edit functionality for shopping list items
- Created toggle system using `data-edit-mode` attribute to track editing state
- Implemented show/hide coordination between text display and input field
- Edit button dynamically changes to "Save" when entering edit mode
- Added Cancel button that appears only during editing
- Learned that `getAttribute()` returns strings, requiring strict equality (`===`) for comparisons
- Discovered how to manipulate element visibility using `style.display` property
- Built edit mode toggle using conditional logic (if/else) based on current state
- Understood the importance of breaking down complex features into smaller, manageable pieces
- TODO: Complete save functionality to persist edited items to Firestore

**11/17/25**
- Successfully implemented complete edit/save functionality for shopping list items
- Edit button toggles between "Edit" and "Save" modes using data-edit-mode attribute
- Implemented inline editing - text becomes input field when editing
- Successfully updates Firestore database using updateDoc() when saving changes
- Hide delete button during edit mode to prevent accidental deletions
- Used loadUserData() refresh strategy to ensure UI stays synced with database
- Learned about element ID management (discovered IDs must be unique per element)
- Simplified UX by reusing edit button as save button instead of adding multiple buttons
- Cleaned up code by commenting out unused save/cancel button implementations
- Learned about different approaches: direct DOM updates vs. refresh strategy
- TODO: Consider adding cancel functionality and optimizing to avoid full list refresh

### Problem-Solving Approaches for 11/17/25
- **Incremental Development**: Built edit feature step-by-step, testing each part
- **Refresh Strategy**: Used loadUserData() to ensure UI consistency with database
- **Code Simplification**: Started with multiple buttons, simplified to single toggle button

## Challenges Overcome

- **Problem**: Enter key refreshing the page instead of adding items
  - **Solution**: Added preventDefault() in keypress event listener

- **Problem**: XSS vulnerability with innerHTML
  - **Solution**: Switched to createElement and textContent approach

- **Problem**: Users staying logged in indefinitely
  - **Solution**: Implemented inactivity timer with warning system


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
- ✅ Implemented soft delete pattern for data preservation while maintaining clean UI
- ✅ Added updateDoc functionality for non-destructive data operations
- ✅ Learned multiple approaches to DOM event handling and chose simplest solution
- ✅ Implemented full CRUD operations (Create, Read, Update, Delete)
- ✅ Built inline editing system with dynamic input fields

## Known Issues
- [ ] Minor typo in code ("Pleaes" spelling in index.js)
- [ ] Firestore Security Rules still need to be configured for production

## Roadmap

### ✅ Completed
- User authentication
- Add items to list
- Soft delete functionality
- Data persistence
- Enter key support for adding items
- Rate limiting for spam prevention
- Inactivity timeout with warning
- Loading states for async operations
- Input validation and sanitization
- Environment variables for sensitive config

### 🔄 In Progress

- UI/UX improvements
- Edit existing items (90% complete - save functionality remaining)

### 📋 Planned
- Edit existing items
- Categories/tags for items
- "Show hidden items" toggle
- HTTPS/SSL certificate for production deployment
- Mobile compatibility improvements
- Form validation for all fields
- Create a forgot password

## 🚀 Deployment

The app is deployed at: [app.ryanbcommits.com]

**Current Status:** Beta/MVP
- Uses environment variables for Firebase config
- Implements proper authentication flow
- Mobile compatibility being tested

**Production Checklist:**
- [ ] HTTPS/SSL certificate
- [ ] Mobile browser testing complete
- [ ] Firebase security rules review
- [ ] Performance optimization
- [ ] Possible Mobile compatibility issues on iOS Chrome (investigating)


## Project Structure

```
├── index.html          # Login/registration page (renamed from login.html)
├── home.html           # Main app page (renamed from index.html)
├── login.js            # Authentication logic
├── index.js            # Main app logic (serves home.html)
├── firebase-config.js  # Firebase configuration
├── style.css           # Styling
└── package.json        # Dependencies




