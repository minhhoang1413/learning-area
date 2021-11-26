import { useReducer } from "react";
import calculatorReducer from "./calculatorReducer";
import DigitButton from "./components/DigitButton";
import OperationButton from './components/OperationButton'
import { clear, evaluateOperation, deleteDigit } from "./calculatorReducer";
const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: ''
}
function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{state.previousOperand} {state.operation}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-2" onClick={() => dispatch(clear())}>AC</button>
      <button onClick={()=>dispatch(deleteDigit())}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-2" onClick={() => dispatch(evaluateOperation())}>=</button>

    </div>
  );
}

export default App;
