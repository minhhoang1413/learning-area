const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOG':
            return action.data
        case 'CREATE_BLOG':
            return state.concat(action.data)
        case 'UPDATE_BLOG':
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state;
    }
}
export const initialBlog = (data) => {
    return {
        type: 'INIT_BLOG',
        data
    }
}
export const createBlog = (data) => {
    return {
        type: 'CREATE_BLOG',
        data
    }
}
export const updateBlog = (data) => {
    return {
        type: 'UPDATE_BLOG',
        data
    }
}
export const removeBlog = (data) => {
    return {
        type: 'REMOVE_BLOG',
        data
    }
}
export default reducer