function info() {
    let argumentTypes = {};

    for (let arg of arguments) {
        console.log(`${typeof arg}: ${arg}`);

        if (!argumentTypes.hasOwnProperty(typeof arg)) {
            argumentTypes[typeof arg] = 0;
        }
        argumentTypes[typeof arg]++;
    }

    for (let argumentType in argumentTypes) {
        if (argumentTypes.hasOwnProperty(argumentType)) {
            let element = argumentTypes[argumentType];
            console.log(`${argumentType} = ${element}`);
        }
    }
}

info('cat', 42, function () { console.log('Hello world!'); });