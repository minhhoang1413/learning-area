const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    comment: {
        type: String,
        required: true,
        maxlength: 50
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, { timestamps: true })
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Review', reviewSchema)