const jwt = require('jsonwebtoken')


function createToken(payload) {
    const maxAge = process.env.JWT_MAXAGE
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: maxAge })
}
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { createToken, verifyToken }