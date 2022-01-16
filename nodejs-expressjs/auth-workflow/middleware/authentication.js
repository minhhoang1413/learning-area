const { UnauthenticatedError, UnauthorizedError } = require('../errors')
const { verifyJWT, attachCookiesToResponse } = require('../utils/jwt')
const Token = require('../models/Token')
const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies
    try {
        if (accessToken) {
            const payload = verifyJWT(accessToken)
            req.user = payload
            return next()
        }
        const payload = verifyJWT(refreshToken)

        const existingToken = await Token.findOne({
            user: payload.tokenUser.userId,
            refreshToken: payload.refreshToken
        })

        if (!existingToken || !existingToken?.isValid) {
            throw new UnauthenticatedError('authentication invalid')
        }
        attachCookiesToResponse(res, payload.tokenUser, payload.refreshToken)
        req.user = payload.tokenUser
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthorized')
        }
        next()
    }
}
module.exports = { authenticateUser, authorizePermissions }