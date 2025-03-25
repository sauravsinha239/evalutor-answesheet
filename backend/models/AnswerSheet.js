const mongoose = require('mongoose');

const AnswerSheetSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    marks: {
        type: Map,
        of: Number,
    },
});

const AnswerSheet = mongoose.model('AnswerSheet', AnswerSheetSchema);
module.exports = AnswerSheet;
