const express = require('express')
const router = express.Router()
const multer = require('multer')
const { protectedRoute } = require('../middlewares/authMiddleware')
const { getDashboard } = require('../controllers/dashboardController')
const { viewFiles, deleteFile } = require('../controllers/documentController')
const { uploadFile } = require('../controllers/uploadController')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', protectedRoute, getDashboard)
router.post('/upload-file', protectedRoute, upload.single('file'), uploadFile);
router.get('/view-file/:id', protectedRoute, viewFiles)
router.delete('/delete-file/:id', protectedRoute, deleteFile)
module.exports = router