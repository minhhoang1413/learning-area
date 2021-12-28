const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,1)
    next()
})
userSchema.methods.generateToken = function(){
    const token = jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return token
}
userSchema.methods.comparePassword = async function(password){
    const check = await bcrypt.compare(password, this.password)
    return check
}
module.exports = mongoose.model('User', userSchema)