const Document = require('../models/documentModel');

exports.getDashboard = async (req, res) => {
    try {
        const files = await Document.find({ user_id: req.user.userId })
            .populate('user_id', 'email username')
            .sort({ createdAt: -1 });

        res.status(200).json(files || []);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
};
