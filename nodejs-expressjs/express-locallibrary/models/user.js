const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})
userSchema.method('comparePassword', async function (pw) {
    return bcrypt.compare(pw, this.password)
})

module.exports = mongoose.model('User', userSchema)