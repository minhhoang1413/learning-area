import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleCreateBlog = (e) => {
        e.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        createBlog(newBlog)
    }

    return (
        <form onSubmit={handleCreateBlog}>
            <div>
                title:
                <input id='title' type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                author:
                <input id='author' type="text" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                url:
                <input id='url' type="text" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <button id="submit-blog" type="submit">create</button>
        </form>
    )
}
export default BlogForm