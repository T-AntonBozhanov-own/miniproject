import {useDeleteCurrency, useGetCurrencyList} from "../../services";

export const useCurrencyDeleteFormHandlers = () => {
    const {deleteCurrency} = useDeleteCurrency()
    const currenciesList = useGetCurrencyList()
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteCurrency(Number(e.target?.currencyId?.value))
    }

    return {
        handleSubmit,
        currenciesList
    }
}