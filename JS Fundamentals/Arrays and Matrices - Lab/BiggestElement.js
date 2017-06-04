function biggest(matrix) {
    let biggestNum = Number.NEGATIVE_INFINITY;

    matrix.forEach(row => row.forEach(e => {if (e > biggestNum) { biggestNum = e }}));

    return biggestNum;
}

function biggest(matrix) {
    let biggestNum = Number.NEGATIVE_INFINITY;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let number = matrix[row][col];
            if (number > biggestNum) {
                biggestNum = number;s
            }
        }
    }

    return biggestNum;
}

console.log(biggest([[20, 50, 10], [8, 33, 145]]));