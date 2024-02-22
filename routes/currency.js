const {CURRENCIES_PATH} = require("./constants");
const {HTTP_CODE} = require("../constants/httpCodes");
const currencyRouter = require('express').Router()
const Currency = require( '../models/Currency')
const {Op} = require("sequelize");

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currencyRouter.get(CURRENCIES_PATH, async (request, response) => {
    try{
        // Find all currencies
        const currencies = await Currency.findAll();
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
currencyRouter.get(`${CURRENCIES_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)
        const currency = await Currency.findAll({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        if (!currency) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'resource not found'})
        }
        response.json(currency)
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
currencyRouter.post(CURRENCIES_PATH, async (request, response) => {
    try {
        const content = request.body

        if (!content.currencyCode || !content.countryId || !content.conversionRate) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        // Make changes in currency db
        const createdCurrency = await Currency.create({
            currencyCode: content.currencyCode,
            countryId: content.countryId,
            conversionRate: content.conversionRate
    })
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
currencyRouter.put(`${CURRENCIES_PATH}/:id/:newRate`, async (request, response) => {
    try {
        const id = Number(request.params.id)
        const newRate = Number(request.params.newRate)

        // Make changes in currency db
        await Currency.update({ conversionRate: newRate }, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        const modifiedCurrency = await Currency.findAll({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        response.json(modifiedCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currencyRouter.delete(`${CURRENCIES_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)

        // Make changes in currency db
        await Currency.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        response.status(HTTP_CODE.NO_CONTENT).send()
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }

})


module.exports = currencyRouter