import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toogle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll()
            .then(blogs => sortBlogs(blogs))
            .catch(error => {
                console.log(error)
            })

    }, [])
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBloglistappUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            console.log(user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const sortBlogs = (unsortBlogs) => {
        const sortedBlogs = [...unsortBlogs].sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
    }
    // useEffect(()=>{
    //   sortBlogs()
    // },[])
    const handleSubmitLogin = async (ev) => {
        ev.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            setNotification({ message: error.error, type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        }
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistappUser')
        setUser(null)
    }
    const createBlog = async (newBlog) => {
        // e.preventDefault()
        // const newBlog = {
        //   title: newTitle,
        //   author: newAuthor,
        //   url: newUrl
        // }
        try {
            const savedBlog = await blogService.create(newBlog)
            blogFormRef.current.toggleVisibility()
            sortBlogs(blogs.concat(savedBlog))
            //setBlogs(blogs.concat(savedBlog))
            setNotification({ message: `a new blog ${savedBlog.title} added`, type: 'success' })
            setTimeout(() => setNotification(null), 3000)
        } catch (error) {
            console.log(error)
            setNotification({ message: error.error, type: 'error' })
            setTimeout(() => setNotification(null), 3000)
        }
    }
    const updateBlog = async (id) => {
        try {
            const updatedBlog = await blogService.update(id)
            //setBlogs(blogs.concat(updatedBlog))
            const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
            sortBlogs(newBlogs)
            //setBlogs(newBlogs)
            setNotification({ message: `${updatedBlog.title} updated like`, type: 'success' })
            setTimeout(() => setNotification(null), 3000)
        } catch (error) {
            console.log(error)
            setNotification({ message: error.error, type: 'error' })
            setTimeout(() => setNotification(null), 3000)
        }
    }
    const deleteBlog = async (id) => {
        try {
            await blogService.remove(id)
            const newBlogs = blogs.filter(blog => blog.id !== id)
            sortBlogs(newBlogs)
            //setBlogs(newBlogs)
            setNotification({ message: 'deleted', type: 'success' })
            setTimeout(() => setNotification(null), 3000)
        } catch (error) {
            console.log(error)
            setNotification({ message: error, type: 'error' })
            setTimeout(() => setNotification(null), 3000)
        }
    }
    if (user === null) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification notification={notification} />
                <form onSubmit={handleSubmitLogin}>
                    <div>
                        username
                        <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        password
                        <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button id="submit" type="submit">login</button>
                </form>
            </div>
        )
    }
    return (
        <div className="App">
            <h2>Blogs</h2>
            <Notification notification={notification} />
            <p>{user.username} logged in
                <button type="button" onClick={handleLogout}>logout</button>
            </p>
            <h2>create new</h2>
            <Toggle buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
            </Toggle>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} username={user.username} />
            )}
        </div>
    )
}

export default App
