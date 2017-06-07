function aggregate(table) {
    let sum = 0, list = [];
    for (let line of table) {
        let townData = line.split('|');
        let townName = townData[1].trim();
        income = Number(townData[2]);
        list.push(townName);
        sum += income;
    }

    console.log(list.join(', ') + '\n' + sum);
}

aggregate(
    ['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']);