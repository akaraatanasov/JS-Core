function diagonal(matrix) {
    let biggest = Number.NEGATIVE_INFINITY;
    let main = 0, secondary = 0;

    for(let row = 0; row < matrix.length; row++) {
        main += matrix[row][row];
        secondary += matrix[row][matrix[row].length - row - 1];
    }

    console.log(`${main} ${secondary}`);
}

diagonal([[20, 40],
    [10, 60]]);