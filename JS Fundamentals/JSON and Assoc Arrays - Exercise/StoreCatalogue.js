function store(input) {
    let result = new Map();

    for (let line of input) {
        let [product, price] = line.split(' : ');
        result.set(product, price);
    }

    let initials = new Set();
    Array.from(result.keys()).forEach(k => initials.add(k[0]));

    for (let char of Array.from(initials.keys()).sort()) {
        console.log(char);

        for (let product of Array.from(result.keys()).sort()) {
            if(product.startsWith(char)) {
                console.log(`  ${product}: ${result.get(product)}`);
            }
        }
    }
}

store([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10'
]);