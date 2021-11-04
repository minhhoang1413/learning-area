import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    userLogin: loginReducer,
    users: userReducer
})
const store = createStore(reducer)


export default store