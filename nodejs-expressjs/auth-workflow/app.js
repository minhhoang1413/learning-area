require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

const authRouter = require('./routes/authRoutes')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/user/verify-email', (req,res)=> {
    res.sendFile(__dirname+'/public/verify-email.html')
})
app.get('/user/reset-password', (req,res)=> {
    res.sendFile(__dirname+'/public/reset-password.html')
})
app.use('/api/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connet to mongodb');
    app.listen(PORT, () => {
        console.log('app running on port ' + PORT);
    })
})