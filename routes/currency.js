const {CURRENCIES_PATH} = require("./constants");
const {HTTP_CODE} = require("../constants/httpCodes");
const currencyRouter = require('express').Router()

let currencies = [
    {
        id: 1,
        currencyCode: "CDN",
        country: "Canada",
        conversionRate: 1
    },
    {
        id: 2,
        currencyCode: "USD",
        country: "United States of America",
        conversionRate: 0.75
    }
]

const generateId = () => currencies.length + 1

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currencyRouter.get(CURRENCIES_PATH, (request, response) => {
    try{
        response.json(currencies)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
currencyRouter.get(`${CURRENCIES_PATH}/:id`, (request, response) => {
    try {
        const id = Number(request.params.id)
        const foundCurrency = currencies.find(el => el.id === id)

        if (!foundCurrency) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.json(foundCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currencyRouter.post(CURRENCIES_PATH, (request, response) => {
    try {
        const content = request.body

        if (!content.currencyCode || !content.country || !content.conversionRate) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        const createdCurrency = {
            id: generateId(),
            currencyCode: content.currencyCode,
            country: content.country,
            conversionRate: content.conversionRate
        }
        // Make changes in currency array

        response.json(createdCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currencyRouter.put(`${CURRENCIES_PATH}/:id/:newRate`, (request, response) => {
    try {
        const id = Number(request.params.id)
        const newRate = Number(request.params.newRate)

        const foundCurrencyIndex = currencies.findIndex(el => el.id === id)

        if (foundCurrencyIndex === -1) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }

        const result = [...currencies]
        result[foundCurrencyIndex] = {
            ...result[foundCurrencyIndex],
            conversionRate: newRate
        }

        // Make changes in currency array

        response.json(result[foundCurrencyIndex])
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currencyRouter.delete(`${CURRENCIES_PATH}/:id`, (request, response) => {
    try {
        const id = Number(request.params.id)
        const foundCurrencyIndex = currencies.findIndex(el => el.id === id)

        if (foundCurrencyIndex === -1) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }

        let result = [...currencies]
        result[foundCurrencyIndex] = null
        result = result.filter(Boolean)
        console.log('result', result)

        // Make changes in currency array

        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }

})


module.exports = currencyRouter