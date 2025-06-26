# Connecting the Frontend to a Database

Building off of the code I created that establishes a connection to a Firestore database on a button click, I plan to build off of the foundation and make this more complex. I was successful at hard coding data into the async method in the db.js file to get the data to be written and later read by the console.

## Development Setup

**To get the project running in dev mode:**
```bash
npx vite
```

Then open your browser to the localhost URL that Vite provides (usually `http://localhost:5173`).

## AI Disclosure

As AI is being used more and more with coding, my goal is to leverage LLMs - in this case Claude - to provide me with supplemental knowledge if I run into roadblocks.

**Method:** Code first and attempt to accomplish my goal without AI. If I run into a roadblock where I would typically have used Google or Stack Overflow, I am using Claude to help me work through the problem. The overall purpose of this exercise is to leverage AI to speed up my learning, not to use it as a shortcut.

## Development Notes

Some Firebase authentication logic was developed with assistance from Claude AI.

**6/9/25** - After attempting to have two HTML pages utilize a shared .js file, I ran into a problem. I suspected that there was an issue with having two HTML pages calling the same JavaScript file. I consulted Claude and it said that my JS was running before the HTML elements are loaded, so when my script runs, the DOM elements don't exist yet (`document.getElementById("connect")` returns null). The quick fix was to wrap the code in `DOMContentLoaded`.

## Accomplishments

- ✅ Achieved multiple document additions to my database by switching from the `setDoc` method to `addDoc` method
- ✅ Successfully implemented Firebase authentication with registration/login
- ✅ Converted from CDN imports to npm imports for better development experience
- ✅ Set up Vite for modern development workflow

## Known Issues

- [ ] Fields allow any text to be entered (no validation)
- [ ] UI needs improving
- [ ] Security rules need to be properly configured for production

## TODO

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
├── index.html          # Main app page
├── login.html          # Login/registration page
├── index.js           # Main app logic
├── login.js           # Authentication logic
├── firebase-config.js  # Firebase configuration
├── style.css          # Styling
└── package.json       # Dependencies

