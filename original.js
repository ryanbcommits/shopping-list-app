        // //origianl
        // button.addEventListener("click", async () => {
            
        //     // Rate limiting code here
        //     const now = Date.now();
        //     if (now - lastSubmitTime < 1000) { // 1 second cooldown
        //         return; // Exit if clicked too fast 
        //     }
        //     lastSubmitTime = now;
            
        //     const itemName = document.getElementById("itemName").value;

        //     // validate items exist
        //     if(!itemName.trim()) {
        //         alert("please add an item to the shopping list");
        //         return;
        //     }

        //     if (itemName.length > 20) {
        //         alert("Item name is too long! Please keep it under 20 characters.");
        //         return;
        //     }
        //     // code is not quite right... need all the string to be numbers
        //     let test = false;
        //     // for(let i=0; i < itemName.length; i++){
        //     //     if (itemName[i] >= '102') {
        //     //         test = true;
        //     //         alert("item cannont contain just numbers");
        //     //         return;
        //     //     }
        //     // }

        //     // everything input by the user is of type string
        //     //console.log(typeof(itemName));
        //     console.log(`the item: ${itemName}, is of type: ${typeof(itemName)}`);

        //     // Loop through the item entered in list
        //     // check for special characters * (35 - )
        //     for (let i = 0; i < itemName.length; i++) {
                
        //         // if (condition) {
        //         //     // code goes here
        //         // }
        //     }


        //     button.disabled = true;
        //     button.textContent = "Adding...";

        //     try {
        //         // Get currently logged-in user
        //         const user = auth.currentUser; 
                
                
        //         const docRef = await addDoc(collection(db, 'users', user.uid, 'shoppingList'), {
        //             item: itemName,
        //             timestamp: new Date().toISOString(),
        //             hidden: false
        //         });

        //         // Clear form
        //         document.getElementById("itemName").value = "";
                
        //         // add to list display
        //         addToList({
        //             // name: username,
        //             // age: userAge,
        //             // email: email,
        //             // id: docRef.id
        //             item: itemName,
        //             id: docRef.id,
        //         });

        //         } catch (error) {
        //             console.error('Firestore error:', error);
        //             alert("Failed to add an item. Please try again");
        //         } finally {
        //             button.disabled = false;
        //             button.textContent = "Add to List";
        //         }
        // });