function solve(input) {

    let regex = /([^=&?]+)=([^=&?]+)/g;
    let whitespaceRegex = /(\+|%20)+/g;

    for (let line of input) {
        let currentLine = line;
        let lineObject = {};

        let match = regex.exec(currentLine);

        while (match) {
            let key = match[1]
                .replace(whitespaceRegex, ' ')
                .trim();

            let value = match[2]
                .replace(whitespaceRegex, ' ')
                .trim();

            if (!lineObject[key]) {
                lineObject[key] = [];
            }

            lineObject[key].push(value);

            match = regex.exec(currentLine);
        }

        let output = '';

        for (let i in lineObject) {
            output += i + '=[' + lineObject[i].join(', ') + ']';
        }

        console.log(output);
    }
}

solve([
    'foo=%20foo&value=+val&foo+=5+%20+203',
    'foo=poo%20&value=valley&dog=wow+',
    'url=https://softuni.bg/trainings/coursesinstances/details/1070',
    'https://softuni.bg/trainings.asp?trainer=nakov&course=oop&course=php'
]);