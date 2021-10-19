const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {

    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next()
}
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
        // console.log(request.token);
    }
    next()
}
const userExtractor = (request, response, next) => {
    const token = request.token
    const decodeToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodeToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userId = decodeToken.id
    request.userId = userId
    next()
}
module.exports = { errorHandler, tokenExtractor, userExtractor }