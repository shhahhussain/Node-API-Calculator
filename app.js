const express = require('express');
const bodyParser = require('body-parser');
const logMiddleware = require('./middleware/logmiddleware');
const calculateRoute = require('./routes/calculateRoute');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(logMiddleware);

app.use('/api', calculateRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
