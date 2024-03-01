const express = require('express')  // We import the express application
const dotenv = require("dotenv").config()
const app = express() // Creates an express application in app
const cors = require('cors')
const currencyRouter = require("./routes/currency");
const countryRouter = require("./routes/country");
const countryNameRouter = require("./routes/contryName");
const {unknownEndpoint, logger} = require("./utils/middleware");
const { performConnection } = require('./db')

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
// allow express use front end build
// app.use(express.static('dist'))
app.use(logger)

//Make db connection
performConnection()


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})
app.use('/', currencyRouter)
app.use('/', countryRouter)
app.use('/', countryNameRouter)
app.use(unknownEndpoint)


const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
})

module.exports = server
