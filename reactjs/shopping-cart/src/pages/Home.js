import React from "react";
import { Link } from "react-router-dom";
function Home() {
    return (
        <section className="home">
            <button className="button">
                <Link to='/products'>Shop Now</Link>
            </button>
        </section>
    )
}

export default Home