let Person = require('./Person');

class Student extends Person {
    constructor(name, phrase, dog, id) {
        super(name, phrase, dog);
        this.id = id;
    }

    saySomething() {
        return `Id: ${this.id} ` + super.saySomething();
    }
}

module.exports = Student;