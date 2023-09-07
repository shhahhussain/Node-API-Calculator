function calculateExpression(expression) {
    const operandStack = [];
    const operatorStack = [];

    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    function performOperation(operator) {
        const b = operandStack.pop();
        const a = operandStack.pop();
        const c = Number(a);
        const d = Number(b);
        switch (operator) {
            case '+':
                operandStack.push(c + d);
                break;
            case '-':
                operandStack.push(c - d);
                break;
            case '*':
                operandStack.push(c * d);
                break;
            case '/':
                if (d === 0) {
                    throw new Error("Division by zero is undefined");
                }
                operandStack.push(c / d);
                break;
        }
    }

    for (const token of expression.split(' ')) {
        if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                performOperation(operatorStack.pop());
            }
            operatorStack.pop(); 
        } else if (!isNaN(token)) {
            operandStack.push(token);
        } else if (token in operators) {
            while (
                operatorStack.length > 0 &&
                operators[operatorStack[operatorStack.length - 1]] >= operators[token]
            ) {
                performOperation(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length > 0) {
        performOperation(operatorStack.pop());
    }

    return operandStack[0];
}

module.exports = {
    calculateExpression,
};
