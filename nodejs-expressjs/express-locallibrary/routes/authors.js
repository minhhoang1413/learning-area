const router = require('express').Router()
const { getAll, getAuthorDetail, viewCreateAuthor, createAuthor, viewDeleteAuthor, deleteAuthor } = require('../controllers/authorController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', getAll)

router.route('/create')
    .all(authMiddleware)
    .get(viewCreateAuthor)
    .post(createAuthor)

router.get('/:id', getAuthorDetail)

router.route('/:id/delete')
    .all(authMiddleware)
    .get(viewDeleteAuthor)
    .post(deleteAuthor)

module.exports = router