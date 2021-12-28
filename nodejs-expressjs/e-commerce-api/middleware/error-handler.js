const errorHandler = (err, req, res, next) => {
    console.log('error handler');
    let customError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong, try again later'
    }
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'ValidationError') {
        let message = Object.values(err.errors).map(error => error.message).join(' ')
        customError.message = message
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.message = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }
    res.status(customError.statusCode).json({ msg: customError.message })
}
module.exports = errorHandler