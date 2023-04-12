import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section>
            <h1>Page not found</h1>
            <Link to='/'>Back Home</Link>
        </section>
    )
}

export default NotFound