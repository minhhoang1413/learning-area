const Order = require('../models/Order')
const Product = require('../models/Product')
const { BadRequestError, NotFoundError } = require('../errors')
const { checkPermission } = require('../utils')

const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue'
    return { client_secret, amount }
}

const createOrder = async (req, res) => {

    const { items: cartItems, tax, shippingFee } = req.body
    if (!cartItems || cartItems.length < 1) {
        throw new BadRequestError('No cart item provided')
    }
    if (!tax || !shippingFee) {
        throw new BadRequestError('please provide tax and shipping fee')
    }
    let orderItems = []
    let subtotal = 0
    for (const item of cartItems) {
        const dbProduct = await Product.findById(item.product)
        if (!dbProduct) {
            throw new NotFoundError('no product with id: ' + item.product)
        }
        //console.log(dbProduct);
        const singleOrderItem = {
            name: dbProduct.name,
            price: dbProduct.price,
            image: dbProduct.image,
            amount: item.amount,
            product: dbProduct._id
        }
        orderItems.push(singleOrderItem)
        subtotal += dbProduct.price * item.amount
    }
    const total = subtotal + tax + shippingFee
    const paymentIntent = await fakeStripeAPI({
        amount: total, currency: 'usd'
    })
    const order = await Order.create({
        tax, shippingFee, subtotal, total, orderItems, clientSecret: paymentIntent.client_secret, user: req.user.userId
    })
    res.status(201).json({ order, clientSecret: order.clienSecret })
}
const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    res.status(200).json({ orders, count: orders.length })
}
const getSingleOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        throw new NotFoundError('not order with id:' + req.params.id)
    }
    checkPermission(req.user, order.user)
    res.status(200).json({ order })
}
const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId })
    res.status(200).json({ orders, count: orders.length })
}
const updateOrder = async (req, res) => {
    const orderId = req.params.id
    const { paymentIntentId } = req.body
    const order = await Order.findById(orderId)
    if (!order) {
        throw new NotFoundError('not order with id:' + req.params.id)
    }
    checkPermission(req.user, order.user)
    order.paymentIntentId = paymentIntentId
    order.status = 'paid'
    await order.save()
    res.status(200).json({ order })
}

module.exports = { createOrder, getAllOrders, getSingleOrder, getCurrentUserOrders, updateOrder }