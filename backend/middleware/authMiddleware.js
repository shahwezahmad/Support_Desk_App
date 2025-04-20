const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const protect =  asyncHandler(async(req, res, next) => {

// check token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    
        try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user =await User.findById(decoded.id).select('-password')
        
        next()
        } catch (error) {
            res.status(404)
            throw new Error('Not found any details')
        }
    }

    if(!token) {
        res.status(404)
        throw new Error('Not found any details')
    }


})

module.exports = {protect}