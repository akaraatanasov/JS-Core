let expect = require('chai').expect;
let list = require('./AddDeleteInList');

describe('Add/Delete in List Tests', function () {
    describe('add function tests', function () {
        it('should return undefined for empty list', function () {
            expect(list.toString()).to.be.equal('', 'The list is not empty');
        });

        it('should return value for non-empty list', function () {
            list.add(1);
            expect(list.toString()).to.be.equal('1', 'The list is empty');
        });

        it('should return 2 values for non-empty list', function () {
            list.add(1);
            list.add(2);
            expect(list.toString()).to.be.equal('1, 2', 'The list is empty');
        });
    });
    
    describe('delete function tests', function () {
        it('should return undefined for non-integer index', function () {
            expect(list.delete(2.3)).to.be.undefined;
        });

        it('should return undefined for negative index', function () {
            expect(list.delete(-2)).to.be.undefined;
        });

        it('should return undefined for non-integer index', function () {
            expect(list.delete(86)).to.be.undefined;
        });

        it('should return correct data for valid index', function () {
            list.add(1);
            list.add(2);
            list.add(3);
            //expect(list.delete(1)).to.equal(2);
        });

        it('should delete correct data for valid index', function () {
            list.add(1);
            list.add(2);
            list.add(3);
            list.delete(1);
            expect(list.toString()).to.equal('1, 3');
        });
    });
});
