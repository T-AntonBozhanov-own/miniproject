import {useGetCurrencyList, useUpdateCurrency} from "../../services";
import {useState} from "react";

export const useCurrencyUpdateFormHandlers = () => {
    const [selectedCurrencyRate, setSelectedCurrencyRate] = useState(1)
    const {updateCurrency} = useUpdateCurrency()
    const currenciesList = useGetCurrencyList()
    const handleSubmit = (e) => {
        e.preventDefault()
        updateCurrency({
            currencyCode: e.target?.currencyCode?.value,
            conversionRate: Number(e.target?.conversionRate?.value)
        })
    }

    const handleSelectCurrency = (e) => {
        const selectedCurrency = currenciesList.find(el => el.id === Number(e.target.value))
        setSelectedCurrencyRate(selectedCurrency.conversionRate)
    }

    return {
        handleSubmit,
        currenciesList,
        handleSelectCurrency,
        selectedCurrencyRate,
        setSelectedCurrencyRate
    }
}