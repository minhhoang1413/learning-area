import { addDigit } from "../calculatorReducer"
const DigitButton = ({ digit, dispatch }) => {

    const handleClick = () => {
        dispatch(addDigit(digit))
    }
    return <button onClick={handleClick}>{digit}</button>
}
export default DigitButton