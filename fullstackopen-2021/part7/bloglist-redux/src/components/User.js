import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
const User = () => {
    const users = useSelector(state => {
        console.log(state);
        return state.users
    })
    const id = useParams().id
    const user = users.find(user => user.id === id)
    // useEffect(() => {

    //     fetch(`/api/users/${id}`)
    //         .then(response => {
    //             //console.log(response);
    //             return response.json()
    //         })
    //         .then(data => {
    //             console.log(data);
    //             user = data
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    if (user) {
        //console.log(user);
        return (
            <div>
                <h2>{user.name}</h2>
                <h3>added blog</h3>
                <ListGroup variant="flush">
                    {user.blogs.map(blog =>
                        <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
    return <p>loading..</p>
}
export default User