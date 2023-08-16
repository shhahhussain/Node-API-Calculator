const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function calculateExpression(expression) {
    const multiplicationAndDivision = [];
    const additionAndSubtraction = [];
    const operandStack = [];

    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    function performOperation(operator) {
        const b = operandStack.pop();
        const a = operandStack.pop();
        const c = Number(a)
        const d = Number(b)
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
        if(isNaN((token)) && token!=='+'  && token!=='-'  && token!=='/'  && token!=='*'){
            throw new Error("Invalid input ! Kindly check your input");
        }
        if (!isNaN((token))) {
            operandStack.push((token));
        } else if (token in operators) {
            if (token === '*' || token === '/') {
                while (
                    multiplicationAndDivision.length > 0 &&
                    operators[multiplicationAndDivision[multiplicationAndDivision.length - 1]] >= operators[token]
                ) {
                    const operator = multiplicationAndDivision.pop();
                    performOperation(operator);
                }
                multiplicationAndDivision.push(token);
            } else if (token === '+' || token === '-') {
                while (
                    additionAndSubtraction.length > 0 &&
                    operators[additionAndSubtraction[additionAndSubtraction.length - 1]] >= operators[token]
                ) {
                    const operator = additionAndSubtraction.pop();
                    performOperation(operator);
                }
                additionAndSubtraction.push(token);
            }
        }
    }

    while (multiplicationAndDivision.length > 0) {
        performOperation(multiplicationAndDivision.pop());
    }

    while (additionAndSubtraction.length > 0) {
        performOperation(additionAndSubtraction.pop());
    }

    return operandStack[0];
}

app.post('/evaluate', (req, res) => {
    const expression = req.body.expression;

    if (!expression) {
        return res.status(400).json({ error: 'Expression not provided' });
    }

    function unmatchedParanthesis(s) {
        const openingBracket = '(';
        const closingBracket = ')'
        const stack = []
        for (const char of s) {
            if (openingBracket.includes(char)) {
                stack.push(char)
            } else if (closingBracket.includes(char)) {
                const lastClosingbracket = stack.pop()
                if (lastClosingbracket !== openingBracket) {
                    return false
                }
            }
        }
        return stack.length === 0
    }
    if (!unmatchedParanthesis(expression)) {
        return res.status(400).json({ error: "Unmatched Paranthesis" })
    }
    try {
        const result = calculateExpression(expression);
        return res.json({ result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});