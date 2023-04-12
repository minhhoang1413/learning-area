import React from "react";
import { Link } from "react-router-dom";

function Profile({ user }) {
    return (
        <section>
            <img src={user.photoURL} alt="" />
            <h1>{user.displayName}</h1>
            <p>{user.email}</p>
            <Link to={`/images?user=${user.displayName}`}>My Image</Link>
        </section>
    )
}

export default Profile