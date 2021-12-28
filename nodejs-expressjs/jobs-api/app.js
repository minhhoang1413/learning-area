require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const authMiddleware = require('./middleware/authentication')
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/jobs', authMiddleware, jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
    console.log('connect to mongodb');
    app.listen(PORT, () => {
        console.log('app running on port ' + PORT);
    })
}).catch(error => {
    console.log(error);
})