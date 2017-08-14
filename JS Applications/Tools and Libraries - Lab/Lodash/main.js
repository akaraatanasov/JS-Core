let _ = require('lodash');

for (var i = 0; i < 10; i++) {
    console.log(_.random(10, 30));
}

let personA = {
    "name": "Pesho",
    "car": "ford",
    "age": 23,
    sayHi: () => console.log('Hi!')
};

let personB = _.omit(personA, ['car', 'sayHi']);
console.log(personB);

let personC = _.cloneDeep(personA);
console.log(personA === personC);
personB
