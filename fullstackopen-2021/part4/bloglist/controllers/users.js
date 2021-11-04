const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/:id', async (request, response) => {
    
    const user = await User.findById(request.params.id).populate('blogs',{url:1,title:1,author:1})
    response.json(user)
})
usersRouter.get('/', async (request, response) => {
    
    const users = await User.find({}).populate('blogs',{url:1,title:1,author:1})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const username = body.username
        const password = body.password
        if (!username || !password) {
            return response.status(400).json({ error: 'missing username or password' })
        }
        if (username.length < 3 || password.length < 3) {
            return response.status(400).json({ error: 'username and password must be at least 3 characters' })
        }
        const saltRound = 10
        const passwordHash = await bcrypt.hash(body.password, saltRound)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        next(error)
    }
})


module.exports = usersRouter