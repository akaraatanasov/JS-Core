function count(input) {
    let text = input.join('\n');
    let words = text.split(/[^a-zA-Z0-9_]+/)
        .filter(w => w !== '');

    let wordsCount = {};

    for (let w of words) {
        if (wordsCount[w]) {
            wordsCount[w]++;
        } else {
            wordsCount[w] = 1;
        }
    }

    return JSON.stringify(wordsCount);
}

console.log(count(["Far too slow, you're far too slow"]));