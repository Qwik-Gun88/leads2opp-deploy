import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define the schema
const templateSchema = new mongoose.Schema({
  name: String,
  subject: String,
  body: String,
  signature: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create the model
const EmailTemplate = mongoose.model('EmailTemplate', templateSchema);

// POST /api/templates - save a new template
router.post('/templates', async (req, res) => {
  try {
    const { name, subject, body, signature } = req.body;
    const template = new EmailTemplate({ name, subject, body, signature });
    await template.save();
    res.status(201).json({ message: 'Template saved successfully', template });
  } catch (error) {
    console.error('❌ Failed to save template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// (We’ll add GET later)
export default router;