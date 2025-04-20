const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')



// @desc - for register new user on route (/api/users/)
const registerUser =    asyncHandler(async (req,res) => {
   const {name, email, password} = req.body

   if(!name || !email || !password) {
    res.status(400)
    throw new Error('Enter all field')
   }
   
//    if user alreay existed
   const userExists = await User.findOne({email })

   if(userExists) {
    res.status(400)
    throw new Error('User already Exists')
   }
//    add new user
// encrypt password

   const round = await bcryptjs.genSalt(10) //no of round
   const hashPassword = await bcryptjs.hash(password, round)
   const user = await User.create({
    name,
    email,
    password: hashPassword
   })

   if(user) {
    res.status(201)
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
   } else {
    res.status(400)
    throw new Error(`Invalid User's credentials`)
   }

})

// @desc - for logi user on route (/api/users/login)

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body 

    if(!email || !password) {
    res.status(400)
    throw new Error('Enter all fields')
   }

//    check is user exist or not
    const user  = await User.findOne({email})
    if(user && (await bcryptjs.compare(password, user.password))){
        res.status(200)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(401)
        throw new Error('Unauthorized User')
    }

})

const getMe = asyncHandler(async (req, res) => {
    const {name, email,_id} = req.user
    res.status(200).json({name, email, _id})
})


const generateToken =  (id ) =>  {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
     registerUser,
     loginUser, 
     getMe
}