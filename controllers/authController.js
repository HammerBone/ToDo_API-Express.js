const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = require("../models/userModel")
const User = mongoose.model("user", userSchema)

const generateToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.KEY, { expiresIn: '10m' })
}

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.json({ message: "Unauthorized" })
    }

    try {
        const token = authorization.split(' ')[1]
        const { _id } = jwt.verify(token, process.env.KEY)
        req.user = _id
        next()
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const registerUser = await new User({
            name, email, password 
        }).save()

        const token = generateToken(registerUser._id)

        res.status(200).json({ token })
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email, password: password })

        if (!user) {
            res.status(401).json({ message: "Wrong email/password"})
        }

        const token = generateToken(user._id)

        res.status(200).json({ token })
    } 
    catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = { register, login, verifyToken }