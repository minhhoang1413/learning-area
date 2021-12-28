
const errorHandler = (err, req, res, next) => {
    let customError = {
        message: err.message || 'Something went wrong, try again later',
        statusCode: err.statusCode || 500
    }
    if (err.name === 'ValidationError') {
        customError.message = Object.values(err.errors).map(item => item.message).join(' ')
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.message = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }
    res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandler