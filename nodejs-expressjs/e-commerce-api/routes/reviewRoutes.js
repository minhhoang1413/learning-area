const { getReview, getAllReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController')
const { authenticateUser } = require('../middleware/authentication')
const express = require('express')
const router = express.Router()

router.route('/').get(getAllReviews)
    .post(authenticateUser, createReview)
router.route('/:id').get(authenticateUser, getReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview)

module.exports = router