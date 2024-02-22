import {fetcher} from "../utils";
import {HTTP_METHODS, ROUTES} from "../constants";

export const useDeleteCurrency = () => ({
    deleteCurrency: (id) => fetcher(`${ROUTES.CURRENCY.CURRENCIES}/${id}`, HTTP_METHODS.DELETE)

})