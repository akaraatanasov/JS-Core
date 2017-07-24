class Sumator {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    sumNums() {
        let sum = 0;
        for (let item of this.data)
            if (typeof (item) === 'number')
                sum += item;
        return sum;
    }
    removeByFilter(filterFunc) {
        this.data = this.data.filter(x => !filterFunc(x));
    }
    toString() {
        if (this.data.length > 0)
            return this.data.join(", ");
        else
            return '(empty)';
    }
}

let list = new Sumator();

list.add(1);
list.add(2);
list.add("three");
list.add(4);
list.add(7.7);
console.log(`list = [${list}]`);
console.log("sum = " + list.sumNums());
list.removeByFilter(x => x % 2 === 1);
console.log(`list = [${list}]`);