const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true
    },
    genre: [{ type: mongoose.Types.ObjectId, ref: 'Genre', required: true }]
})

bookSchema.virtual("url").get(function () {
    return `/books/${this._id}`
})

module.exports = mongoose.model('Book', bookSchema)