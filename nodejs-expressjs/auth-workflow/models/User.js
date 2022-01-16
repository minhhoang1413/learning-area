const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: Date,
    passwordToken: String,
    passwordTokenExpirationDate: Date,
    
})
UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        return
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})
UserSchema.methods.checkPassword = async function(comparePw){
    const check = await bcrypt.compare(comparePw,this.password)
    return check
}


module.exports = mongoose.model('User', UserSchema)