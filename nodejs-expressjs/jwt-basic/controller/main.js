const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const dashboard = async (req,res) => {
    const random = Math.floor(Math.random()*100)
    return res.status(200).json({msg:`Hello ${req.user.username}`,secret:`Here is your authorized data: ${random}`})
        
}
const login = async (req,res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new BadRequestError('missing username or password')
    }
    const id = Date.now()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'1h'})
    return res.send(token)
}
module.exports = {dashboard,login}