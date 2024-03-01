import {useCurrencyConverterHandlers} from "./useCurrencyConverterHandlers";
import {CurrencyConverterComponent} from "./CurrencyConverterComponent";

export const CurrencyConverter = () => {
    const {data, convertedAmount, handleSubmit} = useCurrencyConverterHandlers()

    return (
        <CurrencyConverterComponent
            data={data}
            convertedAmount={convertedAmount}
            handleSubmit={handleSubmit}
        />
    )
}

