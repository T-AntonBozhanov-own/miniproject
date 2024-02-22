import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {CurrencyConverterComponent} from '../components/CurrencyConverter/CurrencyConverterComponent'
import sinon from "sinon";


/**
 * we will test the conversion section that contains: currency code & amount input fields,
 *   Convert button and converted amount text.
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */

test('Testing conversion section',async () => {
    const mockConvertCurrency = sinon.spy(e => e.preventDefault());
    userEvent.setup();
    render(<CurrencyConverterComponent
        data={[{id: 1, currencyCode: 'CAD'}]}
        convertedAmount={100}
        handleSubmit={mockConvertCurrency}
    />)

    const fromField = screen.getByLabelText('From')
    const toField = screen.getByLabelText('To')
    const amountField = screen.getByLabelText('Amount')
    const submitBtn = screen.getByText('Convert')
    const result = screen.getByLabelText('Converted Amount')

    await fireEvent.change(fromField, {target: {value: 0}})
    await fireEvent.change(toField, {target: {value: 0}})
    await fireEvent.change(amountField, {target: {value: '100'}})
    await userEvent.click(submitBtn)

    // ASSERT
    expect(result).toHaveValue('100')
    expect(result).toBeDisabled()
    sinon.assert.calledOnce(mockConvertCurrency);
});


