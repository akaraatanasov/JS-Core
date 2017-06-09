function wordsCount(input) {
    let words = input.join('\n')
        .toLowerCase()
        .split(/[^a-zA-Z0-9_]+/)
        .filter(e => e !== '');

    let wordCount = new Map();

    for (let w of words) {
        if (wordCount.has(w)) {
            wordCount.set(w, wordCount.get(w) + 1);
        } else {
            wordCount.set(w, 1);
        }
    }

    let allWords = Array.from(wordCount.keys()).sort();

    allWords.forEach(w => console.log(`'${w}' -> ${wordCount.get(w)} times`));
}

wordsCount([
    'JS devs use Node.js for server-side JS.',
    'JS devs use JS.',
    '-- JS for devs --'
]);