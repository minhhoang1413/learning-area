import { createContext, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
export const AppContext = createContext()

const initialState = {
    isLoading: false,
    cart: cartItems,
    total: 0,
    amount: 0
}
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
        dispatch({type:'INIT'})
    },[])
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE', payload: { id } })
    }
    const increase = (id) => {
        dispatch({type:'INCREASE', payload:{id}})
    }
    const decrease = (id) => {
        dispatch({type:'DECREASE', payload:{id}})
    }
    return (
        <AppContext.Provider value={{
            ...state,
            clearCart,
            removeItem,
            increase,
            decrease
        }}>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}

