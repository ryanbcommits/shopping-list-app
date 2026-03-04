## Development Log

### 2026-03-03
Filtering has two steps: update the state variablel, then re-render. The variable remembers the choice, the function does the work.

Original code:

```
let filtered = allItems.filter(function(item) {
    return item.category === currentFilter;
});


// Stage 3: Display, I loooped through allItems instead of the filtered variable I created.

    for (let i = 0; i < allItems.length; i++) {
        addToList(allItems[i]);
    }

    console.log('Loaded ShoppingList from DB', querySnapshot.size, 'items from database');

```



### 2026-03-01
**Why not one loop**


Old Loop in the loadUserData() function.

```

    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        const data = doc.data();
        if (!data.hidden) {
            addToList({
                item: data.item,
                id: doc.id, 
                category: data.category 
            });
        }
    }
```

If I try to filter inside the Firestore loop, I can't apply a second filter without another if statement. Separating collect/filter/display keeps each stage focused on one job."


// 1. Collect
let allItems = [];
rawData.forEach(item => allItems.push(item));

// 2. Filter
let filtered = allItems.filter(/* your condition */);

// 3. Display
filtered.forEach(item => renderItem(item));

The array between collect and display is a pause point. It's where I can ask questions about all the data before committing to rendering anything.

What's breaking without this - Without the pause point, adding a second filter (like search) would require nesting more if statements inside the Firestore loop, making the code fragile and hard to read.

### 2026-01-08: Edit Validation Complete
**What I built:** Added input validation to the edit/save flow

**Edge cases tested:**
- ✅ Empty input → Shows "please add an item" alert, blocks save
- ✅ 21+ characters → Shows "Item name is too long!" alert, blocks save  
- ✅ Special characters (`<script>`) → Saved safely (textContent sanitizes display)

**Key learning:** 
- `newInput` is an HTML element, `newInput.value` is the string
- Validation belongs in the `else` block (save), not the `if` block (entering edit mode)