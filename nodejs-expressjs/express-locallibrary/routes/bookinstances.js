const router = require('express').Router()
const { getAll, getDetailInstance, viewCreateBookInstance, createBookInstance } = require('../controllers/bookinstanceController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getAll)
router.get('/create', authMiddleware, viewCreateBookInstance)
router.post('/create', authMiddleware, createBookInstance)
router.get('/:id', getDetailInstance)

module.exports = router