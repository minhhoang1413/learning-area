const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const mongoose = require('mongoose')
commentsRouter.get('/api/blogs/:id/comments', async (request, response) => {
    const blogId = request.params.id
    try {
        const comments = await Comment.find({ blog: blogId })
        response.json(comments)
    } catch (error) {
        response.status(400).end()
    }
    
})
commentsRouter.post('/api/blogs/:id/comments', async (request, response) => {
    const blogId = mongoose.Types.ObjectId(request.params.id)
    const body = request.body
    if (!body.content) {
        return response.status(400).json({ error: 'content missing ' })
    }
    const comment = new Comment({ content: body.content, blog: blogId })
    try {
        const savedComment = await comment.save()
        response.status(201).json(savedComment)
    } catch (error) {
        console.log(error)
        response.status(400).end()
    }
})
module.exports = commentsRouter