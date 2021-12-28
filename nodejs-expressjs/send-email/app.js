require('dotenv').config()
const express = require('express')
const app = express()

const sendEmail = require('./controllers/send-email')

app.get('/', (req, res) => {
    res.send('<h1>Send Email</h1><a href="/send">send</a>')
})
app.get('/send', sendEmail)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('app running on port ' + PORT);
})