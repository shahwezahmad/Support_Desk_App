const asyncHandler = require('express-async-handler')
// @desc - for register new user on route (/api/users/)
const registerUser =    asyncHandler(async (req,res) => {
   const {name, email, password} = req.body

   if(!name || !email || !password) {
    res.status(400)
    throw new Error('Enter all field')
   }
    res.send('hello')
})

// @desc - for logi user on route (/api/users/login)

const loginUser = asyncHandler(async(req, res) => {
    res.send('Login user from controller')
})

module.exports = {
     registerUser,
     loginUser
}