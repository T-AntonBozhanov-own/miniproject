import {useCurrencyUpdateFormHandlers} from "./useCurrencyUpdateFormHandlers.js";
import styles from './updateCurrencyForm.module.css'

export const CurrencyUpdateForm = () => {
    const {
        handleSubmit, currenciesList,
        handleSelectCurrency,
        selectedCurrencyRate,
        setSelectedCurrencyRate
    } = useCurrencyUpdateFormHandlers()

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <select name='currencyCode' onChange={handleSelectCurrency}>
                    {currenciesList.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>)}
                </select>
                <input
                    name='conversionRate'
                    value={selectedCurrencyRate}
                    onChange={(e) => setSelectedCurrencyRate(e.target.value)}
                    placeholder='Conversion Rate'/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}
