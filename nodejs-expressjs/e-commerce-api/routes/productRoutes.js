const express = require('express')
const router = express.Router()
const { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizePermissions('admin'), createProduct)

router.post('/upload', authenticateUser, authorizePermissions('admin'), uploadImage)

router.route('/:id')
    .get(getProduct)
    .patch(authenticateUser, authorizePermissions('admin'), updateProduct)
    .delete(authenticateUser, authorizePermissions('admin'), deleteProduct)


module.exports = router