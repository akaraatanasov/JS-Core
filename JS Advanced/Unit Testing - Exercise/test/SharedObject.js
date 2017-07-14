let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};

document.body.innerHTML = `<body>
    <div id="wrapper">
        <input type="text" id="name">
        <input type="text" id="income">
    </div>
</body>`;

describe('Shared Object Unit Tests', () => {
   describe('Initial value tests', () => {
      it('test name initial value', () => {
          expect(sharedObject.name).to.be.null;
      });

       it('test name income value', () => {
           expect(sharedObject.income).to.be.null;
       });
   });

    describe('changeName tests', () => {
        it('with an empty string (name should be null', () => {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });

        it('with a non-empty string (name should not be null', () => {
            sharedObject.changeName('Pesho');
            expect(sharedObject.name).to.be.equal('Pesho', 'Name did not change correctly');
        });

        describe('Name input tests', () => {
            it('with an empty string (name should be null', () => {
                sharedObject.changeName('Nakov');
                sharedObject.changeName('');
                let nameTxtVal = $('#name');
                expect(nameTxtVal.val()).to.be.equal('Nakov', 'Name did not change correctly');
            });

            it('with a non-empty string (name should be null', () => {
                sharedObject.changeName('Pesho');
                let nameTxtVal = $('#name');
                expect(nameTxtVal.val()).to.be.equal('Pesho', 'Name did not change correctly');
            });

            it('with a non-empty string (name should not be null', () => {
                sharedObject.changeName('Pesho');
                expect(sharedObject.name).to.be.equal('Pesho', 'Name did not initialize correctly');
            });
        })
    });

    describe('changeIncome tests', () => {
        it('with a string (should stay null)', () => {
            sharedObject.updateIncome('d');
            expect(sharedObject.income).to.be.null;
        });

        it('with a positive number (should change correctly)', () => {
            sharedObject.changeIncome(5);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly');
        });

        it('with a floating-point', () => {
            sharedObject.updateIncome(5);
            sharedObject.updateIncome(4.11);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly');
        });

        it('with a negative number', () => {
            sharedObject.updateIncome(5);
            sharedObject.updateIncome(-4);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly');
        });

        it('with zero', () => {
            sharedObject.updateIncome(5);
            sharedObject.updateIncome(0);
            expect(sharedObject.income).to.be.equal(5, 'Income did not change correctly');
        });

        describe('income input tests', () => {
            it('with a string (should not change correctly)', () => {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome('d');
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly');
            });

            it('with a positive number', () => {
                sharedObject.changeIncome(5);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly');
            });

            it('with a floating-point number', () => {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(2.11);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly');
            });

            it('with a negative number', () => {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(-5);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly');
            });

            it('with zero', () => {
                sharedObject.changeIncome(5);
                sharedObject.changeIncome(0);
                let incomeTxt = $('#income');
                expect(incomeTxt.val()).to.be.equal('5', 'Income input did not change correctly');
            });
        });
    });

    describe('updateName tests', () => {
        it('with an empty string (should not change property)', () => {
            sharedObject.changeName('Viktor');
            let nameEl = $('#name');
            nameEl.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Viktor', 'Name did not update correctly');
        });

        it('with a non-empty string (should change property)', () => {
            sharedObject.changeName('Viktor');
            let nameEl = $('#name');
            nameEl.val('Kiril');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('Kiril', 'Name did not update correctly');
        });
    });

    describe('updateIncome tests', () => {
        it('with a string (should not change income property)', () => {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('income');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly');
        });

        it('with a floating-point (should not change income property)', () => {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('3.11');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly');
        });

        it('with a negative number (should not change income property)', () => {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('-5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly');
        });

        it('with zero (should not change income property)', () => {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('0');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not update correctly');
        });

        it('with positive integer (should change income property)', () => {
            sharedObject.changeIncome(3);
            let incomeEl = $('#income');
            incomeEl.val('5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(5, 'Income did not update correctly');
        });
    });
});