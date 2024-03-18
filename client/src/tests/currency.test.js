import {convertCurrency} from '../utils/index.js'

/**
 * The tests below will be based on the following conversion amounts,
 * where $1 CDN (Canadian dollar) is equivalent to $0.75 USD (US dollar), 
 * and $0.58 GBP (British pounds). For ease of tests,
 * we have avoided putting any extraneous key-value pairs in the currency
 * objects, as we only need the conversion rate. 
 */

const cdnCurrencyConversionRate =  1

const usdCurrencyConversionRate  = 1.33

const gbpCurrencyConversionRat = 1.72

/**
 * Tests follow the format of 
 * test('description', () => { ...your code here... })
 * Please read here: https://jestjs.io/docs/getting-started
 * for more information on using jest to perform testing
 */

/**
 * Test 1: Completed
 * This test performs a currency conversion, where it's really just the same currency
 * Therefore, we should return the same amount
 */
test('same currency conversion', () => {
  const result = convertCurrency(cdnCurrencyConversionRate, cdnCurrencyConversionRate, 100)
  expect(result).toBe(100)
})

/**
 * Test 2: TODO
 * Write a test that performs a currency conversion from CDN to GBP, for $100 CDN
 * Hint: the result should be $58 GBP according to our provided currencies.
 */
test('CDN to GBP conversion', () => {
  const result = convertCurrency(gbpCurrencyConversionRat, cdnCurrencyConversionRate, 100)
  expect(result).toBe(58.14)
})

/**
 * Test 3: TODO
 * Write a test that performs a currency conversion from CDN to USD, for $75 CDN
 */
test('CDN to USD conversion', () => {
  const result = convertCurrency(usdCurrencyConversionRate, cdnCurrencyConversionRate, 75)
  expect(result).toBe(56.39)
})

/**
 * Test 4: TODO
 * Write a test that performs a currency conversion from USD to GBP, for $200 USD
 */
test('USD to CDN conversion', () => {
  const result = convertCurrency(gbpCurrencyConversionRat, usdCurrencyConversionRate, 200)
  expect(result).toBe(154.65)
})

/**
 * Test 5: TODO
 * Write a test that performs a currency conversion from GBP to CDN, for $50 GBP
 */
test('CDN to USD conversion', () => {
  const result = convertCurrency(cdnCurrencyConversionRate, gbpCurrencyConversionRat, 50)
  expect(result).toBe(86)
})