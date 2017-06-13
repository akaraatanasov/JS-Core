function arithmephile(input) {
    let arr = input.map(Number);
    let products = [];

    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        if (curr >= 0 && curr <= 9) {
            let product = 1;
            for (let j = i + 1; j < i + 1 + curr && j < arr.length; j++) {
                product *= arr[j];
            }
            products.push(product);
        }
    }

    let result = Math.max(...products);
    console.log(result);
}

arithmephile([
    '100',
    '200',
    '2',
    '3',
    '2',
    '3',
    '2',
    '1',
    '1'
]);