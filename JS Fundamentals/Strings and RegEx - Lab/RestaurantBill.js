function bill(input) {
    let products = [];
    let total = 0;

    for (let i = 0; i < input.length; i+=2) {
        let product = input[i].trim();
        let price = Number(input[i + 1]);
        products.push(product);
        total += price;
    }

    console.log(`You purchased ` + products.join(', ') + ` for a total sum of ${total}`);
}

bill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);