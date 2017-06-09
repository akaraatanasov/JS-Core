function lowest(input) {
    let result = new Map();

    for (let row of input) {
        let [town, product, price] = row.split(' | ').filter(e => e !== '');

        if (!result.has(product)) {
            result.set(product, new Map());
        }
        result.get(product).set(town, Number(price));
    }

    for (let [product, townPrice] of result) {
        let lowestPrice = Number.POSITIVE_INFINITY;
        let lowestTown = '';

        for (let [town, price] of townPrice) {
            if (price < lowestPrice) {
                lowestPrice = price;
                lowestTown = town;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${lowestTown})`);
    }
}

lowest([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'
]);