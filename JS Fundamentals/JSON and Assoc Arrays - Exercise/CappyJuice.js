function cappy(input) {
    let quantities = {};
    let bottles = {};

    for (let line of input) {
        let [juice, liters] = line.split(' => ');

        if (!quantities.hasOwnProperty(juice)) {
            quantities[juice] = 0;
        }
        quantities[juice] += Number(liters)
        if (quantities[juice] >= 1000) {
            bottles[juice] = parseInt(quantities[juice] / 1000);
        }
    }

    for (let key of Object.keys(bottles)) {
        console.log(`${key} => ${bottles[key]}`);
    }
}

cappy([
    'Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]);