import express from 'express';
import EmailTemplate from '../models/EmailTemplate.js';

const router = express.Router();

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

export default router;
