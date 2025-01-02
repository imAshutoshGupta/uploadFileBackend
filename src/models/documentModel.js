const mongoose = require('mongoose')

const documentUpload = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    uploaded_at: {
        type: Date,
        default: Date.now,
    },
    file_size: {
        type: Number,
        required: false,
    },
}, { timestamps: true })
const Document = mongoose.model('Document', documentUpload)
module.exports = Document