import { addDoc, collection, getDoc, deleteDoc, getDocs, doc, updateDoc} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { auth, onAuthStateChanged } from './firebase-config.js'
import { multiFactor, signOut } from 'firebase/auth';


    // setting a rate limiting variable
    let lastSubmitTime = 0;
    let warningTimer;
    let inactivityTimer;
    let currentFilter = "All";
    let currentSearch = "";

    // setTimeout variables
    const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 min in milliseconds
    const WARNING_DURATION = 14 * 60 * 1000; // Warning at 14 minutes
    const CATEGORIES = ["All", "Dairy", "Produce", "Grocery", "Meat", "Frozen Food", "Fish / Seafood"];

    function resetInactivityTimer(){
        // Clear existing timer with clearTimeout() method - see MDN webdocs
        clearTimeout(inactivityTimer); // clearTimeout 
        clearTimeout(warningTimer); // Clear warning too

        // Warning timer - but found, the pop up will keep a user logged in if they do not click anything beyond the timer.
        warningTimer = setTimeout(() => {
            if (confirm("You'll be logged out in 1 minute due to inactivity. Click OK to stay logged in.")) {
                resetInactivityTimer();
            }
        }, WARNING_DURATION);
        
        // Start a new timer
        inactivityTimer = setTimeout(() => {
            alert("You've been logged out due to inactivity");
            signOut(auth);
            window.location.href = "index.html";
        }, TIMEOUT_DURATION);
    }

    // Function to start monitoring activity
    function startInactivityMonitor() {
        // Listen for any user activity
        document.addEventListener('click', resetInactivityTimer);
        document.addEventListener('keypress', resetInactivityTimer);
        document.addEventListener('mousemove', resetInactivityTimer);
        document.addEventListener('scroll', resetInactivityTimer);

        // start timer
        resetInactivityTimer();
    }

    // Function to stop monitoring (for cleanup)
    function stopInactivityMonitor() {
        clearTimeout(inactivityTimer);
        document.removeEventListener('click', resetInactivityTimer);
        document.removeEventListener('keypress', resetInactivityTimer);
        document.removeEventListener('mousemove', resetInactivityTimer);
        document.removeEventListener('scroll', resetInactivityTimer);
    }

    // Moved addToList function to top because it was defined inside the button click event, so loadUserData can't see it.
    // Success functions:

    /**
     * @param {{item: string, id: string}} data
     */

    // refactoring delete btn so this function handles the delete button logic instead
    async function handleDeleteButton (itemId, listItemElement) {
        try {
            const user = auth.currentUser;
            
            await updateDoc(doc(db, 'users', user.uid, 'shoppingList', itemId), {
                hidden: true
            });
            listItemElement.remove();
            
            console.log("item hidden");

        } catch (error) {
            console.error("Delete failed", error);
        }

    }

    async function handleAddQtyBtn (itemId, quantity) {
        try {
            const user = auth.currentUser;
                await updateDoc(doc(db, 'users', user.uid, 'shoppingList', itemId), {
                quantity: quantity + 1,
                timestamp: new Date().toISOString(),
            });
            console.log(quantity);
            console.log("new quantity added");
            
            

        } catch (error) {
            console.error("Add failed", error);
        }
    }

    
    async function handleMinusQtyBtn (itemId, quantity) {
        try {
            if (quantity <= 1){

                return;
            }
            const user = auth.currentUser;
                await updateDoc(doc(db, 'users', user.uid, 'shoppingList', itemId), {
                quantity: quantity - 1,
                timestamp: new Date().toISOString(),
            });
            console.log(quantity);
            console.log("Quantity removed by 1");

            
            
            

        } catch (error) {
            console.error("Minus failed", error);
        }
    }


    

    function addToList(data) {
        
        // console.log("item ID:", data.id);
        // console.log("item name:", data.item);
        // console.log("quantity:", data.quantity);
        // console.log("Full data object", data);
        // console.log("category name:", data.category); // prior to this, it would not work until I added category to the loadUserData function in line 315
        
        
        const myList = document.getElementById("myList"); //get the list container        
        const listItem = document.createElement("li"); //create a new list item
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button"); 
        const cancelButton = document.createElement("button"); 
        const plusBtn = document.createElement("button");
        const minusBtn = document.createElement("button");;
        


        // Sets up edit/update mode tracking.
        listItem.setAttribute('data-edit-mode', 'false');

        // This variable will set the first letter in the string to uppercase.
        const capitalizedItem = data.item.charAt(0).toUpperCase() + data.item.slice(1);

        // Safer approach -  textContent
        const strong = document.createElement("strong");
        strong.textContent = capitalizedItem;
        listItem.appendChild(strong);

        // category printing to the browser

        const category = document.createElement("span"); // uses color as part of text
        category.textContent = data.category;
        listItem.appendChild(category); 

        // quantity prints to the DOM
        const quantity = document.createElement("span");
        //quantity.textContent = data.quantity; // try using the ${}
        quantity.textContent = (`Qty: ${data.quantity}`);
        
        // listItem.appendChild(quantity);
        // listItem.appendChild(plusBtn);
        // listItem.appendChild(minusBtn);

        // quantity.style.marginLeft = "10px";
        // quantity.style.fontWeight = "bold";

        
        // category css to add padding
        category.style.marginLeft = "10px";


        // changes made 6/19/26
        const qtyContainer = document.createElement("div");
        qtyContainer.classList.add("qty-controls");

        qtyContainer.appendChild(plusBtn);
        qtyContainer.appendChild(quantity); // the span
        qtyContainer.appendChild(minusBtn);
        

        listItem.appendChild(qtyContainer);
        /*
        put code here to color the categories
        Try hardcoding the Categories to have colors
        */
        if (category.textContent === "Dairy") {
            category.style.color = "#1F51FF";
            category.style.fontWeight = "bold";
        }
        else if (category.textContent === "Produce") {
            category.style.color = "Green";
            category.style.fontWeight = "bold";
        }
        else if (category.textContent === "Grocery") {
            category.style.color = "#4A0404";
            category.style.fontWeight = "bold";
        }
        else if (category.textContent === "Meat") {
            category.style.color = "#701705";
            category.style.fontWeight = "bold";
        }
        else if (category.textContent === "Frozen Food") {
            category.style.color = "Blue";
            category.style.fontWeight = "bold";
        }
        else if (category.textContent === "Fish / Seafood") {
            category.style.color = "#E3735E";
            category.style.fontWeight = "bold";
        }
        else {
            category.style.color = "lightgray";
        }

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.id = "newItem" 
        newInput.name = "updatedItem";
        newInput.value = strong.textContent;

        const newTimeStamp = new Date().toISOString();

        // This formats how the list will look (inline css)
        listItem.style.cssText = 
        `
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f8ff;
            border-left: 4px solid #4CAF50;
            border-radius: 4px;
        `;

        //btn css
        // Set up the delete button - eventually this should be in it's own css.
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.background = "";
        deleteButton.style.color = "black";

        // set up edit button
        editButton.textContent = "Edit";
        editButton.style.marginLeft = "10px";
        editButton.style.background = "";
        editButton.style.color = "black";

        // edit btn properties
        editButton.type = "button";
        editButton.id = "edit"

        // Plus and minus button attributes
        plusBtn.textContent = "+";
        plusBtn.type = "button";
        plusBtn.classList.add("qty-btn");

        minusBtn.textContent = "-";
        minusBtn.type = "button";
        minusBtn.classList.add("qty-btn");
        
  
        // cancel button style: - might be useful later for the user if that accidentally hit cancel, but not using now
        cancelButton.textContent = "Cancel";
        cancelButton.style.marginLeft = "10px";
        cancelButton.style.background = "";
        cancelButton.style.color = "black";
        
        // quantity plus logic
        plusBtn.addEventListener('click', async () => {
            
            await handleAddQtyBtn(data.id, data.quantity );
        
            console.log("plus button clicked");
            loadUserData();
        })

        // this will allow the user to hide (soft delete)  the item from the window, but will remain in the db.
        deleteButton.addEventListener('click', async () => {

            await handleDeleteButton(data.id, listItem);
            // maybe conditional stmt goes here?
   
        })

        // qty minus logic
        minusBtn.addEventListener('click', async () => {

            await handleMinusQtyBtn(data.id, data.quantity);
            
            console.log("minus button clicked");

            console.log("data.quqntity:" + data.quantity);

            if (data.quantity === 0) {
                console.log("the item is now zero")
            }

            if (data.quantity < 0) {
                data.quantity = 0;
            }

            loadUserData();
        })

        cancelButton.addEventListener('click', async () => {
            try {
                // Reset everything back to non-edit mode
                strong.style.display = "";              // Show the item's text
                newInput.style.display = "none";        // Hide the input
                cancelButton.style.display = "none";    // Hide the cancel button   
                deleteButton.style.display = "";        // Show the delete button
                editButton.textContent = "Edit";        // Reset the edit button's text to Edit

                // Very important: Reset the edit-mode state to 'false'
                listItem.setAttribute('data-edit-mode', 'false');
                //call the loadUserData function so that if the user wishes not to make any edits, they can click cancel without entering aa new item and avoid experiencing additional bugs in the code.
                loadUserData(); 
            } catch (error) {
                console.error("Cancel Failed:", error);
            }
        })
        
        // set up the edit button
        editButton.addEventListener('click', async () => {

            // Rate limiting code here
            const now = Date.now();
            if (now - lastSubmitTime < 1000) { // 1 second cooldown
                return; // Exit if clicked too fast 
            }
            lastSubmitTime = now;
            
            
            // check if we're currently editing, this variable establishes a baseline that isEditing must equal 'true'
            const isEditing = listItem.getAttribute('data-edit-mode') === 'true';
   
            if (!isEditing) {
                // User is not editing, and they wish to, they  click the Edit button showing the input text field
                strong.style.display = "none";
                deleteButton.style.display = "none"; 
                listItem.appendChild(newInput);
                // - Change button text to "Save"
                editButton.textContent = "Save";
                listItem.setAttribute('data-edit-mode', 'true');
                
                console.log("After if statement:");
                console.log("Edit mode status:", listItem.getAttribute('data-edit-mode')); // should now be 'true' which breaks user from this condition


                cancelButton.style.display = ""; // this shows the cancel button if they wish to exit 'data-edit-mode' from true -> false
                listItem.appendChild(cancelButton);

                
                

            } else {
                // EXITING edit mode (saving)
                // - Get the new value from input
                const newValue = newInput.value;
                // const newTextInput = newInput.getElementById("input");
                const newTextInput = document.getElementById("newItem");

                // nothing checks if newValue is valid.. 
                
                function validateItemName(newValue) {
                    if (!newValue.trim()) {
                        return { 
                            valid: false, 
                            error: "please add an item" };
                    }
                    if (newValue.length > 20) {
                        return { valid: false, error: "Item name is too long!"};
                    }
                    return { valid: true };
                }
        
                const validateNewItem = validateItemName(newValue);

                // check if this breaks...
                if(!validateNewItem.valid) {
                    alert(validateNewItem.error);
                    return;
                }

                console.log(`newInput or New item: ${newValue}`); // this is a string
                console.log(`new Text: ${newTextInput.value}`); // this is an object
                // console.log(typeof newTextInput);
                // console.log(typeof newValue);




                // ** EDIT - UPDATES THE DATABASE **
                try {
                    //Get currently logged in user
                    const user = auth.currentUser;

                    // add new category and quantity option
                    await updateDoc(doc(db, 'users', user.uid, 'shoppingList', data.id), {
                    item: newValue, // This was original
                    timestamp: newTimeStamp, // This might work...
                    });


                    loadUserData();
                } catch (error) {
                    console.error("Update to the db failed:", error);
                }

                listItem.setAttribute('data-edit-mode', 'false');
            }


        })

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        
        // this function should be called last
        myList.appendChild(listItem);

        
    
    } // end of addToList(data) function    

    
    // Function to load existing user data
    async function loadUserData(){
        try {
            const user = auth.currentUser;
            if (!user) return;   // if there is no user exit the function immediately

            //const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'posts'));
            const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'shoppingList'));
            
            // Clear the list first
            const myList = document.getElementById("myList");
            myList.innerHTML = "";

            /** useful console log... */
            // console.log("Found", querySnapshot.size, 'documents');

            // Use regular for loop as you wanted to practice to write all data written to the db to the DOM.
            const docs = querySnapshot.docs;
        
            /**
             ****
             This for loop is where you have access to each item's data
             ****
             */    

            let allItems = [];
            



            /**
             * IMPORTANT LOOP - This for loop loops through the database (the lengthe of the docs length) and adds the content of the db to that array. When it came to rendering the quantity to the DOM without having quantity: data.quantiy the info could be written to the db from the user, but wasn't able to be written to the DOM unit that property was
             * 
             */

            // Stage 1: Collect, loops through the firestore doc and gather everything not hidden, no rendereing just raw data.
            for (let i = 0; i < docs.length; i++) {
                const doc = docs[i];
                const data = doc.data();

                if (!data.hidden) {
                    allItems.push({
                        item: data.item,
                        id: doc.id,
                        category: data.category, 
                        quantity: parseInt(data.quantity ?? 1)
                        // the above qty changes the undefined content to show as 1 - this is a nullish opperator
                    });
                }
            }
            
            // filter() hands me one item at a time. This asks a boolean question about each item
            // filtered is an array.
            let filtered = allItems.filter(function(item) {
                // console.log("Checking item:", item.item, "| currentSearch is: ", currentSearch, "| current filter: ", currentFilter);
                 console.log("Checking item:", item.item, "| current filter: ", currentFilter, "| current qty: ", item.quantity);    

                // Question 1 - does the category match?
                let categoryMatch;
                if (currentFilter === "All") {
                    categoryMatch = true; // pass everything through
                } else {
                    categoryMatch = item.category === currentFilter;
                }
                
                // Question 2 - does the name contain the seach text?
                let nameMatch = item.item.toLowerCase().includes(currentSearch.toLowerCase());
                
                // Both MUST be yes to allow the list to be written to the DOM
                return categoryMatch && nameMatch 

                // anything after return in line 400 is dead in the water
            }); // end of filtered array
            
            //** NO Results Logic */
            let notFound = document.getElementById("noResults");
            
            if (currentSearch.length === 0) {
                // console.log ("Empty string");
                notFound.hidden = true;
            } else if (filtered.length > 0) {
                notFound.hidden = true;
                
            } else {
                notFound.hidden = false;
            }

            // console.log(currentSearch.length);
            // console.log(filtered.length);
        
                        
            // Stage 3: Display - if currentFilter is assigned to Dairy then dairy items will load to the list.
            for (let i = 0; i < filtered.length; i++) {
                addToList(filtered[i]);
            }
            
            // console.log('Loaded ShoppingList from DB', querySnapshot.size, 'items from database');
            
        } catch (error) {
            console.error("Error loading user data:", error);
        }

    
    }   // end of loadUserData function    


        // Undefined Check Function


        // Set attributes for clearSearch - advised to keep 
        const clearSearch = document.getElementById("clear"); 

        clearSearch.onclick = () => {
            //console.log("the x was clicked");

            currentSearch = searchInput.value = ""; // works, but doesn't reset the filter list without putting currentSearch to the left of the searchInput.value = "";

            clearSearch.hidden = true; 

            // you need to call the function again inside the click event.
            loadUserData();
        }
   
    /**
     * ****
     * DOM CONTENT LOADED SECTION
     * ****
     */
    // Code for writing to and reading from the DOM and to the DB
    document.addEventListener("DOMContentLoaded", () => {
        
        const button = document.getElementById("connect"); // Add to List button
        const logOut = document.getElementById("logOut");
        const itemInput = document.getElementById("itemName");
        const searchInput = document.getElementById("searchInput");
        const itemQuantity = document.getElementById("itemNumber");


        // Listen for when a user presses a key in the text field
        itemInput.addEventListener("keypress", function(event) {
                // check if the key they pressed was Enter (strict equality) - checks if the vals are equal AND the same type.
                if (event.key === "Enter") {
                    // stop the page from refreshing
                    event.preventDefault();

                    // Act as though they clicked the button instead
                    button.click();
                }
        })

        // Seach input filter:
        searchInput.addEventListener("input", () => {

            // this tracks and updates what the user inputs
            currentSearch = searchInput.value;

            // console.log(currentSearch.length); // prints to the console the string count (length) durning each iteration

            // searchInput.appendChild(clearSearch); // didn't work
            
            clearSearch.textContent = "X";
            clearSearch.style.fontWeight = "bold";
            
            
            // Add a clear search button — an X that appears only when the search field has text
            if (currentSearch.length > 0) {
                clearSearch.hidden = false;
            } else {
                clearSearch.hidden = true;
            }

            // Show a 'no results' message — displayed when the filtered array is empty
            

            // call loadUser function
            loadUserData(); 
            
        })

        // get user profile 'first name' from Firestore
        async function getUserProfile(userId) {
            try {
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    return userDocSnap.data();
                } else {
                    console.log("No user profile found");
                    return null;
                } 
            } catch (error) {
                console.error("Error getting user profile:", error);
                return null;
            }
        }

        // Check authentication and load data (remember use async when querying a db)
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // User is not logged in
                stopInactivityMonitor();
                window.location.href = "index.html"
            } else {
                // This log will tell you who is logged in at the moment.
                // console.log("The User currntly logged in:", user.email);

                // Start inactivity timer
                startInactivityMonitor();

                // get the user's profile data from Firestore
                const userProfile = await getUserProfile(user.uid);

                // greet the user with their first name
                const greeting = document.getElementById("greeting");
                if (greeting && userProfile) {
                    greeting.textContent = `Welcome back, ${userProfile.firstName}!`;
                } else if (greeting) {
                    // Fallback to email if no profile found
                    greeting.textContent = `Welcome back, ${user.email}!`;
                }

                loadUserData();
            }
        });
        
        // Outside the event listener - pure validation logic for itemName
        function validateItemName(itemName) {
            if (!itemName.trim()) {
                return { 
                    valid: false, 
                    error: "please add an item" };
            }
            if (itemName.length > 20) {
                return { valid: false, error: "Item name is too long!"};
            }
            return { valid: true };
        }

        /*
        *****
        SORT BY CATEGORY BUTTON logic: This is housed within the DOMContentLoaded listener.
        This is where the filter buttons are generated. Below creates the button with the category titles
        *****
        */

        const sortDiv = document.getElementById("sort"); // gets the div elemnt in html with id tag 'sort'.

        CATEGORIES.forEach(function(value) {
            const categoryButton = document.createElement("button"); 
            categoryButton.type = "button";
            categoryButton.textContent = value;
            categoryButton.dataset.category = value;
            // button styles are in styles.css
            categoryButton.classList.add("category-btn"); // see Changelog 
            // categoryButton.className = "category"; // class name for categoryButton

            

            // This is where we can create an event lister for on click events 
            categoryButton.addEventListener("click", function() {
                console.log("Clicked: ", value);
                // Filter Logic will go here
                // I want to see if I can get Dairy to filter here
                // assign a value to currentFilter

                
                currentFilter = value; 
                
                loadUserData(); 

                let filterButtons = sortDiv.children;

                for(let i = 0; i < sortDiv.children.length; i++){
                //  console.log(i + " " + test[i].textContent);
                filterButtons[i].classList.remove("active");
                }

                categoryButton.classList.add("active");

                
            });
            
            sortDiv.appendChild(categoryButton);

            
        }); // end of categories for each
        
        // console.log("sortDiv Length: Not an array, error expected: " +sortDiv.length);
        // console.log("sortDiv children: " + sortDiv.children); // returns [HTMLCollection]
        // console.log("sortDiv querySelector: " + sortDiv.querySelectorAll(".category-btn")); // returnes [object NodeList]


        // The Database logic - Outside the event listener 
        async function saveItemToDatabase(userId, itemName, category, quantity) {
            const docRef = await addDoc(collection(db, 'users', userId, 'shoppingList'), {
                item: itemName,
                category: category, 
                quantity: quantity,
                timestamp: new Date().toISOString(),
                hidden: false
            });

            

            return docRef;
        }
        
        /*
        ****
        The code below reads the input from the DOM, validates the item, and pushes it to the db then clears the form
        ****
        */

        // The button event is the meat and potatoes of this app. This button once cliced adds an item to the user's shopping list
        button.addEventListener("click", async () => {
            
            // Rate limiting code here
            const now = Date.now();
            if (now - lastSubmitTime < 1000) { // 1 second cooldown
                return; // Exit if clicked too fast 
            }
            lastSubmitTime = now;
            
            const itemName = document.getElementById("itemName").value;
            const categoryName = document.getElementById("categories").value;
            const quantity = parseInt(document.getElementById("itemNumber").value); // ensures quantity is an int.
            // console.log(categoryName);

            
            // Validation 
            const validation = validateItemName(itemName);
            if (!validation.valid) {
                alert(validation.error);
                return;
            }

            // Save to Database
            button.disabled = true;
            button.textContent = "Adding...";

            try {
                const user = auth.currentUser;
                const docRef = await saveItemToDatabase(user.uid, itemName, categoryName, quantity);
                addToList({
                    item: itemName,
                    category: categoryName,
                    quantity: quantity,
                    id: docRef.id
                });

                // clear the From
                document.getElementById("itemName").value = "";
            } catch (error) {
                console.error("Firestore Error:", error);
                alert("Failed to add item to list");
            } finally {
                button.disabled = false;
                button.textContent = "Add to List";
            }

            // everything input by the user is of type string
            //console.log(typeof(itemName));
            console.log(`the item: ${itemName}, is of type: ${typeof(itemName)}`);
            console.log(`the category selected: ${categoryName} and the quantity of: ${quantity}`);
            
            
            

        });

        

        /*
        ************************
        LOG OUT FUNCTIONALITY BELOW
        ************************
        */
        // Logout functionality
        logOut.addEventListener("click", async (e) => {
            e.preventDefault();

        try {
            await signOut(auth);
            console.log("user logged out");
            window.location.href = 'index.html';
        } catch (error) {
            console.log("An error occured with logout");
            alert("Log out failed. Please try again");
        }

        }); // end of Log out listener

    }); // end of DOMContentLoaded