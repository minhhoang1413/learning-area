const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {dashboard, login} = require('../controller/main')
router.route('/dashboard').get(authMiddleware,dashboard)
router.route('/login').post(login)


module.exports = router