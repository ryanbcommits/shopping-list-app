export function getCategoryColor(category: string): { color: string; bold: boolean} {
    if (category === "Dairy") {
        return { color: "#1F51FF", bold: true }
}
else if (category === "Produce") {
    return { color: "Green", bold: true }
}
else if (category === "Grocery") {
    return { color: "#4A0404", bold: true }
}
else if (category === "Meat") {
    return { color:"#701705", bold: true } 

}
else if (category === "Frozen Food") {
    return { color: "Blue", bold: true } 
   
}
else if (category === "Fish / Seafood") {
    return { color: "#E3735E", bold: true } 
}
else {
    return { color: "lightgray", bold: false }
}
}

