function attack(matrix) {
    let main = 0, secondary = 0;

    for (let row = 0; row < matrix.length; row++) {
        main += matrix[row][row];
        secondary += matrix[row][matrix[row].length - row - 1];
    }

    if (main == secondary) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (i == j || i + j + 1 == matrix.length) {
                    continue;
                } else {
                    matrix[i][j] = main;
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(" "));
    }
    //console.log(matrix.map(row => row.join(' ')).join('\n'));
}

attack([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]]);