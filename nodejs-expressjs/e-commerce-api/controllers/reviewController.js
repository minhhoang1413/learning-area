const Review = require('../models/Review')
const Product = require('../models/Product')
const { BadRequestError, NotFoundError } = require('../errors')
const { checkPermission } = require('../utils')
const getAllReviews = async (req, res) => {
    const reviews = await Review.find({}).populate({
        path: 'product',
        select: 'name company price'
    })
    res.status(200).json({ reviews, count: reviews.length })
}
const getReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new NotFoundError('no review with id')
    }
    res.status(200).json({ review })
}
const createReview = async (req, res) => {
    const { product: productId } = req.body
    const userId = req.user.userId
    const isValidproduct = await Product.findById(productId)
    if (!isValidproduct) {
        throw new NotFoundError('not found product with id')
    }
    const alreadyReview = await Review.findOne({ product: productId, user: userId })
    if (alreadyReview) {
        throw new BadRequestError('already review')
    }
    req.body.user = userId
    const review = await Review.create(req.body)
    res.status(201).json({ review })
}
const updateReview = async (req, res) => {
    const { id: reviewId } = req.params
    const { title, comment, rating } = req.body
    if (!title || !comment || !rating) {
        throw new BadRequestError('missing value')
    }
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new NotFoundError('not find review with that id')
    }
    checkPermission(req.user, review.user)
    review.title = title
    review.comment = comment
    review.rating = rating
    await review.save()
    res.status(200).json({ review })
}
const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new NotFoundError('no review with id')
    }
    checkPermission(req.user, review.user)
    await review.remove()
    res.sendStatus(200)
}
const getSingleProductReviews = async (req, res) => {
    const productId = req.params.id
    const reviews = await Review.find({ product: productId })
    res.status(200).json({ reviews, count: reviews.length })
}

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}