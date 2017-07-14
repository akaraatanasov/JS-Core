let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('Math Enforcer Unit Tests', () => {
    describe('addFive', () => {
        it('with a string (should return undefined)', () => {
            let result = mathEnforcer.addFive('nakov');
            expect(result).to.be.equal(undefined, 'Add five function did not work correctly!')
        });

        it('with positive number (should return number + 5)', () => {
            let result = mathEnforcer.addFive(4);
            expect(result).to.be.equal(9, 'Add five function did not work correctly!')
        });

        it('with negative number (should return number + 5)', () => {
            let result = mathEnforcer.addFive(-4);
            expect(result).to.be.equal(1, 'Add five function did not work correctly!')
        });

        it('with positive number (should return number + 5)', () => {
            let result = mathEnforcer.addFive(3.14);
            expect(result).to.be.closeTo(8.14, 0.01, 'Add five function did not work correctly!');
        });
    });

    describe('subtractTen', () => {
        it('with a string (should return undefined)', () => {
            let result = mathEnforcer.subtractTen('nakov');
            expect(result).to.be.equal(undefined, 'Subtract ten function did not work correctly!')
        });

        it('with positive number (should return number - 10)', () => {
            let result = mathEnforcer.subtractTen(14);
            expect(result).to.be.equal(4, 'Subtract ten function did not work correctly!')
        });

        it('with negative number (should return number - 10)', () => {
            let result = mathEnforcer.subtractTen(-4);
            expect(result).to.be.equal(-14, 'Subtract ten function did not work correctly!')
        });

        it('with positive number (should return number - 10)', () => {
            let result = mathEnforcer.subtractTen(15.14);
            expect(result).to.be.closeTo(5.14, 0.01, 'Subtract ten function did not work correctly!');
        });
    });

    describe('sum', () => {
        it('first num as a string (should return undefined)', () => {
            expect(mathEnforcer.sum('p', 2)).to.be.undefined;
        });

        it('second num as a string (should return undefined)', () => {
            expect(mathEnforcer.sum(2, 'p')).to.be.undefined;
        });

        it('with two positive numbers (should return correct sum)', () => {
            expect(mathEnforcer.sum(5, 5)).to.be.equal(10, 'Sum did not return correct value!');
        });

        it('with two negative numbers (should return correct sum)', () => {
            expect(mathEnforcer.sum(-5, -5)).to.be.equal(-10, 'Sum did not return correct value!');
        });

        it('with two floating-point numbers (should return correct sum)', () => {
            expect(mathEnforcer.sum(5.05, 5.06)).to.be.equal(10.11, 'Sum did not return correct value!');
        });
    });
});