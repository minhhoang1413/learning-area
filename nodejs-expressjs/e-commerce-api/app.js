require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')

const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('public'))
app.use(fileUpload())

app.get('/', (req, res) => {
    //console.log(req.cookies);
    res.send('e commerce api')
})
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/orders', orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connect to mongodb');
    app.listen(PORT, () => {
        console.log('app listening on port ' + PORT);
    })
}).catch(error => console.log(error))
