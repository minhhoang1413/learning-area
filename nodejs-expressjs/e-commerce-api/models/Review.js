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

reviewSchema.statics.calAverageRating = async function (productId) {
    const result = await this.aggregate([
        {
            '$match': {
                'product': productId
            }
        },
        {
            '$group': {
                '_id': null,
                'avgRating': { '$avg': '$rating' },
                'numberOfReviews': {
                    '$sum': 1
                }
            }
        }
    ])
    console.log(result);
    try {
        await this.model('Product').findByIdAndUpdate(productId, {
            averageRating: result[0]?.avgRating || 0,
            numberOfReviews: result[0]?.numberOfReviews || 0,
        })
    } catch (error) {
        console.log(error);
    }
}

reviewSchema.post('save', async function () {
    this.constructor.calAverageRating(this.product)
})

reviewSchema.post('remove', async function () {
    this.constructor.calAverageRating(this.product)
})

module.exports = mongoose.model('Review', reviewSchema)