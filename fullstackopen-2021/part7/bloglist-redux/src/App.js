import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import blogService from './services/blogs'
import { createUser } from './reducers/loginReducer'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toogle'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Button, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
const App = () => {
  // const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.userLogin)
  // const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      console.log(user)
      dispatch(createUser(user))
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser')
    dispatch(createUser(null))
    //setUser(null)
  }



  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <div className="container">
      <Router>
        <div>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">Blog app</Navbar.Brand>
              <Navbar.Toggle />
              <Nav className="me-auto">
                <Nav.Link href="#"><Link to="/blogs">blogs</Link></Nav.Link>
                <Nav.Link href="#"><Link to="/users">users</Link></Nav.Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={user.username} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout} >logout</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* <Link to="/blogs">blogs</Link>
          <Link to="/users">users</Link>
          <span>{user.username} logged in
            <Button variant="light" type="button" onClick={handleLogout}>logout</Button>
          </span> */}
        </div>

        <h2>Blogs</h2>
        <Notification />


        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <h2>create new</h2>
            <Toggle buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Toggle>
            <Blogs />
          </Route>
        </Switch>


      </Router>


    </div>
  )
}

export default App
