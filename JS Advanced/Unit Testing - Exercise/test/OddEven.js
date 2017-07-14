function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe('isOddOrEven', () => {
   it('with a number parameter, should return undefined', () => {
       expect(isOddOrEven(13)).to.equal(undefined, 'Function did not return the correct result!');
   });

    it('with a object parameter, should return undefined', () => {
        expect(isOddOrEven({name: 'pesho'})).to.equal(undefined, 'Function did not return the correct result!');
    });

    it('with an even length string, should return correct result', () => {
        expect(isOddOrEven('roar')).to.equal('even', 'Function did not return the correct result!');
    });

    it('with an odd length string, should return correct result', () => {
        expect(isOddOrEven('pesho')).to.equal('odd', 'Function did not return the correct result!');
    });

    it('with multiple consecutive checks, should return correct values', () => {
        expect(isOddOrEven('cat')).to.equal('odd', 'Function did not return the correct result!');
        expect(isOddOrEven('alabala')).to.equal('odd', 'Function did not return the correct result!');
        expect(isOddOrEven('is it even')).to.equal('even', 'Function did not return the correct result!');
    });
});