const Document = require('../models/documentModel')
exports.getDashboard = async (req, res) => {
    try {
        const files = await Document.find().populate('user_id', 'email name')

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files found' })
        }

        res.status(200).json({
            message: 'Files retrieved successfully',
            files: files,
        })
    } catch (error) {
        console.error('Error fetching files:', error)
        res.status(500).json({ message: 'Error fetching files' })
    }
}