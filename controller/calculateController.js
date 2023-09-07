const { calculateExpression } = require('../model/calculateModel');

const evaluateExpression = (req, res) => {
    const expression = req.body.expression;

    if (!expression) {
        return res.status(400).json({ error: 'Expression not provided' });
    }

    function unmatchedParanthesis(s) {
        const openingBracket = '(';
        const closingBracket = ')';
        const stack = [];
        for (const char of s) {
            if (openingBracket.includes(char)) {
                stack.push(char);
            } else if (closingBracket.includes(char)) {
                const lastClosingbracket = stack.pop();
                if (lastClosingbracket !== openingBracket) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }

    if (!unmatchedParanthesis(expression)) {
        return res.status(400).json({ error: "Unmatched Parenthesis" });
    }

    try {
        const result = calculateExpression(expression);
        return res.json({ result });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    evaluateExpression,
};
