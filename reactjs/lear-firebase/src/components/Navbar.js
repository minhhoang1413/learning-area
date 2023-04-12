import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import SearchForm from "./SearchForm";

function Navbar({ user, handleSignIn, handleSignOut }) {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link className="nav-link" to='/'>Logo</Link>
            </div>
            <SearchForm />
            <ul className="nav-links">
                <li><Link className="nav-link" to='/'>Home</Link></li>
                <li><Link className="nav-link" to='/upload'>Upload</Link></li>
                {user
                    ?
                    <li className="has-dropdown">
                        <img className="profile-img" src={user.photoURL} alt={user.displayName} />
                        <ul className="dropdown">
                            <Link className="nav-link" to='/me'>Profile</Link>
                            <Link className="nav-link" to={`/images?user=${user.displayName}`}>My Images</Link>
                            <button onClick={handleSignOut}>Sign out</button>
                        </ul>
                    </li>
                    :
                    <li>
                        <LoginButton handleSignIn={handleSignIn} />
                    </li>

                }
            </ul>
        </nav >
    )
}

export default Navbar