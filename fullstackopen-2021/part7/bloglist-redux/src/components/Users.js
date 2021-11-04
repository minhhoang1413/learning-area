import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initialUsers } from "../reducers/userReducer"
import { Table } from "react-bootstrap"
const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        fetch('/api/users')
            .then(response => {
                //console.log(response);
                return response.json()
            })
            .then(data => dispatch(initialUsers(data)))
            .catch(error => console.log(error))
    }, [])
    if (users) {
        return (
            <div>
                <h2>Users</h2>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th>user</th>
                            <th>blogs created</th>
                        </tr>
                        {users.map(user =>
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        )
    }
    return null
}
export default Users