const asyncHandler = require('express-async-handler')
const Note = require('../models/NoteModel')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

const getNotes = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user.id)
    
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(401)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Unauthorized User')
    }

    const notes = await Note.find({ ticket: ticket._id})

    res.status(200).json(notes)
})

const addNotes = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user.id)
    
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    const {text} = req.body

    if(!ticket) {
        throw new Error('Ticket not found')
    }

    const note = await Note.create({
        user:req.user.id,
        ticket: req.params.id,
        text,
    })
    console.log({})

    res.status(201).json(note)
} )

module.exports = {
    getNotes,
    addNotes
}