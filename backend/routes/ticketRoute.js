const express = require('express')
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {getTickets, createTicket,getTicket, deletTicket, updateTicket} = require('../controllers/ticketController')
const noteRouter = require('./NoteRoute')


router.use('/:id/notes', noteRouter)

router.route('/').get(protect,getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).delete(protect, deletTicket ).put(protect, updateTicket )

module.exports = router