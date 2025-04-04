const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`Connection DB: ${conn.connection.host}`)
    } catch (error) {
        console.log('failed to connect db')
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB