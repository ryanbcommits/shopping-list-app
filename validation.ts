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
