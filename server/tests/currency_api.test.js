require('dotenv').config();
const supertest = require('supertest')
const {sequelize} = require('../db') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server')
const {CURRENCIES_PATH} = require("../routes/constants");
const {raw} = require("express"); // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router

const api = supertest(server) // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Setup currencies table (if not already setup)
  await helper.init()

  // Clear data and load new entries for tests
  await helper.clearData()
  await helper.load()
})

afterAll(async () => {
  // Closes connection after all tests run
  await sequelize.close()
  await server.close()
})

describe('GET tests', () => {
  /**
   * Completed:
   * This is an example test, where we are checking if we have 2 blogs in the database as expected
   * we added the two blogs in the 'beforeEach' setup phase
   */
  test('we have 2 currencies at the start', async () => {
    const response = await api.get(CURRENCIES_PATH).expect(200)
    expect(response.body).toHaveLength(2)
  })

  /**
   * Completed:
   * This is another example test, where we are checking if we are able to get a particular currency as expected.
   * Our test will get the first currency, the Canadian one that we added.
   * You can confirm the identiy of the currency based on the conversionRate and the currencyCode
   * We are restricting it to these two, rather than a complete equals, since the table provides other extraneous values
   * such as time of last update and so on
   */
  test('getting a specific currency', async () => {
    const canadianCurrency = helper.initialCurrencies[0]
    const getId = canadianCurrency.id

    // Verify that we get the same currency
    const response = await api
      .get(`${CURRENCIES_PATH}/${getId}`)
      .expect(200)

    // As stated above, we will compare the conversionRate and currencyCode
    const currencyReceived = response.body
    expect(currencyReceived[0].conversionRate).toEqual(canadianCurrency.conversionRate)
    expect(currencyReceived[0].currencyCode).toEqual(canadianCurrency.currencyCode)
  })
})

/**
 * The tests for POST, PUT, and DELETE are left un-implemented, and you will have to complete them
 * All the helper functions have been provided, and the examples as well are sufficient
 * You will need to do some reading on supertest documentation as well
 * 
 * IMPORTANT: You are only working with currencies, we removed the countries connection to make it a bit simpler
 */

describe('POST tests', () => {
  // Add a currency, and verify that a currency is added to our database
  test('adding a currency', async () => {
    const newCurrency = {
        currencyCode: 'EUR',
        conversionRate: 0.69,
    }
    const response = await api
        .post(CURRENCIES_PATH)
        .send(newCurrency)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    const currencyReceived = response.body
    expect(currencyReceived.conversionRate).toEqual(newCurrency.conversionRate)
    expect(currencyReceived.currencyCode).toEqual(newCurrency.currencyCode)
  })
  test('adding a currency with error', async () => {
    const response = await api
        .post(CURRENCIES_PATH)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

    expect(response?.error?.text).toEqual("{\"error\":\"content missing\"}")
  })
})

describe('PUT tests', () => {
  // Update a currency, and verify that a currency has been updated
  test('update a currency', async () => {
    const updatedRate = 0.5
    const response = await api
        .put(`${CURRENCIES_PATH}/1/${updatedRate}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    const currencyReceived = response.body
    expect(currencyReceived[0].conversionRate).toEqual(updatedRate)
  })
  test('update a currency without params', async () => {
    await api
        .put(CURRENCIES_PATH)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
  })
})

describe('DELETE tests', () => {
  // Delete a currency, and verify that a currency has been deleted
  test('delete a currency', async () => {
    const deletedId = 1
    await api
        .delete(`${CURRENCIES_PATH}/${deletedId}`)
        .set('Accept', 'application/json')
        .expect(204)

    const response = await api
        .get(CURRENCIES_PATH)
        .set('Accept', 'application/json')
        .expect(200)
    expect(response.body).toHaveLength(1)
  })
  test('delete a currency without params', async () => {
    await api
        .delete(CURRENCIES_PATH)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
  })
})

