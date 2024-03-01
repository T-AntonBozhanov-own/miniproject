import style from "./currencyConverter.module.css";

export const CurrencyConverterComponent = ({data, convertedAmount, handleSubmit}) => (
    <div className={style.container}>
        <form className={style.form}  onSubmit={handleSubmit}>
            <label htmlFor="currenciesFrom">From</label>
            <select name='currenciesFrom' id="currenciesFrom">
                {data?.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>) ?? []}
            </select>
            <label htmlFor="currenciesTo">To</label>
            <select name='currenciesTo' id='currenciesTo'>
                {data?.map((item) => <option key={item?.id} value={item?.id}>{item?.currencyCode}</option>) ?? []}
            </select>
            <label htmlFor="currencyAmount">Amount</label>
            <input name='currencyAmount' id="currencyAmount" placeholder='Amount'/>
            <button type='submit'>Convert</button>
        </form>
        <label htmlFor="convertedAmount">Converted Amount</label>
        <input value={convertedAmount} disabled id='convertedAmount' />
    </div>
)