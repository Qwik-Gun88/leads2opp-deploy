import express from 'express';
import Signature from '../models/Signature.js';

const router = express.Router();

// Save or update a signature
router.post('/save-signature', async (req, res) => {
  const { name, html, isDefault } = req.body;

  if (!name || !html) {
    return res.status(400).json({ error: 'Missing name or html content' });
  }

  try {
    // If isDefault, unset previous default
    if (isDefault) {
      await Signature.updateMany({}, { isDefault: false });
    }

    const updated = await Signature.findOneAndUpdate(
      { name },
      { name, html, isDefault },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: '✅ Signature saved', signature: updated });
  } catch (err) {
    console.error('❌ Error saving signature:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all saved signatures
router.get('/signatures', async (req, res) => {
  try {
    const signatures = await Signature.find({});
    res.status(200).json(signatures);
  } catch (err) {
    console.error('❌ Error loading signatures:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get default signature
router.get('/default-signature', async (req, res) => {
  try {
    const signature = await Signature.findOne({ isDefault: true });
    res.status(200).json(signature);
  } catch (err) {
    console.error('❌ Error fetching default signature:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
