const router = require('express').Router()
const { getAll, getBookInGenre, viewCreateGenrePage, createGenre } = require('../controllers/genreController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getAll)
router.get('/create', authMiddleware, viewCreateGenrePage)
router.get('/:id', getBookInGenre)
router.post('/create', authMiddleware, createGenre)


module.exports = router