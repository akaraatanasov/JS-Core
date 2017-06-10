function inventory(input) {
    let heros = [];

    for (let i = 0; i < input.length; i++) {
        let current = input[i].split(" / ");

        let name = current[0];
        let level = Number(current[1]);

        let items = []
        if (current.length > 2) {
            items = current[2].split(", ");
        }

        let hero = {
            name: name,
            level: level,
            items: items
        };

        heros.push(hero);
    }

    console.log(JSON.stringify(heros));
}

inventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);