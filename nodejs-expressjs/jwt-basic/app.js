require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const router = require('./routes/main')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.use(express.json())


app.use('/api',router)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})