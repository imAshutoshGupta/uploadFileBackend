require('dotenv').config()
const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})
console.log("Email user:", process.env.EMAIL_USER)
console.log("Email password:", process.env.EMAIL_PASS)