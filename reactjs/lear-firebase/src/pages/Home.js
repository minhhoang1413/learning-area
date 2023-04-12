import React from "react";
import Gallery from "../components/Gallery";

function Home({ images, hasPage, nextPage, prevPage }) {
    return (
        <section>
            <h1>Images</h1>
            <Gallery images={images} />
            <div>
                <button disabled={!hasPage.prev} onClick={prevPage}>prev</button>
                <button disabled={!hasPage.next} onClick={nextPage}>next</button>
            </div>
        </section>
    )
}

export default Home