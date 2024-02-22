import {fetcher} from "../utils";
import {HTTP_METHODS, ROUTES} from "../constants";

export const useUpdateCurrency = () => ({
    updateCurrency: (data) => fetcher(
        `${ROUTES.CURRENCY.CURRENCIES}/${data.currencyCode}/${data.conversionRate}`, HTTP_METHODS.PUT)

})