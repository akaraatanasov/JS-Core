function employee(data) {
    let regex = /^([A-Z][a-zA-Z]*) - (\d*) - ([A-Za-z0-9 \-]+)$/;
    let result = [];
    for (let empl of data) {
        let match = regex.exec(empl);
        if (match === null) continue;
        result.push(`Name: ${match[1]}
Position: ${match[3]}
Salary: ${match[2]}`);
    }

    return result.join('\n');
}