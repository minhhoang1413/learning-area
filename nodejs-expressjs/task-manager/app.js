const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
app.use(express.json())


app.use('/api/tasks', taskRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

connectDB(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log('server is running on port ' + PORT);
    })
}).catch(error => {
    console.log(error);
})