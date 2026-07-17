## Development Log

### Recent Development (v1.4.0)
- **Partial updates with `updateDoc()`**: The +/- buttons send only
  `{ quantity }`. `updateDoc()` merges rather than replaces, so the item
  name and category survive every click.
- **Classes for repeated elements**: Buttons generated once per item use
  classes, not IDs — `getElementById` only returns the first match.

**What I built**
Polished the quantity controls so the minus button, quantity, and plus
button read as one unit, and changed the plus/minus buttons from IDs to
classes.

**How it works**
I wrapped the three quantity elements (minus, span, plus) in a single
`div.qty-controls`. Before this they were direct children of the `<li>`,
sitting in a flat pile next to the item name, category, and edit/delete
buttons — which made them hard to style as a group. The wrapper gives me
one handle: the CSS rule `.qty-controls { display: inline-flex; gap: 4px;
align-items: center; }` aligns all three as a unit instead of styling three
loose siblings.

I also swapped the plus/minus button IDs for classes (`qty-btn`). The
duplicate IDs didn't break my click handlers, because I attach listeners
directly to the element references (`plusBtn`, `minusBtn`), not via
`getElementById`. They matter because `getElementById` returns only the
first match — so any future lookup by that ID would silently grab the wrong
item's button. Classes are the right tool for elements created repeatedly
(once per item via `addToList`).

**Key learning — updateDoc merges**
The + and - buttons call `updateDoc(ref, { quantity })`. `updateDoc` merges:
it changes only the fields I pass and leaves the rest alone, so `item` and
`category` survive every click. If I'd used `setDoc(ref, { quantity })`
instead, it would replace the whole document and wipe the name and category
on every click.

**error → cause → fix**
Error: multiple elements sharing the same ID.
Cause: used `element.id =` inside `addToList`, which runs once per list item.
Fix: use `classList.add()` instead.

**Principle**
Repetition decides the tool: repeats → class; truly unique → ID.

## 2026-05-25

**What I built:**
All quantity amount that are on the user's list now has a value of at least one even if they had a prior list from an old release.

**How it works:**
Items that were previously entered without a value show as undefined. The fix
is to us Nullish Coalescing ( ?? ) in the for loop of stage 1 of collecting the data from the db.

**Why ?? and not ||:**
|| would also replace 0 with 1, which would be wrong if 
someone intentionally set a quantity to 0. The current code has a set min val of 1 but in general,
?? only replaces null and undefined — truly missing values.

Pattern: Fix data at the source, not at the symptom
When to use: Any time a value is wrong/missing downstream
Question to ask: "Where does this value first exist in my code?"
Example: quantity ?? 1 belonged in Stage 1 (collect), 
         not Stage 2 (filter) where I first noticed the bug

## 2026-05-24

successfully created a quantity field for the usere and it feeds
to the database so new inputs show an item's quantity along with it's category.

**Roadblocks: Gettingg the Quantity to equal 1 when prior inputs were undefined**

### Dead code after return
Symptom: code "did nothing," no error.
Cause: I put logic AFTER `return` in the filter callback — 
       unreachable, never executed.
Rule: nothing after `return` in the same block ever runs.
       When code seems to do nothing, ask "is it even reachable?"
       BEFORE asking "is it correct?"

### 2026-05-17 — No results message added

**What I built:** A "No items found" message that appears when the 
user's search text doesn't match any items on the list, and 
disappears when results exist or the search is cleared.

**How it works:** After the filter runs, an if statement checks two 
things: is the search field empty, and does filtered.length have 
any items? If the user has typed something and filtered.length is 
zero, the message is shown by setting hidden = false. Otherwise 
it stays hidden.

**Key learnings:**
- `loadUserData()` is already called on every keystroke by the 
  search listener, so the if statement runs fresh automatically 
  each time — no additional loop needed.
- In event-driven programming, you don't write loops that wait for 
  things to happen. Event listeners call your functions when 
  something changes. The function runs, does its job, and stops.
- When stuck, check what existing functions are already doing 
  before adding new logic — the answer is often already there.

### 2026-05-09 - Live search complete

<!-- Added a top-level variable currentSearh to index.js and updated the event listener to the DOM so the user input could be listend for updated the filter() function within loadUserData() function so that the user input text could be checked to include the current text input. -->
**What I built:** A real-time search bar that filters the shopping 
list as the user types, working simultaneously with the category filter.

**How it works:** Added a module-level `currentSearch` variable to 
track the search term. The `searchInput` event listener updates 
`currentSearch` on every keystroke and calls `loadUserData()` to 
re-render. Inside `loadUserData()`, the filter stage checks two 
conditions: category match AND name match. Both must be true for 
an item to appear.

**Key learnings:**
- State variables are silent — updating `currentSearch` alone does 
  nothing visible. You always need to pair a state change with the 
  function that re-renders the screen (`loadUserData()`).
- Added a `console.log` inside the filter to prove `currentSearch` 
  was visible inside `loadUserData()`. Logging at each step — 
  listener, state variable, filter — is how you bridge the gap 
  between what you expect and what's actually happening.
- `.includes()` combined with `.toLowerCase()` on both sides makes 
  the search case-insensitive without needing extra logic.

### 2026-05-02 — Active button highlight complete

**What I built:** The selected category filter button now stays highlighted 
so the user always knows which filter is active.

**How it works:** Inside the category button click listener, I loop through 
`sortDiv.children` to remove the "active" class from all buttons first, 
then add "active" to the button that was clicked. The CSS rule 
`.category-btn.active` controls what the highlighted button looks like.

**Key learnings:**
- `sortDiv.children` returns an HTMLCollection, not an array. You can loop 
  through it with a for loop using an index `[i]`, but you can't call 
  methods like `.remove()` on the whole collection — only on individual 
  elements inside it.
- `toggle` was the wrong tool because "category-btn" was already on every 
  button — toggling it just removed the class entirely. The right pattern 
  is `remove` from all, then `add` to the clicked one.
- `active` is not a built-in browser class — it's a name I created. CSS 
  and JavaScript just need to agree on the same name.

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