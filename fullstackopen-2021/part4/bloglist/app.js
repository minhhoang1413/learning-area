const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(commentsRouter)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}

app.use(middleware.errorHandler)
module.exports = app