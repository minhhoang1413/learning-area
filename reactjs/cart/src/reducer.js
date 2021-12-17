
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            let {total, amount} = state.cart.reduce((cartTotal,currentItem)=>{
                cartTotal.total += currentItem.amount * currentItem.price
                cartTotal.amount += currentItem.amount
                return cartTotal
            },{total:0,amount:0})
            total = parseFloat(total.toFixed(2))
            return {...state,total: total, amount: amount}
        case 'CLEAR_CART':
            return { ...state, cart: [], total: 0, amount: 0 }
        case 'REMOVE':
            const newState = state.cart.reduce((obj, currentItem) => {
                if (currentItem.id === action.payload.id) {
                    return obj
                }
                obj.cart = obj.cart.concat(currentItem)
                obj.amount += currentItem.amount
                obj.total += currentItem.amount * currentItem.price
                return obj
            }, { cart: [], total: 0, amount: 0 })
            return { ...state, ...newState }
        case 'INCREASE':{
            const newCartObj = state.cart.reduce((newCart, currentItem) => {
                if (currentItem.id !== action.payload.id) {  
                    newCart.cart = newCart.cart.concat(currentItem)
                    return newCart
                }
                newCart.cart = newCart.cart.concat({...currentItem, amount:currentItem.amount+1})
                newCart.price = currentItem.price
                return newCart
            }, { cart: [], price:0 })
            return { ...state,cart:newCartObj.cart ,total: state.total + newCartObj.price, amount:state.amount+1 }
        }
        case 'DECREASE':{
            const newCartObj = state.cart.reduce((newCart, currentItem) => {
                if (currentItem.id !== action.payload.id) {  
                    newCart.cart = newCart.cart.concat(currentItem)
                    return newCart
                }
                if (currentItem.amount === 1) {
                    newCart.price = currentItem.price
                    return newCart
                }
                newCart.cart = newCart.cart.concat({...currentItem, amount:currentItem.amount-1})
                newCart.price = currentItem.price
                return newCart
            }, { cart: [], price:0 })
            const amount = state.amount === 1 ? 0 : state.amount -1
            return { ...state,cart:newCartObj.cart ,total: state.total - newCartObj.price, amount }
        }
        default:
            return state;
    }
}
export default reducer