const User = require('../models/userModel')

exports.adminUser = async (req, res) => {
    try {
        const allUsers = await User.find({}).select('-password')
        res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users." })
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        const delUser = await User.findByIdAndDelete(userId)
        if (!delUser) {
            return res.status(404).json({ message: "User not found" })
        }
        
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user" })
    }
}