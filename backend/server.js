const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db.js')

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))  
app.use(cors())


app.use('/api/users', require('./routes/userRoute'))
app.use('/api/tickets', require('./routes/ticketRoute.js'))
app.use(errorHandler)
app.listen(port, () => console.log(`App is running or ${port}`))