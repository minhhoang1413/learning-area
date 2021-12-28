const Product = require('../models/Product')
const { BadRequestError, NotFoundError } = require('../errors')
const path = require('path')

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ products, count: products.length })
}
const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new NotFoundError('no product with id')
    }
    res.status(200).json({ product })
}
const createProduct = async (req, res) => {
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(201).json(product)
}
const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) {
        throw new NotFoundError('no product with id')
    }
    res.status(200).json({ product })
}
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new NotFoundError('no product with id')
    }
    await product.remove()
    res.sendStatus(200)
}
const uploadImage = async (req, res) => {
    if(!req.files){
        throw new BadRequestError('no file')
    }
    const image = req.files.image
    if (!image.mimetype.startsWith('image')) {
        throw new BadRequestError('not image file')
    }
    const maxSize = 1024 * 1024
    if (image.size > maxSize) {
        throw new BadRequestError('image too large')
    }
    const imgPath = path.join(__dirname,'../public/uploads/'+image.name)
    await image.mv(imgPath)
    res.status(200).json({image: `/uploads/${image.name}`})
}

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImage }