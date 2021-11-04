import Blog from "./Blog"
import { useSelector, useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { useEffect } from "react"
import { updateBlog, removeBlog, initialBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
const Blogs = () => {
    const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
    const dispatch = useDispatch()
    

    useEffect(() => {
        blogService.getAll()
          .then(blogs => dispatch(initialBlog(blogs))) 
          .catch(error => {
            console.log(error)
          })
      }, [])

    
    
    return (
        <ListGroup variant="flush" className="links">
            {blogs.map(blog =>
                <ListGroup.Item action variant="light" key={blog.id}> 
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </ListGroup.Item>        
                // <Blog key={blog.id} blog={blog} handleLikeBlog={updateLikeBlog} handleRemoveBlog={deleteBlog} username={user.username} />
            )}
        </ListGroup>
    )
}
export default Blogs