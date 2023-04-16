const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

async function connectDB() {
    return mongoose.connect(uri)
}
async function closeDb() {
    await mongoose.connection.close()
}
module.exports = { connectDB, closeDb } 