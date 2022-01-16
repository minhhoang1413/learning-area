const express = require('express')
const router = express.Router()
const { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController')
const {getSingleProductReviews} = require('../controllers/reviewController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizePermissions('admin'), createProduct)

router.post('/upload', authenticateUser, authorizePermissions('admin'), uploadImage)

router.route('/:id')
    .get(getProduct)
    .patch(authenticateUser, authorizePermissions('admin'), updateProduct)
    .delete(authenticateUser, authorizePermissions('admin'), deleteProduct)
router.route('/:id/reviews').get(getSingleProductReviews)

module.exports = router