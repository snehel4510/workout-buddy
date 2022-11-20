const jwt = require('jsonwebtoken')
const user = require('../models/user_model')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.login(email, password)
        const token = createToken(User._id)
        res.status(200).json({email,token})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    // res.json('mssg : user is logged in')
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const newUser = await user.signup(email, password)
        const token = createToken(newUser._id)
        res.status(200).json({email,token})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    // res.json('mssg : user is registered')
}

module.exports = { loginUser, signupUser }