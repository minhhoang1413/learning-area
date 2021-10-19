const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const initialBlog = [
    {
        title: "blog 1",
        author: "author 1",
        url: "http://url1.com",
        likes: 1
    },
    {
        title: "blog 2",
        author: "author 2",
        url: "http://url2.com",
        likes: 2
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObj = new Blog(initialBlog[0])
    await blogObj.save()
    blogObj = new Blog(initialBlog[1])
    await blogObj.save()
})
test('return right initial blog in json format', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlog.length)
})
test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => expect(blog.id).toBeDefined())
})
test('success create a blog', async () => {
    const newBlog = {
        title: "blog 3",
        author: "author 3",
        url: "http://url3.com",
        likes: 3
    }
    const user = {
        username: 'username123',
        password: 'pass'
    }
    const responselogin = await api.post('/api/login').send(user).expect(200)
    const token = 'bearer ' + responselogin.body.token;
    await api.post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlog.length + 1)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(newBlog.title)
})
test('fail to create blog if a token is not provided', async () => {
    const newBlog = {
        title: "blog 3",
        author: "author 3",
        url: "http://url3.com",
        likes: 3
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
})
test('likes property default value is 0', async () => {
    const blogMissingLike = {
        title: "blog 3",
        author: "author 3",
        url: "http://url3.com",
    }
    const user = {
        username: 'username123',
        password: 'pass'
    }
    const responselogin = await api.post('/api/login').send(user).expect(200)
    const token = 'bearer ' + responselogin.body.token;

    const response = await api.post('/api/blogs').set('Authorization', token)
        .send(blogMissingLike)
    expect(response.body.likes).toBe(0)
})
test('title and url properties are missing responds the status code 400 Bad Request', async () => {
    const blogMissingTitle = {
        author: "author 3",
        url: "http://url3.com",
        likes: 0
    }
    const user = {
        username: 'username123',
        password: 'pass'
    }
    const responselogin = await api.post('/api/login').send(user).expect(200)
    const token = 'bearer ' + responselogin.body.token;

    await api.post('/api/blogs').set('Authorization', token)
        .send(blogMissingTitle)
        .expect(400)

})
test('delete one blog', async () => {
    const blogsAtStart = await (await api.get('/api/blogs')).body
    const blogToDelete = blogsAtStart[0]
    const user = {
        username: 'username123',
        password: 'pass'
    }
    const responselogin = await api.post('/api/login').send(user).expect(200)
    const token = 'bearer ' + responselogin.body.token;

    await api.delete('/api/blogs/' + blogToDelete.id).set('Authorization', token)
        .expect(204)
    const blogsAtEnd = await (await api.get('/api/blogs')).body
    expect(blogsAtEnd).toHaveLength(initialBlog.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
})
test('update like', async () => {
    const blogsAtStart = await (await api.get('/api/blogs')).body
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = await api.put('/api/blogs/' + blogToUpdate.id)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1)
})
describe('test add user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('pass', 10)
        const user = new User({
            username: 'username123',
            name: 'name123',
            passwordHash
        })
        await user.save()
    })
    test('exist username can not add', async () => {
        const usersAtStart = await User.find({})
        let userObj = {
            username: 'username123',
            password: 'asdassd'
        }
        const response = await api.post('/api/users')
            .send(userObj)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toMatch(/User validation failed: username: Error, expected `username` to be unique. Value: `.*`/);
        const usersAtEnd = await User.find({})

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})