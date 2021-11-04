const reducer = (state = null, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
        default:
            return state;
    }
}
export const initialUsers = (data) => {
    return {
        type: 'INIT_USER',
        data
    }
}

export default reducer