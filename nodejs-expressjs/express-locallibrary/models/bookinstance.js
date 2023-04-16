const mongoose = require('mongoose')

const bookInstanceSchema = new mongoose.Schema({

    book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Available"
    },
    due_back: {
        type: Date
    }
})
bookInstanceSchema.virtual("url").get(function () {
    return `/bookinstances/${this._id}`
})
module.exports = mongoose.model('BookInstance', bookInstanceSchema)