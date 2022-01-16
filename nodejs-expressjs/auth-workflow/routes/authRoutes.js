const express = require('express')
const router = express.Router()
const { register, logout, login, verifyEmail, showCurrentUser, forgotPassword, resetPassword } = require('../controllers/authController')
const { authenticateUser } = require('../middleware/authentication')

router.post('/register', register)
router.post('/login', login)
router.post('/verify-email', verifyEmail)
router.delete('/logout', authenticateUser, logout)
router.get('/showme', authenticateUser, showCurrentUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
module.exports = router