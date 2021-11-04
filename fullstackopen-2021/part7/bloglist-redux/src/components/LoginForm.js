import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { createUser } from "../reducers/loginReducer"
const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSubmitLogin = async (ev) => {
        ev.preventDefault()
        try {
            
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            //setUser(user)
            dispatch(createUser(user))
           // setUsername('')
           // setPassword('')
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ message: error.error, type: 'error' }))
            setTimeout(() => dispatch(clearNotification()), 5000)
        }
    }
    return (
        <form onSubmit={handleSubmitLogin}>
            <div>
                username
                <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id="submit" type="submit">login</button>
        </form>
    )
}
export default LoginForm