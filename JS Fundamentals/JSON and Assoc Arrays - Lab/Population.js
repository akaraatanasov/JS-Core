function population(input) {
    let towns = new Map();

    for (let row of input) {
        let [name, population] = row.split(' <-> ');
        if (!towns.has(name)) {
            towns.set(name, 0);
        }
        towns.set(name, towns.get(name) + Number(population));
    }

    [...towns].forEach(([town, population]) => console.log(`${town} : ${population}`));
}

population([
'Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000'
]);