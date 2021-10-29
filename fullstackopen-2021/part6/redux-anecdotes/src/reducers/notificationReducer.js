let timeoutID;
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}
export const createNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, time*1000)
    }
}
export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}
export default notificationReducer