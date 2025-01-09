const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.resetPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
    if (!newPassword) {
        return res.status(400).json({ message: "Please provide a new password" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token" })
        }
    
        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        res.status(201).json({ message: "Password successfully reset" })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}