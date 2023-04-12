import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";

function Login({ user, handleSignIn }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate(-1)
            }, 2000)
        }
    }, [user])
    return (
        <section>
            {
                user ? <p>you have already login</p>
                    : <LoginButton handleSignIn={handleSignIn} />
            }
        </section>
    )
}

export default Login