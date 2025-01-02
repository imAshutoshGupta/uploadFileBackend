const express = require('express')
const { adminUser, deleteUser } = require('../controllers/adminController')
const router = express.Router()

router.get('/', adminUser)
router.delete('/delete-user/:id', deleteUser)

module.exports = router