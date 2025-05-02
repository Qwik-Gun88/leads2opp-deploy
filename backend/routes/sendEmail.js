import express from 'express';
import sendEmail from '../utils/emailSender.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendEmail(to, subject, body);

    // If needed, logging can be added here using a database or file system

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
