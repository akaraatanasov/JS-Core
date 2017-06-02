function calculator(a ,b, operation) {
    function calculate(a, b, op) {
        return op(a, b);
    }
    
    let add = function (a, b) {
        return a + b;
    };
    let sub = function (a, b) {
        return a - b;
    };
    let mult = function (a, b) {
        return a * b;
    };
    let div = function (a, b) {
        return a / b;
    };

    switch (operation) {
        case '+':
            return calculate(a, b, add);
        case '-':
            return calculate(a, b, sub);
        case '*':
            return calculate(a, b, mult);
        case '/':
            return calculate(a, b, div);
    }
}

console.log(calculator(3, 2, 'add'));