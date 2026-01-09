## Development Log

### 2026-01-08: Edit Validation Complete
**What I built:** Added input validation to the edit/save flow

**Edge cases tested:**
- ✅ Empty input → Shows "please add an item" alert, blocks save
- ✅ 21+ characters → Shows "Item name is too long!" alert, blocks save  
- ✅ Special characters (`<script>`) → Saved safely (textContent sanitizes display)

**Key learning:** 
- `newInput` is an HTML element, `newInput.value` is the string
- Validation belongs in the `else` block (save), not the `if` block (entering edit mode)