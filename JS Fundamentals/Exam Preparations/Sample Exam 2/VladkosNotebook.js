function book(input) {

    let result = {};
    let output = {};

    for (let line of input) {
        let [color, prop, value] = line.split('|');

        if (!result[color]) {
            result[color] = {
                opponents: [],
                wins: 0,
                losses: 0
            };
        }

        switch (prop) {
            case 'age':
                //result[color][prop] = value;
                //break;
            case 'name':
                result[color][prop] = value;
                break;
            case 'win':
                result[color].wins += 1;
                result[color].opponents.push(value);
                break;
            case 'loss':
                result[color].losses += 1;
                result[color].opponents.push(value);
                break;
        }

    }

    let sortedColors = Object.keys(result).sort();

    for (let color of sortedColors) {
        let rank = ((result[color].wins + 1) / (result[color].losses + 1)).toFixed(2);

        if (!result[color].name || !result[color].age) {
            continue;
        }

        output[color] = {
            age: result[color].age,
            name: result[color].name,
            opponents: result[color].opponents.sort(),
            rank: rank
        }
    }

    console.log(JSON.stringify(output));
}

book([
    'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'blue|loss|Pesho'
]);