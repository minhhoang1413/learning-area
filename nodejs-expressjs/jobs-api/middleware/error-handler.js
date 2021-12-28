const {CustomAPIError} = require('../errors')

const errorHandler = (err,req,res,next) => {
    console.log(err);
    let customError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong, try again later'
    }
    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({msg: err.message})
    // }
    if (err.code && err.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'ValidationError') {
        let message = Object.values(err.errors).map(error => error.message).join(' ')
        customError.message = message
        customError.statusCode = 400
    }
    if (err.name=== 'CastError') {
        customError.message = `No item found with id: ${err.value}`
        customError.statusCode = 404
    }
 //  return res.status(500).json({err})
    return res.status(customError.statusCode).json({msg:customError.message})
    
}
module.exports = errorHandler