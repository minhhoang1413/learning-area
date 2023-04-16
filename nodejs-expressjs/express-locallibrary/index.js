require('dotenv').config()
const http = require('http')
const app = require('./app')
const { connectDB } = require('./db/connect')

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log('app is running on port ' + PORT);
    })
}).catch(error => console.log(error))
