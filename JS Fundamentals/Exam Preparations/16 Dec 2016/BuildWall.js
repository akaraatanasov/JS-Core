function wall(input) {
    let sections = input.map(Number);
    let dailyConcrete = [];
    let total = 0;


    for (let section of sections) {
        let days = 0;

        while (section < 30) {
            section++;

            if (dailyConcrete[days] === undefined) {
                dailyConcrete[days] = 195
            } else {
                dailyConcrete[days] += 195
            }

            total += 195;
            days++;
        }
    }

    console.log(dailyConcrete.join(', '));
    console.log(`${total * 1900} pesos`);
}

wall(['17', '22', '17', '19', '17']);