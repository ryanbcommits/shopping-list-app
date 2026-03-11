## Development Log

### 2026-03-10 — CSS override on hover issue

CSS override only works if both rules target the same property. 
If the specific rule doesn't mention a property at all, the less specific
rule still wins for that property.

### 2026-03-08 — CSS IDs can't have spaces
Tried to use the category name as the button ID for styling. Worked for 
"Dairy" and "Produce" but broke on "Frozen Food". 
Root cause: CSS IDs and classes cannot contain spaces.
Fix: use classList.add("category-btn") — one shared class for all buttons, 
styled once in CSS. Individual IDs per button weren't needed anyway.

### 2026-03-04

### Known UX issue — filter + add item
When a category filter is active, newly added items appear in the list 
even if they don't match the filter. Two possible fixes to consider later:
- Reset currentFilter to "All" after adding an item
- Call loadUserData() after adding instead of calling addToList() directly


### 2026-03-03 at 11:20 PM
**Solved:** Category filter is now working. Here's what was missing:

The following code shows I was on the right path, but I was missing some important code to get the code working the way I needed it to, see comments that say missing

```
let currentFilter = "All": // code I had right...

let filtered = allItems.filter(function(item) {
                if (currentFilter === "All") { // missing
                    return true; // missing
                }
                return item.category === currentFilter;
            });

//lines 488 - 496

// Add click listener 
categoryButton.addEventListener("click", function() {
    console.log("Clicked: ", value);
    // Filter Logic will go here
    // I want to see if I can get Dairy to filter here
    // assign a value to currentFilter
    currentFilter = value;         
    loadUserData();  // Missing 
});

The two missing pieces were the `currentFilter === "All"` guard clause 
so every item passes through by default, and calling `loadUserData()` 
inside the click listener — because updating a variable alone doesn't 
re-render anything, you have to explicitly trigger the work.

```


Filtering has two steps: update the state variablel, then re-render. The variable remembers the choice, the function does the work.



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