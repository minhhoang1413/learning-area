const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const register = async (req, res) => {
    const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //     throw new BadRequestError('missing name or email or password')
    // }
    // const hashPassword = await bcrypt.hash(password,10) // in User model
    const user = await User.create({ name, email, password })
    //const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' })
    const token = user.generateToken()
    res.status(201).json({ user: { name: user.name }, token })
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
    const check = await user.comparePassword(password)
    if (!check) {
        throw new UnauthenticatedError('wrong password')
    }
    const token = user.generateToken()
    res.status(200).json({ user: { name: user.name }, token })
}
module.exports = { register, login }