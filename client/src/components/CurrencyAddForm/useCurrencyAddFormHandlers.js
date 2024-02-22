import {useAddCurrency, useGetCountriesList} from "../../services";

export const useCurrencyAddFormHandlers = () => {
    const {postData} = useAddCurrency()
    const countriesList = useGetCountriesList()
    const handleSubmit = (e) => {
        e.preventDefault()
        postData(JSON.stringify({
            currencyCode: e.target?.currencyCode?.value,
            countryId: Number(e.target?.countryId?.value),
            conversionRate: Number(e.target?.conversionRate?.value)
        }))
    }

    return {
        handleSubmit,
        countriesList
    }
}