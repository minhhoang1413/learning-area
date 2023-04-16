const router = require('express').Router()
const authRouter = require('./auth')
const authorsRouter = require('./authors')
const booksRouter = require('./books')
const bookInstancesRouter = require('./bookinstances')
const genresRouter = require('./genres')
const { index } = require('../controllers/homeController')

router.get('/', index)
router.use('/auth', authRouter)
router.use('/authors', authorsRouter)
router.use('/books', booksRouter)
router.use('/bookinstances', bookInstancesRouter)
router.use('/genres', genresRouter)

module.exports = router