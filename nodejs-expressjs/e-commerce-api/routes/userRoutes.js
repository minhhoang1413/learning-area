
const express = require('express')
const router = express.Router()
const { getUser, getAllUsers, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)
router.route('/:id').get(authenticateUser, getUser)



module.exports = router