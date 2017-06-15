function spice(input) {
    let sYield = Number(input);
    let total = 0;
    let days = 0;

    while (sYield >= 100) {
        days++;
        total += (sYield - 26);
        sYield -= 10;
    }

    if (total >= 26){
        total -= 26;
    }

    console.log(days);
    console.log(total);
}

spice(['200']);