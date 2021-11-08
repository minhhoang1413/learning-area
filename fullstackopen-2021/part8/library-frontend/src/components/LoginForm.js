import { useMutation } from "@apollo/client"
import { useEffect } from "react";
import { LOGIN } from "../queries"
const LoginForm = ({setToken, show}) => {

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
        }
    })
    useEffect(()=>{
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token',token)
        }
    },[result.data])
    const submit = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        login({ variables: { username, password } })
    }
    if (!show) {
        return null
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input name="username" />
                </div>
                <div>
                    password
                    <input name="password" type="password" />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}
export default LoginForm