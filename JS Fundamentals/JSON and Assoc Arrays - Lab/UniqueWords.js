function extract(input) {
    let text = input.join('\n');
    let result = new Set();

    let words = text.split(/\W+/)
        .filter(e => e !== '')
        .map(e => e.toLowerCase())
        .forEach(e => result.add(e));

    console.log([...result].join(', '));
}

extract([
    'JS devs use Node.js for server-side JS.',
    'JS devs use JS.',
    '-- JS for devs --'
]);