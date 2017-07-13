function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

let expect = require('chai').expect;

describe("Test summator", function () {
    it("Should return 3 for [1,2]", function () {
        expect(sum([1, 2])).to.equal(3);
    });

    it("Should return 6 for [1,2,3]", function () {
        expect(sum([1, 2, 3])).to.equal(6);
    });

    it("Should return 0 for []", function () {
        expect(sum([])).to.equal(0);
    });

    it("Should return 3 for ['1',2]", function () {
        expect(sum(['1', 2])).to.equal(3);
    });

    it("Should return NaN", function () {
        expect(sum(['pesho', 2, 3])).to.be.NaN;
    });

    it("Should return 3.3", function () {
        expect(sum([1.1, 1.1, 1.1])).to.be.closeTo(3.3, 0.0001);
    });

    it("Should work with negative numbers", function () {
        expect(sum([-1, -2, 5])).to.equal(2);
    });

    it("Should return 3.3", function () {
        expect(sum([1.1, 1.1, 1.1])).to.be.closeTo(3.3, 0.0001);
    });

    it("Should return NaN", function () {
        expect(sum('pesho')).to.be.NaN;
    });
});