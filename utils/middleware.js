const {HTTP_CODE} = require("../constants/httpCodes");
const morgan = require('morgan')
const {createWriteStream} = require("fs");
const {join} = require("path");

// create a write stream (in append mode)
const accessLogStream = createWriteStream(join('./', 'access.log'), { flags: 'a' })
// setup the logger
morgan.token('body', (req, res) =>  JSON.stringify(req.body));
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :body'
const logger = morgan(loggerFormat, { stream: accessLogStream })


const unknownEndpoint = ((req, res) => {
    res.status(HTTP_CODE.NOT_FOUND).send({ error: 'unknown endpoint'  })
})

module.exports = {
    unknownEndpoint,
    logger
}