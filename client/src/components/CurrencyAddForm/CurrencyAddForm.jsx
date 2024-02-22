import style from './currencyAddForm.module.css'
import {useCurrencyAddFormHandlers} from "./useCurrencyAddFormHandlers.js";
export const CurrencyAddForm = () => {
    const {handleSubmit, countriesList} = useCurrencyAddFormHandlers()

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <input name='currencyCode' placeholder='Currency code'/>
                <select name='countryId'>
                    {countriesList.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
                </select>
                <input name='conversionRate' placeholder='Conversion Rate'/>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}
