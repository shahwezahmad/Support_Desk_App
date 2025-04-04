const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))  
app.get('/', (req, res ) =>{
    res.status(500).send("helooo")
})

app.use('/api/users', require('./routes/userRoute'))
app.use(errorHandler)
app.listen(port, () => console.log(`App is running or ${port}`))