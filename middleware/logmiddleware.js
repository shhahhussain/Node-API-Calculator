const logMiddleware = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
    next();
};

module.exports = logMiddleware;
