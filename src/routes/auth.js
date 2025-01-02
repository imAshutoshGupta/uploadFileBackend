const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const forgotPassword = require('../controllers/forgotPassword')
const resetPassword = require('../controllers/resetPassword')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.post('/forgot-password', forgotPassword.forgotPassword)
router.post('/reset-password/:token', resetPassword.resetPassword)

module.exports = router