import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? '' : 'none' }
    const isAuthorize = { display: (blog.user.username === username) ? '' : 'none' }
    const toggleVisible = () => setVisible(!visible)
    const blogStyles = {
        padding: 20,
        border: '2px solid grey',
        marginBottom: 10
    }
    return (
        <div style={blogStyles} >
            <div className="blog-show">
                {blog.title} <button className="btn-toggle" onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
            </div>
            <div style={hideWhenVisible} className="blog-hidden">
                <p>{blog.url}</p>
                <p>likes <span className="like-number">{blog.likes}</span> <button className="btn-like" onClick={() => updateBlog(blog.id)}>like</button></p>
                <p>{blog.author}</p>

                <button style={isAuthorize}
                    onClick={() => deleteBlog(blog.id)}>remove</button>

            </div>
        </div>
    )
}

export default Blog