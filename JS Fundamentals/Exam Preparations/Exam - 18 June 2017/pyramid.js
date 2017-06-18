function pyramid(base, increment) {
    //let base = Number(input[0]);
    //let increment = Number(input[1]);

    let totalStone = 0;
    let totalMarble = 0;
    let totalLapis = 0;
    let totalGold = 0;
    let totalHeight = 0;

    while (base > 0) {
        totalHeight++;

        if (base === 2 || base === 1) {
            totalGold += base * base * increment;
        } else {
            let total = base * base;
            let stonePart = base - 2;
            let totalStonePart = stonePart * stonePart;
            let totalOther = total - totalStonePart;

            if (totalHeight % 5 === 0) {
                totalLapis += totalOther * increment;
            } else {
                totalMarble += totalOther * increment;
            }
            totalStone += totalStonePart * increment;
        }

        base -= 2;
    }

    console.log(`Stone required: ${Math.ceil(totalStone)}`);
    console.log(`Marble required: ${Math.ceil(totalMarble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(totalLapis)}`);
    console.log(`Gold required: ${Math.ceil(totalGold)}`);
    console.log(`Final pyramid height: ${Math.floor(totalHeight * increment)}`);
}

pyramid([
    '11',
    '0.75'
]);