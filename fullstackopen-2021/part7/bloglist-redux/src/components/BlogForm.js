import { useState } from 'react'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
const BlogForm = ({ blogFormRef }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const dispatch = useDispatch()

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        try {
            const savedBlog = await blogService.create(newBlog)
            dispatch(createBlog(savedBlog))
            blogFormRef.current.toggleVisibility()
            dispatch(setNotification({ message: `a new blog ${savedBlog.title} added`, type: 'success' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ message: error.error, type: 'error' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        }
    }

    return (
        <Form onSubmit={handleCreateBlog}>
            <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control id='title' type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />


                <Form.Label>author:</Form.Label>
                <Form.Control id='author' type="text" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />


                <Form.Label>url:</Form.Label>
                <Form.Control id='url' type="text" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />

                <Button id="submit-blog" type="submit">create</Button>
            </Form.Group>
        </Form>
    )
}
export default BlogForm