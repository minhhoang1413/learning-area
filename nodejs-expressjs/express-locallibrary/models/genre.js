const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    }
})
genreSchema.virtual("url").get(function () {
    return `/genres/${this._id}`
})

module.exports = mongoose.model('Genre', genreSchema)