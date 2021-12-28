const User = require('../models/User')
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../errors')
const { createTokenUser, attachCookiesToResponse, checkPermission } = require('../utils')

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(200).json({ users })
}
const getUser = async (req, res) => {
    checkPermission(req.user,req.params.id)
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
        throw new NotFoundError('no user with id')
    }
    res.status(200).json({ user })
}
const showCurrentUser = async (req, res) => {
    res.status(200).json({ user: req.user })
}
const updateUser = async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        throw new BadRequestError('missing value')
    }
    const user = await User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true, runValidators: true })
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse(res, tokenUser)
    res.status(200).json({ user: tokenUser })
}
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new BadRequestError('missing value')
    }
    const user = await User.findById(req.user.userId)
    const checkPassword = user.checkPassword(oldPassword)
    if (!checkPassword) {
        throw new UnauthenticatedError('wrong password')
    }
    user.password = newPassword
    await user.save()
    res.sendStatus(200)
}
module.exports = { getAllUsers, getUser, showCurrentUser, updateUser, updateUserPassword }