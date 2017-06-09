function towns(input) {
    input.shift();
    let towns = [];

    for (let line of input) {
        let result = line.split('|')
            .filter(e => e !== '')
            .map(e => e.trim());

        let town = {
            Town: result[0],
            Latitude: Number(result[1]),
            Longitude: Number(result[2])
        };
        towns.push(town);
    }

    return JSON.stringify(towns);
}

console.log(towns(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']));
