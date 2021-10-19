const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')
blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })//.then(blogs => response.json(blogs))
        response.json(blogs)
    } catch (error) {
        response.status(400).end()
    }
})
blogsRouter.post('/',userExtractor ,async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }
    try {
        const userId = request.userId
        
        const user = await User.findById(userId)
        
        const blog = new Blog({ ...body, likes: body.likes || 0, user: user._id })

        const savedBlog = await blog.save()//.then(savedBlog => response.status(201).json(savedBlog))
        
        user.blogs = user.blogs.concat(savedBlog._id)

        
        // user.markModified('blogs');
        const savedUser = await user.save()
        
        response.status(201).json(savedBlog)

    } catch (error) {
        console.log(error)
        response.status(400).end()
    }
})
blogsRouter.delete('/:id',userExtractor ,async (request, response) => {

    try {
        const userId = request.userId

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() !== userId.toString()) {

            return response.status(401).json({ error: 'Unauthorized' })
        }
        await blog.deleteOne()
        response.status(204).end()
    } catch (error) {
        response.status(400).end()
    }
})
blogsRouter.put('/:id', async (request, response) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { $inc: { 'likes': 1 } }, { new: true })
        response.json(updatedBlog)
    } catch (error) {
        response.status(400).end()
    }
})


module.exports = blogsRouter