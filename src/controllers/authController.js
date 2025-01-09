const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || username.length === 0) {
            return res.status(400).json({ message: "Username cannot be blank" })
        }
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" })
          }
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
    
        const matchPassword = await bcrypt.compare(password, userExists.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            maxAge: 3600000
        })
        res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}