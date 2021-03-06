function rosetta(input) {
    let size = Number(input[0]);

    let template = [];
    let i;
    for (i = 1; i < 1 + size; i++) {
        template.push(input[i]);
    }

    let matrix = [];

    for (i; i < input.length; i++) {
        matrix[i - 1 - size] = input[i]
            .split(' ').map(Number);
    }

    let templateNum = [];
    for (let el of template) {
        templateNum.push(el.split(' ').map(Number));
    }

    let result = '';
    for (let rows = 0; rows < matrix.length; rows++) {
        for (let cols = 0; cols < matrix[rows].length; cols++) {
            let current = matrix[rows][cols];
            let modifier = templateNum[rows % templateNum.length][cols % templateNum[0].length];
            result += String.fromCharCode(((current + modifier) % 27) + 64);
        }
    }

    result = result.replace(/@/g, ' ');
    console.log(result.trim());
}

rosetta([
    '2',
    '31 32',
    '74 37',
    '19 0 23 25',
    '22 3 12 17',
    '5 9 23 11',
    '12 18 10 22'
]);

function author(input) {
    // Get size of code
    let n = Number(input.shift());

    // Initialize code matrix
    let code = [];
    for (let i = 0; i < n; i++) {
        code.push(input.shift().split(' ').map(Number));
    }

    // Initialize message matrix
    let matrix = [];
    for (let row of input) {
        matrix.push(row.split(' ').map(Number));
    }

    // Initialize decoded message
    let result = '';

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col< matrix[0].length; col++) {
            let current = matrix[row][col];
            let modifier = code[row % code.length][col % code[0].length];
            result += String.fromCharCode(((current + modifier) % 27) + 64);
        }
    }

    result = result.replace(/@/g, ' ');
    console.log(result);
}