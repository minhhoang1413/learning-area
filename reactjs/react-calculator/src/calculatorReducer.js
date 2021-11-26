const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_DIGIT:
            if (action.payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            }
            if (action.payload.digit === '0' && state.currentOperand === '0') {
                return state
            }
            return { ...state, currentOperand: state.currentOperand.concat(action.payload.digit) }
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand === '' && state.previousOperand === '') {
                return state
            }
            if (state.currentOperand === '') {
                return {
                    ...state,
                    operation: action.payload.operation
                }
            }
            if (state.previousOperand === '') {
                return {
                    ...state,
                    operation: action.payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: ''
                }
            }
            return {
                ...state,
                operation: action.payload.operation,
                previousOperand: evaluate(state),
                currentOperand: ''
            }
        case ACTIONS.EVALUATE:
            if (state.operation === null || state.previousOperand === null || state.currentOperand === null) {
                return state
            }
            return {
                ...state,
                operation: '',
                previousOperand: '',
                currentOperand: evaluate(state)
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT:
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0,-1)
            }
        default:
            break;
    }
}
export const addDigit = (digit) => {
    return {
        type: ACTIONS.ADD_DIGIT,
        payload: {
            digit: digit
        }
    }
}
export const chooseOperation = (operation) => {
    return {
        type: ACTIONS.CHOOSE_OPERATION,
        payload: {
            operation: operation
        }
    }
}
export const evaluateOperation = () => {
    return {
        type: ACTIONS.EVALUATE
    }
}
export const clear = () => {
    return {
        type: ACTIONS.CLEAR
    }
}
export const deleteDigit = () => {
    return {
        type: ACTIONS.DELETE_DIGIT
    }
}
const evaluate = ({ previousOperand, currentOperand, operation }) => {
    const prevNumber = Number(previousOperand)
    const currentNumber = Number(currentOperand)
    let computation = ''
    switch (operation) {
        case '+':
            computation = prevNumber + currentNumber
            break;
        case '-':
            computation = prevNumber - currentNumber
            break;
        case '*':
            computation = prevNumber * currentNumber
            break;
        case '÷':
            computation = prevNumber / currentNumber
            break;
    }
    return computation.toString()
}
export default reducer