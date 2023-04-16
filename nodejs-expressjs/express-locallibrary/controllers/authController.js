const User = require('../models/user')
const { createToken } = require('../utils/jwt')

function viewLogin(req, res) {
    res.render('login', { title: 'Login', old: null, error: null })
}
async function login(req, res, next) {
    try {
        const { username, password } = req.body
        const old = req.body
        if (!username || !password) {
            return res.render('login', { title: 'login', old, error: 'missing username or password' })
        }
        const existedUser = await User.findOne({ username })
        if (!existedUser) {
            return res.render('login', { title: 'login', old, error: 'username not found' })
        }
        const isMatch = await existedUser.comparePassword(password)
        if (!isMatch) {
            return res.render('login', { title: 'login', old, error: 'password wrong' })
        }
        const payload = { user_id: existedUser._id, username: existedUser.username }
        const maxAge = Number(process.env.JWT_MAXAGE)
        const token = createToken(payload)
        
        res.cookie('access-token', token, { maxAge, signed: true, httpOnly: true })
            .redirect('/')
    } catch (error) {
        next(error)
    }
}
function viewRegister(req, res) {
    res.render('login', { title: 'Register', old: null, error: null })
}
async function register(req, res, next) {
    try {
        const { username, password } = req.body
        const old = req.body
        if (!username || !password) {
            return res.render('login', { title: 'register', old, error: 'username and password must not empty' })
        }
        const existedUser = await User.findOne({ username })
        if (existedUser) {
            return res.render('login', { title: 'register', old, error: 'username is already existed' })
        }
        const user = await User.create({ username, password })

        res.redirect('/auth/login')
    } catch (error) {
        next(error)
    }
}

function logout(req, res) {
    res.clearCookie('access-token')
    res.redirect('/')
}
module.exports = { viewLogin, viewRegister, login, register, logout }