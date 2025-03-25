const express = require('express');
const AnswerSheet = require('../models/AnswerSheet');
const router = express.Router();

router.post('/assign-marks', async (req, res) => {
    try {
        const { sheetId, questionNumber, mark } = req.body;
        const sheet = await AnswerSheet.findById(sheetId);

        if (!sheet) return res.status(404).json({ message: 'Sheet not found' });

        sheet.marks.set(questionNumber, mark);
        await sheet.save();
        res.json({ message: 'Marks assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/marks/:sheetId', async (req, res) => {
    try {
        const sheet = await AnswerSheet.findById(req.params.sheetId);
        if (!sheet) return res.status(404).json({ message: 'Sheet not found' });
        res.json({ marks: sheet.marks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
