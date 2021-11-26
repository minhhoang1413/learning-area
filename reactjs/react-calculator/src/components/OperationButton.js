import { chooseOperation } from "../calculatorReducer"
const OperationButton = ({ operation, dispatch }) => {

    const handleClick = () => {
        dispatch(chooseOperation(operation))
    }
    return <button onClick={handleClick}>{operation}</button>
}
export default OperationButton