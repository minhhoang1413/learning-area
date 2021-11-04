import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import commentService from '../services/comments'
import blogService from "../services/blogs"
import { setNotification } from "../reducers/notificationReducer"
import { updateBlog, removeBlog, initialBlog } from "../reducers/blogReducer"
import { useDispatch } from 'react-redux'
import {Button, Form, ListGroup} from 'react-bootstrap'
const Blog = ({ username }) => {


    const id = useParams().id


    const [comments, setComments] = useState([])
    const user = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        commentService.getAll(id)
            .then(data => setComments(data))
            .catch(error => console.log(error))
    }, [])
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)
    if (!blog) {
        return null
    }

    const isAuthorize = { display: (blog.user.username === user.username) ? '' : 'none' }

    const blogStyles = {
        padding: 20,
        border: '2px solid grey',
        marginBottom: 10
    }
    const updateLikeBlog = async (id) => {
        try {
            const updatedBlog = await blogService.update(id)
            dispatch(updateBlog(updatedBlog))
            dispatch(setNotification({ message: `${updatedBlog.title} updated like`, type: 'success' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ message: error.error, type: 'error' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        }
    }
    const deleteBlog = async (id) => {
        try {
            await blogService.remove(id)
            //const newBlogs = blogs.filter(blog => blog.id !== id)
            history.push('/blogs')
            dispatch(removeBlog(id))

            //setBlogs(newBlogs)
            dispatch(setNotification({ message: 'deleted', type: 'success' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ message: error, type: 'error' }))
            setTimeout(() => dispatch(setNotification(null)), 3000)
        }
    }
    const handleSubmitComment = async (event) => {
        event.preventDefault()
        const content = event.target.comment.value
        const comment = ({
            content,
            blog: id
        })
        try {
            const savedComment = await commentService.create(id, comment)
            setComments(comments.concat(savedComment))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div  >
            <div style={blogStyles}>
                <h3>{blog.title}</h3>

                <p>url: <a href={blog.url}>{blog.url}</a></p>
                <p>likes <span className="like-number">{blog.likes}</span> <Button className="btn-like" onClick={() => updateLikeBlog(blog.id)}>like</Button></p>
                <p>author: {blog.author}</p>

                <button style={isAuthorize}
                    onClick={() => deleteBlog(blog.id)}>remove</button>

            </div>
            <div>
                <h3>comment</h3>
                <Form onSubmit={handleSubmitComment}>
                    <Form.Control name="comment" />
                    <Button type="submit">add comment</Button>
                </Form>
                <ListGroup variant="flush">
                    {comments.map(comment =>
                        <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    )
}

export default Blog