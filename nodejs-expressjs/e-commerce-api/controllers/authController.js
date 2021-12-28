const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const register = async (req, res) => {
    const { email, name, password } = req.body
    const checkExistEmail = await User.findOne({ email })
    if (checkExistEmail) {
        throw new BadRequestError('Email already exist')
    }
    const user = await User.create({ name, email, password })
    // const tokenUser = { name: user.name, id: user._id, role: user.role }
    const tokenUser = createTokenUser(user)
    //const token = jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    attachCookiesToResponse(res, tokenUser)
    res.status(201).json({ user: tokenUser })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('missing email or password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('invalid email')
    }
    const checkPassword = await user.checkPassword(password)
    if (!checkPassword) {
        throw new UnauthenticatedError('invalid password')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse(res, tokenUser)
    res.status(201).json({ user: tokenUser })
}
const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.sendStatus(200)
}

module.exports = { register, login, logout }