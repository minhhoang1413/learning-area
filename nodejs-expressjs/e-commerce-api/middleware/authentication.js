const { UnauthenticatedError, UnauthorizedError } = require('../errors')
const { verifyJWT } = require('../utils')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new UnauthenticatedError('authentication invalid')
    }
    try {
        const payload = verifyJWT(token)
        req.user = { name: payload.name, userId: payload.id, role: payload.role }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthorized to access this route')
        }
        next()
    }

}

module.exports = { authenticateUser, authorizePermissions }