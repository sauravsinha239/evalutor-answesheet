const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sauravsinha1505:S4u84v239@saurav.xvykk.mongodb.net/?retryWrites=true&w=majority&appName=saurav', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Schema and Model
const markSchema = new mongoose.Schema({
  questionNumber: Number,
  marks: Number,
});
const Mark = mongoose.model('Mark', markSchema);

// API Endpoint to Save Marks
app.post('/api/marks', async (req, res) => {
  try {
    const { questionNumber, marks } = req.body;
    const newMark = new Mark({ questionNumber, marks });
    await newMark.save();
    res.status(201).json({ message: 'Marks saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save marks' });
  }
});

// Start Server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
