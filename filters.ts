import type { ShoppingItem } from './types';

export function matchesFilter(item: ShoppingItem, currentFilter: string, currentSearch: string): boolean {
    let categoryMatch: boolean;
    if (currentFilter === "All") {
        categoryMatch = true;
    } else {
        categoryMatch = item.category === currentFilter;
    }
    let nameMatch = item.item.toLowerCase().includes(currentSearch.toLowerCase());
    return categoryMatch && nameMatch;
}


