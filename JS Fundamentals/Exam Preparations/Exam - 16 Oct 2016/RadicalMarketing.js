function markering(input) {

    let log = new Map();
    let people = new Map();

    for (let i = 0; i < input.length; i++) {
        let current = input[i].split('-');

        if (current.length === 2) {
            if (log.has(current[0]) && log.has(current[1])) {
                log.get(current[1]).add(current[0]);
                people.get(current[0]).add(current[1]);
            }
        } else {
            if (!log.has(current[0])) {
                log.set(current[0], new Set());
                people.set(current[0], new Set());
            }
        }
    }

    let sortedLog = new Map([...log.entries()].sort(function (first, second) {
        let firstName = first[0];
        let firstSubscribers = first[1].size;

        let secondName = second[0];
        let secondSubscribers = second[1].size;

        let result = secondSubscribers - firstSubscribers;

        if (result === 0) {
            let firstSubscriptions = people.get(firstName).size;
            let secondSubscriptions = people.get(secondName).size;

            result = secondSubscriptions - firstSubscriptions;
        }

        return result;
    }));

    let mostImportant = [...sortedLog.entries()][0];
    console.log(mostImportant[0]);

    let count = 1;
    mostImportant[1].forEach(function (el) {
        console.log(count + '. ' + el);
        count++;
    });
}

markering([
    'A',
    'B',
    'C',
    'D',
    'A-B',
    'B-A',
    'C-A',
    'D-A'
]);