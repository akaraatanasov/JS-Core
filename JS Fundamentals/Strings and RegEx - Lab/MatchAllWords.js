function match(text) {
    if(Array.isArray(text)) text = text[0];
    let words = text.match(/\w+/g);
    return words.join('|');
}

console.log(match('A Regular Expression needs to have the global flag in order to match all occurrences in the text'));