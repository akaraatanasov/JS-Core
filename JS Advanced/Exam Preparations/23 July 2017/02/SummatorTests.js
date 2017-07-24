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

let expect = require('chai').expect;

describe('Sorted List Unit Tests', function () {
    let mySumator;
    beforeEach(function () {
        mySumator = new Sumator();
    });

    describe('Test initial state', function () {
        it('add exist', function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.equal(true);
        });

        it('sumNums exist', function () {
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.equal(true);
        });

        it('removeByFilter exist', function () {
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.equal(true);
        });

        it('toString exist', function () {
            expect(Sumator.prototype.hasOwnProperty('toString')).to.equal(true);
        });

        it('data is empty', function () {
            expect(mySumator.toString()).to.equal('(empty)');
        });
    });

    describe('Test add', function () {
        it('with one element (string)', function () {
            mySumator.add('one');
            expect(mySumator.toString()).to.equal('one');
        });

        it('with one element (int)', function () {
            mySumator.add(1);
            expect(mySumator.toString()).to.equal('1');
        });

        it('with one element (decimal)', function () {
            mySumator.add(1.1);
            expect(mySumator.toString()).to.equal('1.1');
        });

        it('with many elements', function () {
            mySumator.add(1);
            mySumator.add(2);
            mySumator.add("three");
            mySumator.add(4);
            expect(mySumator.toString()).to.equal('1, 2, three, 4');
        });
    });

    describe('Test sumNums', function () {
        it('with empty data', function () {
            expect(mySumator.sumNums()).to.equal(0);
        });

        it('with one number', function () {
            mySumator.add(2);
            expect(mySumator.sumNums()).to.equal(2);
        });

        it('with many numbers', function () {
            mySumator.add(1);
            mySumator.add(2);
            mySumator.add(3);
            mySumator.add(4);
            mySumator.add(5);
            expect(mySumator.sumNums()).to.equal(15);
        });

        it('with many numbers and non-numbers', function () {
            mySumator.add(1);
            mySumator.add(2.2);
            mySumator.add('three');
            mySumator.add(4);
            mySumator.add('five');
            expect(mySumator.sumNums()).to.equal(7.2);
        });
    });

    describe('Test removeByFilter', function () {
        it('with valid parameter (remove every parameter)', function () {
            mySumator.add(1);
            mySumator.add(2);
            mySumator.add("three");
            mySumator.add(4);
            mySumator.add(7.7);
            mySumator.removeByFilter(x => x);
            expect(mySumator.toString()).to.equal('(empty)');
        });

        it('with valid parameter (remove even nums)', function () {
            mySumator.add(1);
            mySumator.add(2);
            mySumator.add("three");
            mySumator.add(4);
            mySumator.add(7.7);
            mySumator.removeByFilter(x => x % 2 === 0);
            expect(mySumator.toString()).to.equal('1, three, 7.7');
        });

        it('with valid parameter (remove odd nums)', function () {
            mySumator.add(1);
            mySumator.add(2);
            mySumator.add("three");
            mySumator.add(4);
            mySumator.add(7.7);
            mySumator.removeByFilter(x => x % 2 === 1);
            expect(mySumator.toString()).to.equal('2, three, 4, 7.7');
        });
    });
});