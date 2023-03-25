import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../icons/cart.svg"

function Navbar({ numberOfItems, openSidebar }) {

    return (
        <nav className="navbar">
            <div className="navbar-center">

                <div className="logo">The Instrument</div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Product</Link>
                    </li>
                    <li className="nav-link-cart" onClick={openSidebar}>
                        <button type="button">
                            <img src={CartIcon} alt="cart" />
                        </button>
                        <small>{numberOfItems}</small>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar