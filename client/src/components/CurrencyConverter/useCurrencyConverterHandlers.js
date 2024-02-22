import {useGetCurrencyList} from "../../services";
import {useState} from "react";
import {convertCurrency} from "../../utils";

export const useCurrencyConverterHandlers = () => {
    const [convertedAmount, setConvertedAmount] = useState(0)
    const data = useGetCurrencyList()
    const convert = (currencyIdFrom, currencyIdTo, amount) => {
        const currencyRateFrom = data.find(el => el.id === Number(currencyIdFrom))?.conversionRate ?? 1
        const currencyRateTo = data.find(el => el.id === Number(currencyIdTo))?.conversionRate ?? 1

        setConvertedAmount(convertCurrency(currencyRateFrom, currencyRateTo, Number(amount)))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        convert(e.target?.currenciesFrom?.value,
            e.target?.currenciesTo?.value,
            e.target?.currencyAmount?.value)
    }

    return {
        data,
        convert,
        convertedAmount,
        handleSubmit
    }
}