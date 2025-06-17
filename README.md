##Connecting the frontend to a DB
Building off of the code I created that establishes a connection to a firestore db on a button click I plan to build off of the foundation and make this more complex.

I was sucessful at hard coding data into the async method in the db.js file to get the data to be written and later read by the console. 

Disclosure on AI - As AI is being used more and more with coding, my goal is to leverage LLMs - in this case Claude - to provide me with supplemental knowledge if I run into roadblocks.

Method: Code first and attempt to acomplish my goal without AI, if I run into a roadblock where I would typically have used Google or Stack Overflow I am using claude to help me work through the problem.

The overall purpose of this exercise is to leverage AI to speed up my learning not to use it as a shortcut.


6/9/25
After attempting to have two html pages utilize a shared .js file a ran into a problem. I suspected that there was an issue with having two html pages calling the same JavaScript File. 

I consulted Claude and it said that First my JS was running before the HTML elements are loaded. So when my script runs, t he DOM elements don't exist yet (document.getElementById("connect") returns null. The quick fix is to Wrap your code in DOMContentLoaded.


I was correct, but specified that the HTML pages which have different elements:
    specifically - Login.html has form elements but no button with id="connect"
                 - index.html has buttons with id="connect" but different form structure
                 - firebase.js is looking for different elements from BOTH pages at the same time. Claude suggests that I split my JS into separate files (which I thought would be approprate at first, but wanted to test what would happen if all my js code was in the same file...)

## Acomplishments
- Achieved multiple doc additions to my db by switching out the setDoc method to addDoc method.

## Known Issues
- [] Fields allow any text to be entered
- [] UI needs improving

## TODO
- For 6/16/25 The goal for today is to add a sign up button
- Have the info from the db print to the window
- Improve authentication state 


