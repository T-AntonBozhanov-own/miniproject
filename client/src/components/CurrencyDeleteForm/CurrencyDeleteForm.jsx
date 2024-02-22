import styles from './deleteCurrencyForm.module.css'
import {useCurrencyDeleteFormHandlers} from "./useCurrencyDeleteFormHandlers.js";
export const CurrencyDeleteForm = () => {
    const {handleSubmit, currenciesList} = useCurrencyDeleteFormHandlers()
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <select name='currencyId'>
                    {currenciesList.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>)}
                </select>
                <button type='submit'>Delete</button>
            </form>
        </div>
    )
}