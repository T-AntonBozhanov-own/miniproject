import {fetcher} from "../utils";
import {HTTP_METHODS, ROUTES} from "../constants";

export const useAddCurrency = () => ({
     postData: (data) => fetcher(ROUTES.CURRENCY.CURRENCIES, HTTP_METHODS.POST, data)

})