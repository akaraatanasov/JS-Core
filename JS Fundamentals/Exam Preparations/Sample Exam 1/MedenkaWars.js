function wars(input) {

    let damageNaskor = 0;
    let damageVitkor = 0;

    let prevDamageV = -1;
    let counter1 = 0;

    let prevDamageN = -1;
    let counter2 = 0;

    for (let line of input) {
        let arr = line.split(' ');
        let damage = Number(arr[0]);
        let attacker = arr[1];

        if (attacker === 'dark') {
            if(prevDamageN === damage) {
                counter2++;

                if(counter2 === 2) {
                    damage *= 2.75;
                    counter2 = 0;
                }
            } else {
                prevDamageN = damage;
                counter2 = 1;
            }

            damageNaskor += damage * 60;

        } else if (attacker === 'white') {
            if(prevDamageV === damage) {
                counter1++;

                if(counter1 === 5) {
                    damage *= 4.5;
                    counter1 = 0;
                }
            } else {
                prevDamageV = damage;
                counter1 = 1;
            }

            damageVitkor += damage * 60;
        }

    }

    if (damageVitkor > damageNaskor) {
        console.log('Winner - Vitkor');
        console.log(`Damage - ${damageVitkor}`);
    } else if (damageNaskor > damageVitkor) {
        console.log('Winner - Naskor');
        console.log(`Damage - ${damageNaskor}`);
    }
}

wars([
    '2 dark medenkas',
    '1 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas',
    '15 white medenkas',
    '2 dark medenkas',
    '2 dark medenkas'
]);