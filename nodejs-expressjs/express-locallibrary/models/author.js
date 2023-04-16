const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    }
})

authorSchema.virtual("fullname").get(function () {
    return this.first_name + ' ' + this.last_name
})
authorSchema.virtual("url").get(function () {
    return `/authors/${this._id}`
})
authorSchema.virtual("date").get(function () {
    let dateString = ""
    if (this.date_of_birth) {
        dateString += '(' + new Date(this.date_of_birth).getFullYear()
        if (this.date_of_death) {
            dateString += '-' + new Date(this.date_of_death).getFullYear()
        }
        dateString += ')'
    }
    return dateString
})
module.exports = mongoose.model("Author", authorSchema)