const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { transporter } = require('../config/transporter')

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: "Please provide a valid email" })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const resetToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' })
        const resetUrl = `${process.env.BASE_URL}/resetPassword/${resetToken}`;

        const mailOptions = {
            to: email,
            subject: "Password reset link",
            text: `${resetUrl}`
        }

        await transporter.sendMail(mailOptions)
        return res.status(200).json({ message: "Password reset link sent" })
    } catch (error) {
        console.log(error);


        return res.status(500).json({ message: "Server error" })
    }

} 