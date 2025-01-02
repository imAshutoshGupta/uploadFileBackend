const cloudinary = require('../config/cloudinary')
const Document = require('../models/documentModel')

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const types = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'document/pdf',
        'audio/mpeg',
        'audio/wav',
        'audio/mp3',
        'video/mp4',
        'video/avi',
        'text/txt',
        'text/plain',
        'document/docx',
        'document/sheet',
        'application/zip',
        'file/json',
        'text/csv',
    ]
    const maxSize = 50 * 1024 * 1024
    console.log('Uploaded file MIME type:', req.file.mimetype);

    if (!types.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Unsupported file type" })
    }
    if (req.file.size > maxSize) {
        return res.status(400).json({ message: "File size exceeds the allowed limit of 50 MB." })
    }
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            async (error, result) => {
                if (error) {
                    console.error("Cloudinary error:", error);
                    return res.status(500).send('Error uploading file');
                }

                console.log("Cloudinary upload result:", result)

                const newDocument = new Document({
                    user_id: req.user.userId,
                    file_name: req.file.originalname,
                    file_path: result.secure_url,
                    file_size: req.file.size
                });

                await newDocument.save();
                res.status(201).json({
                    message: 'File uploaded successfully',
                    url: result.secure_url,
                });
            }
        );

        uploadStream.end(req.file.buffer)

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Error uploading file');
    }
}

module.exports = { uploadFile }
