

const registerUser = (req,res) => {
    res.send('Register from controller')
}

const loginUser = (req, res) => {
    res.send('Login user from controller')
}

module.exports = {
     registerUser,
     loginUser
}