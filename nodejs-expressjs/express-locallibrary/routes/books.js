const router = require('express').Router()
const { getAll, getDetailBook, viewCreateBook, createBook, viewUpdateBook, updateBook } = require('../controllers/bookController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getAll)
router.get('/create', authMiddleware, viewCreateBook)
router.post('/create', authMiddleware, createBook)
router.get('/:id', getDetailBook)
router.get('/:id/update', authMiddleware, viewUpdateBook)
router.post('/:id/update', authMiddleware, updateBook)

module.exports = router