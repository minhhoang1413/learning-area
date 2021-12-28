require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const productRouter = require('./routes/productRoutes')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// const fileUpload = require('express-fileupload')
// const multer = require('multer')
// const upload = multer({ dest: './public/uploads/' })

app.use(express.static('public'))
app.use(express.json())
//app.use(fileUpload())
//app.use(upload.single('image'))

app.use('/api/products', productRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000

mongoose.connect(MONGODB_URI).then(() => {
    console.log('connet to mongodb');
    app.listen(PORT, () => {
        console.log('app running on port ' + PORT);
    })
}).catch(error => console.log(error))