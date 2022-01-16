const CustomAPIError = require('./custom-api-error')
class Unauthorized extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 403
    }
}
module.exports = Unauthorized