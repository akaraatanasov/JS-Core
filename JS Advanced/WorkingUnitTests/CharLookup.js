function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

let expect = require('chai').expect;

describe('lookupChar', () => {
   it('with a non-string first parameter, should return undefined', () => {
       expect(lookupChar(13, 0)).to.equal(undefined, 'The function did not return the correct result!');
   });

    it('with a non-number second parameter, should return undefined', () => {
       expect(lookupChar('pesho', 'gosho')).to.equal(undefined, 'The function did not return the correct result!');
    });

    it('with a floating point number second parameter, should return undefined', () => {
        expect(lookupChar('pesho', 3.12)).to.equal(undefined, 'The function did not return the correct message!');
    });

    it('with an incorrect index value, should return incorrect index', () => {
        expect(lookupChar('gosho', 13)).to.equal('Incorrect index', 'The function did not return the correct value!');
    });

    it('with a negative index value, should return incorrect index', () => {
        expect(lookupChar('gosho', -1)).to.equal('Incorrect index', 'The function did not return the correct value!');
    });

    it('with an index value equal to string length, should return incorrect index', () => {
        expect(lookupChar('gosho', 5)).to.equal('Incorrect index', 'The function did not return the correct value!');
    });

    it('with an correct parameters, should return correct index', () => {
        expect(lookupChar('pesho', 0)).to.equal('p', 'The function did not return the correct value!');
    });

    it('with an correct parameters, should return correct index', () => {
        expect(lookupChar('stamat', 3)).to.equal('m', 'The function did not return the correct value!');
    });
});