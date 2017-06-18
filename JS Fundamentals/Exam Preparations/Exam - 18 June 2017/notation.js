function notation(input) {
    let operands = [];

    for (let line of input) {
        if (isNaN(line)) {
            switch (line) {
                case '+': {
                    let secondOperand = operands.pop();
                    let firstOperand = operands.pop();
                    operands.push(firstOperand + secondOperand);
                } break;
                case '-': {
                    let secondOperand = operands.pop();
                    let firstOperand = operands.pop();
                    operands.push(firstOperand - secondOperand);
                } break;
                case '*': {
                    let secondOperand = operands.pop();
                    let firstOperand = operands.pop();
                    operands.push(firstOperand * secondOperand);
                } break;
                case '/': {
                    let secondOperand = operands.pop();
                    let firstOperand = operands.pop();
                    operands.push(firstOperand / secondOperand);
                } break;
                default: break;
            }

        } else {
            operands.push(line);
        }
    }

    if (operands.length > 1) {
        console.log('Error: too many operands!');
    } else if (isNaN(operands[0])) {
        console.log('Error: not enough operands!');
    } else {
        console.log(operands[0]);
    }
}

notation([
    7,
    8,
    '-'
]);
