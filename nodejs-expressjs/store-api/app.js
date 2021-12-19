require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const productRouter = require('./routes/products')

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/products">products route</a>')
})

app.use('/api/products',productRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
    console.log('connect to mongodb');
    app.listen(PORT, () => {
        console.log(`app running on port ${PORT}`);
    })
}).catch(error => console.log(error))
