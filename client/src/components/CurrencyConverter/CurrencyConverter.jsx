import {useCurrencyConverterHandlers} from "./useCurrencyConverterHandlers.js";
import style from './currencyConverter.module.css'

export const CurrencyConverter = () => {
    const {data, convert, convertedAmount, handleSubmit} = useCurrencyConverterHandlers()

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <select name='currenciesFrom'>
                    {data.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>)}
                </select>
                <select name='currenciesTo'>
                    {data.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>)}
                </select>
                <input name='currencyAmount' placeholder='Amount'/>
                <button type='submit'>Convert</button>
            </form>
            <input value={convertedAmount} disabled/>
        </div>
    )
}

