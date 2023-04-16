const express = require('express')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
const { verifyToken } = require('./utils/jwt')

const app = express()

app.use(cookieParser("secret"))
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    const accessToken = req.signedCookies['access-token']
    if (accessToken) {
        const user = verifyToken(accessToken)
        res.locals.user = user
    }
    next()
})


app.use(indexRouter)

app.use((err, req, res, next) => {
    res.send(err.message)
})
module.exports = app