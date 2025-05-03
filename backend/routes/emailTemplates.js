import express from 'express';
import EmailTemplate from '../models/EmailTemplate.js';

const router = express.Router();

// Save a new template
router.post('/save', async (req, res) => {
  try {
    const { name, subject, body, signature, createdBy } = req.body;
    const newTemplate = new EmailTemplate({ name, subject, body, signature, createdBy });
    await newTemplate.save();
    res.status(200).json({ message: 'Template saved successfully' });
  } catch (error) {
    console.error('❌ Error saving template:', error);
    res.status(500).json({ error: 'Failed to save template' });
  }
});

// Get all templates
router.get('/all', async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ createdAt: -1 });
    res.status(200).json(templates);
  } catch (error) {
    console.error('❌ Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

export default router;
