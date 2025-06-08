##Connecting the frontend to a DB
Building off of the code I created that establishes a connection to a firestore db on a button click I plan to build off of the foundation and make this more complex.

I was sucessful at hard coding data into the async method in the db.js file to get the data to be written and later read by the console. 

Disclosure on AI - As AI is being used more and more with coding, my goal is to leverage LLMs - in this case Claude - to provide me with supplemental knowledge if I run into roadblocks.

Method: Code first and attempt to acomplish my goal without AI, if I run into a roadblock where I would typically have used Google or Stack Overflow I am using claude to help me work through the problem.

The overall purpose of this exercise is to leverage AI to speed up my learning not to use it as a shortcut.


6/8/25 -

I watcehd a tutorial called "Getting Started with Firebase Authentication on the web" from Google's Firebase Authentication page. I walked through the processes but ran into an bug where ater I tried logging in, the console returned an error stating that there was no 'heartbeat.' Something to to with getProvider in the Firebase code. 

After some troubleshooting I turned to Claude for a possible solution and it informed me that the code that I had used from the tutorial was incorrect and that I used getAuth() incorrectly and the order of operations was wrong.

## Acomplishments
- Achieved multiple doc additions to my db by switching out the setDoc method to addDoc method.

## Known Issues
- [] Fields allow any text to be entered
- [] No login yet
- 

## TODO

- Have the info from the db print to the window
- Improve user experience
