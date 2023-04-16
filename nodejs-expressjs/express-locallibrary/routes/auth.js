const router = require('express').Router()
const { viewLogin, viewRegister, login, register, logout } = require('../controllers/authController')


router.get('/login', viewLogin)
router.post('/login', login)
router.get('/register', viewRegister)
router.post('/register', register)
router.get('/logout', logout)


module.exports = router