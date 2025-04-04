const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000

const app = express()

app.get('/', (req, res ) =>{
    res.status(500).send("helooo")
})

app.listen(port, () => console.log(`App is running or ${port}`))