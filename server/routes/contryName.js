const {COUNTRY_NAME_PATH} = require("./constants");
const {HTTP_CODE} = require("../constants/httpCodes");
const countryRouter = require('express').Router()
const Country = require( '../models/Country')
const Currency = require( '../models/Currency')
const {Op} = require("sequelize");
const {sequelize} = require("../db");

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency-countryName/
 * @responds with returning the data as a JSON
 */
countryRouter.get(COUNTRY_NAME_PATH, async (request, response) => {
    try{
        // Find all countries
        const countries = await Currency.findAll({
            attributes: ['currencyCode',
                [sequelize.col('Country.name'), 'name'],
            ],
            include: [{
                model: Country,
                attributes: [],
                on: [{
                        id: {
                            [Op.col]: 'Currency.countryId'
                    }}],
                required: true
            }],
            raw:true,
            nest:false
        });
        response.json(countries)
    } catch (e) {
        response.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({ error: 'resource not found' })
    }
})


module.exports = countryRouter