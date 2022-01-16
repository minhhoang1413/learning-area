const crypto = require('crypto')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { createTokenUser, attachCookiesToResponse } = require('../utils/jwt')
const sendVerificationEmail = require('../utils/sendVerificationEmail')
const Token = require('../models/Token')
const sendResetPasswordEmail = require('../utils/sendResetPasswordEmail')

const register = async (req, res) => {
    const { name, email, password } = req.body
    const checkEmailExist = await User.findOne({ email })
    if (checkEmailExist) {
        throw new BadRequestError('email already exist')

    }
    const verificationToken = crypto.randomBytes(40).toString('hex')
    const user = await User.create({ name, email, password, verificationToken })

    const origin = 'http://localhost:3000'
    await sendVerificationEmail({ name, email, verificationToken, origin })
    res.status(201).json({ msg: 'check your email to verify account' })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('missing email or password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('email not exist')
    }
    const checkPw = await user.checkPassword(password)
    if (!checkPw) {
        throw new UnauthenticatedError('wrong password')
    }
    if (!user.isVerified) {
        throw new UnauthenticatedError('not verify account')
    }
    const tokenUser = createTokenUser(user)

    let refreshToken = ''

    const existingToken = await Token.findOne({ user: user._id })

    if (existingToken) {
        if (!existingToken.isValid) {
            throw new UnauthenticatedError('wrong credential')
        }
        refreshToken = existingToken.refreshToken
    }
    else {
        refreshToken = crypto.randomBytes(40).toString('hex')
        const ip = req.ip
        const userAgent = req.headers['user-agent']
        const userToken = { refreshToken, ip, userAgent, user: user._id }
        await Token.create(userToken)
    }
    attachCookiesToResponse(res, tokenUser, refreshToken)
    res.status(200).json({ user: tokenUser })
}
const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('email not exist')
    }
    if (user.verificationToken !== verificationToken) {
        throw new UnauthenticatedError('wrong verification token')
    }
    user.isVerified = true
    user.verified = Date.now()
    user.verificationToken = ''
    await user.save()
    res.status(200).json({ msg: 'email verify', user })
}
const logout = async (req, res) => {
    await Token.findOneAndDelete({ user: req.user.userId })
    res.cookie('accessToken', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.sendStatus(200)
}
const showCurrentUser = async (req, res) => {
    res.send(req.user)
}
const forgotPassword = async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new BadRequestError('provide email')
    }
    const user = await User.findOne({ email })
    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex')
        const tenMinutes = 1000 * 60 * 10
        user.passwordToken = passwordToken
        user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)
        await user.save()

        const origin = 'http://localhost:3000'
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin
        })
    }
    res.status(200).json({ msg: 'check email for reset pw link' })
}
const resetPassword = async (req, res) => {
    const {email, token, password} = req.body
    if (!email || !token || !password) {
        throw new BadRequestError('missing value')
    }
    const user = await User.findOne({email})
    if (user) {
        const currentDate = new Date()
        if (user.passwordTokenExpirationDate < currentDate) {
            throw new BadRequestError('token expires')
        }
        if (user.passwordToken === token) {
            user.password = password
            user.passwordToken = null
            user.passwordTokenExpirationDate = null
            await user.save()
        }
    }
    res.json({msg: 'reset pw'})
}
module.exports = { register, logout, login, verifyEmail, showCurrentUser, forgotPassword, resetPassword }