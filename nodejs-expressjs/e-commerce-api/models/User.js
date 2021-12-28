const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        console.log('not modified password');
        return
    }
    console.log('modified password');
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.checkPassword = async function (comparePw) {
    const check = await bcrypt.compare(comparePw, this.password)
    return check
}

module.exports = mongoose.model('User', userSchema)