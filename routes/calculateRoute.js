const express = require('express');
const router = express.Router();
const { evaluateExpression } = require('../controller/calculateController');

router.post('/evaluate', evaluateExpression);

module.exports = router;
