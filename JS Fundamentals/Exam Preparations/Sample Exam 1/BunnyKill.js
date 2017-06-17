function bunny(input) {
    let bunnyMatrix = [];
    let coordinates;

    let totalDamage = 0;
    let bunnysKilled = 0;

    for (let i = 0; i < input.length; i++) {
        if (i !== input.length - 1) {
            let arrRow = input[i].split(' ').map(Number);
            bunnyMatrix.push(arrRow);
        } else {
            coordinates = input[i].split(' ');
        }
    }

    for (let bombBunny of coordinates) {
        bunnysKilled++;
        let [bombRow, bombCol] = bombBunny.split(',').map(Number);
        let bombBunnyDmg = bunnyMatrix[bombRow][bombCol];
        totalDamage += bombBunnyDmg;
        bunnyMatrix[bombRow][bombCol] = 0;
        let affectedBunnys = [];

        let bunnyUL = [bombRow - 1, bombCol - 1];
        let bunnyU = [bombRow - 1, bombCol];
        let bunnyUR = [bombRow - 1, bombCol + 1];
        let bunnyL = [bombRow, bombCol - 1];
        let bunnyR = [bombRow , bombCol + 1];
        let bunnyDL = [bombRow + 1, bombCol - 1];
        let bunnyD = [bombRow + 1, bombCol];
        let bunnyDR = [bombRow + 1, bombCol + 1];

        affectedBunnys.push(bunnyUL);
        affectedBunnys.push(bunnyU);
        affectedBunnys.push(bunnyUR);
        affectedBunnys.push(bunnyL);
        affectedBunnys.push(bunnyR);
        affectedBunnys.push(bunnyDL);
        affectedBunnys.push(bunnyD);
        affectedBunnys.push(bunnyDR);

        for (let [row, col] of affectedBunnys) {
            if ((row >= 0 && row < bunnyMatrix.length) && (col >= 0 && col < bunnyMatrix[0].length)) {
                //checks if detonated another bombBunny
                for (let i = 0; i < coordinates.length; i++) {
                    let [bombR, bombC] = coordinates[i].split(',').map(Number);
                    if (bombR === row && bombC === col) {
                        coordinates.splice(i, 1);
                    }
                }

                bunnyMatrix[row][col] -= bombBunnyDmg;
                if (bunnyMatrix[row][col] < 0) {
                    bunnyMatrix[row][col] = 0;
                }
            }
        }
    }

    for (let rows = 0; rows < bunnyMatrix.length; rows++) {
        for (let cols = 0; cols < bunnyMatrix[rows].length; cols++) {
            if (bunnyMatrix[rows][cols] > 0) {
                totalDamage += bunnyMatrix[rows][cols];
                bunnysKilled++;
            }
        }
    }

    console.log(totalDamage);
    console.log(bunnysKilled);
}

bunny([
    '5 10 15 20',
    '10 10 10 10',
    '10 15 10 10',
    '10 10 10 10',
    '2,2 0,1'
]);