function occurrences(text, word) {
    let regex = new RegExp("\\b" + word + "\\b", "gi");
    let result = text.match(regex);

    if (result !== null) {
        console.log(result.length);
    } else {
        console.log(0);
    }
}

occurrences('The waterfall was so high, that the child couldn’t see its peak.', 'tef');