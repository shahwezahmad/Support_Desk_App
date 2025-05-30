const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Enter a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Enter a email'],
        
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
        
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('User', userSchema )