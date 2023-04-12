import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UploadImage from "./pages/UploadImage";
import { addImage, getImages, getImagesNextPage, getImagesPrevPage } from "./firebase/firestore";
import { uploadImage } from "./firebase/storage";
import { doSignIn, doSignOut, getCurrentUser } from './firebase/auth'
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import './styles.css'
import UserImages from "./pages/UserImages";

function App() {
    const [images, setImages] = useState([])
    const [hasPage, setHasPage] = useState({ next: true, prev: false })
    const [user, setUser] = useState(null)

    useEffect(() => {
        getImages()
            .then(data => setImages(data))
            .catch(error => console.log(error))

    }, [])
    useEffect(() => {
        getCurrentUser().then(user => user && setUser(user))
    }, [])


    async function nextPage() {
        const imgs = await getImagesNextPage(images[images.length - 1])
        if (imgs.length === 0) {
            setHasPage({ ...hasPage, next: false })
            return
        }
        setHasPage({ prev: true, next: true })
        setImages(imgs)
    }
    async function prevPage() {
        const imgs = await getImagesPrevPage(images[images.length - 1])
        if (imgs.length === 0) {
            setHasPage({ ...hasPage, prev: false })
            return
        }
        setHasPage({ prev: true, next: true })
        setImages(imgs)
    }
    async function handleSignIn() {
        const user = await doSignIn()
        setUser(user)
    }
    async function handleSignOut() {
        await doSignOut()
        setUser(null)
    }
    async function handleSubmitImage({ image, title }) {
        const imageUrl = await uploadImage(image)
        addImage({ image: imageUrl, title, user: user.displayName })
    }
    function loginLoader() {
        if (!user) {
            return redirect('/login')
        }
        return null
    }
    const router = createBrowserRouter([
        {
            path: '/',
            element: <div className="app">
                <Navbar user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
                {<Outlet />}
            </div>,
            errorElement: <NotFound />,
            children: [
                {
                    path: "/",
                    element: <Home images={images} hasPage={hasPage} nextPage={nextPage} prevPage={prevPage} />
                },
                {
                    path: "/upload",
                    loader: loginLoader,
                    element: <UploadImage handleSubmitImage={handleSubmitImage} />
                },
                {
                    path: '/me',
                    loader: loginLoader,
                    element: <Profile user={user} />
                },
                {
                    path: '/images',
                    element: <UserImages />
                },
                {
                    path: '/login',
                    element: <Login user={user} handleSignIn={handleSignIn} />
                },
            ]
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}

export default App