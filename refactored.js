
// Outside the event listener - database logic
async function saveItemToDatabase(userId, itemName) {
    const docRef = await addDoc(collection(db, 'users', userId, 'shoppingList'), {
        item: itemName,
        timestamp: new Date().toISOString(),
        hidden: false
    });
    return docRef;
}

// INSIDE the event listener - but now it's clear and readable
button.addEventListener("click", async () => {
    // Rate limiting
    if (!canSubmit()) return;

    const itemName = document.getElementById("itemName").value;
    
   const validation = validatItemName(itemName)
    if (!validation.valid) {
        alert(Validation.error);
        return;
    }

    // Save to database 
    button.disabled = true;
    try {
        const user = auth.currentUser;
        const docRef = await saveItemToDatabase(user.uid, itemName);
        addToList({
            item: itemName,
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
});
 