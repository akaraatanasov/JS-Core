function createList() {
    let data = [];
    return {
        add: function (item) {
            data.push(item)
        },
        shiftLeft: function () {
            if (data.length > 1) {
                let first = data.shift();
                data.push(first);
            }
        },
        shiftRight: function () {
            if (data.length > 1) {
                let last = data.pop();
                data.unshift(last);
            }
        },
        swap: function (index1, index2) {
            if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
                !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
                index1 === index2) {
                return false;
            }
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            return true;
        },
        toString: function () {
            return data.join(", ");
        }
    };
}

let expect = require('chai').expect;

describe('Unit Tests',function () {
    let list;
    beforeEach(function () {
        list = createList();
    });

    describe('Test initial state',function () {
        it('should return empty ToString',function () {
            expect(list.toString()).to.equal('','collection is not empty')
        })
    });
    describe('Test Add functionality',function () {
        it('should add correct at the end of the list',function () {
            list.add(2);
            list.add(1);
            list.add('abc');
            expect(list.toString()).to.equal('2, 1, abc','Did not add correctly')
        })
    });
    describe('Test ShiftLeft functionality',function () {
        it('should shiftLeft first to become last',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.shiftLeft();
            expect(list.toString()).to.equal('two, 3, 1')
        })
    });
    describe('Test ShiftRight functionality',function () {
        it('should shiftRight last become first',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.shiftRight();
            expect(list.toString()).to.equal('3, 1, two')
        })
    });
    describe('Test Swap functionality',function () {
        it('test with invalid index1(float)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(1.2,2);
            expect(list.swap(1.2,2)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        })
        it('test with invalid index1(array)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap([1,2],2);
            expect(list.toString()).to.equal('1, two, 3')
        })
        it('test with invalid index1(string)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap('one',2);
            expect(list.swap('one',2)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index1(negative)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(-1,1);
            expect(list.swap(-1,1)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index1(bigger than length)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(4,1);
            expect(list.swap(4,1)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index1(equal length)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(3,0);
            expect(list.swap(3,0)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });

        //index2

        it('test with invalid index2(float)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(0,1.2);
            expect(list.swap(0,1.2)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        })
        it('test with invalid index2(array)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(0,[1,2]);
            expect(list.toString()).to.equal('1, two, 3')
        })
        it('test with invalid index2(string)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(1,'two');
            expect(list.swap(1,'two')).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index2(negative)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(1,-2);
            expect(list.swap(1,-2)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index2(bigger than length)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(1,4);
            expect(list.swap(1,4)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });
        it('test with invalid index2(equal length)',function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.swap(0,3);
            expect(list.swap(0,3)).to.equal(false)
            expect(list.toString()).to.equal('1, two, 3')
        });

        //index1 === index2

        it('test with equal indexes should return false',function () {
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);
            list.swap(1,1)
            expect(list.swap(2,2)).to.equal(false);
            expect(list.toString()).to.equal('1, 2, 3, 4')
        })

        it('test without indexes should return false and not change collection',function () {
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);
            list.swap()
            expect(list.swap()).to.equal(false);
            expect(list.swap(2)).to.equal(false);
            expect(list.toString()).to.equal('1, 2, 3, 4')
        })
        //Correct indexes
        //index1
        it('test with Correct index1 should swap correctly',function () {
            list.add('four');
            list.add('two');
            list.add(3);
            list.add(1);
            list.swap(0,3);
            expect(list.toString()).to.equal('1, two, 3, four')
        })
        it('test with Correct index1 should swap correctly',function () {
            list.add('four');
            list.add('two');
            list.add(3);
            list.add(1);
            list.swap(0,3);
            expect(list.swap(0,3)).to.equal(true)
        })
        //index2
        it('test with Correct index2 should swap correctly',function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(2,0)
            expect(list.toString()).to.equal('three, two, one')
        })
        it('test with Correct index1 should swap correctly',function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(2,0)).to.equal(true)
        })
        it('test with Correct index1 should swap correctly',function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(1,2)).to.equal(true)
        })
        it('test with Correct index2 should swap correctly',function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1,2)
            expect(list.toString()).to.equal('one, three, two')
        })
    })

})