require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

mongoose.connect(process.env.MONGODB_URI).then(() => {
    return Product.deleteMany()
}).then(() => {
    return Product.create(jsonProducts)
}).then(() => {
    console.log('success');
    process.exit(0)
}).catch(error => {
    console.log(error);
    process.exit(1)
})