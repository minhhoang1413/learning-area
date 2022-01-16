const jwt = require('jsonwebtoken')

const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user._id,
    }
}
const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}
const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
const attachCookiesToResponse = (res, tokenUser, refreshToken) => {
    const accessTokenJWT = createJWT(tokenUser)
    const refreshTokenJWT = createJWT({ tokenUser, refreshToken })

    const oneDay = 1000 * 60 * 60 * 24
    const tenMinutes = 1000 * 60 * 10
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        maxAge: tenMinutes,
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay * 30),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
}
// const attachCookiesToResponse = (res, payload) => {
//     const token = createJWT(payload)
//     const oneDay = 1000 * 60 * 60 * 24
//     res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + oneDay),
//         secure: process.env.NODE_ENV === 'production',
//         signed: true
//     })
// }

module.exports = { createTokenUser, createJWT, verifyJWT, attachCookiesToResponse }