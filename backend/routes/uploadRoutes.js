const express = require('express');
const multer = require('multer');
const AnswerSheet = require('../models/AnswerSheet');
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const newSheet = new AnswerSheet({
            filename: req.file.originalname,
            filepath: req.file.path,
            marks: {},
        });
        await newSheet.save();
        res.json({ message: 'File uploaded successfully', sheetId: newSheet._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
