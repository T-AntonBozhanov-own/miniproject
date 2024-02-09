import {fetcher} from "../utils";
import {ROUTES} from "../constants";
import {useEffect, useState} from "react"

export const useGetCurrencyList = () => {
    const [currencyList, setCurrencyList] = useState([])
    useEffect(() => {
        async function getData() {
            const data = await fetcher(ROUTES.CURRENCY.CURRENCIES)
            setCurrencyList(data)
        }
        getData()
    }, []);

    return currencyList
}