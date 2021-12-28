const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    price: {
        type: Number,
        // required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    image: {
        type: String,
        default: '/upload/default.svg'
    },
    category: {
        type: String,
        required: true,
        enum: ['office', 'kitchen', 'bedroom']
    },
    company: {
        type: String,
        required: true,
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    colors: {
        type: [String],
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: 1
    },
    averageRating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)