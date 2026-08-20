export function validateItemName(itemName: string): { valid: boolean; error?: string } {
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