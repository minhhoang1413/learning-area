import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserImages } from "../firebase/firestore";
import Gallery from "../components/Gallery";
function UserImages() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [userImages, setUserImages] = useState([])

    const user = searchParams.get('user')
    useEffect(() => {
        getUserImages(user).then(images => setUserImages(images))
    }, [user])
    return (
        <section>
            <h1>Images</h1>
            <Gallery images={userImages} />
        </section>
    )
}

export default UserImages