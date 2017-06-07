function capture(input) {
    let regex = /[\d]+/g;
    let result = [];
    for (let line of input) {
        if (line.match(regex) !== null) {
            let arr = line.match(regex);
            arr.forEach(x => result.push(x));
        }
    }

    console.log(result.join(' '));
}

capture([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'
]);