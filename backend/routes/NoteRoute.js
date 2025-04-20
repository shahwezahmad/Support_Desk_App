const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {getNotes, addNotes} = require('../controllers/noteController')

// till reach here url  is /api/tickets/:ticketId

const router = express.Router({mergeParams: true})

router.route('/').get(protect, getNotes).post(protect, addNotes)
// url will bet /api/tickets/:ticketId/notes
module.exports = router
