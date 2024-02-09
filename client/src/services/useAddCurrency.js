import {fetcher} from "../utils";
import {HTTP_METHODS, ROUTES} from "../constants";
import {useEffect, useState} from "react"

export const useAddCurrency = () => ({
     postData: (data) => fetcher(ROUTES.CURRENCY.CURRENCIES, HTTP_METHODS.POST, data)

})