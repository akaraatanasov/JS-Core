function orbit(arr) {
    let dimensions = Number(arr[0]);
    let positions = Number(arr[1]);
    let rows = dimensions;
    let cols = positions;
    let starRow = Number(arr[2]);
    let starCol = Number(arr[3]);

    let matrix = [];
    for(let i=0; i<rows; i++) {
        matrix.push([]);
    }

    for(let row = 0; row< rows; row++) {
        for(let col=0; col<cols; col++) {
            matrix[row][col] = Math.max(Math.abs(row - starRow), Math.abs(col - starCol)) + 1;
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
}