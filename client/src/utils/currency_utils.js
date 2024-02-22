/**
 * @receives two currency objects, currencyA and currencyB, as well as an integer-amount of cash in currencyA
 * @performs a currency conversion between integer amount of currencyA to an integer amount of currencyB
 * @returns an integer
 */

export const convertCurrency = (rateFrom, rateTo, amount) =>
    Number(Number((rateFrom/rateTo) * amount).toFixed(2))

