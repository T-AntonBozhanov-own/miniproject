const {COUNTRY_PATH} = require("./constants");
const {HTTP_CODE} = require("../constants/httpCodes");
const countryRouter = require('express').Router()
const Country = require( '../models/Country')
const {Op} = require("sequelize");

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency-countryName/
 * @responds with returning the data as a JSON
 */
countryRouter.get(COUNTRY_PATH, async (request, response) => {
    try{
        // Find all countries
        const countries = await Country.findAll();
        response.json(countries)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})


/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency-countryName/,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
countryRouter.post(COUNTRY_PATH, async (request, response) => {
    try {
        const content = request.body

        if (!content.name) {
            return response.status(HTTP_CODE.BAD_REQUEST).send({ error: 'content missing'})
        }

        // Make changes in country db
        const createdCurrency = await Country.create({
            name: content.name,
        })
        response.json(createdCurrency)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'content missing' })
    }
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
countryRouter.delete(`${COUNTRY_PATH}/:id`, async (request, response) => {
    try {
        const id = Number(request.params.id)

        // Make changes in country db
        await Country.destroy({
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


module.exports = countryRouter