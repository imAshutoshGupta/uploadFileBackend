const Document = require('../models/documentModel')
const cloudinary = require('../config/cloudinary')

exports.viewFiles = async (req, res) => {
    try {
        const documentId = req.params.id
        console.log(documentId)
        
        const document = await Document.findById(documentId).populate('user_id', 'email username')
        if (!document) {
            return res.status(404).json({ message: "Document not found" })
        }
        res.status(200).json({
            message: 'Document retrieved successfully',
            document,
        })
    } catch (error) {
        console.error('Error fetching document:', error)
        res.status(500).json({ message: 'Error fetching document' })
    }
}

exports.deleteFile = async (req, res) => {
    try {
        const documentId = req.params.id
        console.log(documentId)
        const document = await Document.findById(documentId)
        if (!document) {
            return res.status(404).json({ message: "Document not found" })
        }

        const cloudinaryId = document.file_path.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(cloudinaryId)

        await document.deleteOne()
        res.status(200).json({ message: "Document deleted successfully" })
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Error deleting document' })
    }

}