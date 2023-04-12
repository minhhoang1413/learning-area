import React from "react";

function LoginButton({ handleSignIn }) {
    return (
        <button onClick={handleSignIn} type="button">Log In</button>
    )
}

export default LoginButton