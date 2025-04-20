const mongoose = require('mongoose')
const { timestamp } = require('rxjs')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    products: {
        type: String,
        required: [true, 'Please choose product'],
        enum: ['iPhone', 'iMac', 'Macbook Pro','iPad']
    },
    description: {
        type: String,
        required: [true, 'Please enter the description of product'],
    },
    status: {
        type: String,
        required: true,
        enum:['new', 'open','closed'],
        default:'new'
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('ticket',ticketSchema)