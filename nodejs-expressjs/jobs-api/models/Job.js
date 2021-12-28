const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        maxlength: 30
    },
    position: {
        type: String,
        required: true,
        maxlength: 30
    },
    status: {
        type: String,
        enum: ['interview', 'decline', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)